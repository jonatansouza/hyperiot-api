const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const MongoDao = require('../config/mongo');
const ENV = require('../config/env');
const saltRounds = 10;  //  Data processing speed

const loginController = {
    login: async (req, res, next) => {
        const {password, email} = req.body;
        const dbo = await MongoDao();
        const user = await dbo.collection('users').findOne({email})
        if(!user) {
            req['operationError'] = {
                status: 400,
                message: 'User does not exists'
            }
            next();
            return;
        }
        const compare = await bcrypt.compare(password, user.password);
        if(!compare) {
            req['operationError'] = {
                status: 401,
                message: 'Not Authorized'
            }
            next();
            return;
        }
        req.operationResult = {
            user: {
                name: user.name,
                email: user.email
            },
            token: jwt.sign({email}, ENV.JWT_KEY)
        }
        next();
        return 
    },
    generateToken: (email) => {
        return jwt.sign({email}, ENV.JWT_KEY);
    },
    createUser: async (req, res, next) => {
        const {password: cleanPassword, email, name} = req.body;
        const dbo = await MongoDao()
        const result = await dbo.collection('users').findOne({email});
        if(result) {
            req['operationError'] = {
                status: 400,
                message: 'User exists'
            }
            next();
            return;
        }
        const password = await bcrypt.hash(cleanPassword, saltRounds);
        const created = await dbo.collection('users').insertOne({email, password, name}); 
        req['operationResult'] = created.ops[0];
        next();
    }
}

module.exports = loginController;
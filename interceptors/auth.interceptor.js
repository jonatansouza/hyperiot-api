const jwt = require('jsonwebtoken')
const ENV = require('../config/env');
const assetHelper = require('../helpers/assets.helper')
const MongoDao = require('../config/mongo');

const auth = async(req, res, next) => {
    const sharedDataId = req.body.sharedDataId || req.params.sharedDataId || req.params.id || '';
    const headerAuth = req.header('Authorization');
    if(!headerAuth){
        res.status(401).json({ error: 'Not Authorized' })
        return;
    }
    const token = headerAuth.replace('Bearer ', '')
    try {
        const {email} = jwt.verify(token, ENV.JWT_KEY)
        const dbo = await MongoDao()
        const result = await dbo.collection('users').findOne({email});
        if (result) {
            req.sessionEmail = email;
            req.sharedDataId = sharedDataId ? assetHelper.parseAssetId(req.sessionEmail, sharedDataId) : '';
            next();
            return;
        }
    } catch(e) {

    }
    res.status(401).json({ error: 'Not Authorized' })
    return;
}
module.exports = auth
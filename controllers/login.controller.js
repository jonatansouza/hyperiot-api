const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const participants = require('../models/participants.model');
const ENV = require('../config/env');

// const modifiedPasswd = await bcrypt.hash(password, 8)
    
const loginController = {
    login: async (data) => {
        const testPassword = "$2a$08$loTSHMhvC8bTfAvKqu99pe8zAsuFn2fMS2Ib8blwynTYGM1E.VHWi";
        const {password, email, token} = data;
        const userExists = await participants.participantExists(email);
        if(!userExists) {
            return false;
        }
        const userFetched = await participants.getParticipantByEmail(email);
        const compare = await bcrypt.compare(password, testPassword);
        if(!compare) {
            return false;
        }
        return {
            user: email,
            token: jwt.sign({email}, ENV.JWT_KEY)
        }
        // return await jwt.verify(token, ENV.JWT_KEY);
    },
    generateToken: (email) => {
        return jwt.sign({email}, ENV.JWT_KEY);
    }

}

module.exports = loginController;
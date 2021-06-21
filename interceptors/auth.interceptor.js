const jwt = require('jsonwebtoken')
const participant = require('../models/participants.model')
const ENV = require('../config/env');
const assetHelper = require('../helpers/assets.helper')

const auth = async(req, res, next) => {
    req.sessionEmail = 'jhondoe@example.com';
    const sharedDataId = req.body.sharedDataId || req.params.sharedDataId || '';
    req.sharedDataId = sharedDataId ? assetHelper.parseAssetId(req.sessionEmail, sharedDataId) : '';
    next();
    return;
    // const headerAuth = req.header('Authorization');
    // if(!headerAuth){
    //     res.status(401).json({ error: 'Not Authorized' })
    //     return;
    // }
    // const token = headerAuth.replace('Bearer ', '')
    // try {
    //     const data = jwt.verify(token, ENV.JWT_KEY)
    //     const result = await participant.participantExists(data.email);
    //     if (result) {
    //         req.sessionEmail = data.email;
    //         next();
    //         return;
    //     }
    // } catch(e) {

    // }
    // res.status(401).json({ error: 'Not Authorized' })
    // return;
    

}
module.exports = auth
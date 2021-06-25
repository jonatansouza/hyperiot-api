const blockchain = require('../services/blockchain-api');
const loginController = require('../controllers/login.controller');
const cloudController = require('../models/google-cloud');
const debug = require('debug')('hyperiot-api:server');

const assetsModel = {
    getAllAssets: async function (req) {
        return new Promise(async (resolve, reject) => {
           const {sessionEmail} = req;
           const {data} = await blockchain.getAllAssets(sessionEmail)
           return resolve(data || []);
        });
    },
    getAssetById: async function ({sessionEmail, sharedDataId}) {
        return blockchain.getAssetById(sessionEmail, sharedDataId)
    },
    assetExists: async function (req) {
        const {sessionEmail, sharedDataId} = req;
        return blockchain.assetExists(sessionEmail, sharedDataId);
    },
    insertAssets: async function (req) {
        const {sessionEmail, sharedDataId, body} = req;
        const {sharedDataDescription} = body;
        if(!sharedDataId || !sharedDataDescription) {
            return Promise.reject({
                msg: 'O id e a descrição são obrigatórios'
            })
        }
        try {
            await blockchain.assetExists(sessionEmail, sharedDataId);
            return Promise.reject({
                msg: 'Dispositivo já cadastrado!'
            })
        } catch(e) {

        }   
        
        // const bucket = await cloudController.createBucket(assetId);
        // if(!bucket) {
        //    return Promise.reject({
        //        msg: 'Erro ao criar o bucket na cloud'
        //    })
        // }
        // params['token'] = loginController.generateToken(assetId);
        // params['commodityId'] = assetId;
        // params['owner'] = req.sessionEmail;
        // params['allowedUsers'] = [req.sessionEmail]
        // params['registered'] = new Date().getTime();
        body.sharedDataId = sharedDataId;
        return blockchain.insertAssets(sessionEmail, body);
    },
    deleteAssets: async (params) => {
        try {
            const result = await blockchain.deleteAssets(params);
            const bucket = await cloudController.deleteBucket(params);
            return true;
        }catch(e) {
            return false;
        }
        
    },
    grantAccess: async (params) => {
        const {sessionEmail, sharedDataId, body} = params;
        return blockchain.grantAccess(sessionEmail, sharedDataId, body)
    },
    revokeAccess: async (params) => {
        const {sessionEmail, sharedDataId, body} = params;
        return blockchain.revokeAccess(sessionEmail, sharedDataId, body)
    },
    history: async (params) => {
        const {sessionEmail, sharedDataId} = params;
        return blockchain.history(sessionEmail, sharedDataId)
    },
    getAllAssetsSharedWithMe: async function (req) {
        const {sessionEmail} = req;
        return blockchain.getAllAssetsSharedWithMe(sessionEmail)
    },
    requestPermission: async (req) => {
        const {sessionEmail} = req;
        const {id} = req.params;
        return blockchain.requestPermission(sessionEmail, id)
    },
}

module.exports = assetsModel;
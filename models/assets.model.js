const blockchain = require('../services/blockchain-api');
const loginController = require('../controllers/login.controller');
const cloudController = require('../models/google-cloud');

const assetsModel = {
    getAllAssets: async function (req) {
        return new Promise(async (resolve, reject) => {
           const {data} = await blockchain.getAllAssets()
           return resolve(
               (data || []).filter(el => el.owner == `resource:org.hyperiot.basic.User#${req.sessionEmail}`)
           );
        });
    },
    getAssetById: async function (params) {
        return blockchain.getAllAssets(params);
    },
    insertAssets: async function (req) {
        const params = req.body;
        const assetId = `${req.sessionEmail}-${params.name}`.match(/[A-Za-z0-9-]/g).join('');
        const exists = await blockchain.assetExists(assetId);
        if(exists){
            return Promise.reject({
                msg: 'ja cadastrado'
            })
        }
        const bucket = await cloudController.createBucket(assetId);
        if(!bucket) {
            return Promise.reject({
                msg: 'Erro ao criar o bucket'
            })
        }
        params['token'] = loginController.generateToken(assetId);
        params['commodityId'] = assetId;
        params['owner'] = req.sessionEmail;
        params['allowedUsers'] = [req.sessionEmail]
        return blockchain.insertAssets(params);
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
}

module.exports = assetsModel;
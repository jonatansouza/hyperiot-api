const blockchain = require('../services/blockchain-api');

const assetsModel = {
    getAllAssets: async function (params) {
        return new Promise(async (resolve, reject) => {
           const {data} = await blockchain.getAllAssets(params)
           return resolve({
               data : (data || []).filter(el => el.owner == 'resource:org.hyperiot.basic.User#user@gmail.com')
           });
        });
    },
    getAssetById: async function (params) {
        return blockchain.getAllAssets(params);
    },
    insertAssets: async function (params) {
        return blockchain.insertAssets(params);
    },
    deleteAssets: async function (params) {
        return blockchain.deleteAssets(params);
    },   
}

module.exports = assetsModel;
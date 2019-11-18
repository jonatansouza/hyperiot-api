const hyperiotDB = require('../config/mongo');

const assetsModel = {
    getAllAssets: async function (params) {
        const participant = await hyperiotDB.getAllAssets(params);
        return participant;
    },
    getAssetById: async function (params) {
        const participant = await hyperiotDB.getAllAssets(params);
        return participant;
    },
    insertAssets: async function (params) {
        const participant = await hyperiotDB.insertAssets(params);
        return participant;
    },
    deleteAssets: async function (params) {
        const participant = await hyperiotDB.deleteAssets(params);
        return participant;
    },   
}

module.exports = assetsModel;
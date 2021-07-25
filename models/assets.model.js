const blockchain = require("../services/blockchain-api");
const cloudController = require("../models/google-cloud");
const googleStorage = require("../models/google-cloud");

const assetsModel = {
  getAllAssets: async function (req) {
    return new Promise(async (resolve, reject) => {
      const { sessionEmail } = req;
      const { data } = await blockchain.getAllAssets(sessionEmail);
      return resolve(data || []);
    });
  },
  getAssetById: async function ({ sessionEmail, sharedDataId }) {
    const base = await blockchain.getAssetById(sessionEmail, sharedDataId);
    return Promise.resolve({
      ...base.data
    });
  },
  assetExists: async function (req) {
    const { sessionEmail, sharedDataId } = req;
    return blockchain.assetExists(sessionEmail, sharedDataId);
  },
  insertAssets: async function (req) {
    const { sessionEmail, sharedDataId, body } = req;
    const { sharedDataDescription, bucket, resourceLocation } = body;
    if (!sharedDataId || !sharedDataDescription || !bucket || !resourceLocation) {
      return Promise.reject({
        msg: "O id, descrição, bucket e resourceLocation são obrigatórios",
      });
    }
    try {
      await blockchain.assetExists(sessionEmail, sharedDataId);
      return Promise.reject({
        msg: "Dispositivo já cadastrado!",
      });
    } catch (e) {}

    try {
      body.sharedDataId = sharedDataId;
      return blockchain.insertAssets(sessionEmail, body)
    } catch (e) {}
  },
  updateAssets: async function (req) {
    const { sessionEmail, sharedDataId, body } = req;
    const { sharedDataDescription, bucket, resourceLocation } = body;
    if (!sharedDataId || !sharedDataDescription || !bucket || !resourceLocation) {
      return Promise.reject({
        msg: "O id, descrição, bucket e resourceLocation são obrigatórios",
      });
    }
    try {
      await blockchain.assetExists(sessionEmail, sharedDataId);
      return Promise.reject({
        msg: "Dispositivo já cadastrado!",
      });
    } catch (e) {}

    try {
      body.sharedDataId = sharedDataId;
      return blockchain.updateAssets(sessionEmail, body)
    } catch (e) {}
  },
  deleteAssets: async (params) => {
    try {
      const result = await blockchain.deleteAssets(params);
      const bucket = await cloudController.deleteBucket(params);
      return true;
    } catch (e) {
      return false;
    }
  },
  grantAccess: async (params) => {
    const { sessionEmail, sharedDataId, body } = params;
    return blockchain.grantAccess(sessionEmail, sharedDataId, body);
  },
  revokeAccess: async (params) => {
    const { sessionEmail, sharedDataId, body } = params;
    return blockchain.revokeAccess(sessionEmail, sharedDataId, body);
  },
  history: async (params) => {
    const { sessionEmail, sharedDataId } = params;
    return blockchain.history(sessionEmail, sharedDataId);
  },
  getAllAssetsSharedWithMe: async function (req) {
    const { sessionEmail } = req;
    return blockchain.getAllAssetsSharedWithMe(sessionEmail);
  },
  requestPermission: async (req) => {
    const { sessionEmail, preservedSharedDataId: sharedDataId } = req;
    const { id } = req.params;
    const result = await blockchain.requestPermission(sessionEmail, id);
    if (!result.data) {
      return Promise.reject();
    }
    try {
      const {ownerId} = req.body;
      const {data} = await blockchain.getAssetById(ownerId, sharedDataId);
      const { resourceLocation, bucket } = data
      return googleStorage.getFiles(bucket, resourceLocation);
    } catch (e) {
      console.log(e);
    }
  },
};

module.exports = assetsModel;

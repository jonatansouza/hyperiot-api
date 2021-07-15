const blockchain = require("../services/blockchain-api");
const cloudController = require("../models/google-cloud");
const MongoDao = require("../config/mongo");

const assetsModel = {
  getAllAssets: async function (req) {
    return new Promise(async (resolve, reject) => {
      const { sessionEmail } = req;
      const { data } = await blockchain.getAllAssets(sessionEmail);
      return resolve(data || []);
    });
  },
  getAssetById: async function ({ sessionEmail, sharedDataId }) {
    const dbo = await MongoDao();
    const base = await blockchain.getAssetById(sessionEmail, sharedDataId);
    const {resourceLocation, bucket} = await dbo.collection('assets').findOne({_id: sharedDataId})
    return Promise.resolve({
        ...base.data,
        resourceLocation,
        bucket
    })
  },
  assetExists: async function (req) {
    const { sessionEmail, sharedDataId } = req;
    return blockchain.assetExists(sessionEmail, sharedDataId);
  },
  insertAssets: async function (req) {
    const { sessionEmail, sharedDataId, body } = req;
    const { sharedDataDescription, bucket, resourceLocation } = body;
    if (!sharedDataId || !sharedDataDescription) {
      return Promise.reject({
        msg: "O id e a descrição são obrigatórios",
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
      const dbo = await MongoDao();
      return Promise.all([
        blockchain.insertAssets(sessionEmail, body),
        dbo.collection("assets").insertOne({
          owner: sessionEmail,
          bucket,
          resourceLocation,
          _id: sharedDataId,
        }),
0      ]);
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
    const { sessionEmail } = req;
    const { id } = req.params;
    return blockchain.requestPermission(sessionEmail, id);
  },
};

module.exports = assetsModel;

'use strict'

const ENV = require('../config/env');
const requestProvider = require('../services/request-service');

const blockchain = {
    getAllUsers: async function (params = {}) {
        const url = `${ENV.BLOCKCHAIN_API_URL}/User`
        return requestProvider.get(url);
    },
    getUserByEmail: async function (email) {
        const url = `${ENV.BLOCKCHAIN_API_URL}/User/${email}`
        return requestProvider.get(url);
    },
    userExists: async function (email) {
        const url = `${ENV.BLOCKCHAIN_API_URL}/User/${email}`
        return requestProvider.head(url);
    },
    insertUser: async function (data) {
        const url = `${ENV.BLOCKCHAIN_API_URL}/User`
        return requestProvider.post(url, data);
    },
    deleteUser: async function (email) {
        const url = `${ENV.BLOCKCHAIN_API_URL}/User/${email}`
        return requestProvider.delete(url);
    },

    // ASSETS
    insertAssets: async function (data) {
        const url = `${ENV.BLOCKCHAIN_API_URL}/Commodity`
        return requestProvider.post(url, data);
    },
    getAllAssets: async function (params) { 
        const url = `${ENV.BLOCKCHAIN_API_URL}/Commodity`;
        return requestProvider.get(url);
    },
    getAssetById: async function (params, email) { 
        const url = `${ENV.BLOCKCHAIN_API_URL}/Commodity`
        return requestProvider.post(url, data);
    },
    deleteAssets: async function (params) {
        const conn = await MongoDao();
        const dbo = conn.db(ENV.MONGO_DBNAME)
        const id = {
            _id: new MongoDb.ObjectId(params)
        }
        return new Promise((resolve, reject) => {
            dbo.collection('assets').deleteOne(id)
                .then(docs => {
                    conn.close();
                    return resolve(docs);
                }).catch(err => {
                    console.log(err);
                    return reject(err);
                })
        })
    }
}

module.exports = blockchain;

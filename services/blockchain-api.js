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
    assetExists: async (id) => {
        const url = `${ENV.BLOCKCHAIN_API_URL}/Commodity/${id}`
        try {
            await requestProvider.head(url);
            return true;
        }catch (e) {
            return false;
        }
    },
    getAssetById: async function (params, email) { 
        const url = `${ENV.BLOCKCHAIN_API_URL}/Commodity`
        return requestProvider.post(url, data);
    },
    deleteAssets: async function (id) {
        const url = `${ENV.BLOCKCHAIN_API_URL}/Commodity/${id}`
        return requestProvider.delete(  url);
    }
}

module.exports = blockchain;

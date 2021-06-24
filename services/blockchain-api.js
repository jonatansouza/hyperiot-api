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
    insertAssets: async function (email, data) {
        const url = `${ENV.BLOCKCHAIN_API_URL}/owners/${email}/shared-data`
        return requestProvider.post(url, data);
    },
    getAllAssets: async function (email) {
        const url = `${ENV.BLOCKCHAIN_API_URL}/owners/${email}`;
        return requestProvider.get(url);
    },
    assetExists: async (email, id) => {
        const url = `${ENV.BLOCKCHAIN_API_URL}/owners/${email}/shared-data/${id}`
        return requestProvider.head(url)
    },
    getAssetById: async function (email, id) {
        const url = `${ENV.BLOCKCHAIN_API_URL}/owners/${email}/shared-data/${id}`
        return requestProvider.get(url);
    },
    deleteAssets: async function (email, id) {
        const url = `${ENV.BLOCKCHAIN_API_URL}/owners/${email}/shared-data/${id}`
        return requestProvider.delete(url);
    },
    grantAccess: async function (email, id, payload) {
        const url = `${ENV.BLOCKCHAIN_API_URL}/owners/${email}/shared-data/${id}/grant-access`
        return requestProvider.post(url, payload);
    },
    revokeAccess: async function (email, id, payload) {
        const url = `${ENV.BLOCKCHAIN_API_URL}/owners/${email}/shared-data/${id}/revoke-access`
        return requestProvider.post(url, payload);
    }
}

module.exports = blockchain;

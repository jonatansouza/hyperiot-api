const blockchain = require('../services/blockchain-api');

const participantTemplate = (obj) => {
    return Object.assign({}, {
        email: obj.email,
        firstName: obj.name,
        lastName: obj.name,
        commoditySharedList: obj.commoditySharedList || []
    })
}

const participantsModel = {
    getAllParticipants: async function (params = {}) {
        return blockchain.getAllUsers(params);
    },
    getParticipantByEmail: async function (params = {}) {
        const result = await blockchain.getUserByEmail(params);
        return result.data || result;
    },
    insertParticipant: async function (params = {}) {
        //validate
        if(!params.name || !params.email){
            return Promise.reject({
                msg: 'Missing name or email'
            })
        }
        try {
            await blockchain.userExists(params.email);
            console.log('exists')
            return  Promise.reject({
                msg: 'Email already registered'
            })
        }catch (e) {
            // user available
        }
        return blockchain.insertUser(participantTemplate(params));
    },
    updateParticipant: async function (params, newValues) {
        const participant = await hyperiotDB.updateParticipant(params, newValues);
        return participant;
    },
    deleteParticipant: async function (params) {
        return blockchain.deleteUser(params);
    },
    participantExists: async function(params) {
        try {
            await blockchain.userExists(params);
            return true;
        } catch (e) {
            return false;
        }
    }
}

module.exports = participantsModel;

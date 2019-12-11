const blockchain = require('../services/blockchain-api');

const participantTemplate = (obj) => {
    return Object.assign({}, obj, {
        whiteList: obj.whiteList || [],
        commoditySharedList: obj.commoditySharedList || [],
        registered: obj.registered || `${new Date().getTime()}`,
        password: obj.password || `blank`,
    })
}

const participantsModel = {
    getAllParticipantsOnWhiteList: async function (params = {}) {
        const {sessionEmail} = params;
        const participant = await blockchain.getUserByEmail(sessionEmail);
        return Promise.resolve(participant.data.whiteList || []);
    },
    getParticipantByEmail: async function (params = {}) {
        const result = await blockchain.getUserByEmail(params);
        return result.data || result;
    },
    createAdmin: async (params) => {
        try {
            const result = await blockchain.insertUser(participantTemplate(params));
            return Promise.resolve(result.data || result);
        }catch(e) {
            Promise.reject({
                msg: 'Admin ja criado'
            })
        }
    },
    insertParticipant: async function (params = {}) {
        const {sessionEmail, body} = params;
        console.log(sessionEmail, body)
        if(!body.name || !body.email){
            return Promise.reject({
                msg: 'Missing name or email'
            })
        }
        try {
            await blockchain.userExists(body.email);
            console.log('user already exists')
        }catch (e) {
            console.log('creating a user already exists')
            await blockchain.insertUser(participantTemplate(body)); // TODO REVISAR
            // submeter email automatico
        }
        try {
            const data = {
                owner: sessionEmail,
                allowedUser: body.email 
            }
            const result = await blockchain.registerUserOnWhiteList(data);
            return Promise.resolve(result.data || result);

        } catch(e) {
            return Promise.reject({
                msg: 'Usuário já se encontra na sua lista'
            })
        }

    },
    updateParticipant: async function (params, newValues) {
        const participant = await hyperiotDB.updateParticipant(params, newValues);
        return participant;
    },
    deleteParticipant: async function (params) {
        // transaction
        const data = {
            owner: params.sessionEmail,
            allowedUser: params.params.id
        }
        try{
            const result = await blockchain.removeUserFromWhiteList(data);
            return Promise.resolve(result.data || result);
        }catch(e) {
            console.log(e);
            return Promise.reject({
                msg: 'Erro na transação'
            })
        }
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

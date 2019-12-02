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
            await blockchain.insertUser(participantTemplate(body));
            // submeter email automatico
        }
        try {
            const data = {
                owner: sessionEmail,
                allowedUser: body.email 
            }
            console.log('submit transaction');
            const result = await blockchain.registerUserOnWhiteList(data);
            console.log(result);
            return Promise.resolve(result.data || result);

        } catch(e) {
            console.log('erro ao criar usuario', e); //melhorar a obtencao da mensagem de error dos peers
            return Promise.reject({
                msg: 'Erro ao criar usuario'
            })
        }

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

const hyperiotDB = require('../config/mongo');

const participantTemplate = (obj) => {
    return Object.assign({}, {
        name: obj.name,
        email: obj.email,
        assets: obj.assets || []
    })
}

const participantsModel = {
    getAllParticipants: async function (params = {}) {
        const participants = await hyperiotDB.getAllParticipants(params);
        return participants;
    },
    getParticipantById: async function (params = {}) {
        const participants = await hyperiotDB.getAllParticipants(params);
        return participants;
    },
    getParticipantByEmail: async function (params = {}) {
        const participants = await hyperiotDB.getAllParticipants({email: params});
        return participants;
    },
    insertParticipant: async function (params = {}) {
        //validate
        if(!params.name || !params.email){
            return Promise.reject({
                msg: 'Missing name or email'
            })
        }
        const emailAlreadyInUse = await hyperiotDB.getAllParticipants({
            email: params.email
        })
        if(emailAlreadyInUse &&  emailAlreadyInUse.length) {
            return Promise.reject({
                msg: 'Email already registered'
            })
        }
        //insert
        const participant = await hyperiotDB.insertParticipant(participantTemplate(params));
        return participant;
    },
    updateParticipant: async function (params, newValues) {
        const participant = await hyperiotDB.updateParticipant(params, newValues);
        return participant;
    },
    deleteParticipant: async function (params) {
        const participant = await hyperiotDB.deleteParticipant(params);
        return participant;
    }
}

module.exports = participantsModel;

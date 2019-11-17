const hyperiotDB = require('../config/mongo');

const participantsModel = {
    getAllParticipants: async function (params = {}) {
        const participants = await hyperiotDB.getAllParticipants(params);
        return participants;
    },
    getParticipantById: async function (params = {}) {
        const participants = await hyperiotDB.getAllParticipants(params);
        return participants;
    },
    insertParticipant: async function (params = {}) {
        //validate

        //insert
        const participant = await hyperiotDB.insertParticipant(params);
        return participant;
    },
    deleteParticipant: async function (params) {
        const participant = await hyperiotDB.deleteParticipant(params);
        return participant;
    }
}

module.exports = participantsModel;

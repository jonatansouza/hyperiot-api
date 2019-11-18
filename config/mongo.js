'use strict'

const ENV = require('./env');
const MongoDb = require('mongodb')  ;

const MongoDao = function () {
    var options = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    };
    return new Promise((resolve, reject) => {
        MongoDb.MongoClient(ENV.MONGO_URL, options)
            .connect(function (err, client) {
                if (err) {
                    console.log('err ==> ', err)
                    return reject(err);
                }
                console.log("mongo client successfully connected \n");
                return resolve(client);
                
            });
    });
}

const HyperiotDB = {
    getAllParticipants: async function (params = {}) {
        const conn = await MongoDao();
        const dbo = conn.db(ENV.MONGO_DBNAME)
        return new Promise((resolve, reject) => {
            dbo.collection('participants').find(params).toArray()
                .then(docs => {
                    conn.close(); 
                    return resolve(docs);
                }).catch(err => {
                    console.log(err);
                    return reject(err);
                });
        })
    },
    insertParticipant: async function (params) {
        const conn = await MongoDao();
        const dbo = conn.db(ENV.MONGO_DBNAME)
        return new Promise((resolve, reject) => {
            dbo.collection('participants').insert(params)
                .then(docs => {
                    conn.close();
                    return resolve(docs);
                }).catch(err => {
                    console.log(err);
                    return reject(err);
                })
        })
    },
    updateParticipant: async function (params, update) {
        const conn = await MongoDao();
        const dbo = conn.db(ENV.MONGO_DBNAME)
        const newValues = { $set: update}
        return new Promise((resolve, reject) => {
            dbo.collection('participants').updateOne(params, newValues)
                .then(docs => {
                    conn.close();
                    return resolve(docs);
                }).catch(err => {
                    console.log(err);
                    return reject(err);
                })
        })
    },
    deleteParticipant: async function (params) {
        const conn = await MongoDao();
        const dbo = conn.db(ENV.MONGO_DBNAME)
        return new Promise((resolve, reject) => {
            dbo.collection('participants').deleteOne(params)
                .then(docs => {
                    conn.close();
                    return resolve(docs);
                }).catch(err => {
                    console.log(err);
                    return reject(err);
                })
        })
    },

    // ASSETS
    insertAssets: async function (params) {
        const conn = await MongoDao();
        const dbo = conn.db(ENV.MONGO_DBNAME)
        return new Promise((resolve, reject) => {
            dbo.collection('assets').insert(params)
                .then(docs => {
                    conn.close();
                    return resolve(docs);
                }).catch(err => {
                    console.log(err);
                    return reject(err);
                })
        })
    },
    getAllAssets: async function (params) {
        const conn = await MongoDao();
        const dbo = conn.db(ENV.MONGO_DBNAME)
        return new Promise((resolve, reject) => {
            dbo.collection('assets').find(params).toArray()
                .then(docs => {
                    conn.close(); 
                    return resolve(docs);
                }).catch(err => {
                    console.log(err);
                    return reject(err);
                });
        })
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

module.exports = HyperiotDB;

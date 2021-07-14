"use strict";

const ENV = require("./env");
const { MongoClient } = require("mongodb");

const MongoDao = async () => new Promise(async resolve => {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    const client = new MongoClient(ENV.MONGO_URL, options);
    await client.connect();
    resolve(client.db(ENV.MONGO_DBNAME));
});

module.exports = MongoDao;

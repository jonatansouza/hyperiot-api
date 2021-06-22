const axios = require('axios');
const defaultOptions = {
    headers: {
        Accept: 'application/json'
    }
}

operations = {
    get: (url) => {
        return axios.get(url, defaultOptions);
    },
    head: (url) => {
        return axios.head(url, defaultOptions);
    },
    post: (url, data) => {
        return axios.post(url, data, defaultOptions)
    },
    head: (url) => {
        return axios.head(url, defaultOptions);
    },
    delete: (url) => {
        return axios.delete(url, defaultOptions);
    },
    put: (url, data) => {
        return axios.put(url, data, defaultOptions);
    }
}

module.exports = operations;

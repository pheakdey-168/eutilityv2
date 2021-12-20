const axios = require('axios');
const instance = axios.create();
const apiUrl = require('@/apiUrl.js');
const urlPath = apiUrl.account_types;

// GET LIST
module.exports.getAll = async () => {
    try {
        const response = await instance.get(urlPath);
        
        return response;
    } catch (error) {
        window.console.error(error);
    }
}

// SAVE
module.exports.save = async (data) => {
    try {
        const response = await instance.post(urlPath, data);

        return response;
    } catch (error) {
        window.console.error(error);
    }
}
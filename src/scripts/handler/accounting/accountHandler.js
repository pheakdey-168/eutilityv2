const axios = require('axios');
const apiUrl = require('@/apiUrl.js');

// GET BY ID
module.exports.getOne = async (id) => {
    try {
        const response = await axios.get(apiUrl.accounts + `/${id}`);
        
        return response
    } catch (error) {
        window.console.error(error);
    }
}

// GET ALL
module.exports.getAll = async () => {
    try {
        const response = await axios.get(apiUrl.accounts, {
            params: {
                reqeust_acc_balance: false,
                start_date: '0',
                end_date: '0',
            }
        });
        
        return response;
    } catch (error) {
        window.console.error(error);
    }
}

// GET ACCOUNT BY ACCOUNT TYPE
module.exports.getByAccountType = async (typeNumber) => {
    try {
        const response = await axios.get(apiUrl.account_types + `/${typeNumber}/accounts`);
        
        return response;
    } catch (error) {
        window.console.error(error);
    }
}

// SAVE
module.exports.save = async (data) => {
    try {
        const response = await axios.post(apiUrl.accounts, data);

        return response;
    } catch (error) {
        window.console.error(error);
    }
}
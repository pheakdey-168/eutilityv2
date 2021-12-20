const axios = require('axios');
const apiUrl = require('@/apiUrl.js');
const store = require("@/store/accounting.js");

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
module.exports.getAll = async (isRefresh = false) => {
    try {
        /* Refresh */
        if(isRefresh){
            store.default.state.accounts = [];
        }

        if(store.default.state.accounts.length === 0){
            const response = await axios.get(apiUrl.accounts, {
                params: {
                    reqeust_acc_balance: false,
                    start_date: '0',
                    end_date: '0',
                }
            })
            
            store.default.commit("setAccounts", response.data);
        }
        
        return store.default.state.accounts;
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
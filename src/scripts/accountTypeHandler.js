const axios 	= require('axios');
const apiUrl 	= require('@/apiUrl.js');
const store		= require("@/institute.js");

// GET LIST
module.exports.getAll = async function () {
    try {
        if(store.default.state.accountTypes.length === 0){
            const response = await axios.get(apiUrl.account_types);

            store.default.commit("setAccountTypes", response.data);
        }
        
        return store.default.state.accountTypes;
    } catch (error) {
        window.console.error(error);
    }
}

// SAVE
module.exports.save = async (data) => {
    try {
        const response = await axios.post(apiUrl.account_types, data);

        return response;
    } catch (error) {
        window.console.error(error);
    }
}
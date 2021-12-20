const axios 	= require('axios');
const apiUrl 	= require('../apiUrl.js');
const store		= require("@/institute.js");

// GET ACCOUNT GROUP BY ACCOUNT TYPE NUMBER
module.exports.getByAccountType = async (typeNumber) => {
    try {
        const response = await axios.get(apiUrl.account_types + `/${typeNumber}/groups`);

        return response;
    } catch (error) {
        window.console.error(error);
    }
}

// GET LIST
module.exports.getAll = async () => {
    try {
        if(store.default.state.accountGroups.length === 0){
            const response = await axios.get(apiUrl.account_groups);

            store.default.commit("setAccountGroups", response.data);
        }
        
        return store.default.state.accountGroups;
    } catch (error) {
        window.console.error(error);
    }
}
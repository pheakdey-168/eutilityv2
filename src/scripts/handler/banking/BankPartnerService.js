const apiUrl = require('@/apiUrl.js');
const axios = require('axios');
const store = require("@/institute.js");
const instituteId = store.default.state.cookies.instituteId;
const urlPath = apiUrl.partner_services;

// GET ALL
module.exports.getAll = async () => {
    try {
        if(store.default.state.bankPartners.length === 0){
            const response = await axios.get(urlPath + '/banks');
            
            store.default.commit("setBankPartners", response.data);
        }
        
        return store.default.state.bankPartners;
    } catch (error) {
        window.console.error(error);
    }
}
// GET BY INSITUTE
module.exports.getByInstitute = async (id) => {
    try {
        const response = await axios.get(urlPath + `/institutes/${id}/banks`);
        
        return response;
    } catch (error) {
        window.console.error(error);
    }
}

// CONNECT
module.exports.connect = async (bankId, data) => {
    try {
        const response = await axios.post(urlPath + `/institutes/${instituteId}/banks/${bankId}`, data);
        
        return response;
    } catch (error) {
        window.console.error(error);
    }
}
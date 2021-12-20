const axios = require('axios');
const apiUrl = require('@/apiUrl.js');
const urlPath = apiUrl.reconcile_rule;

// GET LIST
module.exports.getAll = async () => {
    try {
        const response = await axios.get(urlPath + "/rules");
        
        return response;
    } catch (error) {
        window.console.error(error);
    }
}

// SAVE
module.exports.save = async (data) => {
    try {
        let response = null;
        if(data.pk === ""){
            response = await axios.post(urlPath + "/rules", data);
        }else{
            response = await axios.put(urlPath + "/rules", data);
        }

        return response;
    } catch (error) {
        window.console.error(error);
    }
}

// DELETE
module.exports.delete = async (data) => {
    try {
        const response = await axios.delete(urlPath + "/rules", data);

        return response;
    } catch (error) {
        window.console.error(error);
    }
}

// GET REPORT
module.exports.getReport = async (params) => {
    try {
        const response = await axios.get(urlPath + "/rulereports", params);
        
        return response;
    } catch (error) {
        window.console.error(error);
    }
}

// SAVE REPORT
module.exports.saveReport = async (data) => {
    try {
        const response = await axios.post(urlPath + "/rulereports", data);

        return response;
    } catch (error) {
        window.console.error(error);
    }
}

// DELETE REPORT
module.exports.deleteReport = async (data) => {
    try {
        const response = await axios.delete(urlPath + "/rulereports", data);

        return response;
    } catch (error) {
        window.console.error(error);
    }
}
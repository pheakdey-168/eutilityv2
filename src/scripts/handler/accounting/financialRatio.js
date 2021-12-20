const axios = require('axios');
const apiUrl = require('@/apiUrl.js');
const urlPath = apiUrl.accounting_report + '/reports/ratio';

// GET
module.exports.getReport = async (params) => {
    try {
        const response = await axios.get(urlPath, params);

        return response;
    } catch (error) {
        window.console.error(error);
    }
}
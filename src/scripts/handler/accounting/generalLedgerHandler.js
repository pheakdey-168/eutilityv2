const axios 	= require('axios');
const apiUrl 	= require('@/apiUrl.js');

// GET
module.exports.getGeneralLedgerReport = async (params) => {
    try {
        const response = await axios.get(apiUrl.general_ledger_get, params);

        return response;
    } catch (error) {
        window.console.error(error);
    }
}
/* Statement Of Financial Position */
const axios 	= require('axios')
const apiUrl 	= require('@/apiUrl.js')

// GET BALANCE SHEET
module.exports.getBalanceSheet = async (params) => {
    try {
        const response = await axios.get(apiUrl.balance_sheet_get, params);

        return response;
    } catch (error) {
        window.console.error(error);
    }
}
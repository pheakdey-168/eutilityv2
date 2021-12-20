const axios = require('axios');
const apiUrl = require('@/apiUrl.js');

// GET CLEARING TRANSACTION BY CASH ADVANCE UUID
module.exports.getByCashAdvanceId = async (id) => {
    try {
        const response = await axios.get(apiUrl.working_capital + `/cashadvances/${id}/clearingtransactions`);

        return response;
    } catch (error) {
        window.console.error(error);
    }
}

// GET CLEARING TRANSACTION BY EMPLOYEE UUID
module.exports.getByEmployeeId = async (id) => {
    try {
        const response = await axios.get(apiUrl.working_capital + `/reimbustments/employee/${id}/clearingtransactions`);

        return response;
    } catch (error) {
        window.console.error(error);
    }
}
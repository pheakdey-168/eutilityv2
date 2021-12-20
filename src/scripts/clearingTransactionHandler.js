const axios 	= require('axios')
const apiUrl 	= require('@/apiUrl.js')

// GET CLEARING TRANSACTION BY CASH ADVANCE UUID
module.exports.getByCashAdvanceId = async (id) => {
    try {
        const response = await axios.get(apiUrl.cash_advances_clearing_transactions + `/${id}/clearingtransactions`)

        return response
    } catch (error) {
        window.console.error(error)
    }
}

// GET CLEARING TRANSACTION BY EMPLOYEE UUID
module.exports.getByEmployeeId = async (id) => {
    try {
        const response = await axios.get(apiUrl.reimburstments_clearing_transactions + `/${id}/clearingtransactions`)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
const axios 	= require('axios')
const apiUrl 	= require('@/apiUrl.js')

// GET BY BANK ACCOUNT UUID
module.exports.getByBankAccountId = async (id) => {
    try {
        const response = await axios.get(apiUrl.bank_accounts + `/${id}/statements`)
        
        return response
    } catch (error) {
        window.console.error(error)
    }
}

// SAVE
module.exports.save = async (data) => {
    try {
        const response = await axios.post(apiUrl.bank_accounts + '/statements', data)
        
        return response
    } catch (error) {
        window.console.error(error)
    }
}
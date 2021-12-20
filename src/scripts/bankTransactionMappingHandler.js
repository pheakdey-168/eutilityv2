const axios 	= require('axios')
const apiUrl 	= require('@/apiUrl.js')
const store		= require("@/institute.js")

// GET BY ID
module.exports.getByBankAccountId = async (id) => {
    try {
        const response = await axios.get(apiUrl.banking + `/banking/${id}/mapping`)
        
        return response
    } catch (error) {
        window.console.error(error)
    }
}

// GET RULE LIST
module.exports.getAll = async (resend=false) => {
    try {
        if(store.default.state.bankTransactionRules.length === 0 || resend){
            const response = await axios.get(apiUrl.banking + '/banking/rules')
            
            store.default.commit("setBankTransactionRules", response.data)
        }
        
        return store.default.state.bankTransactionRules
    } catch (error) {
        window.console.error(error)
    }
}

// SAVE
module.exports.save = async (data) => {
    try {
        const response = await axios.post(apiUrl.banking + '/rules', data)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
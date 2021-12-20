const axios 	= require('axios')
const apiUrl 	= require('@/apiUrl.js')
const store	= require("@/institute.js")

// GET BY ID
module.exports.getOne = async (id) => {
    try {
        const response = await axios.get(apiUrl.bank_accounts + `/${id}`)
        
        return response
    } catch (error) {
        window.console.error(error)
    }
}

// GET LIST
module.exports.getAll = async () => {
    try {
        if(store.default.state.bankAccounts.length === 0){
            const response = await axios.get(apiUrl.bank_accounts)
            
            store.default.commit("setBankAccounts", response.data)
        }
        
        return store.default.state.bankAccounts
    } catch (error) {
        window.console.error(error)
    }
}

// SAVE
module.exports.save = async (data) => {
    try {
        const response = await axios.post(apiUrl.bank_accounts, data)
        
        return response
    } catch (error) {
        window.console.error(error)
    }
}

// GET TYPE LIST
module.exports.getAllTypes = async () => {
    try {
        if(store.default.state.bankAccountTypes.length === 0){
            const response = await axios.get(apiUrl.bank_account_types);
            
            store.default.commit("setBankAccountTypes", response.data);
        }
        
        return store.default.state.bankAccountTypes;
    } catch (error) {
        window.console.error(error);
    }
}
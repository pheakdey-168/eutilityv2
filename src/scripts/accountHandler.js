const axios 	= require('axios')
const apiUrl 	= require('@/apiUrl.js')
const store		= require("@/institute.js")

// GET BY ID
module.exports.getOne = async (id) => {
    try {
        const response = await axios.get(apiUrl.accounts + `/${id}`)
        
        return response
    } catch (error) {
        window.console.error(error)
    }
}

// GET LIST
module.exports.getAll = async () => {
    try {
        if(store.default.state.accounts.length === 0){
            const response = await axios.get(apiUrl.accounts, {
                params: {
                    reqeust_acc_balance: false,
                    start_date: false,
                    end_date: false,
                }
            })
            
            store.default.commit("setAccounts", response.data)
        }
        
        return store.default.state.accounts
    } catch (error) {
        window.console.error(error)
    }
}

// GET ACCOUNT BY ACCOUNT TYPE
module.exports.getByAccountType = async (typeNumber) => {
    try {
        const response = await axios.get(apiUrl.account_types + `/${typeNumber}/accounts`)
        
        return response
    } catch (error) {
        window.console.error(error)
    }
}

// SAVE
module.exports.save = async (data) => {
    try {
        const response = await axios.post(apiUrl.accounts, data)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
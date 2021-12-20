const axios 	= require('axios')
const apiUrl 	= require('@/apiUrl.js')
const store		= require("@/institute.js")

// INITIAL
module.exports.init = async function () {
    try {
        const response = await axios.get(apiUrl.journal_prefix_get)

        store.default.state.prefixes = response.data.data.Items
    } catch (error) {
        window.console.error(error)
    }
}

// GET LIST
module.exports.getAll = async function () {
    try {
        if(store.default.state.prefixes.length === 0){
            const response = await axios.get(apiUrl.setting.prefix_get)

            store.default.commit("setPrefixes", response.data.data)
        }
        
        return store.default.state.prefixes
    } catch (error) {
        window.console.error(error)
    }
}

// get by type
module.exports.get = async function (type) {
    try {
        const response = await axios.get(apiUrl.setting.prefix_function_get + type)

        return response
    } catch (error) {
        window.console.error(error)
    }
}

// save
module.exports.update = async (sk,data) => {
    try {
        const response = await axios.put(apiUrl.prefix_put + sk, data)

        return response
    } catch (error) {
        window.console.error(error)
    }
}

// Update one
module.exports.create = async (data) => {
    try {
        const response = await axios.post(apiUrl.setting.prefix_post, data)

        return response
    } catch (error) {
        window.console.error(error)
    }
}

// GET LAST NUMBER
module.exports.lastNumber = async (prefix, journalDate, shortenPrefix) => {
    try {
        const response = await axios.get(apiUrl.accounting_transaction_last_number, {
            params : {
                prefix          : prefix,
                shorten_prefix  : shortenPrefix,
                journal_date    : journalDate
            }
        })
        
        return response;
    } catch (error) {
        window.console.error(error);
    }
}
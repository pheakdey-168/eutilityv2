const axios 	= require('axios')
const apiUrl 	= require('@/apiUrl.js') 

// GET BY ID
module.exports.getOne = async (id) => {
    try {
        const response = await axios.get(apiUrl.reconciles + `/${id}`)
        
        return response
    } catch (error) {
        window.console.error(error)
    }
}

// GET LIST
module.exports.getAll = async () => {
    try {
        const response = await axios.get(apiUrl.reconciles)
        
        return response
    } catch (error) {
        window.console.error(error)
    }
}

// SAVE
module.exports.save = async (data) => {
    try {
        const response = await axios.post(apiUrl.reconciles, data)
        
        return response
    } catch (error) {
        window.console.error(error)
    }
}

// GET BANK FEED
// function getBankTransaction() {
//     return axios.get(apiUrl.bank_feeds)
// }
   
// function getBanhjiTransaction(id, params) {
//     return axios.get(apiUrl.accounts + `/${id}/entries`, params)
// }
module.exports.getBankFeed = async (id, params) => {
    try {
        // Promise.all([
        //     getBankTransaction(),
        //     getBanhjiTransaction(id, params)
        // ])
        // .then(function (results) {
        //     // const acct = results[0]
        //     // const perm = results[1]
        //     window.console.log(results)
        //     return results
        // })
        let bankResponse = await axios.get(apiUrl.bank_feeds)
        let bankRuleResponse = await axios.get(apiUrl.banking + '/rules')
        let banhjiResponse = await axios.get(apiUrl.accounts + `/${id}/entries`, params)

        return {
            bankTxns    : bankResponse.data,
            bankRules   : bankRuleResponse.data,
            banhjiTxns  : banhjiResponse.data,
        }
    } catch (error) {
        window.console.error(error)
    }
}
const axios = require('axios')
const apiUrl = require('../apiUrl.js')

// List Connected Bank
module.exports.list = async function (strFilter = '') {
    try {
        const response = await axios.get(apiUrl.bank.bank_connected_list + strFilter)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
// List Connected Bank
module.exports.bankAccountByBankIdURL = function (strFilter = '') {
    try {
        return apiUrl.bank.bank_connected_list + strFilter
    } catch (error) {
        window.console.error(error)
    }
}

// List
module.exports.gets = async function () {
    try {
        const response = await axios.get(apiUrl.bank.bank_connected_get)

        return response
    } catch (error) {
        window.console.error(error)
    }
}

// List Connected Bank Account By Bank Id
module.exports.connectedBankAccount = async function (data) {
    try {
        const response = await axios.post(apiUrl.bank.connected_bank_account_post, data)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
// save
module.exports.create = async (data) => {
    try {
        const response = await axios.post(apiUrl.bank.bank_connected_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
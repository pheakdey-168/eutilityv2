const axios = require('axios')
const apiUrl = require('../apiUrl.js')

// List
module.exports.list = async function () {
    try {
        const response = await axios.get(apiUrl.transaction.sale_quote_get)

        return response
    } catch (error) {
        window.console.error(error)
    }
}

// view
module.exports.view = async function (id) {
    try {
        const response = await axios.get(apiUrl.transaction.transaction_get + '/' + id)

        return response
    } catch (error) {
        window.console.error(error, 'here')
    }
}


// save
module.exports.create = async (data) => {
    try {
        const response = await axios.post(apiUrl.transaction.transaction_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}

// History List
module.exports.history = async function (id) {
    try {
        const response = await axios.get(apiUrl.transaction.transaction_history + '/' + id)

        return response
    } catch (error) {
        window.console.error(error)
    }
}

//search
module.exports.search = async (data) => {
    try {
        const response = await axios.post(apiUrl.transaction.transaction_search, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}

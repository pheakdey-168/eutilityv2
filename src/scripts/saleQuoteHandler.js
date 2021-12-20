const axios = require('axios')
const apiUrl = require('../apiUrl.js')

// List
module.exports.list = async function () {
    try {
        const response = await axios.get(apiUrl.saleQuote.sale_quote_get)

        return response
    } catch (error) {
        window.console.error(error)
    }
}

// view
module.exports.view = async function (id) {
    try {
        const response = await axios.get(apiUrl.saleQuote.sale_quote_get + '/' + id)

        return response
    } catch (error) {
        window.console.error(error, 'here')
    }
}


// save
module.exports.create = async (data) => {
    try {
        const response = await axios.post(apiUrl.saleQuote.sale_quote_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}

// History List
module.exports.history = async function (id) {
    try {
        const response = await axios.get(apiUrl.saleQuote.sale_quote_history + '/' + id)

        return response
    } catch (error) {
        window.console.error(error)
    }
}

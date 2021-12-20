const axios = require('axios')
const apiUrl = require('../apiUrl.js')

// List
module.exports.list = async function () {
    try {
        const response = await axios.get(apiUrl.customer.lead_get)

        return response
    } catch (error) {
        window.console.error(error)
    }
}

// view
module.exports.view = async function (id) {
    try {
        const response = await axios.get(apiUrl.customer.lead_getOne + '/' + id)

        return response
    } catch (error) {
        window.console.error(error, 'here')
    }
}


// save
module.exports.create = async (data) => {
    try {
        const response = await axios.post(apiUrl.customer.lead_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}

const axios = require('axios')
const apiUrl = require('../apiUrl.js')

// List
module.exports.get = async function () {
    try {
        const response = await axios.get(apiUrl.product.catalog_get)

        return response.data.data
    } catch (error) {
        window.console.error(error)
    }
}
// Single catalog
module.exports.getOne = async function (id) {
    try {
        const response = await axios.get(apiUrl.product.catalog_get + '/' + id)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
// save
module.exports.create = async (data) => {
    try {
        const response = await axios.post(apiUrl.product.catalog_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
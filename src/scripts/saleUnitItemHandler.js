const axios = require('axios')
const apiUrl = require('../apiUrl.js')

// List
module.exports.list = async function () {
    try {
        const response = await axios.get(apiUrl.item.saleUnit_item_get)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
// save
module.exports.create = async (data) => {
    try {
        const response = await axios.post(apiUrl.item.saleUnit_item_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
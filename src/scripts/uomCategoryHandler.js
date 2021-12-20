const axios = require('axios')
const apiUrl = require('../apiUrl.js')


// List
module.exports.get = async function () {
    try {
        const response = await axios.get(apiUrl.product.uomcategory_get)

        return response.data.data
    } catch (error) {
        window.console.error(error)
    }
}

// save
module.exports.create = async (data) => {
    try {
        const response = await axios.post(apiUrl.product.uomcategory_post, data)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
// update
module.exports.update = async (id, data) => {
    try {
        const response = await axios.put(apiUrl.product.uomcategory_put + id, data)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
const axios = require('axios')
const apiUrl = require('../apiUrl.js')


// List
module.exports.get = async function () {
    try {
        const response = await axios.get(apiUrl.product.product_get)

        return response.data.data
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.getOne = async function (id) {
    try {
        const response = await axios.get(apiUrl.product.product_get + `/${id}`)

        return response.data.data[0]
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.filter = async function (id, search) {
    try {
        let response = ''
        if (search === '' || search === null || search === undefined) {
            response = await axios.get(apiUrl.product.product_filter + `${id}`)
        } else {
            response = await axios.get(apiUrl.product.product_filter + `${id}/${search}`)
        }
        return response.data.data
    } catch (error) {
        window.console.error(error)
    }
}

// save
module.exports.create = async (data) => {
    try {
        const response = await axios.post(apiUrl.product.product_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
// update
module.exports.update = async (id, data) => {
    try {

        const response = await axios.put(apiUrl.product.product_put + id, data)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
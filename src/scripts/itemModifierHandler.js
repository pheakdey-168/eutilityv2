const axios = require('axios')
const apiUrl = require('../apiUrl.js')

// List
module.exports.list = async function () {
    try {
        const response = await axios.get(apiUrl.item.itemModifier_list)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
// List
module.exports.searchURL = function (id) {
    try {
        // const response = await axios.get(apiUrl.product.itemModifier_search + id)

        return apiUrl.item.itemModifier_search + id + '/search'
    } catch (error) {
        window.console.error(error)
    }
}
// save
module.exports.create = async (data) => {
    try {
        const response = await axios.post(apiUrl.item.itemModifier_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}

// get One
module.exports.get = async function (id) {
    try {
        const response = await axios.get(apiUrl.item.itemModifier_list + '/' + id)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
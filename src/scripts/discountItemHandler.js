const axios = require('axios')
const apiUrl = require('../apiUrl.js')
const store = require("@/institute.js")

// List
module.exports.list = async function (strFilter = '') {
    try {
        const response = await axios.get(apiUrl.item.discount_item_get + strFilter)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
// GET LIST BY DAWINE
module.exports.getAll = async () => {
    try {
        if (store.default.state.discountItems.length === 0) {
            const response = await axios.get(apiUrl.item.discount_item_get)

            store.default.commit("setDiscountItems", response.data.data)
        }

        return store.default.state.discountItems
    } catch (error) {
        window.console.error(error)
    }
}

// URL
module.exports.getURL = function (strFilter = '') {
    try {
        // const response = apiUrl.product.discount_item_get

        return apiUrl.item.discount_item_get + strFilter
    } catch (error) {
        window.console.error(error)
    }
}
// save
module.exports.create = async (data) => {
    try {
        const response = await axios.post(apiUrl.item.discount_item_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
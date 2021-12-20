const axios = require('axios')
const apiUrl = require('../apiUrl.js')

// Category search
module.exports.searchURL = function () {
    try {
        return apiUrl.item.product_variant_list
        // return apiUrl.product.item_search
    } catch (error) {
        window.console.error(error)
    }
}

// Category search
module.exports.itemSearchURL = function () {
    try {
        // return apiUrl.product.product_variant_list
        return apiUrl.item.item_search
    } catch (error) {
        window.console.error(error)
    }
}
// Category URL
module.exports.url = function (id) {
    try {
        return apiUrl.item.product_variant_category + id
    } catch (error) {
        window.console.error(error)
    }
}

// List by Category
module.exports.category = async function (id) {
    try {
        const response = await axios.get(apiUrl.item.product_variant_category + id)

        return response
    } catch (error) {
        window.console.error(error)
    }
}

// List for catalog search
module.exports.list = async function () {
    try {
        const response = await axios.get(apiUrl.item.product_variant_list)

        return response.data.data
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.getOne = async function (product_id, id) {
    try {
        const response = await axios.get(apiUrl.item.product_variant_get + `${product_id}/list/${id}`)

        return response.data.data[0]
    } catch (error) {
        window.console.error(error)
    }
}
// Images upload
module.exports.upload = async function (data) {
    try {
        const response = await axios.post(apiUrl.item.upload, data)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
// module.exports.filter = async function (id, search) {
//     try {
//         let response = ''
//         if (search === '' || search === null || search === undefined) {
//             response = await axios.get(apiUrl.product.product_filter + `${id}`)
//         } else {
//             response = await axios.get(apiUrl.product.product_filter + `${id}/${search}`)
//         }
//         return response.data.data
//     } catch (error) {
//         window.console.error(error)
//     }
// }
//
// save
module.exports.create = async (data) => {
    try {
        const response = await axios.post(apiUrl.item.product_variant_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
// // update
// module.exports.update = async (id, data) => {
//     try {
//
//         const response = await axios.put(apiUrl.product.product_put + id, data)
//
//         return response
//     } catch (error) {
//         window.console.error(error)
//     }
// }

// Filter Item by Price level and UOM
module.exports.itemByPriceLevel = async function (strFilter) {
    try {
        const response = await axios.get(apiUrl.price_promotion.item_byPriceLevel + strFilter)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
// item set price
module.exports.itemSetPrice = async (data) => {
    try {
        const response = await axios.post(apiUrl.price_promotion.item_setPrice_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
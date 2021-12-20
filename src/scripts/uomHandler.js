const axios = require('axios')
const apiUrl = require('../apiUrl.js')
const store = require("@/institute.js")

// List
module.exports.get = async function () {
    try {
        const response = await axios.get(apiUrl.product.uom_get)

        return response.data.data
    } catch (error) {
        window.console.error(error)
    }
}
// GET LIST BY DAWINE
module.exports.getAll = async () => {
    try {
        if (store.default.state.unitOfMeasurements.length === 0) {
            const response = await axios.get(apiUrl.product.uom_get);

            store.default.commit("setUnitOfMeasurements", response.data.data);
        }

        return store.default.state.unitOfMeasurements;
    } catch (error) {
        window.console.error(error);
    }
}

// save
module.exports.create = async (data) => {
    try {
        const response = await axios.post(apiUrl.product.uom_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
// update
module.exports.update = async (id, data) => {
    try {
        const response = await axios.put(apiUrl.product.uom_put + id, data)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
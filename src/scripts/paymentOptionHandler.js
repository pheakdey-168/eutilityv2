const axios = require('axios');
const apiUrl = require('../apiUrl.js');
const store = require("@/institute.js")

// save
module.exports.create = async (data) => {
    try {
        const response = await axios.post(apiUrl.setting.payment_option_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}

// GET LIST BY DAWINE
module.exports.getAll = async () => {
    try {
        if (store.default.state.paymentOptions.length === 0) {
            const response = await axios.get(apiUrl.setting.payment_option_get);

            store.default.commit("setPaymentOptions", response.data.data);
        }

        return store.default.state.paymentOptions;
    } catch (error) {
        window.console.error(error);
    }
}

// Get List
module.exports.list = async function (strFilter = '') {
    try {
        const response = await axios.get(apiUrl.setting.payment_option_get + strFilter)

        return response
    } catch (error) {
        window.console.error(error)
    }
}


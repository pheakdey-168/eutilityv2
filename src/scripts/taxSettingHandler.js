const axios = require('axios')
// const code = require("@/scripts/config/code");
// const apiUrl = require('@/apiUrl')
const store = require('@/store/taxSetting')
// SAVE

module.exports.get = async function (apiUrl, state, put) {
    let stores
    if (state === "typeTax") {
        stores = store.default.state.typeTax.length
    }else if (state === "listTax") {
        stores = store.default.state.listTax.length
    }else if (state === "taxPayer") {
        stores = store.default.state.taxPayer.length
    }else if (state === "natureTaxPayer") {
        stores = store.default.state.natureTaxPayer.length
    }else if (state === "taxCustomerSupplier") {
        stores = store.default.state.supplierCustomerTax.length
    }
    try {
        if(stores === 0){
            await axios.get(apiUrl).then(res => {
                if (res.data.statusCode === 200) {
                    store.default.commit(put, res.data.data)
                    window.console.log(res.data.data)
                    return res.data.data
                }
            })
        }
    } catch (error) {
        window.console.error(error)
    }
}
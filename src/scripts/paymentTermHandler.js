const axios 	= require('axios')
const apiUrl 	= require('@/apiUrl.js')
const store		= require("@/institute.js")

// GET LIST
module.exports.getAll = async () => {
    try {
        if(store.default.state.paymentTerms.length === 0){
            const response = await axios.get(apiUrl.setting.payment_setting_get)
            
            store.default.commit("setPaymentTerms", response.data.data)
        }

        return store.default.state.paymentTerms
    } catch (error) {
        window.console.error(error)
    }
}
const apiUrl 	= require('@/apiUrl.js') 
const axios 	= require('axios')
const store		= require("@/institute.js")

// GET LIST
module.exports.getAll = async () => {
    try {
        if(store.default.state.taxes.length === 0){
            const response = await axios.get(apiUrl.tax_setting.tax_list_get)
            
            store.default.commit("setTaxes", response.data.data)
        }
        
        return store.default.state.taxes
    } catch (error) {
        window.console.error(error)
    }
}
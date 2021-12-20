const axios 	= require('axios')
const apiUrl 	= require('@/apiUrl.js')
const store		= require("@/institute.js")

// GET LIST
module.exports.getAll = async () => {
    try {
        if(store.default.state.classes.length === 0){
            const response = await axios.get(apiUrl.setting.subclass_get);
            
            store.default.commit("setClasses", response.data.data)
        }
        
        return store.default.state.classes
    } catch (error) {
        window.console.error(error)
    }
}
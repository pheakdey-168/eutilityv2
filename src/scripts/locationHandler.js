const axios = require('axios')
const apiUrl = require('@/apiUrl.js')
const store	= require("@/institute.js")

// GET LIST
module.exports.list = async function () {
    try {
        const response = await axios.get(apiUrl.setting.location_get)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
// GET LIST (BY DAWINE)
module.exports.getAll = async () => {
    try {
        if(store.default.state.locations.length === 0){
            const response = await axios.get(apiUrl.setting.location_get);
            store.default.commit("setLocations", response.data.data);
        }
        
        return store.default.state.locations;
    } catch (error) {
        window.console.error(error)
    }
}

// save
module.exports.create = async (data) => {
    try {
        const response = await axios.post(apiUrl.setting.location_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}

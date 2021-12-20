const axios 	= require('axios')
const apiUrl 	= require('@/apiUrl.js')
const store		= require("@/institute.js")

// GET LIST
module.exports.getAll = async function () {
    try {
        if(store.default.state.segments.length === 0){
            const response = await axios.get(apiUrl.setting.segment_get)

            store.default.commit("setSegments", response.data.data)
        }
        
        return store.default.state.segments
    } catch (error) {
        window.console.error(error)
    }
}
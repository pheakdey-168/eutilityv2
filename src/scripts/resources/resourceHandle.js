
const axios = require('axios')
module.exports.getResource = async (data) => {
    try {
        const response = await axios.get('http://localhost:4000/api/post',data)
        return response.data
    } catch (error) {
        window.console.error(error)
    }
}

module.exports.Search = async (key) => {
    try {
        let key_ ={
            key: key
        }
        const response = await axios.get('http://localhost:4000/api/search',{ params: key_ })
        return response.data
    } catch (error) {
        window.console.error(error)
    }
}
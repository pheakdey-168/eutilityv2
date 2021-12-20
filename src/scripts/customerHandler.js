const axios = require('axios')
const apiUrl = require('../apiUrl.js')
const unknown = require('../api/unknown')

// Gender
module.exports.gender = function () {
    try {
        const gender = unknown.gender
        // const response = await axios.get(unknown.gender)

        return gender
    } catch (error) {
        window.console.error(error)
    }
}
// Search
module.exports.search = function () {
    try {
        const response = apiUrl.customer.customer_search
        return response
    } catch (error) {
        window.console.error(error)
    }
}
// Center
module.exports.center = async function (customerTypeId, customerGroupId, search) {
    try {
        let response = []
        if (search !== '' && search !== null && search !== 'null') {
            response = await axios.get(apiUrl.customer.customer_center + '/' + customerTypeId + '/center/' + customerGroupId + '/' + search)
            return response
        } else {
            response = await axios.get(apiUrl.customer.customer_center + '/' + customerTypeId + '/center/' + customerGroupId)
            return response
        }
    } catch (error) {
        window.console.error(error)
    }
}

// List
module.exports.list = async function () {
    try {
        const response = await axios.get(apiUrl.customer.customer_get)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
// Get One
module.exports.get = async function (id) {
    try {
        const response = await axios.get(apiUrl.customer.customer_getOne + id)

        return response
    } catch (error) {
        window.console.error(error)
    }
}

// save
module.exports.create = async (data) => {
    try {
        const response = await axios.post(apiUrl.customer.customer_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}


// upload
module.exports.upload = async (data) => {
    try {
        const response = await axios.post("https://ck3f4yltlf.execute-api.ap-southeast-1.amazonaws.com/dev/v1/uploads/file/upload", data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
// update
// module.exports.update = async (id, data) => {
//     try {
//         const response = await axios.put(apiUrl.customer.customer_group_put + id, data)
//
//         return response
//     } catch (error) {
//         window.console.error(error)
//     }
// }
module.exports.directory = async function (val) {
    try {
        let response = await axios.get(apiUrl.customer.customer_directory,{
            params:{
                search:     val.search,
                type:       val.type
            }
        })
        return response
    } catch (error) {
        window.console.error(error)
    }
}
const axios = require('axios')
const apiUrl = require('../apiUrl.js')
const store	= require("@/institute.js")

// List
module.exports.list = async function () {
    try {
        const response = await axios.get(apiUrl.customer.project_get)
        return response
    } catch (error) {
        window.console.error(error)
    }
}

// GET LIST (BY DAWINE)
module.exports.getAll = async () => {
    try {
        if(store.default.state.projects.length === 0){
            const response = await axios.get(apiUrl.customer.project_get);
            store.default.commit("setProjects", response.data.data);
        }
        
        return store.default.state.projects;
    } catch (error) {
        window.console.error(error)
    }
}
// GET
module.exports.get = async function (id) {
    try {
        const response = await axios.get(apiUrl.customer.project_get + '/' + id)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
// save
module.exports.create = async (data) => {
    try {
        const response = await axios.post(apiUrl.customer.project_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}

// Get project by customer
module.exports.getByCustomer = async function (id) {
    try {
        const response = await axios.get(apiUrl.customer.project_by_customer_get + id)

        return response
    } catch (error) {
        window.console.error(error)
    }
}

// Get project by supplier
module.exports.getBySupplier = async function (id) {
    try {
        const response = await axios.get(apiUrl.customer.project_by_supplier_get + id)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
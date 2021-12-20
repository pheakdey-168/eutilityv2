const axios = require('axios')
const apiUrl = require('../apiUrl.js')
const store		= require("@/institute.js")

//Search URL
module.exports.searchURL = function () {
    try {
        const response = apiUrl.employee.employee_search
        return response
    } catch (error) {
        window.console.error(error)
    }
}


//Search
module.exports.search = function () {
    try {
        const response = apiUrl.employee.employee_center
        return response
    } catch (error) {
        window.console.error(error)
    }
}
// Center
module.exports.center = async function (search) {
    try {
        let response = []
        if (search !== '' && search !== null && search !== 'null' && search !== undefined) {
            response = await axios.get(apiUrl.employee.employee_center + '/' + search)
            return response
        } else {
            response = await axios.get(apiUrl.employee.employee_center)
            return response
        }
    } catch (error) {
        window.console.error(error)
    }
}
// // List
// module.exports.list = async function () {
//     try {
//         const response = await axios.get(apiUrl.customer.customer_get)
//
//         return response
//     } catch (error) {
//         window.console.error(error)
//     }
// }
// Get One
module.exports.get = async function (id) {
    try {
        const response = await axios.get(apiUrl.employee.employee_getOne + id)

        return response
    } catch (error) {
        window.console.error(error)
    }
}

// save
module.exports.create = async (data) => {
    try {
        const response = await axios.post(apiUrl.employee.employee_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
// GET LIST BY DAWINE
module.exports.getAll = async () => {
    try {
        if(store.default.state.employees.length === 0){
            const response = await axios.get(apiUrl.employee.employee_center)
            
            store.default.commit("setEmployees", response.data.data)
        }
        
        return store.default.state.employees
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.createEmployment = async (data) => {
    try {
        const response = await axios.post(apiUrl.employee.employment_record_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.getEmploymentListByEmployee = async function (id) {
    try {
        const response = await axios.get(apiUrl.employee.record_list_by_employee_get + '/' +  id)
        return response.data.data
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.getRecord = async function (param) {
    try {
        let response = []
        if (param.search !== '' && param.search !== null && param.search !== 'null' && param.search !== undefined) {
            response = await axios.get(apiUrl.employee.record_get +'/' + param.search ,{
                params: {
                    'status': param.status,
                }
            })
            return response
        } else {
            response = await axios.get(apiUrl.employee.record_get,{
                params: {
                    'status': param.status,
                }
            })
            return response
        }
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.getEmploymentByEmployee = async (id) => {
    try {
        const response = await axios.get(apiUrl.employee.record_by_employee_get + `/${id}`)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.createTimesheet = async (data) => {
    try {
        const response = await axios.post(apiUrl.employee.timesheet_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.getTimesheet = async function (id) {
    try {
        const response = await axios.get(apiUrl.employee.timesheet_get+ '/' +  id)
        return response.data
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.getTimesheetSingle = async function (id) {
    try {
        const response = await axios.get(apiUrl.employee.timesheet_single+  '/' +  id)
        return response.data
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.getEmployeeTransactions = async function (employeeUuid) {
    try {
        const response = await axios.get(apiUrl.employee.transactions+  '/' +  employeeUuid)
        return response.data
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.getEmployeeInfo = async function (employeeUuid) {
    try {
        const response = await axios.get(apiUrl.employee.employee_info+  '/' +  employeeUuid)
        return response.data
    } catch (error) {
        window.console.error(error)
    }
}
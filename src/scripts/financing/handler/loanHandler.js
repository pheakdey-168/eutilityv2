const apiUrl 	    = require('@/apiUrl.js')
const axios 	    = require('axios')

module.exports.loanGet = async function (id) {
    try {
        const response = await axios.get(apiUrl.financing.loanGet + '/' + id)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.loanGets = async function () {
    try {
        const response = await axios.get(apiUrl.financing.loanGets)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.loanCreate = async (data) => {
    try {
        // window.console.log(data, 'handler')
        const response = await axios.post(apiUrl.financing.loanCreate, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}

module.exports.loanReceiptCreate = async (data) => {
    try {
        const response = await axios.post(apiUrl.financing.loanReceiptCreate, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.summaryLoanBalance = async function () {
    try {
        const response = await axios.get(apiUrl.financing.summaryLoanBalance)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.loanRepaymentReport = async (strFilter) => {
    try {
        const response = await axios.get(apiUrl.financing.loanRepaymentReport + strFilter)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.loanPaymentCreate = async (data) => {
    try {
        // window.console.log(data, 'handler')
        const response = await axios.post(apiUrl.financing.loanPaymentCreate, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.loanScheduleGet = async function (id) {
    try {
        const response = await axios.get(apiUrl.financing.loanScheduleGet + id)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.getBalanceMonthly = async function () {
    try {
        const response = await axios.get(apiUrl.financing.getBalanceMonthly)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.getRepaymentMonthly = async function () {
    try {
        const response = await axios.get(apiUrl.financing.getRepaymentMonthly)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.getLastNumber = async (data) => {
    try {
        // window.console.log(data, 'handler')
        const response = await axios.post(apiUrl.financing.getLastNumber, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.centerTxnSearch = async (data) => {
    try {
        // window.console.log(data, 'handler')
        const response = await axios.post(apiUrl.financing.centerTxnSearch, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.closeLoanCreate = async (data) => {
    try {
        // window.console.log(data, 'handler')
        const response = await axios.post(apiUrl.financing.closeLoanCreate, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}


const axios = require('axios')
const apiUrl = require('@/apiUrl')

// List
module.exports.byCustomer = async function (id) { // customer id
    try {
        const response = await axios.get(apiUrl.billing.customer_invoice_get + '/' + id + '/list')

        return response
    } catch (error) {
        window.console.error(error)
    }
}

// Customer last balance
module.exports.balance = async function (id) { // customer id
    try {
        const response = await axios.get(apiUrl.billing.customer_invoice_get + '/customer/' + id)
        return response
    } catch (error) {
        window.console.error(error)
    }
}

// List
module.exports.list = async function (strFilter) {
    try {
        let response = []
        if (strFilter !== undefined) {
            response = await axios.get(apiUrl.billing.invoice_get + '/' + strFilter)
        } else {
            response = await axios.get(apiUrl.billing.invoice_get)
        }
        return response
    } catch (error) {
        window.console.error(error)
    }
}
// List
module.exports.wcpReceivableList = async function (strFilter) {
    try {
        let response = []
        if (strFilter !== undefined) {
            response = await axios.get(apiUrl.billing.wcp_receivable_get + '/' + strFilter)
        } else {
            response = await axios.get(apiUrl.billing.wcp_receivable_get)
        }
        return response
    } catch (error) {
        window.console.error(error)
    }
}
// List
module.exports.wcpReceivableAgingList = async function (strFilter) {
    try {
        let response = []
        if (strFilter !== undefined) {
            response = await axios.get(apiUrl.billing.wcp_aging_get + '/' + strFilter)
        } else {
            response = await axios.get(apiUrl.billing.wcp_aging_get)
        }
        return response
    } catch (error) {
        window.console.error(error)
    }
}
// List
module.exports.wcpReceivableOverviewList = async function (strFilter) {
    try {
        let response = []
        if (strFilter !== undefined) {
            response = await axios.get(apiUrl.billing.wcp_overview_get + '/' + strFilter)
        } else {
            response = await axios.get(apiUrl.billing.wcp_overview_get)
        }
        return response
    } catch (error) {
        window.console.error(error)
    }
}
// List
module.exports.wcpReceivableCreditLimitList = async function (strFilter) {
    try {
        let response = []
        if (strFilter !== undefined) {
            response = await axios.get(apiUrl.billing.wcp_creditLimit_get + '/' + strFilter)
        } else {
            response = await axios.get(apiUrl.billing.wcp_creditLimit_get)
        }
        return response
    } catch (error) {
        window.console.error(error)
    }
}

// txn Cash Receipt List
module.exports.txn = async function (strFilter) {
    try {
        let response = []
        if (strFilter !== undefined) {
            response = await axios.get(apiUrl.billing.cash_receipt_get + '/' + strFilter)
        } else {
            response = await axios.get(apiUrl.billing.cash_receipt_get)
        }
        return response
    } catch (error) {
        window.console.error(error)
    }
}
// Cash Receipt View one
module.exports.txnView = async function (id) {
    try {
        return await axios.get(apiUrl.billing.cash_receipt_get + '/' + id)
    } catch (error) {
        window.console.error(error)
    }
}
// History List
module.exports.history = async function (id) {
    try {
        const response = await axios.get(apiUrl.billing.invoice_history + '/' + id)

        return response
    } catch (error) {
        window.console.error(error)
    }
}

// Create Schedule
module.exports.schedule = async (data) => {
    try {
        const response = await axios.post(apiUrl.billing.invoice_schedule, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}

// view
module.exports.view = async function (id) {
    try {
        const response = await axios.get(apiUrl.billing.invoice_get + '/' + id)

        return response
    } catch (error) {
        window.console.error(error)
    }
}


// save
module.exports.create = async (data) => {
    try {
        const response = await axios.post(apiUrl.billing.invoice_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}

// save paymen schedule
module.exports.scheduleList = async (id) => {
    try {
        const response = await axios.get(apiUrl.billing.invoice_schedule + '/' + id)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
// Last Number
module.exports.lastNumber = async (data) => {
    try {
        const response = await axios.post(apiUrl.billing.number_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}

// invoice link view
module.exports.linkView = async function (id) {
    try {
        const response = await axios.get(apiUrl.billing.invoice_link_get + '/' + id)

        return response
    } catch (error) {
        window.console.error(error)
    }
}

// Cash Receipt Search Invoice
module.exports.search = async (data) => {
    try {
        const response = await axios.post(apiUrl.billing.invoice_search_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}

// Receipt create
// save
module.exports.createReceipt = async (data) => {
    try {
        const response = await axios.post(apiUrl.billing.receipt_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
// Deposit create
// save
module.exports.createDeposit = async (data) => {
    try {
        const response = await axios.post(apiUrl.billing.deposit_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}

// Credit Memo
// save
module.exports.createCreditMemo = async (data) => {
    try {
        const response = await axios.post(apiUrl.billing.credit_memo_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
// Credit Memo
// List All By date
// list?id= ' ' get one
module.exports.creditMemoList = async (strFilter) => {
    try {
        const response = await axios.get(apiUrl.billing.credit_memo_get + strFilter)
        return response
    } catch (error) {
        window.console.error(error)
    }
}

// Deposit transaction List
module.exports.depositList = async (strFilter) => {
    try {
        const response = await axios.get(apiUrl.billing.deposit_list + strFilter)
        return response
    } catch (error) {
        window.console.error(error)
    }
}

// List
module.exports.depositBalanceList = async function (strFilter) {
    try {
        let response = []
        if (strFilter !== undefined) {
            response = await axios.get(apiUrl.billing.deposit_balance_list + '/' + strFilter)
        } else {
            response = await axios.get(apiUrl.billing.deposit_balance_list)
        }
        return response
    } catch (error) {
        window.console.error(error)
    }
}
// txn By Item
module.exports.txnItem = async function (itemId) {
    try {
        const response = await axios.get(apiUrl.billing.txn_item_get + itemId + '/list')
        return response
    } catch (error) {
        window.console.error(error)
    }
}

// Supplier Deposit create
// save
module.exports.createPurchaseDeposit = async (data) => {
    try {
        const response = await axios.post(apiUrl.billing.purchase_deposit_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}

// Supplier Deposit List
module.exports.purchaseDepositBalanceList = async function (strFilter) {
    try {
        let response = []
        if (strFilter !== undefined) {
            response = await axios.get(apiUrl.billing.purchase_deposit_balance_list  + strFilter)
        } else {
            response = await axios.get(apiUrl.billing.purchase_deposit_balance_list)
        }
        return response
    } catch (error) {
        window.console.error(error)
    }
}

// Purchase Deposit transaction List
module.exports.purchaseDepositList = async (strFilter) => {
    try {
        const response = await axios.get(apiUrl.billing.purchase_deposit_get + strFilter)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
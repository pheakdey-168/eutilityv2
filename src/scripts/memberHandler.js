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
// // Center
// module.exports.center = async function (customerTypeId, customerGroupId, search) {
//     try {
//         let response = []
//         if (search !== '' && search !== null && search !== 'null') {
//             response = await axios.get(apiUrl.customer.customer_center + '/' + customerTypeId + '/center/' + customerGroupId + '/' + search)
//             return response
//         } else {
//             response = await axios.get(apiUrl.customer.customer_center + '/' + customerTypeId + '/center/' + customerGroupId)
//             return response
//         }
//     } catch (error) {
//         window.console.error(error)
//     }
// }
module.exports.center = async function () {
    try {
        const response = await axios.get(apiUrl.member.member_center_get)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
// List
module.exports.list = async function () {
    try {
        const response = await axios.get(apiUrl.member.member_get)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
// Get One
module.exports.get = async function (id) {
    try {
        const response = await axios.get(apiUrl.member.member_getOne + id)

        return response
    } catch (error) {
        window.console.error(error)
    }
}

// save
module.exports.create = async (data) => {
    try {
        const response = await axios.post(apiUrl.member.member_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}

// Search
module.exports.search = function () {
    try {
        const response = apiUrl.member.member_search
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
// saving account
module.exports.savingAccountGet = async function () {
    try {
        const response = await axios.get(apiUrl.member.saving_account_get)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.savingAccountCenterGet = async function () {
    try {
        const response = await axios.get(apiUrl.member.saving_account_center_get)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.createSavingAccount = async (data) => {
    try {
        const response = await axios.post(apiUrl.member.saving_account_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.getSavingAccountById = async function (id) {
    try {
        const response = await axios.get(apiUrl.member.saving_account_getByMember + id)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.getDepositAccountById = async function (id) {
    try {
        const response = await axios.get(apiUrl.member.saving_deposit_getByAccount + id)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.getInterstByAccId = async function (id) {
    try {
        const response = await axios.get(apiUrl.member.saving_interest_getByAccount + id)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.createSavingDeposit = async (data) => {
    try {
        const response = await axios.post(apiUrl.member.saving_deposit_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.createSavingWithdraw = async (data) => {
    try {
        const response = await axios.post(apiUrl.member.saving_withdraw_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.savingCloseMonth = async (data) => {
    try {
        const response = await axios.post(apiUrl.member.saving_monthof_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.createCloseSaving = async (data) => {
    try {
        const response = await axios.post(apiUrl.member.close_saving_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.getBalanceAccountById = async function (id) {
    try {
        const response = await axios.get(apiUrl.member.saving_balance_getByAccount + id)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
// loan account
module.exports.getOneLoan = async function (id) {
    try {
        const response = await axios.get(apiUrl.member.loan_getOne + id)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.createLoan = async (data) => {
    try {
        const response = await axios.post(apiUrl.member.loan_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
//last number
module.exports.getLastNumber = async (data) => {
    try {
        const response = await axios.post(apiUrl.member.lastnumber, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.getLoanByMemberId = async function (id) {
    try {
        const response = await axios.get(apiUrl.member.loan_getByMember + id)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.createDisbursement = async (data) => {
    try {
        // window.console.log(data, 'handler')
        const response = await axios.post(apiUrl.member.disbursement_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.loanCenterGet = async function () {
    try {
        const response = await axios.get(apiUrl.member.loan_center_get)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.loanApprovGet = async function () {
    try {
        const response = await axios.get(apiUrl.member.loan_approv_get)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
//share
module.exports.createShare = async (data) => {
    try {
        const response = await axios.post(apiUrl.member.share_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.receiptLoan = async (data) => {
    try {
        const response = await axios.post(apiUrl.member.receipt_amount_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.createLoanReceipt = async (data) => {
    try {
        const response = await axios.post(apiUrl.member.receipt_loan_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.getLoanListReport = async (data) => {
    try {
        const response = await axios.post(apiUrl.member.loan_list_report_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.getLoanDisburseReport = async (data) => {
    try {
        const response = await axios.post(apiUrl.member.loan_disburse_report_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.getLoanNextReport = async (data) => {
    try {
        window.console.log(data, 'mem handler')
        const response = await axios.post(apiUrl.member.loan_next_report_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.loanScheduleGet = async function (id) {
    try {
        const response = await axios.get(apiUrl.member.loan_schedule_getByLoan + id)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.getSavingListReport = async (data) => {
    try {
        const response = await axios.post(apiUrl.member.saving_list_report_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.getSavingToCloseReport = async (data) => {
    try {
        const response = await axios.post(apiUrl.member.saving_to_close_report_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.createSavingCloseMonth = async (data) => {
    try {
        const response = await axios.post(apiUrl.member.saving_closemonth_post, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.centerTxnSearch = async (data) => {
    try {
        const response = await axios.post(apiUrl.member.center_txn_search, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.getShareByMemberId = async (data) => {
    try {
        const response = await axios.post(apiUrl.member.shareGetByMember, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.createShareWithdraw = async (data) => {
    try {
        window.console.log(data,'handler')
        const response = await axios.post(apiUrl.member.shareWithdraw, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.listShareReport = async (data) => {
    try {
        const response = await axios.post(apiUrl.member.listShareReport, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.loanPortfolioReport = async (data) => {
    try {
        const response = await axios.post(apiUrl.member.loanPortfolioReport, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.closeLoanPost = async (data) => {
    try {
        const response = await axios.post(apiUrl.member.closeLoanPost, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.getSavingDepositReport = async (data) => {
    try {
        const response = await axios.post(apiUrl.member.savingDepositReport, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.savingStatisticSummaryReport = async (data) => {
    try {
        const response = await axios.post(apiUrl.member.savingStatisticSummaryReport, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.loanStatisticSummaryReport = async (data) => {
    try {
        const response = await axios.post(apiUrl.member.loanStatisticSummaryReport, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.loadLessCustomer = async function () {
    try {
        const response = await axios.get(apiUrl.member.loadLessCustomer)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.loadLessMember = async function () {
    try {
        const response = await axios.get(apiUrl.member.loadLessMember)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.creditBizSummaryReport = async function (year) {
    try {
        const response = await axios.get(apiUrl.member.creditBizSummaryReport + year)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.importMember = async (data) => {
    try {
        const response = await axios.post(apiUrl.member.importMember, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
// module.exports.memberLessSearch = async (data) => {
//     try {
//         const response = await axios.post(apiUrl.member.memberLessSearch, data)
//         return response
//     } catch (error) {
//         window.console.error(error)
//     }
// }
module.exports.memberLessSearch = async function (search) {
    try {
        // window.console.log(s, 'handler')
        const response = await axios.get(apiUrl.member.memberLessSearch + search)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.customerLessSearch = async function (search) {
    try {
        const response = await axios.get(apiUrl.member.customerLessSearch + search)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.memberCountGet = async function () {
    try {
        // window.console.log(s, 'handler')
        const response = await axios.get(apiUrl.member.memberCountGet)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.shareByProductGet = async function (id) {
    try {
        const response = await axios.get(apiUrl.member.shareByProductGet + id)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.calculateAVGShare = async (data) => {
    try {
        const response = await axios.post(apiUrl.member.calculateAVGShare, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.createDividend = async (data) => {
    try {
        const response = await axios.post(apiUrl.member.createDividend, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.dividendGets = async function () {
    try {
        // window.console.log(s, 'handler')
        const response = await axios.get(apiUrl.member.dividendGets)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.memberDividendGet = async function (dividendid) {
    try {
        // window.console.log(s, 'handler')
        const response = await axios.get(apiUrl.member.memberDividendGet + dividendid)

        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.dividendPaymentCreate = async (data) => {
    try {
        const response = await axios.post(apiUrl.member.dividendPaymentCreate, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}
module.exports.loanRescheduleCreate = async (data) => {
    try {
        // window.console.log(data, 'handler')
        const response = await axios.post(apiUrl.member.loanRescheduleCreate, data)
        return response
    } catch (error) {
        window.console.error(error)
    }
}

export default class Member {
    constructor(data = {}) {
        this.id                     = data.id || ''
        this.abbr                   = data.abbr || ''
        this.number                 = data.number || ''
        this.lastNumber             = data.lastNumber || 1
        this.firstName              = data.firstName || ''
        this.lastName               = data.lastName || ''
        this.spouseName             = data.spouseName || ''
        this.fullName               = data.fullName || ''
        this.memberType             = data.memberType || {}
        this.registeredDate         = data.registeredDate || new Date().toISOString().substr(0, 10)
        this.customer               = data.customer || {}
        this.vendor                 = data.vendor || {}
        this.gender                 = data.gender || 1
        this.familyStatus           = data.familyStatus || 1
        this.familyMember           = data.familyMember || 0
        this.phoneNumber            = data.phoneNumber || ''
        this.idNumber               = data.idNumber || ''
        this.dob                    = data.dob || new Date().toISOString().substr(0, 10)
        this.addresses              = data.addresses || []
        this.priceLevel             = data.priceLevel || {}
        this.defaultDiscount        = data.defaultDiscount || {}
        this.paymentTerm            = data.paymentTerm || {}
        this.paymentMethod          = data.paymentMethod || {}
        this.accountReceivable      = data.accountReceivable || {}
        this.accountDeposit         = data.accountDeposit || {}
        this.accountDiscount        = data.accountDiscount || {}
        this.defaultTax             = data.defaultTax || {}
        this.note                   = data.note || ''
        this.status                 = data.status || 1
        this.attachFile             = data.attachFile || {}
        this.memberFee              = data.memberFee || {}
        this.cashAccount            = data.cashAccount || {}
        this.saveOption             = data.saveOption || ''
        this.employee               = data.employee || {}
        this.group                  = data.group || {}
        this.accumulatedSavingInterest = data.accumulatedSavingInterest || 0
        this.approvedLoanAmount     = data.approvedLoanAmount || 0
        this.outstandingLoanBalance = data.outstandingLoanBalance || 0
        this.loanPayment            = data.loanPayment || 0
        this.shareAmount            = data.shareAmount || 0
        this.sharePrice             = data.sharePrice || 0
        this.withdrawShare          = data.withdrawShare || 0
        this.saving                 = data.saving || 0
        this.savingAmount           = data.savingAmount || 0
        this.withdrawAmount         = data.withdrawAmount || 0
        this.loan                   = data.loan || 0
        this.dividendAmount         = data.dividendAmount || 0
        this.withdrawDividend       = data.withdrawDividend || 0
        this.abbrNumber             = data.abbrNumber || ''
        this.lands                  = data.lands || []
        this.machineries            = data.machineries || []
        this.isEdit                 = data.isEdit || false
        this.sortIndex              = data.sortIndex || 1
        this.genderChange           = data.genderChange || false
        this.statusChange           = data.statusChange || false
    }

    constuct(data) {
        this.constructor(data);
    }
}
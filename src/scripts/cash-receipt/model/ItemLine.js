const store = require("@/institute")
const {institute} = store.default.state

export default class ItemLine {
    constructor(data = {}) {
        this.id                 = data.id || '' // invoice number
        this.tick               = data.tick || false
        this.crn                = data.crn || ''
        this.customer           = data.customer || {}
        this.accReceivable      = data.accReceivable || {}
        this.paymentCode        = data.paymentCode || ''
        this.referenceNo        = data.referenceNo || ''
        this.dueDate            = data.dueDate || new Date().toISOString().substr(0, 10)
        this.transactionDate    = data.transactionDate || new Date().toISOString().substr(0, 10)
        this.amount             = data.amount || 0
        this.paidAmount         = data.paidAmount || 0
        this.paidAmountTobase   = data.paidAmountTobase || 0
        this.amountTobePaid     = data.amountTobePaid || 0
        this.paymentOption      = data.paymentOption || {}
        this.bankReferenceNo    = data.bankReferenceNo || ''
        this.paymentTerm        = data.paymentTerm || {}
        this.penalty            = data.penalty || {}
        this.discount           = data.discount || {}
        this.overDue            = data.overDue || 0
        this.deleted            = data.deleted || 0
        this.rate               = data.rate || 1
        this.rateTobase         = data.rateTobase || 1
        this.currency           = data.currency || {}
        this.status             = data.status || 0
        this.type               = data.type || ''
        this.transactionType    = data.transactionType || {}
        this.dateFormat         = institute.dateFormat
        this.decimalFormat      = data.decimalFormat
    }

    constuct(data) {
        this.constructor(data);
    }
}
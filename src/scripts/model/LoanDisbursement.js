const store = require("@/institute.js")
const {institute} = store.default.state

export default class LoanDisbursement {
    constructor (data = {}) {
        this.id = data.id || ''
        this.member = data.member || {}
        this.monthlyPayment = data.monthlyPayment || 0
        this.totalInterest = data.totalInterest || 0
        this.totalPayment = data.totalPayment || 0
        this.loan = data.loan || {}
        this.issuedDate = data.issuedDate || new Date().toISOString().substr(0, 10)
        this.startPaymentDate = data.startPaymentDate || new Date().toISOString().substr(0, 10)
        this.paymentSchedule = data.paymentSchedule || []
        this.exchangeRate = data.exchangeRate || {}
        this.saveOption = data.saveOption || ''
        this.deleted = data.deleted || 0
        this.status = data.status || 1
        this.dateFormat = data.dateFormat || institute.dateFormat
        this.journalNumber = data.journalNumber || ''
        this.cashAccountt = data.cashAccountt || {}
        this.isMember = data.isMember || 1
        this.exchangeAmount = data.exchangeAmount || 0
        this.userPin = data.userPin
    }

    construct(data) {
        this.constructor(data)
    }

}

export default class Loan {
    constructor(data = {}) {
        this.id                         = data.id || ''
        this.issuedDate                 = data.issuedDate || new Date().toISOString().substr(0, 10)
        this.financialInstitutions      = data.financialInstitutions || {}
        this.amount                     = data.amount || 0
        this.number                     = data.number || ''
        this.approveNumber              = data.approveNumber || ''
        this.name                       = data.name || ''
        this.typeOfLoan                 = data.typeOfLoan || {}
        this.currency                   = data.currency || {}
        this.description                = data.description || ''
        this.status                     = data.status || 'pending'
        this.outStandingBalance         = data.outStandingBalance || 0
        this.availableCredit            = data.availableCredit || 0
        this.approvedAmount             = data.approvedAmount || 0
        this.sortIndex                  = data.sortIndex || 1
        this.isEdit                     = data.isEdit || false
        this.saveOption                 = data.saveOption || ''
        this.interestRate               = data.interestRate || 0
        this.loanAccount                = data.loanAccount || {}
        this.interestAccount            = data.interestAccount || {}
        this.maturityDate               = data.maturityDate || new Date().toISOString().substr(0, 10)
        this.approveDate                = data.approveDate || new Date().toISOString().substr(0, 10)
        this.firstPaymentDate           = data.firstPaymentDate || new Date().toISOString().substr(0, 10)
        this.duration                   = data.duration || 12
        this.monthlyRepayment           = data.monthlyRepayment || 0
        this.paymentTerm                = data.paymentTerm || {}
        this.paymentMethod              = data.paymentMethod || 1
        this.totalInterest              = data.totalInterest || 0
        this.totalPayment               = data.totalPayment || 0
        this.schedules                  = data.schedules || []
        this.receiptDate                = data.receiptDate || new Date().toISOString().substr(0, 10)
        this.exchangeRate               = data.exchangeRate || {}
        this.segment                    = data.segment || {}
        this.location                   = data.location || {}
    }

    constuct(data) {
        this.constructor(data);
    }
}
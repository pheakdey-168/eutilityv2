export default class LoanReceipt {
    constructor(data = {}) {
        this.id = data.id || ''
        this.receiptAmount = data.receiptAmount || 0
        this.principalAmount = data.principalAmount || 0
        this.interestAmount = data.interestAmount || 0
        this.number = data.number || ''
        this.journalNumber = data.journalNumber || ''
        this.journalId = data.journalId || ''
        this.currency = data.currency || {}
        this.exchangeRate = data.exchangeRate || {}
        this.cashAccount = data.cashAccount || {}
        this.issuedDate = data.issuedDate || new Date().toISOString().substr(0, 10)
        this.member = data.member || {}
        this.loan = data.loan || {}
        this.schedules = data.schedules || []
        this.paidAmount = data.paidAmount || 0
        this.principalPaidAmount = data.principalPaidAmount || 0
        this.interestPaidAmount = data.interestPaidAmount || 0
        this.penaltyAmount = data.penaltyAmount || 0
        this.rate = data.rate || 1
        this.userPin = data.userPin || {}
    }
    constuct(data) {
        this.constructor(data);
    }
}
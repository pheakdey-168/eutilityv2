export default class DividendPayment {
    constructor(data = {}) {
        this.id = data.id || ''
        this.lastNumber = data.lastNumber || 1
        this.number = data.number || ''
        this.exchangeRate = data.exchangeRate || {}
        this.segment = data.segment || {}
        this.issuedDate = data.issuedDate || new Date().toISOString().substr(0, 10)
        this.earningAllocation = data.earningAllocation || {}
        this.cashAccount = data.cashAccount || {}
        this.withdrawLines = data.withdrawLines || {}
        this.journal = data.journal || ''
        this.journalId = data.journalId || ''
        this.totalAmount = data.totalAmount || 0
        this.dividendLines = data.dividendLines || []
    }

    constuct(data) {
        this.constructor(data);
    }
}
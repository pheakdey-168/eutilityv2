export default class CloseLoan {
    constructor(data = {}) {
        this.id = data.id || ''
        this.issuedDate = data.issuedDate || new Date().toISOString().substr(0, 10)
        this.number = data.number || ''
        this.member = data.member || {}
        this.customer = data.customer || {}
        this.loan = data.loan || {}
        this.lastNumber = data.lastNumber || 1
        this.abbr = data.abbr || ''
        this.exchangeRate = data.exchangeRate || {}
        this.rate = data.rate || 1
        this.note = data.note || ''
        this.penalty = data.penalty || 0
        this.referenceNumber = data.referenceNumber || ''
        this.journalId = data.journalId || ''
        this.schedules = data.schedules || []
        this.user = data.user || {}
        this.totalAmount = data.totalAmount || 0
        this.isMember = data.isMember || 1
        this.interest = data.interest || 0
        this.principal = data.principal || 0
        this.createdAt = data.createdAt || new Date().toISOString().substr(0, 10)
    }

    constuct(data) {
        this.constructor(data);
    }
}
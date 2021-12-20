export default class Share {
    constructor(data = {}) {
        this.id = data.id || ''
        this.member = data.member || {}
        this.pricePerShare = data.pricePerShare || {}
        this.journalType = data.journalType || {}
        this.number = data.number || ''
        this.cashAccount = data.cashAccount || {}
        this.note = data.note || ''
        this.lines = data.lines || []
        this.rate = data.rate || 1
        this.currency = data.currency || {}
        this.exchangeRate = data.exchangeRate || {}
        this.totalShare = data.totalShare || 0
        this.totalAmount = data.totalAmount || 0
        this.remainingShare = data.remainingShare || 0
        this.journal = data.journal || ''
        this.journalId = data.journalId || ''
        this.issuedDate = data.issuedDate || new Date().toISOString().substr(0, 10)
        this.createdAt = data.createdAt || new Date().toISOString().substr(0, 10)
    }

    constuct(data) {
        this.constructor(data);
    }
}
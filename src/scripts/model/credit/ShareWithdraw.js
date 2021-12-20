export default class ShareWithdraw {
    constructor(data = {}) {
        this.id = data.id || ''
        this.member = data.member || {}
        this.amount = data.amount || 0
        this.issuedDate = data.issuedDate || new Date().toISOString().substr(0, 10)
        this.number = data.number || ''
        this.referenceNumber = data.referenceNumber || ''
        this.cashAccount = data.cashAccount || {}
        this.note = data.note || ''
        this.pricePerShare = data.pricePerShare || {}
        this.withdrawFrom = data.withdrawFrom || 1
        this.lines = data.lines || []
        this.saveOption = data.saveOption || ''
        this.deleted = data.deleted || 0
        this.journalNumber = data.journalNumber || ''
        this.journal = data.journal || ''
        this.journalId = data.journalId || ''
        this.user = data.user || {}
        this.currency = data.currency || {}
        this.exchangeRate = data.exchangeRate || {}
        this.totalWithdrawShare = data.totalWithdrawShare || 0
        this.createdAt = data.createdAt || new Date().toISOString().substr(0, 10)
    }

    constuct(data) {
        this.constructor(data);
    }
}
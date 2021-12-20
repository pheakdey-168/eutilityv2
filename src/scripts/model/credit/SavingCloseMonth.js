export default class SavingCloseMonth {
    constructor(data = {}) {
        this.id = data.id || ''
        this.issuedDate = data.issuedDate || new Date().toISOString().substr(0, 10)
        this.balances = data.balances || []
        this.user = data.user || {}
        this.journal = data.journal || ''
        this.journalNumber = data.journalNumber || ''
        this.interests = data.interests || []
        this.userPin = data.userPin || {}
        this.exchangeRate = data.exchangeRate || {}
    }
    constuct(data) {
        this.constructor(data);
    }
}
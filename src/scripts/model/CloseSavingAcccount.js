const store = require("@/institute.js")
const {institute} = store.default.state
export default class CloseSavingAcccount {
    constructor(data = {}) {
        this.id = data.id || ''
        this.savingAccount = data.savingAccount || {}
        this.customer = data.customer || {}
        this.member = data.member || {}
        this.amountPenalty = data.amountPenalty || 0
        this.amountWithdraw = data.amountWithdraw || 0
        this.referenceNumber = data.referenceNumber || ''
        this.cashAccount = data.cashAccount || {}
        this.note = data.note || ''
        this.issuedDate = data.issuedDate ||new Date().toISOString().substr(0, 10)
        this.saveOption = data.saveOption || ''
        this.txnId = data.txnId || ''
        this.deleted = data.deleted || 0
        this.userPin = data.userPin || {}
        this.exchangeRate = data.exchangeRate || {}
        this.isMember = data.isMember || 1
        this.dateFormat = data.dateFormat || institute.dateFormat
    }

    constuct(data) {
        this.constructor(data);
    }
}
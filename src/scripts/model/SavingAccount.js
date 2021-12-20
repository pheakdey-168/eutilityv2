const store = require("@/institute.js")
const {institute} = store.default.state
export default class SavingAccount {
    constructor(data = {}) {
        this.id = data.id || ''
        this.lastNumber = data.lastNumber || 1
        this.abbr = data.abbr || ''
        this.savingProduct = data.savingProduct || {}
        this.customer = data.customer || {}
        this.member = data.member || {}
        this.number = data.number || ''
        this.savingType = data.savingType || ''
        this.interestRate = data.interestRate || 0
        this.daysInYear = data.daysInYear || {}
        this.currency = data.currency || {}
        this.issuedDate = data.issuedDate ||new Date().toISOString().substr(0, 10)
        this.saveOption = data.saveOption || ''
        this.deleted = data.deleted || 0
        this.status = data.status || 1
        this.user = data.user || {}
        this.depositAmount = data.depositAmount || 0
        this.depositWithRate = data.depositWithRate || 0
        this.interestAmount = data.interestAmount || 0
        this.interestWithRate = data.interestWithRate || 0
        this.withdrawAmount = data.withdrawAmount || 0
        this.withdrawWithRate = data.withdrawWithRate || 0
        this.numberOfMonth = data.numberOfMonth || 12
        this.isMember = data.isMember || 1
        this.userPin = data.userPin || {}
        this.dateFormat = data.dateFormat || institute.dateFormat
    }

    constuct(data) {
        this.constructor(data);
    }
}
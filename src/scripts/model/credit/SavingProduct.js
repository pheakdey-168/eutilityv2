const store = require("@/institute.js")
const {institute} = store.default.state
export default class SavingProduct {
    constructor(data = {}) {
        this.id = data.id || ''
        this.name = data.name || ''
        this.abbr = data.abbr || ''
        this.savingType = data.savingType || {}
        this.savingInterest = data.savingInterest || {}
        this.daysInYear = data.daysInYear || {}
        this.currency = data.currency || {}
        this.Account = data.Account || {}
        this.interestExpenseAccount = data.interestExpenseAccount || {}
        this.interestPayableAccount = data.interestPayableAccount || {}
        this.saveOption = data.saveOption || ''
        this.dateFormat = data.dateFormat || institute.dateFormat
    }

    constuct(data) {
        this.constructor(data);
    }
}
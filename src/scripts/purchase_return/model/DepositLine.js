const store = require("@/institute")
const {institute} = store.default.state

export default class DepositLine {
    constructor(data = {}) {
        this.id = data.id || ''
        this.account = data.account || {}
        this.description = data.description || ''
        this.amount = data.amount || 0
        this.exchangeAmount = data.exchangeAmount || 0
        this.deleted = data.deleted || 0
        this.dateFormat =  institute.dateFormat
    }

    constuct(data) {
        this.constructor(data);
    }
}
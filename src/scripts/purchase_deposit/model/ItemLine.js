const store = require("@/institute")
const {institute} = store.default.state

export default class ItemLine {
    constructor(data = {}) {
        this.id = data.id || ''
        this.account = data.account || {}
        this.description = data.description || ''
        this.paymentOption = data.paymentOption || {}
        this.refNo = data.refNo || ''
        this.amount = data.amount || 0
        this.deleted = data.deleted || 0
        this.dateFormat =  institute.dateFormat
    }

    constuct(data) {
        this.constructor(data);
    }
}
const store = require("@/institute")
const {institute} = store.default.state

export default class ApplyToLine {
    constructor(data = {}) {
        this.id = data.id || ''
        this.invoiceNo = data.invoiceNo || {}
        this.paymentCode = data.paymentCode || ''
        this.currency = data.currency || ''
        this.amount = data.amount || 0
        this.paidAmount = data.paidAmount || 0
        this.exchangeAmount = data.exchangeAmount || 0
        this.dateFormat = institute.dateFormat
    }

    constuct(data) {
        this.constructor(data);
    }
}
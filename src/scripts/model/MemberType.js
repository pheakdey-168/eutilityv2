export default class MemberType {
    constructor(data = {}) {
        this.id = data.id || ''
        this.name = data.name || ''
        this.abbr = data.abbr || ''
        this.accountReceiveable = data.accountReceiveable || {}
        this.defaultTax = data.defaultTax || {}
        this.accountDeposit = data.accountDeposit || {}
        this.accountDiscount = data.accountDiscount || {}
        this.paymentTerm = data.paymentTerm || {}
        this.paymentMethod = data.paymentMethod || {}
    }

    constuct(data) {
        this.constructor(data);
    }
}
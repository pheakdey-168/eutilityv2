export default class CustomerType {
    constructor(data = {}) {

        this.id = data.id || ''
        this.name = data.name || ''
        this.abbr = data.abbr || ''
        this.nature = data.nature || {}
        this.receivableAcc = data.receivableAcc || {}
        this.defaultTax = data.defaultTax || {}
        this.saleDepositAcc = data.saleDepositAcc || {}
        this.defaultTaxOnShipping = data.defaultTaxOnShipping || {}
        this.saleDiscountAcc = data.saleDiscountAcc || {}
        this.paymentTerm = data.paymentTerm || {}
        this.paymentOption = data.paymentOption || {}

    }

    constuct(data) {
        this.constructor(data);
    }
}
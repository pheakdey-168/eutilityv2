const store = require("@/institute.js")
const {institute} = store.default.state
export default class SaleQuote {
    constructor(data = {}) {
            this.id                     = data.id || ''
            this.type                   = data.type || 'Sale Quote'
            this.transactionType        = data.transactionType || {}
            this.number                 = data.number || ''
            this.transactionDate        = data.transactionDate || new Date().toISOString().substr(0, 10)
            this.validityDate           = data.validityDate || new Date().toISOString().substr(0, 10)
            this.monthOf                = data.monthOf || new Date().toISOString().substr(0, 10)
            this.customer               = data.customer || {}
            this.paymentTerm            = data.paymentTerm || {}
            this.discountPromotion      = data.discountPromotion || {}
            this.currency               = data.currency || {}
            this.priceLevel             = data.priceLevel || {}
            this.segment                = data.segment || {}
            this.location               = data.location || {}
            this.project                = data.project || {}
            this.saleChannel            = data.saleChannel || {}
            this.billingAddress         = data.billingAddress || {}
            this.deliveryAddress        = data.deliveryAddress || {}
            this.deliveryDateTime       = data.deliveryDateTime || new Date().toISOString().substr(0, 10)
            this.transactionNote        = data.transactionNote || ''
            this.subTotal               = data.subTotal || 0
            this.total                  = data.total || 0
            this.discountTotal          = data.discountTotal || 0
            this.specificDiscountTotal  = data.specificDiscountTotal || 0
            this.deliveryFee            = data.deliveryFee || 0
            this.totalTaxAmount         = data.totalTaxAmount || 0
            this.currentBalance         = data.currentBalance || 0
            this.balance                = data.balance || 0
            this.creditLimit            = data.creditLimit || 0
            this.saveOption             = data.saveOption || 1 // 0: Draft , 1: Save
            this.status                 = data.status || 1 // 0: Used , 1: Open
            this.deleted                = data.deleted || 0
            this.approvedBy             = data.approvedBy || {}
            this.rejectedBy             = data.rejectedBy || {}
            this.formTemplate           = data.formTemplate || {}
            this.specificDiscountItem   = data.specificDiscountItem || []
            this.otherCharge            = data.otherCharge || []
            this.otherChargeAmount      = data.otherChargeAmount || 0
            this.itemLines              = data.itemLines || []
            this.taxListTotal           = data.taxListTotal || 0
            this.dateFormat             = data.dateFormat || institute.dateFormat
        }

    constuct(data) {
        this.constructor(data);
    }
}
const store = require("@/institute")
const {institute} = store.default.state
export default class Invoice {
    constructor(data = {}) {
            this.id                         = data.id || ''
            this.number                     = data.number || ''
            this.referenceNo                = data.referenceNo || ''
            this.abbr                       = data.abbr || ''
            this.transactionDate            = data.transactionDate || new Date().toISOString().substr(0, 10)
            this.dueDate                    = data.dueDate || new Date().toISOString().substr(0, 10)
            this.monthOf                    = data.monthOf || new Date().toISOString().substr(0, 10)
            this.customer                   = data.customer || {}
            this.transactionType            = data.transactionType || {}
            this.paymentTerm                = data.paymentTerm || {}
            this.discountPromotion          = data.discountPromotion || {}
            this.accReceivable              = data.accReceivable || {}
            this.currency                   = data.currency || {}
            this.baseCurrency               = data.baseCurrency || {}
            this.rate                       = data.rate || 1
            this.txnRate                    = data.txnRate || 1
            this.exchangeRate               = data.exchangeRate || {}
            this.exchangeAmount             = data.exchangeAmount || 0
            this.priceLevel                 = data.priceLevel || {}
            this.itemLines                  = data.itemLines || {}
            this.segment                    = data.segment || {}
            this.location                   = data.location || {}
            this.project                    = data.project || {}
            this.saleChannel                = data.saleChannel || {}
            this.employee                   = data.employee || {}
            this.billingAddress             = data.billingAddress || {}
            this.deliveryAddress            = data.deliveryAddress || {}
            this.deliveryDateTime           = data.deliveryDateTime || new Date().toISOString().substr(0, 10)
            this.transactionNote            = data.transactionNote || ''
            this.journalNote                = data.journalNote || ''
            this.subTotal                   = data.subTotal || 0
            this.total                      = data.total || 0
            this.discountTotal              = data.discountTotal || 0
            this.specificDiscountTotal      = data.specificDiscountTotal || 0
            this.deliveryFee                = data.deliveryFee || 0
            this.totalTaxAmount             = data.totalTaxAmount || 0
            this.depositAmount              = data.depositAmount || 0
            this.depositDeduction           = data.depositDeduction || 0
            this.exchangeDepositDeduction   = data.exchangeDepositDeduction || 0
            this.remainingAmount            = data.remainingAmount || 0
            this.amountDue                  = data.amountDue || 0
            this.currentBalance             = data.currentBalance || 0
            this.balance                    = data.balance || 0
            this.creditLimit                = data.creditLimit || 0
            this.saveOption                 = data.saveOption || 1 // 0: Draft , 1: Save
            this.status                     = data.status || 1 // 0: Pending , 1: Active , 2: Waiting Approval , 3: rejected
            this.approvedBy                 = data.approvedBy || {}
            this.rejectedBy                 = data.rejectedBy || {}
            this.formTemplate               = data.formTemplate || {}
            this.specificDiscountItem       = data.specificDiscountItem || {}
            this.otherCharge                = data.otherCharge || []
            this.otherChargeAmount          = data.otherChargeAmount || {}
            this.type                       = data.type || ''
            this.paymentOptionOnline        = data.paymentOptionOnline || {}
            this.paymentOptionKHQR          = data.paymentOptionKHQR || {}
            this.paymentOptionWBMobile      = data.paymentOptionWBMobile || {}
            this.lateFee                    = data.lateFee || {}
            this.paymentCode                = data.paymentCode || ''
            this.publicLink                 = data.publicLink || ''
            this.taxListTotal               = data.taxListTotal || {}
            this.dateFormat                 = institute.dateFormat
            this.createdAt                  = data.createdAt || new Date()
            this.saveSend                   = data.saveSend || false
            this.deleted                    = data.deleted || 0
            this.paymentScheme              = data.paymentScheme || {
                    method: {}, number: 1
            }
        }

    constuct(data) {
        this.constructor(data);
    }
}
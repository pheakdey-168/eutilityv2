const store = require("@/institute")
const {institute} = store.default.state
export default class CreditMemo {
    constructor(data = {}) {
            this.id                         = data.id || ''
            this.number                     = data.number || ''
            this.referenceNo                = data.referenceNo || ''
            this.abbr                       = data.abbr || ''
            this.transactionDate            = data.transactionDate || new Date().toISOString().substr(0, 10)
            this.customer                   = data.customer || {}
            this.transactionType            = data.transactionType || {}
            this.priceLevel                 = data.priceLevel || {}
            this.currency                   = data.currency || {}
            this.txnRate                    = data.txnRate || 1

            this.amount                     = data.amount || 0
            this.exchangeAmount             = data.exchangeAmount || 0
            this.variance                   = data.variance || 0


            this.itemLineAmount             = data.itemLineAmount || 0
            this.itemLineExchangeAmount     = data.itemLineExchangeAmount || 0
            this.itemLineDiscountAmount     = data.itemLineDiscountAmount || 0
            this.itemLineTaxAmount          = data.itemLineTaxAmount || 0
            this.itemLineSubTotal           = data.itemLineSubTotal || 0

            this.applyToAmount              = data.applyToAmount || 0
            this.applyToExchangeAmount      = data.applyToExchangeAmount || 0

            this.depositAmount              = data.depositAmount || 0
            this.refundAmount               = data.refundAmount || 0

            this.itemLines                  = data.itemLines || {}
            this.applyToLines               = data.applyToLines || {}
            this.depositLines               = data.depositLines || {}
            this.cashRefundLines            = data.cashRefundLines || {}
            // this.accountLines               = data.accountLines || {}


            this.segment                    = data.segment || {}
            this.location                   = data.location || {}
            this.project                    = data.project || {}
            this.employee                   = data.employee || {}
            this.status                     = data.status || 1 // 0: Pending , 1: Active , 2: Waiting Approval , 3: rejected
            this.approvedBy                 = data.approvedBy || {}
            this.rejectedBy                 = data.rejectedBy || {}
            this.formTemplate               = data.formTemplate || {}
            this.type                       = data.type || ''
            this.transactionNote            = data.transactionNote || ''
            this.journalNote                = data.journalNote || ''
            this.loggedUser                 = data.loggedUser || {}
            this.createdAt                  = data.createdAt || new Date().toISOString().substr(0, 10)
            this.dateFormat                 = institute.dateFormat
        }

    constuct(data) {
        this.constructor(data);
    }
}
const store = require("@/institute")
const {institute} = store.default.state
export default class SaleDeposit {
    constructor(data = {}) {
            this.id                         = data.id || ''
            this.number                     = data.number || ''
            this.referenceNo                = data.referenceNo || ''
            this.abbr                       = data.abbr || ''
            this.transactionDate            = data.transactionDate || new Date().toISOString().substr(0, 10)
            this.customer                   = data.customer || {}
            this.transactionType            = data.transactionType || {}
            this.accDeposit                 = data.accDeposit || {}
            this.currency                   = data.currency || {}
            this.txnRate                    = data.txnRate || 1
            this.amount                     = data.amount || 0
            this.exchangeAmount             = data.exchangeAmount || 0
            this.itemLines                  = data.itemLines || {}
            this.saleOrder                  = data.saleOrder || {}
            this.segment                    = data.segment || {}
            this.location                   = data.location || {}
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
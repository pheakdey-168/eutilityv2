export default class RecordLoanReceipt {
    constructor(data = {}) {
        this.id                         = data.id || ''
        this.loan                       = data.loan || {}
        this.issuedDate                 = data.issuedDate || new Date().toISOString().substr(0, 10)
        this.abbr                       = data.abbr || ''
        this.number                     = data.number || ''
        this.cashItemLine               = data.cashItemLine || []
        this.relateCostItemLine         = data.relateCostItemLine || []
        this.journalId                  = data.journalId || ''
        this.journal                    = data.journal || ''
        this.user                       = data.user || {}
        this.lastNumber                 = data.lastNumber || 1
        this.exchangeRate               = data.exchangeRate || {}
        this.receivedAmount             = data.receivedAmount || 0
        this.abbrNumber                 = data.abbrNumber || ''
    }

    constuct(data) {
        this.constructor(data);
    }
}
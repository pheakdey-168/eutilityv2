export default class LoanReceipt {
    constructor(data = {}) {
        this.id                         = data.id || ''
        this.issuedDate                 = data.issuedDate || new Date().toISOString().substr(0, 10)
        this.cashAccount                = data.cashAccount || {}
        this.penaltyAccount             = data.penaltyAccount || {}
        this.number                     = data.number || ''
        this.journal                    = data.journal || ''
        this.journalId                  = data.journalId || ''
        this.loan                       = data.loan || {}
        this.user                       = data.user || {}
        this.exchangeRate               = data.exchangeRate || {}
        this.schedules                  = data.schedules || []
        this.penaltyAmount              = data.penaltyAmount || 0
        this.receiptAmount              = data.receiptAmount || 0
        this.interestAmount             = data.interestAmount || 0
        this.principalAmount            = data.principalAmount || 0
        this.lastNumber                 = data.lastNumber || 1
    }

    constuct(data) {
        this.constructor(data);
    }
}
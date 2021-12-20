export default class Dividend {
    constructor(data = {}) {
        this.id = data.id || ''
        this.issuedDate = data.issuedDate || new Date().toISOString().substr(0, 10)
        this.lastNumber = data.lastNumber || 1
        this.monthFrom = data.monthFrom || new Date().toISOString().substr(0, 10)
        this.monthTo = data.monthTo || new Date().toISOString().substr(0, 10)
        this.number = data.number || ''
        this.basisAllocation = data.basisAllocation || 0
        this.exchangeRate = data.exchangeRate || {}
        this.payableAccount = data.payableAccount || {}
        this.declareAccount = data.declareAccount || {}
        this.shareProduct = data.shareProduct || {}
        this.profitAllocation = data.profitAllocation || []
        this.shareData = data.shareData || []
        this.dividendPerShare = data.dividendPerShare || 0
        this.journal = data.journal || ''
        this.segment = data.segment || {}
        this.profitEarningAcccount = data.profitEarningAcccount || {}
        this.journalId = data.journalId || ''
    }

    constuct(data) {
        this.constructor(data);
    }
}
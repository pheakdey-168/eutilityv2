export default class PricePerShare {
    constructor(data = {}) {
        window.console.log(data, 'model')
        this.id = data.id || ''
        this.name = data.name || ''
        this.abbr = data.abbr || ''
        this.shareAmount = data.shareAmount || 100
        this.pricePerShare = data.pricePerShare || 100
        this.year = data.decimal || new Date().getFullYear()
        this.currency = data.currency || {}
        this.typeOfShare = data.typeOfShare || {}
        this.saleShare = data.saleShare || 0
        this.cashAccount = data.cashAccount || {}
        this.capitalAccount = data.capitalAccount || {}
        this.dividendAccount = data.dividendAccount || {}
        this.createdAt = data.createdAt || new Date().toISOString().substr(0, 10)
        this.allowShareAmount = data.allowShareAmount || false
        this.maxSellAmount = data.maxSellAmount || 1
        this.maxSellType = data.maxSellType || '$'
        this.allowMaxSell = data.allowMaxSell || false
        this.locked = data.locked || false
    }

    constuct(data) {
        this.constructor(data);
    }
}
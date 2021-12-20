const store = require("@/institute")
const {institute} = store.default.state
export default class TaxExchangeCurrency {
    constructor(data = {}) {
        this.id                     = data.id || ''
        this.name                   = data.name || ''
        this.code                   = data.code || ''
        this.recordDate             = data.recordDate || new Date().toISOString().substr(0, 10)
        this.effectiveDate          = data.effectiveDate || new Date().toISOString().substr(0, 10)
        this.source                 = data.source || ''
        this.symbol                 = data.symbol || ''
        this.type                   = data.type || ''
        this.symbolNative           = data.symbolNative || ''
        this.rate                   = data.rate || 1
        this.method                 = data.method || 1
        this.dateFormat             = institute.dateFormat

    }

    constuct(data) {
        this.constructor(data);
    }
}
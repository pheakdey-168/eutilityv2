const store = require("@/institute.js")
const {institute} = store.default.state
export default class Lead {
    constructor(data = {}) {
        this.id                     = data.id || ''
        this.nameOfLead             = data.nameOfLead || ''
        this.issuedDate             = data.issuedDate || new Date().toISOString().substr(0, 10)
        this.expectedRevenue        = data.expectedRevenue || 0
        this.customerName           = data.customerName || ''
        this.customerEmail          = data.customerEmail || ''
        this.customerPhone          = data.customerPhone || ''
        this.saleRep                = data.saleRep || {}
        this.segment                = data.segment || {}
        this.note                   = data.note || ''
        this.status                 = data.status || 1 // 1 active, 0 inactive, 2 used
        this.usedDate               = data.usedDate || new Date().toISOString().substr(0, 10)
        this.deleted                = data.deleted || 0
        this.dateFormat             = data.dateFormat || institute.dateFormat
    }

    constuct(data) {
        this.constructor(data);
    }
}
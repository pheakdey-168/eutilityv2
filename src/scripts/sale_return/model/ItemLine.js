const store = require("@/institute")
const {institute} = store.default.state

export default class ItemLine {
    constructor(data = {}) {
        this.id = data.id || ''
        this.item = data.item || {}
        this.description = data.description || ''
        this.qty = data.qty || 1
        this.uom = data.uom || {}
        this.price = data.price || 0
        this.amount = data.amount || 0
        this.discountPercent = data.discountPercent || 0
        this.discountAmount = data.discountAmount || 0
        this.discountItem = data.discountItem || {}
        this.specificTax = data.specificTax || {}
        this.publicLightingTax = data.publicLightingTax || {}
        this.otherTax = data.otherTax || {}
        this.vatTax = data.vatTax || {}
        this.saleUnit = data.saleUnit || {}
        this.deleted = data.deleted || 0
        this.dateFormat =  institute.dateFormat
    }

    constuct(data) {
        this.constructor(data);
    }
}
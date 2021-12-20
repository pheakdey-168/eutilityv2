const store = require("@/institute")
const {institute} = store.default.state

export default class ItemLine {
    constructor(data = {}) {
        this.id = data.id || ''
        this.number = data.number || ''
        this.serviceDate = data.serviceDate || new Date().toISOString().substr(0, 10)
        this.serviceDateTo = data.serviceDateTo || new Date().toISOString().substr(0, 10)
        this.item = data.item || {}
        this.description = data.description || ''
        this.qty = data.qty || 1
        this.uom = data.uom || {}
        this.price = data.price || 0
        this.amount = data.amount || 0
        this.discountPercent = data.discountPercent || 0
        this.discountAmount = data.discountAmount || 0
        this.discountItem = data.discountItem || {}
        this.tax = data.tax || {}
        this.employee = data.employee || []
        this.class1 = data.class1 || {}
        this.class2 = data.class2 || {}
        this.class3 = data.class3 || {}
        this.class4 = data.class4 || {}
        this.class5 = data.class5 || {}
        this.deleted = data.deleted || 0
        this.dateFormat =  institute.dateFormat
    }

    constuct(data) {
        this.constructor(data);
    }
}
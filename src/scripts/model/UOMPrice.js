export default class UOMPrice {
    constructor(data = {}) {
        if (!data) {
            this.id = data.id || ''
            this.variantId = data.variantId || ''
            this.uom = data.uom || {}
            this.price = data.price || '1'
            this.appliedDate = data.appliedDate || new Date().toISOString().substr(0, 10)
        } else {
            this.id = ''
            this.variantId = ''
            this.uom = {}
            this.price = '1'
            this.appliedDate = new Date().toISOString().substr(0, 10)
        }
    }

    constuct(data) {
        this.constructor(data);
    }
}
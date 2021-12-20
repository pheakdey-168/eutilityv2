export default class UOMConversion {
    constructor(data = {}) {
        if (!data) {
            this.id = data.id || ''
            this.variantId = data.variantId || ''
            this.fromUOM = data.fromUOM || {}
            this.toUOM = data.toUOM || {}
            this.rate = data.rate || 1
            this.conversionRate = data.conversionRate || 1
        } else {
            this.id = ''
            this.variantId = ''
            this.fromUOM = {}
            this.toUOM = {}
            this.rate = 1
            this.conversionRate = 1
        }
    }

    constuct(data) {
        this.constructor(data);
    }
}
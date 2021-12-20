export default class UOMServiceConversion {
    constructor(data = {}) {
        if (!data) {
            this.id = data.id || ''
            this.serviceId = data.serviceId || ''
            this.fromUOM = data.fromUOM || {}
            this.toUOM = data.toUOM || {}
            this.type = data.type || ''
            this.rate = data.rate || 1
            this.conversionRate = data.conversionRate || 1
        } else {
            this.id = ''
            this.serviceId = ''
            this.fromUOM = {}
            this.toUOM = {}
            this.type = ''
            this.rate = 1
            this.conversionRate = 1
        }
    }

    constuct(data) {
        this.constructor(data);
    }
}
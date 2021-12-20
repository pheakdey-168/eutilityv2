export default class Catalog {
    constructor(data = {}) {
        if (!data) {
            this.id = data.id || ''
            this.name = data.name || ''
            this.type = data.type || {}
            this.description = data.description || ''
            this.number = data.number || ''
            this.usedInPOS = data.usedInPOS || false
            this.usedInEcommerce = data.usedInEcommerce || false
            this.variants = data.variants || {}
            this.services = data.services || {}
            this.images = data.images || {}
            this.noOfProduct = data.noOfProduct || 1
            this.status = data.status || 1

        } else {
            this.id = ''
            this.name = ''
            this.description = ''
            this.number = ''
            this.usedInPOS = true
            this.usedInEcommerce = false
            this.variants = {}
            this.services = {}
            this.type = {}
            this.images = {}
            this.noOfProduct = 1
            this.status = 1
        }
    }

    constuct(data) {
        this.constructor(data);
    }
}
export default class Warehouse {
    constructor(data = {}) {
        this.id        = data.id || ''
        this.name      = data.name || ''
        this.code      = data.code || ''
        this.type      = data.type || ''
        this.address   = data.address || ''
        this.isSale    = data.isSale || ''
    }

    constuct(data) {
        this.constructor(data);
    }
}
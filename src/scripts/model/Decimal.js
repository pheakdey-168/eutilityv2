export default class Decimal {
    constructor(data = {}) {
        this.id = data.id || ''
        this.currency = data.currency || {}
        this.decimal = data.decimal || 0
        this.createdAt = data.createdAt || new Date().toISOString().substr(0, 10)
    }

    constuct(data) {
        this.constructor(data);
    }
}
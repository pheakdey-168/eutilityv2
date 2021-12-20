export default class MemberFee {
    constructor(data = {}) {
        this.id = data.id || ''
        this.name = data.name || ''
        this.price = data.price || 1
        this.currency = data.currency || {}
        this.revenueAccount = data.revenueAccount || {}
        this.createdAt = data.createdAt || new Date().toISOString().substr(0, 10)
    }

    constuct(data) {
        this.constructor(data);
    }
}
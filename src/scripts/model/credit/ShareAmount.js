export default class ShareAmount {
    constructor(data = {}) {
        this.id = data.id || ''
        this.amount = data.amount || 1
        this.year = data.year || new Date().getFullYear()
        this.createdAt = data.createdAt || new Date().toISOString().substr(0, 10)
    }

    constuct(data) {
        this.constructor(data);
    }
}
export default class ShareAccount {
    constructor(data = {}) {
        this.id = data.id || ''
        this.cashAccount = data.cashAccount || {}
        this.capitalAccount = data.capitalAccount || {}
        this.dividendAccount = data.dividendAccount || {}
        this.createdAt = data.createdAt || new Date().toISOString().substr(0, 10)
    }

    constuct(data) {
        this.constructor(data);
    }
}
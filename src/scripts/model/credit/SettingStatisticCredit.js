export default class SettingStatisticCredit {
    constructor(data = {}) {
        this.id = data.id || ''
        this.segment = data.segment || {}
        this.accounts = data.accounts || []
        this.createdAt = data.createdAt || new Date().toISOString().substr(0, 10)
    }

    constuct(data) {
        this.constructor(data);
    }
}
export default class BankPayroll {
    constructor(data = {}) {
        if (!data) {
            this.id = data.id || ''
            this.name = data.name || {}
            this.account = data.account || {}
        } else {
            this.id = ''
            this.name = {}
            this.account = {}
        }
    }

    constuct(data) {
        this.constructor(data);
    }
}
export default class BankPaymenOption {
    constructor(data = {}) {
            this.id                         = data.id || '' // bank partner Id
            this.bank                       = data.bank || {} // bank info
            this.bankAccount                = data.bankAccount || {}
            this.enabled                    = data.enabled || true // true: go live
            this.status                     = data.status || 'Connected'
        }

    constuct(data) {
        this.constructor(data);
    }
}
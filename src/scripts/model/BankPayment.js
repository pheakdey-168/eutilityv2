const store = require("@/institute.js")
const {institute} = store.default.state
export default class Invoice {
    constructor(data = {}) {
            this.id                         = data.id || '' // bank partner Id
            this.bank                       = data.bank || {} // bank info
            this.bankAccount                = data.bankAccount || {}
            this.enabled                    = data.enabled || true // true: go live
            this.status                     = data.status || 'Connected'
            this.dateFormat                 = data.dateFormat || institute.dateFormat
        }

    constuct(data) {
        this.constructor(data);
    }
}
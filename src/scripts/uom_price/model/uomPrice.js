const store = require("@/institute")
const {institute} = store.default.state
export default class UomPrice {
    constructor(data = {}) {
            this.ucId                       = data.ucId || ''
            this.id                         = data.id || ''
            this.price                      = data.price || 0
            this.newPrice                   = data.newPrice || 0
            this.variance                   = data.variance || 0
            this.appliedDate                = data.appliedDate || 0
            this.createdAt                  = data.createdAt || new Date().toISOString().substr(0, 10)
            this.dateFormat                 = institute.dateFormat
        }

    constuct(data) {
        this.constructor(data);
    }
}
const store = require("@/institute.js")
const {institute, user} = store.default.state

export default class ClosingDate {
    constructor(data = {}) {
        this.id             = data.id || ''
        this.closingDate    = data.closingDate || new Date().toISOString().substr(0, 10)
        this.password       = data.password || ''
        this.createdBy      = data.createdBy || user
        this.dateFormat     = data.dateFormat || institute.dateFormat
        this.createdAt      = data.createdAt || new Date().toISOString().substr(0, 10)
    }

    constuct(data) {
        this.constructor(data);
    }
}
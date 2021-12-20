const store = require("@/institute.js")
const {institute} = store.default.state
export default class LoanPurpose {
    constructor(data = {}) {
        this.id = data.id || ''
        this.name = data.name || ''
        this.description = data.description || ''
        this.deletedAt = data.deletedAt || new Date().toISOString().substr(0, 10)
        this.deleted = data.deleted || 0
        this.saveOption = data.saveOption || ''
        this.dateFormat = data.dateFormat || institute.dateFormat
        this.createdAt = data.createdAt || new Date().toISOString().substr(0, 10)
    }

    constuct(data) {
        this.constructor(data);
    }
}
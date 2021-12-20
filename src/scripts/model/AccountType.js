const store = require("@/institute.js");
const { instituteId } = store.default.state.cookies;

export default class AccountType {
    constructor(data = {}) {
        this.uuid               = data.uuid || ''
        this.number             = data.number || 0
        this.code               = data.code || 0
        this.name               = data.name || ''
        this.nature             = data.nature || ''
        this.nature_code        = data.nature_code || 0
        this.statement_group    = data.statement_group || ''
        this.institute_id       = data.institute_id || instituteId
    }
    
    constuct(data) {
        this.constructor(data);
    }
}
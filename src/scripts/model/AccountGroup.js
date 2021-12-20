export default class AccountGroup {
    constructor(data = {}) {
        this.uuid               = data.uuid || ''
        this.code               = data.code || 0
        this.type_code          = data.type_code || 0
        this.name               = data.name || ''
        this.local_name         = data.local_name || ''
        this.description        = data.description || ''
        this.institute_id       = data.institute_id || ''
        this.accounts           = data.accounts || []
        this.account_type       = data.account_type || {}
    }
    
    constuct(data) {
        this.constructor(data);
    }
}
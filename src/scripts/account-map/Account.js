export default class Account {
    constructor(data = {}) {
        this.id = data.id || ''
        this.uuid = data.uuid || ''
        this.name = data.name || {}
        this.local_name = data.local_name || {}
        this.number = data.number || {}
        this.is_taxable = data.is_taxable || {}
        this.banhjiAccCode = data.banhjiAccCode || {}
        this.group_code = data.group_code || {}
        this.parent_account = data.parent_account || {}
        this.type_code = data.type_code || {}
        this.account_type = data.account_type || {}

    }

    constuct(data) {
        this.constructor(data);
    }
}
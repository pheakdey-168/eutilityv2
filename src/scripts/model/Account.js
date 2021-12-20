import { AccountTypeModel, AccountGroupModel } from "@/scripts/model/AppModels";

const store = require("@/institute.js");
const { instituteId } = store.default.state.cookies;

export default class Account {
    constructor(data = {}) {
        this.uuid               = data.uuid || ''
        this.type_code          = data.type_code || 0
        this.group_code         = data.group_code || 0
        this.banhji_account_number = data.banhji_account_number || ''
        this.number             = data.number || ''
        this.name               = data.name || ''
        this.local_name         = data.local_name || ''
        this.description        = data.description || ''
        this.is_taxable         = data.is_taxable || 0
        this.status             = data.status || 0
        this.institute          = data.institute || instituteId // uuid
        this.account_type       = data.account_type || new AccountTypeModel()
        this.account_group      = data.account_group || new AccountGroupModel()
        this.parent_account     = data.parent_account || {}
    }
    
    constuct(data) {
        this.constructor(data);
    }
}
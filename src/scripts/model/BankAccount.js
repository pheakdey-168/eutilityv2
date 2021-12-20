import { BankModel, CurrencyModel, AccountModel } from "@/scripts/model/AppModels";

const store = require("@/institute")
const { instituteId } = store.default.state.cookies

export default class BankAccount {
    constructor(data = {}) {
        this.uuid           = data.uuid || ''
        this.number         = data.number || ''
        this.name           = data.name || ''
        this.bank_account_type_uuid = data.bank_account_type_uuid || ''
        this.bank           = data.bank || new BankModel()
        this.currency       = data.currency || new CurrencyModel()
        this.account        = data.account || new AccountModel()
        this.biller_id      = data.biller_id || ''
        this.merchant_id    = data.merchant_id || ''
        this.is_payable     = data.is_payable || 0
        this.is_collectable = data.is_collectable || 0
        this.institute_id   = data.institute_id || instituteId
        this.is_connected   = data.is_connected || 0
        this.is_deleted     = data.is_deleted || 0
    }
    
    constuct(data) {
        this.constructor(data)
    }
}
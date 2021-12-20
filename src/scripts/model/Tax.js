import { AccountModel } from "@/scripts/model/AppModels";

export default class Tax {
    constructor(data = {}) {
        this.id = data.id || ''
        this.code = data.code || 0
        this.defaultTax = data.defaultTax || ''
        this.defaultTaxLocale = data.defaultTaxLocale || ''
        this.description = data.description || ''
        this.natureTaxPayer = data.natureTaxPayer || ''
        this.formula = data.formula || ''
        this.baseAmount = data.baseAmount || ''
        this.rate = data.rate || 0.00
        this.taxBase = data.taxBase || 0.00
        this.taxType = data.taxType || {}
        this.account = data.account || new AccountModel()
        this.transactionType = data.transactionType || ''
        this.isSystem = data.isSystem || 0
    }

    constuct(data) {
        this.constructor(data);
    }
}
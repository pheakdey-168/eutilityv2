export default class BusinessSetting {
    constructor(data = {}) {
        this.id = data.id || ''
        this.segment = data.segment || {}
        this.paymentOption = data.paymentOption || {}
        this.recievableAccount = data.recievableAccount || {}
        this.cashAccount = data.cashAccount || {}
        this.payableAccount = data.payableAccount || {}
        this.exspenseAccounts = data.exspenseAccounts || []
        this.productCategories = data.productCategories || []
        this.serviceCategories = data.serviceCategories || []
        this.type = data.type || ''
        this.createdAt = data.createdAt || new Date().toISOString().substr(0, 10)
    }

    constuct(data) {
        this.constructor(data);
    }
}
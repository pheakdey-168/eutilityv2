import { AccountModel } from "@/scripts/model/AppModels";

export default class DiscountItems {
    constructor(data = {}) {
        this.id = data.id || ''
        this.code = data.code || ''
        this.name = data.name || ''
        this.amount = data.amount || 0
        this.nature = data.nature || ''
        this.description = data.description || ''
        this.account = data.account || new AccountModel()
        this.status = data.status || 1
    }

    constuct(data) {
        this.constructor(data);
    }
}

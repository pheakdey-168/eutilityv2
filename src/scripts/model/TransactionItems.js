export default class TransactionItems {
    constructor(data = {}) {
        if (!data) {
            this.id = data.id || ''
            this.number = data.number || ''
            this.name = data.name || ''
            this.uom = data.uom || {}
            this.description = data.description || ''
            this.account = data.account || {}
            this.status = data.status || 1
        } else {
            this.id = ''
            this.number = ''
            this.name = ''
            this.uom = {}
            this.description = ''
            this.account = {}
            this.status = 1
        }
    }

    constuct(data) {
        this.constructor(data);
    }
}

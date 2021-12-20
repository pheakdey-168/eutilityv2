export default class TaxType {
    constructor(data = {}) {
        this.id             = data.id || ''
        this.type           = data.name || ''
        this.nature         = data.nature || ''
        this.agency         = data.agency || ''
        this.isSystem       = data.isSystem || ''
    }
    constuct(data) {
        this.constructor(data);
    }
}
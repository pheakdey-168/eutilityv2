export default class SaleUnitItems {
    constructor(data = {}) {
        if (!data) {
            this.id = data.id || ''
            this.code = data.code || ''
            this.name = data.name || ''
            this.category = data.category || {}
            this.description = data.description || ''
            this.status = data.status || 1
        } else {
            this.id = ''
            this.code = ''
            this.name = ''
            this.category = {}
            this.description = ''
            this.status = 1
        }
    }

    constuct(data) {
        this.constructor(data);
    }
}

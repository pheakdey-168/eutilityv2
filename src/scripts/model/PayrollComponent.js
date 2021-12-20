export default class PayrollComponent {
    constructor(data = {}) {
        if (!data) {
            this.id = data.id || ''
            this.name = data.name || ''
            this.compoType = data.compoType || {}
        } else {
            this.id = ''
            this.name = ''
            this.compoType = {}
        }
    }

    constuct(data) {
        this.constructor(data);
    }
}
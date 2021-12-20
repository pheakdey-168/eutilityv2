export default class NSSF {
    constructor(data = {}) {
        if (!data) {
            this.id = data.id || ''
            this.name = data.name || ''
            this.number = data.number || ''
        } else {
            this.id = ''
            this.name = ''
            this.number = ''
        }
    }

    constuct(data) {
        this.constructor(data);
    }
}
export default class Attribute {
    constructor(data = {}) {
        if (!data) {
            this.id = data.id || ''
            this.name = data.name || ''
            this.code = data.code || ''
            this.type = data.type || {}
        } else {
            this.id = ''
            this.name = ''
            this.code = ''
            this.type = {}
        }
    }

    constuct(data) {
        this.constructor(data);
    }
}
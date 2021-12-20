export default class SubClazz {
    constructor(data = {}) {
        this.id = data.id || ''
        this.code = data.code || ''
        this.name = data.name || ''
        this.clazz = data.clazz || {}
        this.subOf = data.subOf || {}
        this.isSystem = data.isSystem || 0
    }

    constuct(data) {
        this.constructor(data);
    }
}
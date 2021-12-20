export default class Clazz {
    constructor(data = {}) {
        this.id = data.id || ''
        this.code = data.code || ''
        this.name = data.name || ''
        this.isShow = data.isShow || false
        this.isSystem = data.isSystem || 0
    }

    constuct(data) {
        this.constructor(data);
    }
}
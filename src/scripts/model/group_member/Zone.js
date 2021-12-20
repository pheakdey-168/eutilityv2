export default class Zone {
    constructor(data = {}) {
        this.id = data.id || ''
        this.name = data.name || ''
        this.mainBlock = data.mainBlock || {}
        this.mainBlockID = data.mainBlockID || ''
        this.subBlock = data.subBlock || {}
        this.subBlockID = data.subBlockID || ''
        this.createdAt = data.createdAt || new Date().toISOString().substr(0, 10)
    }

    constuct(data) {
        this.constructor(data);
    }
}
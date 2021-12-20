export default class MainBlock {
    constructor(data = {}) {
        this.id = data.id || ''
        this.name = data.name || ''
        this.createdAt = data.createdAt || new Date().toISOString().substr(0, 10)
    }

    constuct(data) {
        this.constructor(data);
    }
}
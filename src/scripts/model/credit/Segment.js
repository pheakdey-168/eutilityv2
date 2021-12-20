export default class Segment {
    constructor(data = {}) {
        this.id = data.id || ''
        this.segment = data.segment || {}
        this.createdAt = data.createdAt || new Date().toISOString().substr(0, 10)
    }

    constuct(data) {
        this.constructor(data);
    }
}
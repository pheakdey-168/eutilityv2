export default class Segment {
    constructor(data = {}) {
        this.id = data.id || ''
        this.Account = data.Account || {}
        this.createdAt = data.createdAt || new Date().toISOString().substr(0, 10)
    }

    constuct(data) {
        this.constructor(data);
    }
}
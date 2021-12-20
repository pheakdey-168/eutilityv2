export default class Location {
    constructor(data = {}) {
        this.id = data.id || ''
        this.code = data.code || ''
        this.name = data.name || ''
        this.address = data.address || ''
    }

    constuct(data) {
        this.constructor(data);
    }
}
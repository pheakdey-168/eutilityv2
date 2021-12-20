export default class Segment {
    constructor(data = {}) {
        this.id = data.id || ''
        this.code = data.code || ''
        this.name = data.name || ''
        this.subOf = data.subOf || ''
        this.isSystem = data.isSystem || false
    }

    constuct(data) {
        this.constructor(data);
    }
}
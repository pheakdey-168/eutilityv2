export default class TypeOfWork {
    constructor(data = {}) {
        if (!data) {
            this.id = data.id || ''
            this.name = data.name || ''
            this.description = data.description || ''
        } else {
            this.id = ''
            this.name = ''
            this.description = ''
        }
    }

    constuct(data) {
        this.constructor(data);
    }
}
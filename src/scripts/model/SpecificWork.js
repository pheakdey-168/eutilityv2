export default class SpecificWork {
    constructor(data = {}) {
        if (!data) {
            this.id = data.id || ''
            this.name = data.name || ''
            this.typeOfWork = data.typeOfWork || {}
        } else {
            this.id = ''
            this.name = ''
            this.typeOfWork = {}
        }
    }

    constuct(data) {
        this.constructor(data);
    }
}
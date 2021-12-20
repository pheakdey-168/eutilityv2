export default class Variants {
    constructor(data = {}) {
        if (!data) {
            this.id = data.id || ''
            this.name = data.name || ''
            this.code = data.code || ''

        } else {
            this.id = ''
            this.name = ''
            this.code = ''

        }
    }

    constuct(data) {
        this.constructor(data);
    }
}
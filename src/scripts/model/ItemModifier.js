export default class ItemModifier {
    constructor(data = {}) {
        if (!data) {
            this.id = data.id || ''
            this.name = data.name || ''
            this.uom = data.uom || {}
            this.price = data.price || 0
            this.category = data.category || {id: ''}
            this.group = data.group || {}
            this.item = data.item || {}
        } else {
            this.id = ''
            this.name = ''
            this.uom = {}
            this.price = 0
            this.category = {id: ''}
            this.group = {}
            this.item = {}
        }
    }

    constuct(data) {
        this.constructor(data);
    }
}

const store = require("@/institute")
const {institute} = store.default.state
export default class Currency {
    constructor(data = {}) {
        this.id                     = data.id || ''
        this.name                   = data.name || ''
        this.code                   = data.code || ''
        this.symbol                 = data.symbol || ''
        this.type                   = data.type || ''
        this.symbolNative           = data.symbolNative || ''
        this.rate                   = data.rate || 1
        this.dateFormat             = institute.dateFormat

    }

    constuct(data) {
        this.constructor(data);
    }
}
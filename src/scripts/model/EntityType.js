const store = require("@/institute")
const { instituteId } = store.default.state.cookies

export default class EntityType {
    constructor(data = {}) {
        this.uuid           = data.uuid || ''
        this.code           = data.code || ''
        this.name           = data.name || ''
        this.description    = data.description || ''
        this.type_of        = data.type_of || ''
        this.institute_id   = data.institute_id || instituteId
    }
    
    constuct(data) {
        this.constructor(data);
    }
}
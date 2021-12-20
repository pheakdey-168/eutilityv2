export default class UserPin {
    constructor(data = {}) {
        this.id = data.id || ''
        this.name = data.name || ''
        this.pinCode = data.pinCode || ''
        this.groupMember = data.groupMember || []
        this.menu = data.menu || []
        this.createdAt = data.createdAt || new Date().toISOString().substr(0, 10)
    }

    constuct(data) {
        this.constructor(data);
    }
}
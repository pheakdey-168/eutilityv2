export default class GroupMember {
    constructor(data = {}) {
        this.id = data.id || ''
        this.name = data.name || ''
        this.mainBlock = data.mainBlock || {}
        this.mainBlockID = data.mainBlockID || ''
        this.subBlock = data.subBlock || {}
        this.subBlockID = data.subBlockID || ''
        this.zone = data.zone || {}
        this.zoneID = data.zoneID || ''
        this.bankingDay = data.bankingDay || 1
        this.allowSaving = data.allowSaving || false
        this.createdAt = data.createdAt || new Date().toISOString().substr(0, 10)
    }

    constuct(data) {
        this.constructor(data);
    }
}
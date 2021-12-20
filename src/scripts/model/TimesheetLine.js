const store = require("@/institute.js")
const {institute} = store.default.state
export default class TimesheetLine {
    constructor(data = {}) {
        this.timeFormat     = 'hh:mm:ss tt' 
        this.id             = data.id || ''
        this.date           = data.date ||  ''
        this.checkIn        = data.checkIn || ''
        this.checkOut       = data.checkIn || ''
        this.hours          = data.hours || ''
        this.typeOFWork     = data.typeOFWork || {}
        this.specificWork   = data.specificWork || {}
        this.engagment      = data.engagment ||''
        this.description    = data.description || ''
        this.dateFormat     = data.dateFormat || institute.dateFormat
    }
    constuct(data) {
        this.constructor(data);
    }
}
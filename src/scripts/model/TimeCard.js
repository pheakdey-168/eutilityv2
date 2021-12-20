const store = require("@/institute.js")
const {institute} = store.default.state
export default class TimeCard {
    constructor(data = {}) {
        this.timeFormat             = 'hh:mm:ss tt' 
        this.monthOf                = data.monthOf || ''
        this.timeCardLine           = data.timeCardLine || {}
        this.totalWork              = data.totalWork || ''
        this.totalOverTimeWeekend   = data.totalOverTimeWeekend || ''
        this.totalOverTimeHoliday   = data.totalOverTimeHoliday || ''
        this.segment                = data.segment || {}
        this.segmentId              = data.segmentId || ''
        this.location               = data.location || {}
        this.locationId             = data.locationId || ''
        this.dateFormat             = data.dateFormat || institute.dateFormat
    }
    constuct(data) {
        this.constructor(data);
    }
}
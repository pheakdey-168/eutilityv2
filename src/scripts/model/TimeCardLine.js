const store = require("@/institute.js")
const {institute} = store.default.state
export default class TimeCardLine {
    constructor(data = {}) {
        this.timeFormat     = 'hh:mm:ss tt' 
        this.date               = data.date || ''
        this.employeeUid        = data.employeeUid || ''
        this.employeeId         = data.employeeId || ''
        this.employeeName       = data.employeeName || ''
        this.timeTable          = data.timeTable || ''
        this.clockedIn          = data.clockedIn || ''
        this.clockedOut         = data.clockedOut || ''
        this.overTimeWeekend    = data.overTimeWeekend || ''
        this.overTimeHoliday    = data.overTimeHoliday || ''
        this.workTime           = data.workTime || ''
        this.dateFormat         = data.dateFormat || institute.dateFormat
    }
    constuct(data) {
        this.constructor(data);
    }
}
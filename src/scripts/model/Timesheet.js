export default class Timesheet {
    constructor(data = {}) {
        this.id = data.id || ''
        this.employee = data.employee || {}
        this.monthOf = data.monthOf || ''
        this.location = data.location || {}
        this.timeSheetRecord = data.timeSheetRecord || {}
    }

    constuct(data) {
        this.constructor(data);
    }
}
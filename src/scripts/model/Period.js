export default class Period {
    constructor(data = {}) {
        if (!data) {
            this.id = data.id || ''
            this.paymentPeriod = data.paymentPeriod || []
            this.hourPerDay = data.hourPerDay || ''
            this.overtimeForWeekend =  data.overtimeForWeekend || ''
            this.overtimeForNationalHoliday = data.overtimeForNationalHoliday || ''
        } else {
            this.id = ''
            this.paymentPeriod  = []
            this.hourPerDay = ''
            this.overtimeForWeekend = ''
            this.overtimeForNationalHoliday = ''
        }
    }

    constuct(data) {
        this.constructor(data);
    }
}
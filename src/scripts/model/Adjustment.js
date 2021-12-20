export default class Adjustment {
    constructor(data = {}) {
        this.employeeId             = data.employeeId || ''
        this.employeeName           = data.employeeName || ''
        this.amount                 = data.amount || 0
        this.employee              = data.employee || {}
        this.payrollComponent       = data.payrollComponent || {}
    }
    constuct(data) {
        this.constructor(data);
    }
}
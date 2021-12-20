export default class PayrollList {
    constructor(data = {}) {
        this.employeeId             = data.employeeId || ''
        this.employeeName           = data.employeeName || ''
        this.amount                 = data.amount || ''
        this.payrollComponent       = data.payrollComponent || ''
    }
    constuct(data) {
        this.constructor(data);
    }
}
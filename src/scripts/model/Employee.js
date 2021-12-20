export default class Employee {
    constructor(data = {}) {
        this.id = data.id || ''
        this.employeeId = data.employeeId || ''
        this.firstName = data.firstName || ''
        this.firstNameLocale = data.firstNameLocale || ''
        this.lastName = data.lastName || ''
        this.lastNameLocale = data.lastNameLocale || ''
        this.gender = data.gender || ''
        this.employeeType = data.employeeType || ''
        this.dob = data.dob || new Date().toISOString().substr(0, 10)
        this.identityId = data.identityId || ''
        this.identityType = data.identityType || ''
        this.address = data.address || ''
        this.phone = data.phone || ''
        this.email = data.email || ''
        this.salaryAcc = data.salaryAcc || {}
        this.salaryAdvanceAcc = data.salaryAdvanceAcc || {}
        this.payrollLiabilitie = data.payrollLiabilitie || {}
        this.image = data.image || {}
        this.country = data.country || {}
        this.nationality = data.nationality || {}
        this.maritalStatus = data.maritalStatus || {}
        this.noOfChildren = data.noOfChildren || 0
        this.bank = data.bank || {}
        this.bankAccount = data.bankAccount || ''
        this.paymentPeriod = data.paymentPeriod || {}
        this.status = data.status || 1
        this.natureEmployee = data.natureEmployee || ''
        this.paymentMethod  = data.paymentMethod || {}

        if(data.uuid){
            this.id = data.uuid;
            this.employeeId = data.number;

            let nameSplited = data.name.split(" ");
            this.firstName = nameSplited[0];
            this.lastName = nameSplited[1];
        }
    }

    constuct(data) {
        this.constructor(data);
    }
}
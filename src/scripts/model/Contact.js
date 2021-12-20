export default class Contact {
    constructor(data = {}) {
        this.uuid = data.uuid || ''
        this.number = data.number || ''
        this.name = data.name || ''
        this.address = data.address || ''
        this.phone = data.phone || ''
        this.email = data.email || ''

        if(data.supplierType){// Supplier
            this.uuid = data.id || ''
        } else if(data.employeeId){// Employee
            this.uuid = data.id || ''
            this.number = data.employeeId || ''
            this.name = data.firstName +' '+ data.lastName || ''
        }
    }

    constuct(data) {
        this.constructor(data);
    }
}
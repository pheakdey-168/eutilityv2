/*
 * Last modified : 4/15/21, 4:13 PM in Project banhji-accounting-web-module
 * Copyright (c) 2021. Chandarith Chea under Company BanhJi Fintech Co., Ltd
 * Facebook Profile : https://www.facebook.com/profile.php?id=100011194806947
 * Github Profile : https://github.com/Darith-Mokpost
 * Instagram Profile : https://www.instagram.com/chandarith_chea
 */

export default class SalaryRecord {
    constructor(data = {}) {
        this.id                     = data.id || ''
        this.date                   = data.date || ''
        this.number                 = data.number || ''
        this.reference              = data.reference || ''
        this.employee               = data.employee || {}
        this.natureType             = data.natureType || ''
        this.amountToPaid           = data.amountToPaid || ''
        this.spouse                 = data.spouse || ''
        this.numMinor               = data.numMinor || ''
        this.taxRate                = data.taxRate || ''
        this.amountTaxSalary        = data.amountTaxSalary || ''
        this.amountTaxSalaryUS      = data.amountTaxSalaryUS || ''
    }

    constuct(data) {
        this.constructor(data);
    }
}
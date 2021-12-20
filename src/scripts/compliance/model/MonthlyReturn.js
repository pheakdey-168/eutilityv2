/*
 * Last modified : 3/25/21, 2:26 PM in Project banhji-accounting-web-module
 * Copyright (c) 2021. Chandarith Chea under Company BanhJi Fintech Co., Ltd
 * Facebook Profile : https://www.facebook.com/profile.php?id=100011194806947
 * Github Profile : https://github.com/Darith-Mokpost
 * Instagram Profile : https://www.instagram.com/chandarith_chea
 */
export default class MonthlyReturn {
    constructor(data = {}) {
        this.id = data.id || ''
        this.number = data.number || ''
        this.lastNumber = data.lastNumber || ''
        this.abbr = data.abbr || ''
        this.materialType = data.materialType || {}
        this.transactionType = data.transactionType || {}
        this.structure = data.structure || ''
        this.transactionDate = data.transactionDate || ''
        this.sequcencing = data.sequcencing || ''
        this.progress = data.progress || ''
        this.type = data.type || ''
        this.dateSale = data.dateSale || ''
        this.datePurchase = data.datePurchase || ''
        this.dateWht = data.dateWht || ''
        this.dateSalary = data.dateSalary || ''
        this.dateSubmit = data.dateSubmit || ''
        this.numSubmit = data.numSubmit || ''
        this.methodSubmit = data.methodSubmit || ''
        this.noteSubmit = data.noteSubmit || ''
        this.taxAgentSubmit = data.taxAgentSubmit || ''
        this.editDate = data.editDate,
        this.monthOf = data.monthOf || new Date().toISOString().substr(0, 7),
        this.amountPaid = data.amountPaid || '',
        this.exChangeRate = data.exChangeRate || '',
        this.editBy = data.editBy || '',
        this.step = data.step || ''
        this.status = data.status || ''
    }

    constuct(data) {
        this.constructor(data);
    }
}

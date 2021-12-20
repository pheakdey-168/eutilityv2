/*
 * Last modified : 3/30/21, 9:33 AM in Project banhji-accounting-web-module
 * Copyright (c) 2021. Chandarith Chea under Company BanhJi Fintech Co., Ltd
 * Facebook Profile : https://www.facebook.com/profile.php?id=100011194806947
 * Github Profile : https://github.com/Darith-Mokpost
 * Instagram Profile : https://www.instagram.com/chandarith_chea
 */

export default class PurchaseRecord {
    constructor(data = {}) {
        this.id                     = data.id || ''
        this.date                   = data.date || ''
        this.reference              = data.reference || ''
        this.supplier               = data.supplier || {}
        this.description            = data.description || ''
        this.typeProduct            = data.typeProduct || ''
        this.amount                 = data.amount || 0
        this.totalAmountInclusive   = data.totalAmountInclusive || 0
        this.totalAmountNetVat      = data.totalAmountNetVat || 0
        this.totalVAT               = data.totalVAT || 0
        this.monthlyDate            = data.monthlyDate || ''
        this.monthlyReturnId        = data.monthlyReturnId || ''
        this.itemLine               = data.itemLine || []
        this.dataSource             = data.dataSource || {}
        this.status                 = data.status
        this.decimal                = data.decimal || 2
    }

    constuct(data) {
        this.constructor(data);
    }
}
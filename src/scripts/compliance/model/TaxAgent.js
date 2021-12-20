/*
 * Last modified : 4/14/21, 9:13 AM in Project banhji-accounting-web-module
 * Copyright (c) 2021. Chandarith Chea under Company BanhJi Fintech Co., Ltd
 * Facebook Profile : https://www.facebook.com/profile.php?id=100011194806947
 * Github Profile : https://github.com/Darith-Mokpost
 * Instagram Profile : https://www.instagram.com/chandarith_chea
 */

export default class TaxAgent {
    constructor(data = {}) {
        this.id = data.id || ''
        this.name = data.name || ''
        this.emailPersonal = data.emailPersonal || ''
        this.phonePersonal = data.phonePersonal || ''
        this.email  = data.email || ''
        this.phone = data.phone || ''
        this.banhjiId = data.banhjiId || ''
    }
    constuct(data) {
        this.constructor(data);
    }
}
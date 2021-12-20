/*
 * Last modified : 3/4/21, 2:09 PM in Project banhji-accounting-web-module
 * Copyright (c) 2021. Chandarith Chea under Company BanhJi Fintech Co., Ltd
 * Facebook Profile : https://www.facebook.com/profile.php?id=100011194806947
 * Github Profile : https://github.com/Darith-Mokpost
 * Instagram Profile : https://www.instagram.com/chandarith_chea
 */

export default class DeliveryAgency {
    constructor(data = {}) {
        this.id = data.id || ''
        this.aType = data.aType || 1
        this.type = data.type || ''
        this.cusSup = data.cusSup || {}
    }

    constuct(data) {
        this.constructor(data);
    }
}
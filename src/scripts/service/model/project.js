/*
 * Last modified : 3/17/21, 9:55 AM in Project banhji-accounting-web-module
 * Copyright (c) 2021. Chandarith Chea under Company BanhJi Fintech Co., Ltd
 * Facebook Profile : https://www.facebook.com/profile.php?id=100011194806947
 * Github Profile : https://github.com/Darith-Mokpost
 * Instagram Profile : https://www.instagram.com/chandarith_chea
 */
export default class ServiceProject {
  constructor(data = {}) {
    this.id = data.id || ''
    this.name = data.name || ''
    this.code = data.code || ''
    this.description = data.description || ''
    this.startDate = data.startDate || new Date().toISOString().substr(0, 10)
    this.endDate = data.endDate || new Date().toISOString().substr(0, 10)
    this.customer = data.customer || {}
    this.saleOrder = data.saleOrder || {}
    this.amount = data.amount || 0
  }

  constuct(data) {
    this.constructor(data);
  }
}

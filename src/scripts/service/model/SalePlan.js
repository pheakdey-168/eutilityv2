/*
 * Last modified : 3/17/21, 4:49 PM in Project banhji-accounting-web-module
 * Copyright (c) 2021. Chandarith Chea under Company BanhJi Fintech Co., Ltd
 * Facebook Profile : https://www.facebook.com/profile.php?id=100011194806947
 * Github Profile : https://github.com/Darith-Mokpost
 * Instagram Profile : https://www.instagram.com/chandarith_chea
 */
export default class SalePlan {
  constructor(data = {}) {
    this.id = data.id || ''
    this.customer = data.customer || ''
    this.types = data.types || ''
    this.location = data.location || ''
    this.segment = data.segment || ''
    this.detailPlan = data.detailPlan || []
    this.amount = data.amount || 0
  }

  constuct(data) {
    this.constructor(data);
  }
}

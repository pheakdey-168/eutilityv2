/*
 * Last modified : 3/12/21, 10:28 AM in Project banhji-accounting-web-module
 * Copyright (c) 2021. Chandarith Chea under Company BanhJi Fintech Co., Ltd
 * Facebook Profile : https://www.facebook.com/profile.php?id=100011194806947
 * Github Profile : https://github.com/Darith-Mokpost
 * Instagram Profile : https://www.instagram.com/chandarith_chea
 */
export default class TaskCategory {
  constructor(data = {}) {
    this.id = data.id || ''
    this.name = data.name || ''
    this.description = data.description || ''
  }
  constuct(data) {
    this.constructor(data);
  }
}

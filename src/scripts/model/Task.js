/*
 * Last modified : 3/12/21, 10:28 AM in Project banhji-accounting-web-module
 * Copyright (c) 2021. Chandarith Chea under Company BanhJi Fintech Co., Ltd
 * Facebook Profile : https://www.facebook.com/profile.php?id=100011194806947
 * Github Profile : https://github.com/Darith-Mokpost
 * Instagram Profile : https://www.instagram.com/chandarith_chea
 */
export default class Task {
  constructor(data = {}) {
    this.id = data.id || ''
    this.name = data.name || ''
    this.category = data.category || {}
    this.type = data.type || {}
    this.subType = data.subType || {}
    this.dueDate = data.dueDate || new Date().toISOString().substr(0, 10)
    this.frequency = data.frequency || ''
    this.assignTo = data.assignTo || {}
    this.linkAcc = data.linkAcc || {}
    this.linkTask = data.linkTask || {}
    this.purpose = data.purpose || ''
    this.instruction = data.instruction || ''
    this.completedBy = data.completedBy || ''
    this.completedDate = data.completedDate || ''
    this.completedModule = data.completedModule || ''
    this.reference = data.reference || ''
    this.status = data.status || {}
  } constuct(data) {
    this.constructor(data);
  }
}

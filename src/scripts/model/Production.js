/*
 * Last modified : 2/8/21, 3:34 PM in Project banhji-accounting-web-module
 * Copyright (c) 2021. Chandarith Chea under Company BanhJi Fintech Co., Ltd
 * Facebook Profile : https://www.facebook.com/profile.php?id=100011194806947
 * Github Profile : https://github.com/Darith-Mokpost
 * Instagram Profile : https://www.instagram.com/chandarith_chea
 */
const productOrder = require("./ProductionOrder")
const bom          = require("./Bom")
export default class Production {
  constructor(data = {}) {
    if (!data) {
      this.id                           = data.id || ''
      this.number                       = data.number || ''
      this.abbr                         = data.abbr || ''
      this.structure                    = data.structure || ''
      this.transactionDate              = data.transactionDate || ''
      this.sequcencing                  = data.sequcencing || ''
      this.lastNumber                   = data.lastNumber || ''
      this.totalCost                    = data.totalCost || 0
      this.variant                      = data.variant || 0
      this.transactionType              = data.transactionType || {}
      this.productionOrder              = data.productionOrder || new productOrder({})
      this.qty                          = data.qty || ''
      this.product                      = data.product || {}
      this.uom                          = data.uom || {}
      this.bom                          = data.bom || new bom({})
      this.startedAt                    = data.startAt || new Date().toISOString().substr(0, 10)
      this.completedAt                  = data.completeAt || ''
      this.status                       = data.status || {}
    }
  }
  constuct(data) {
    this.constructor(data);
  }
}

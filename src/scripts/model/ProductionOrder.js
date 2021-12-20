/*
 * Last modified : 2/5/21, 1:57 PM in Project banhji-accounting-web-module
 * Copyright (c) 2021. Chandarith Chea under Company BanhJi Fintech Co., Ltd
 * Facebook Profile : https://www.facebook.com/profile.php?id=100011194806947
 * Github Profile : https://github.com/Darith-Mokpost
 * Instagram Profile : https://www.instagram.com/chandarith_chea
 */
const bomModel = require("./Bom")
export default class ProductionOrder {
  constructor(data = {}) {
    if (!data) {
      this.id                         = data.id || ''
      this.number                     = data.number || ''
      this.abbr                       = data.abbr || ''
      this.structure                  = data.structure || ''
      this.transactionDate            = data.transactionDate || ''
      this.sequcencing                = data.sequcencing || ''
      this.lastNumber                 = data.lastNumber || ''
      this.totalCost                  = data.totalCost || 0
      this.variant                    = data.variant || 0
      this.transactionType            = data.transactionType || {}
      this.product                    = data.product || {}
      this.qty                        = data.qty || 1
      this.yieldUOM                   = data.yieldUOM || ''
      this.bom                        = data.bom || new bomModel({})
      this.dueDate                    = data.dueDate || new Date().toISOString().substr(0, 10)
      this.monthOf                    = data.monthOf || new Date().toISOString().substr(0, 10)
      this.segment                    = data.segment || {}
      this.saleChannel                = data.saleChannel || {}
      this.location                   = data.location || {}
      this.project                    = data.project || {}
      this.status                     = data.status || {}
    }
  }
}

/*
 * Last modified : 2/16/21, 3:46 PM in Project banhji-accounting-web-module
 * Copyright (c) 2021. Chandarith Chea under Company BanhJi Fintech Co., Ltd
 * Facebook Profile : https://www.facebook.com/profile.php?id=100011194806947
 * Github Profile : https://github.com/Darith-Mokpost
 * Instagram Profile : https://www.instagram.com/chandarith_chea
 */
export default class InventoryAdjustment {
  constructor(data = {}) {
    this.id                           = data.id || ''
    this.number                       = data.number || ''
    this.abbr                         = data.abbr || ''
    this.structure                    = data.structure || ''
    this.transactionDate              = data.transactionDate || ''
    this.itemLine                     = data.itemLine || {}
    this.sequcencing                  = data.sequcencing || ''
    this.lastNumber                   = data.lastNumber || ''
    this.adjustmentAccount            = data.adjustmentAccount || {}
    this.warehouse                    = data.warehouse || {}
    this.date                         = data.date || new Date().toISOString().substr(0, 10)
    this.transactionType              = data.transactionType || {}
    this.monthOf                      = data.monthOf || new Date().toISOString().substr(0, 7)
    this.segment                      = data.segment || {}
    this.saleChannel                  = data.saleChannel || {}
    this.location                     = data.location || {}
    this.project                      = data.project || {}
  }

  constuct(data) {
    this.constructor(data);
  }
}


/*
 * Last modified : 2/15/21, 8:31 AM in Project banhji-accounting-web-module
 * Copyright (c) 2021. Chandarith Chea under Company BanhJi Fintech Co., Ltd
 * Facebook Profile : https://www.facebook.com/profile.php?id=100011194806947
 * Github Profile : https://github.com/Darith-Mokpost
 * Instagram Profile : https://www.instagram.com/chandarith_chea
 */

export default class InteralUsage {
  constructor(data = {}) {
    this.id                           = data.id || ''
    this.number                       = data.number || ''
    this.abbr                         = data.abbr || ''
    this.structure                    = data.structure || ''
    this.transactionDate              = data.transactionDate || ''
    this.sequcencing                  = data.sequcencing || ''
    this.lastNumber                   = data.lastNumber || ''
    this.transactionType              = data.transactionType || {}
    this.totalCost                    = data.totalCost || 0
    this.date                         = data.date || new Date().toISOString().substr(0, 10)
    this.warehouse                    = data.warehouse || {}
    this.product                      = data.product || [{
      item: {},
      description: '',
      uom: {},
      yieldQTY: 0,
      cost: 0
    }]
    this.accounts                     = data.accounts || [{
      account: {},
      description: '',
      tax: {},
      amount: 0,
    }]
    this.componentsUsed               = data.componentsUsed || [{
      item: {},
      description: '',
      uom: {},
      yieldQTY: 0,
      cost: 0
    }]
    this.monthOf                      = data.monthOf || new Date().toISOString().substr(0, 7)
    this.segment                      = data.segment || {}
    this.saleChannel                  = data.saleChannel || {}
    this.location                     = data.location || {}
    this.project                      = data.project || {}
  }

  construct(data) {
    this.constructor(data)
  }
}

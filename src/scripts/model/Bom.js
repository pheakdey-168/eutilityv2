export default class Bom {
  constructor(data = {}) {
    this.id = data.id || ''
    this.number = data.number || ''
    this.abbr = data.abbr || ''
    this.materialType = data.materialType || {}
    this.structure = data.structure || ''
    this.transactionDate = data.transactionDate || ''
    this.sequcencing = data.sequcencing || ''
    this.typeBom = data.typeBom || {}
    this.type = data.type || ''
    this.transactionType = data.transactionType || {}
    this.lastNumber = data.lastNumber || ''
    this.defaultWarehouse = data.defaultWarehouse || {}
    this.finishProduct = data.finishProduct || {
      item: {},
      description: '',
      uom: {},
      yieldQTY: 0,
      cost: 0
    }
    this.otherFinishProduct = data.otherFinishProduct || {
      item: {},
      description: '',
      uom: {},
      yieldQTY: 0,
      cost: 0
    }
    this.componentUsed = data.componentUsed || {
      item: {},
      description: '',
      uom: {},
      qty: 0,
      wastage: '',
      cost: 0
    }
    this.otherCost = data.otherCost || {
      account: {},
      description: '',
      amount: 0,
      tax: {}
    }
    this.totalCost = data.totalCost || 0
    this.variant = data.variant || 0
    this.note = data.note || ''
  }

  constuct(data) {
    this.constructor(data);
  }
}

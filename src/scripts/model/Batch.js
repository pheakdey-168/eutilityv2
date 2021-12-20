export default class Batch {
  constructor(data = {}) {
    this.id = data.id || ''
    this.batchId = data.batchId || ''
    this.expireDate = data.expireDate || new Date().toISOString().substr(0, 10)
    this.description = data.description || ''
    this.variantName = data.variantName || ''
    this.stockHand = data.stockHand || ''
    this.commitStock = data.commitStock || ''
    this.availableStock = data.availableStock || ''
    this.expireStock = data.expireStock || ''
  }
  constuct(data) {
    this.constructor(data);
  }
}
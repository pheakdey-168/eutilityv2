export default class Warranty {
  constructor(data = {}) {
    this.id = data.id || ''
    this.warrantyNo = data.warrantyNo || ''
    this.invoice = data.invoice || {}
    this.customer = data.customer || {}
    this.date = data.date || new Date().toISOString().substr(0, 10)
    this.warrantyStartDate = data.warrantyStartDate || new Date().toISOString().substr(0, 10)
    this.itemLines = data.itemLines || {}
  }
  constuct(data) {
    this.constructor(data);
  }
}
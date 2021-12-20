export default class Prefix {
  constructor (data = {}) {
    this.id                     = data.id || ''
    this.abbr                   = data.abbr || ''
    this.name                   = data.name || ''
    this.function_               = data.function_ || ''
    this.module_                 = data.module_ || ''
    this.number                 = data.number || ''
    this.format                 = data.format || ''
    this.sequence               = data.sequence || ''
    this.structure              = data.structure || ''
    this.prefixSeparator        = data.prefixSeparator || ''
    this.numberSeparator        = data.numberSeparator || ''
    this.sequencing             = data.sequencing || ''
    this.isSystem               = data.isSystem || ''
    this.suffix                 = data.suffix || ''
    this.type                   = data.type || ''
    this.preview                = data.preview || ''
  }

  constuct(data) {
    this.constructor(data);
  }
}
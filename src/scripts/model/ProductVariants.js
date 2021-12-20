export default class ProductVariants {
    constructor(data = {}) {
        if (!data) {
            this.id = data.id || ''
            this.name = data.name || ''
            this.sku = data.sku || ''
            this.type = data.type || {}
            this.product = data.product || {}
            this.variant = data.variant || {}
            this.uom = data.uom || {}
            this.reOrderQty = data.reOrderQty || 0
            this.saleDescription = data.saleDescription || ''
            this.brand = data.brand || {}
            this.countryOrigin = data.countryOrigin || {}
            this.supplier = data.supplier || {}
            this.barcode = data.barcode || ''
            this.isForPOS = data.isForPOS || false
            this.useAsFavorite = data.useAsFavorite || false
            this.isNegativeSale = data.isNegativeSale || false
            this.isForEcommerce = data.isForEcommerce || false
            this.isNegativeSaleForSaleChannel = data.isNegativeSaleForSaleChannel || false
            this.minOrderQty = data.minOrderQty || 0
            this.maxOnlineStock = data.maxOnlineStock || 0
            this.images = data.images || {}
        } else {
            this.id = ''
            this.name = ''
            this.sku = ''
            this.product = {}
            this.variant = {}
            this.type =  {}
            this.uom = {}
            this.reOrderQty = 0
            this.saleDescription = ''
            this.brand = {}
            this.countryOrigin = {}
            this.supplier = {}
            this.barcode = ''
            this.isForPOS = true
            this.useAsFavorite = false
            this.isNegativeSale = false
            this.isForEcommerce = false
            this.isNegativeSaleForSaleChannel = false
            this.minOrderQty = 0
            this.maxOnlineStock = 0
            this.images = {}
        }
    }

    construct(data) {
        this.constructor(data);
    }
}
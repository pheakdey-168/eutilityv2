const cookier = require("@/cookier.js").cookie
cookier.init()
const store = require("@/institute.js")
const { instituteId } = store.default.state.cookies
const myUrl = require("@/url")
const baseUrl = myUrl.url
const url          = baseUrl + '/item-price/'
// const url          = 'https://dev-apis.banhji.com/price-promotion/'

module.exports = {

    price_level_post                    : url + 'pricelevel/institute/' + instituteId + '/add',
    price_level_get                     : url + 'pricelevel/institute/' + instituteId + '/list',

    price_level_type_post               : url + 'pricelevel-type/institute/' + instituteId + '/add',
    price_level_type_get                : url + 'pricelevel-type/institute/' + instituteId + '/list',

    uom_conversion                      : url + 'uom-conversion/item/',
    uom_conversion_new                  : url + 'uom-conversion-new/item/',
    uom_price                           : url + 'uom-price/item/',
    uom_service_conversion              : url + 'uom-conversion/service-item/',
    uom_service_price                   : url + 'uom-price/service-item/',

    item_byPriceLevel                   : url + 'item/institute/' + instituteId + '/filter',
    item_setPrice_post                  : url + 'item-price/institute/' + instituteId + '/add',
    item_uomPrice_get                   : url + 'item-uom-price/institute/' + instituteId + '/list?',
}
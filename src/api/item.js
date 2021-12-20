const cookier = require("@/cookier.js").cookie
cookier.init()
const store = require("@/institute.js")
const { instituteId } = store.default.state.cookies

const myUrl = require("@/url")
const baseUrl = myUrl.url
const url          = baseUrl + '/entity-item/'
// const url          = 'https://dev-apis.banhji.com/entity-items/'

module.exports = {
    product_variant_get                 : url + 'item/',
    product_variant_post                : url + 'item/institute/' + instituteId + '/add',
    product_variant_list                : url + 'item/institute/' + instituteId + '/search/',
    product_variant_category            : url + 'item/category/',
    upload                              : url + 'item/institute/' + instituteId + '/upload',
    service_item_post                   : url + 'service-item/institute/' + instituteId + '/add',
    service_item_get                    : url + 'service-item/institute/' + instituteId + '/list',
    service_item_filter                 : url + 'service-item/institute/' + instituteId + '/category/',
    service_item_list                   : url + 'service-item/institute/' + instituteId + '/search/',
    service_upload                      : url + 'service-item/institute/' + instituteId + '/upload',

    transaction_item_post               : url + 'transaction-item/institute/' + instituteId + '/add',
    transaction_item_get                : url + 'transaction-item/institute/' + instituteId + '/list',
    saleUnit_item_post                  : url + 'saleunit-item/institute/' + instituteId + '/add',
    saleUnit_item_get                   : url + 'saleunit-item/institute/' + instituteId + '/list',
    discount_item_post                  : url + 'discount-item/institute/' + instituteId + '/add',
    discount_item_get                   : url + 'discount-item/institute/' + instituteId + '/list',
    other_charge_post                   : url + 'other-charge/institute/' + instituteId + '/add',
    other_charge_get                    : url + 'other-charge/institute/' + instituteId + '/list',
    late_fee_post                       : url + 'late-fee/institute/' + instituteId + '/add',
    late_fee_get                        : url + 'late-fee/institute/' + instituteId + '/list',

    //item modifier
    itemModifier_post                   : url + 'item-modifier/institute/' + instituteId + '/add',
    itemModifier_list                   : url + 'item-modifier/institute/' + instituteId + '/list',
    itemModifier_search                 : url + 'item-modifier/institute/' + instituteId + '/',
    item_search                         : url + 'item/institute/' + instituteId + '/filter/',
    item_variant_search                 : url + 'item/institute/' + instituteId + '/item/'
}
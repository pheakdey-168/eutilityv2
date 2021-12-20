const cookier = require("@/cookier.js").cookie
cookier.init()
const store = require("@/institute.js")
const { instituteId } = store.default.state.cookies
const myUrl = require("@/url")
const baseUrl = myUrl.url
const url          = baseUrl + '/entity-customer/'

// const url          = 'https://dev-apis.banhji.com/entity-customers/'
const wcapSettingUrl    = 'https://7m0h9en2s3.execute-api.ap-southeast-1.amazonaws.com/dev/v1/wcapsettings/'

module.exports = {
    customer_post                               : url + 'customer/institute/' + instituteId + '/add',
    customer_get                                : url + 'customer/institute/' + instituteId + '/list',
    customer_getOne                             : url + 'customer/institute/' + instituteId + '/list/',
    customer_search                             : url + 'customer/institute/' + instituteId + '/search',
    customer_center                             : url + 'customer/institute/' + instituteId ,
    customer_directory                          : url + 'customer/institute/' + instituteId + '/directory',
    customer_put                                : url + 'customer/institute/' + instituteId + '/update/',
    //customer type setting
    customer_type_post                          : url + 'custype/institute/' + instituteId + '/add',
    customer_type_get                           : url + 'custype/institute/' + instituteId + '/list',
    customer_type_put                           : url + 'custype/institute/' + instituteId + '/update/',
    customer_nature_get                         : url + 'customer-nature/institute/' + instituteId + '/list',
    //customer group setting
    customer_group_post                         : url + 'cusgroup/institute/' + instituteId + '/add',
    customer_group_get                          : url + 'cusgroup/institute/' + instituteId + '/list',
    customer_group_put                          : url + 'cusgroup/institute/' + instituteId + '/update/',
    wcap_setting_get                            : wcapSettingUrl + 'institute/' + instituteId + '/type/',
    sale_channel_post                           : url + 'sale-channel/institute/' + instituteId + '/add',
    sale_channel_get                            : url + 'sale-channel/institute/' + instituteId + '/list',

    project_post                                : url + 'customer-project/institute/' + instituteId + '/add',
    project_get                                 : url + 'customer-project/institute/' + instituteId + '/list',
    project_by_customer_get                     : url + 'customer-project/institute/' + instituteId + '/customer/',
    project_by_supplier_get                     : url + 'customer-project/institute/' + instituteId + '/supplier/',

    sale_form_content_post                      : url + 'sale-form-content/institute/' + instituteId + '/add',
    sale_form_content_get                       : url + 'sale-form-content/institute/' + instituteId + '/list',
    //lead
    lead_post                               : url + 'lead/institute/' + instituteId + '/add',
    lead_get                                : url + 'lead/institute/' + instituteId + '/list',
    lead_getOne                             : url + 'lead/institute/' + instituteId + '/list/',
}
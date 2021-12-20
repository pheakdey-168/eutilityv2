const cookier = require("@/cookier.js").cookie
cookier.init()
const store = require("@/institute.js")
const { instituteId } = store.default.state.cookies

const myUrl = require("@/url")
const baseUrl = myUrl.url
const url          = baseUrl + '/entity-setting/'
// const url          = 'https://dev-apis.banhji.com/settings/'

module.exports = {

    class_get                        : url + 'institute/' + instituteId + '/class/list',
    class_subclass_get               : url + 'institute/' + instituteId + '/class/',
    class_post                       : url + 'institute/' + instituteId + '/class/add',

    segment_get                      : url + 'institute/' + instituteId + '/segment/list',
    segment_post                     : url + 'institute/' + instituteId + '/segment/add',

    subclass_get                     : url + 'institute/' + instituteId + '/sub-class/list',
    subclass_post                    : url + 'institute/' + instituteId + '/sub-class/add',

    location_get                     : url + 'institute/' + instituteId + '/location/list',
    location_post                    : url + 'institute/' + instituteId + '/location/add',

    closing_date_get                 : url + 'institute/' + instituteId + '/closing-date/list',
    closing_date_last                : url + 'institute/' + instituteId + '/closing-date/last',
    closing_date_post                : url + 'institute/' + instituteId + '/closing-date/add',
    prefix_get                       : url + 'institute/' + instituteId + '/prefix/list',
    prefix_post                      : url + 'institute/' + instituteId + '/prefix/add',
    prefix_function_get              : url + 'institute/' + instituteId + '/prefix/function/',

    payment_option_get               : url + 'institute/' + instituteId + '/payment-option/list',
    payment_option_post              : url + 'institute/' + instituteId + '/payment-option/add',
    payment_setting_post             : url + 'institute/' + instituteId + '/payment-setting/add',
    payment_setting_get              : url + 'institute/' + instituteId + '/payment-setting/list',
    other_account_get                : url + 'institute/' + instituteId + '/other-account/list'
}
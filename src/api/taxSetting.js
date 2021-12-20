const cookier = require("@/cookier.js").cookie
cookier.init()
const store = require("@/institute.js")
const { instituteId } = store.default.state.cookies
// const instituteId  = 'institute-0ab24220-808d-11ea-9131-1d2fe2a803b1'
const myUrl = require("@/url")
const baseUrl = myUrl.url
const url          = baseUrl + '/entity-setting/'
// const url          = 'https://dev-apis.banhji.com/settings/'


module.exports = {
    tax_list_get                     : url + 'institute/' + instituteId + '/tax/list',
    tax_type_get                     : url + 'institute/' + instituteId + '/tax-type/list',
    tax_payer_get                    : url + 'institute/' + instituteId + '/tax-payer/list',
    tax_nature_get                   : url + 'institute/' + instituteId + '/tax-nature/list',
    tax_supcus_get                   : url + 'institute/' + instituteId + '/tax-supcus/list',

}
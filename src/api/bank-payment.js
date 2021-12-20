const cookier = require("@/cookier.js").cookie
cookier.init()
const store = require("@/institute.js")
const { instituteId } = store.default.state.cookies
const myUrl = require("@/url")
const baseUrl = myUrl.url
const url          = baseUrl + '/banking-payment/'

module.exports = {
    bank_connected_post                               : url + 'bank/institute/' + instituteId + '/add',
    bank_connected_get                                : url + 'bank/institute/' + instituteId + '/list',
    bank_connected_list                               : url + 'bank-connected/institute/' + instituteId + '/list',
    connected_bank_account_post                       : url + 'bank/institute/' + instituteId + '/connected-bank-account/list',
}
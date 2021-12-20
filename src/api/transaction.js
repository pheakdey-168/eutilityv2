const cookier = require("@/cookier.js").cookie
cookier.init()
const store = require("@/institute.js")
const { instituteId } = store.default.state.cookies
const myUrl = require("@/url")
const baseUrl = myUrl.url
const url          = baseUrl + '/transaction/'

// const url          = 'https://dev-apis.banhji.com/transaction/'

module.exports = {
    transaction_post                               : url + 'transaction/institute/' + instituteId + '/add',
    transaction_get                                : url + 'transaction/institute/' + instituteId + '/list',
    transaction_history                            : url + 'transaction/institute/' + instituteId + '/history',
    transaction_search                              : url + 'transaction/institute/' + instituteId + '/search',
}
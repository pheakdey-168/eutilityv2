const cookier = require("@/cookier.js").cookie
cookier.init()
const store = require("@/institute.js")
const { instituteId } = store.default.state.cookies

const myUrl = require("@/url")
const baseUrl = myUrl.url
const url          = baseUrl + '/entity-supplier/'

// const url          = 'https://dev-apis.banhji.com/entity-supplier/'

module.exports = {
    supplier_post                               : url + 'supplier/institute/' + instituteId + '/add',
    supplier_get                                : url + 'supplier/institute/' + instituteId + '/list',
    supplier_getOne                             : url + 'supplier/institute/' + instituteId + '/list/',
    supplier_search                             : url + 'supplier/institute/' + instituteId + '/search',
    supplier_center                             : url + 'supplier/institute/' + instituteId ,

    supplier_type_post                          : url + 'suptype/institute/' + instituteId + '/add',
    supplier_type_get                           : url + 'suptype/institute/' + instituteId + '/list',

    // employee_post                               : url + 'employee/institute/' + instituteId + '/add',
    // employee_center                             : url + 'employee/institute/' + instituteId + '/center',
    // employee_getOne                             : url + 'employee/institute/' + instituteId + '/list/',
    // employee_search                             : url + 'employee/institute/' + instituteId + '/search',
    purchase_form_content_post                      : url + 'purchase-form-content/institute/' + instituteId + '/add',
    purchase_form_content_get                       : url + 'purchase-form-content/institute/' + instituteId + '/list',

    supplier_directory                          : url + 'supplier/institute/' + instituteId + '/directory',
    importCreate                                : url + 'import/institute/' + instituteId + '/add',
}
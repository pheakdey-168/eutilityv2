const cookier = require("@/cookier.js").cookie
cookier.init()
const store = require("@/institute.js")
const { instituteId } = store.default.state.cookies

const myUrl = require("@/url")
const baseUrl = myUrl.url
const url          = baseUrl + '/entity-payroll-employees/'
// const url          = 'https://dev-apis.banhji.com/entity-payroll-employee/'

module.exports = {
    employee_post                               : url + 'employee/institute/' + instituteId + '/add',
    employee_center                             : url + 'employee/institute/' + instituteId + '/center',
    employee_getOne                             : url + 'employee/institute/' + instituteId + '/list/',
    employee_search                             : url + 'employee/institute/' + instituteId + '/search',
    employment_record_post                      : url + 'employment-record/institute/' + instituteId + '/add',
    record_by_employee_get                      : url + 'record-by-employee/institute/'+ instituteId + '/get',
    record_list_by_employee_get                 : url + 'record-list-by-employee/list',
    record_get                                  : url + 'record/institute/' + instituteId + '/list',
    timesheet_post                              : url + 'timesheet/institute/' + instituteId + '/add',
    timesheet_get                               : url + 'timesheet/institute/' + instituteId + '/list',
    timesheet_single                            : url + 'timesheet-single/institute/' + instituteId + '/list',
    transactions                                : url + 'employee-transaction/institute/' + instituteId + '/list',
    employee_info                               : url + 'employee-info/institute/' + instituteId + '/get',
    employee_dashboard                          : url + 'employee-dashboard/institute/' + instituteId + '/get',
    employee_balance                            : url + 'employee-balance/institute/' + instituteId + '/get',
}
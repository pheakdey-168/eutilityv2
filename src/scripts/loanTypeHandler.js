// const apiUrl1 	= require('@/apiUrl.js') 
const baseHandler 	= require('@/scripts/baseHandler.js')
const store             = require("@/institute.js")
const institute_id      = store.default.state.cookies.instituteId
const accountingUrl     = 'https://dev-apis.banhji.com/accounting-v2/' + institute_id + '/loan_center/types'

module.exports.getOne = (uuid) => {
    return baseHandler.getOne(accountingUrl, uuid);
}

module.exports.getAll = () => {
    return  baseHandler.getAll(accountingUrl);
}

module.exports.save =  (data) => {
    return baseHandler.save(accountingUrl, data);
}

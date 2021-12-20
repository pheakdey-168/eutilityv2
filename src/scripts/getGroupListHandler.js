const axios 	= require('axios')
const apiUrl 	= require('../apiUrl.js') 
// exports.getListAccoutGroup = function  (accountTypeNumber, ) {
//    return axios.get(apiUrl.account_group_by_account_type_get, {
//         params: {
//             acc_type_code: accountTypeNumber
//         }
//     });
// }

exports.getListAccoutGroup = async function (accountTypeNumber) {
    return await axios.get(apiUrl.account_group_by_account_type_get, {
        params: {
            acc_type_code: accountTypeNumber
        }
    });
}

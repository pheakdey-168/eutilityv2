const axios = require('axios');
const apiUrl = require('@/apiUrl.js');
const store = require('@/institute.js');
const { cookies } = store.default.state;

// INITIAL INSTITUTE
module.exports.init = async () => {
    try {
        const response = await axios.get(apiUrl.institute.company_getOne + cookies.instituteId)
        // window.console.log(response, 'inst')
        // Store
        if(Object.keys(response.data.data).length > 0) {
            store.default.state.institute = response.data.data;
        }else{
            // this.$snotify.error('Something went wrong with your company data. please contact support team.')
            if (process.env.VUE_APP_MODE == 'dev') {
                document.cookie = "banhji-token=" + ";http://localhost:8081;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT";
                window.location.href = 'http://localhost:8080/'
            } else {
                document.cookie =
                    "banhji-token=" +
                    ";domain=.banhji.com;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT";
                window.location.href = 'https://connect.banhji.com/'
            }
        }
    } catch (error) {
        window.console.error(error);
    }
}

module.exports.getCompany = async function (id) {
    try {
        const result = await axios.get(apiUrl.institute.company_get + id)
        return result.data.data
    } catch (error) {
        window.console.error(error)
    }
}

module.exports.getOneCompany = async function (id) {
    try {
        const result = await axios.get(apiUrl.institute.company_getOne + id)
        return result.data.data
    } catch (error) {
        window.console.error(error)
    }
}

module.exports.addCompany = async function (id) {
    try {
        const result = await axios.get(apiUrl.institute.company_add + id)
        return result.data.data
    } catch (error) {
        window.console.error(error)
    }
}

module.exports.saveImageProfile = async function (data) {
    try {
        const response = await axios.post(apiUrl.institute.save_image, data)
        return response.data.data
    } catch (err) {
        window.console.error(err)
    }
}

module.exports.getBt = async function () {
    try {
        const response = await axios.get(apiUrl.institute.bt)
        return response.data.business_types
    } catch (error) {
        window.console.error(error)
    }
}

module.exports.getSector = async function () {
    try {
        const response = await axios.get(apiUrl.institute.sector_get)
        return response.data.data
    } catch (err) {
        window.console.log(err)
    }
}

module.exports.getBo = async function () {
    try {
        const response = await axios.get(apiUrl.institute.bo)
        return response.data.data
    } catch (error) {
        window.console.error(error)
    }
}

module.exports.getTaxRegime = async function () {
    try {
        const response = await axios.get(apiUrl.institute.taxRegime)

        return response.data
    } catch (error) {
        window.console.error(error)
    }
}

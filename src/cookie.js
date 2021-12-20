'use strict'

const jwt = require('jsonwebtoken');
const {dataStore} =  require('./observable/store')
let getCookie = (cname) => {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1);
        if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
    }
    return "";
}

module.exports.getCookie = () => {
    try {
        let banhjiCookie = getCookie ('banhji-token');
        if (banhjiCookie !== ''){
            return jwt.verify(banhjiCookie,process.env.VUE_APP_JWT_SESCRET)
        } else {
            dataStore.isValidUser = false
            return {
                instituteId: '',
                creator: '',
                user: '',
                name: '',
                email: '',
                plan: '',
                accessToken: '',
            }
        }
    } catch (error) {
        window.console.error(error);
        return false; /* For auth validation */
    }
}

const store = require("./institute.js")
const jwt = require("jsonwebtoken")
const {data} = require('@/observable/store')
const { dataStore } = require("@/observable/store.js")

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1);
        if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
    }
    return "";
}

exports.init =  () => {
    var cookie = getCookie ('banhji-token')
    // window.console.log(cookie)
    if (cookie !== ''){
        data.cookie = cookie
        jwt.verify(cookie,process.env.VUE_APP_JWT_SESCRET, (err, decoded) => {
            if (!err){
                store.default.state.cookies = decoded;
                dataStore.isValidUser = true
                // window.console.log("true")
            }else{
                dataStore.isValidUser = false
                // window.console.log("false")
            }
        });
    }else{
        dataStore.isValidUser = false
    }
}
/*
 * Last modified : 4/14/21, 9:08 AM in Project banhji-accounting-web-module
 * Copyright (c) 2021. Chandarith Chea under Company BanhJi Fintech Co., Ltd
 * Facebook Profile : https://www.facebook.com/profile.php?id=100011194806947
 * Github Profile : https://github.com/Darith-Mokpost
 * Instagram Profile : https://www.instagram.com/chandarith_chea
 */

const axios 	= require('axios')
const apiUrl 	= require('@/apiUrl.js')

module.exports.create = async function (data) {
    try {
        return await axios.post(apiUrl.compliance.tax_agent_post, data)
    } catch (error) {
        window.console.error(error)
    }
}

module.exports.get = async function () {
    try {
        return await axios.get(apiUrl.compliance.tax_agent_get)
    } catch (error) {
        window.console.error(error)
    }
}
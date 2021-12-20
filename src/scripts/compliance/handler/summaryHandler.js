/*
 * Last modified : 4/13/21, 11:44 AM in Project banhji-accounting-web-module
 * Copyright (c) 2021. Chandarith Chea under Company BanhJi Fintech Co., Ltd
 * Facebook Profile : https://www.facebook.com/profile.php?id=100011194806947
 * Github Profile : https://github.com/Darith-Mokpost
 * Instagram Profile : https://www.instagram.com/chandarith_chea
 */

const axios 	= require('axios')
const apiUrl 	= require('@/apiUrl.js')

module.exports.create = async function (data) {
    try {
        return await axios.post(apiUrl.compliance.summary_post, data)
    } catch (error) {
        window.console.error(error)
    }
}

module.exports.get = async function () {
    try {
        return await axios.get(apiUrl.compliance.summary_get)
    } catch (error) {
        window.console.error(error)
    }
}

module.exports.getByMonthly = async function (monthly) {
    try {
        return await axios.get(apiUrl.compliance.summary_get + '/monthly/' + monthly)
    } catch (error) {
        window.console.error(error)
    }
}
/*
 * Last modified : 3/30/21, 10:04 AM in Project banhji-accounting-web-module
 * Copyright (c) 2021. Chandarith Chea under Company BanhJi Fintech Co., Ltd
 * Facebook Profile : https://www.facebook.com/profile.php?id=100011194806947
 * Github Profile : https://github.com/Darith-Mokpost
 * Instagram Profile : https://www.instagram.com/chandarith_chea
 */

const axios 	= require('axios')
const apiUrl 	= require('@/apiUrl.js')

module.exports.create = async function (data) {
    try {
        return await axios.post(apiUrl.compliance.purchase_post, data)
    } catch (error) {
        window.console.error(error)
    }
}

module.exports.getOne = async function (id) {
    try {
        return await axios.get(apiUrl.compliance.purchase_get + '/' + id)
    } catch (error) {
        window.console.error(error)
    }
}

module.exports.getByMrId = async function (id) {
    try {
        return await axios.get(apiUrl.compliance.purchase_getByMrId + id + '/list')
    } catch (error) {
        window.console.error(error)
    }
}

module.exports.getByMonth = async function (month) {
    try {
        return await axios.get(apiUrl.compliance.purchase_getByMrId + 'month-of/' + month + '/list')
    } catch (error) {
        window.console.error(error)
    }
}

module.exports.getAll = async function () {
    try {
        return await axios.get(apiUrl.compliance.purchase_get)
    } catch (error) {
        window.console.error(error)
    }
}

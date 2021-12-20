/*
 * Last modified : 2/7/21, 3:17 PM in Project banhji-accounting-web-module
 * Copyright (c) 2021. Chandarith Chea under Company BanhJi Fintech Co., Ltd
 * Facebook Profile : https://www.facebook.com/profile.php?id=100011194806947
 * Github Profile : https://github.com/Darith-Mokpost
 * Instagram Profile : https://www.instagram.com/chandarith_chea
 */
const axios = require('axios')
const apiUrl = require('@/apiUrl.js')
// save
module.exports.create = async (data) => {
  try {
    const response = await axios.post(apiUrl.warehouse.productionOrder_post, data)
    return response
  } catch (error) {
    window.console.error(error)
  }
}

module.exports.getAll = async () => {
  try {
    const response = await axios.get(apiUrl.warehouse.productionOrder_get)
    return response.data.data
  } catch (error) {
    window.console.error(error)
  }
}

module.exports.getById = async (id) => {
  try {
    const response = await axios.get(apiUrl.warehouse.productionOrder_getById + id + '/list')
    return response.data.data
  }catch (e) {
    window.console.error(e)
  }
}

/*
 * Last modified : 3/4/21, 10:57 AM in Project banhji-accounting-web-module
 * Copyright (c) 2021. Chandarith Chea under Company BanhJi Fintech Co., Ltd
 * Facebook Profile : https://www.facebook.com/profile.php?id=100011194806947
 * Github Profile : https://github.com/Darith-Mokpost
 * Instagram Profile : https://www.instagram.com/chandarith_chea
 */

const axios = require('axios')
const apiUrl = require('@/apiUrl')
module.exports.save = async (data) => {
  try {
    // store.default.commit(vueXKey, data)
    return await axios.post(apiUrl.warehouse.shelvingOrder_post, data)
  } catch (error) {
    window.console.error(error)
  }

}

module.exports.getAll = async () => {
  try {
    const response = await axios.get(apiUrl.warehouse.shelvingOrder_get)
    return response.data.data
  } catch (error) {
    window.console.error(error)
  }
}

module.exports.getByReceiptOrder = async (shelvingOrderId) => {
  try {
    const response = await axios.get(apiUrl.warehouse.shelvingOrder_getById + shelvingOrderId + '/list')
    return response.data.data
  } catch (error) {
    window.console.error(error)
  }
}

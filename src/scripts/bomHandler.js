/*
 * Last modified : 2/2/21, 4:20 PM in Project banhji-accounting-web-module
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
    const response = await axios.post(apiUrl.warehouse.bom_post, data)
    return response
  } catch (error) {
    window.console.error(error)
  }

}

module.exports.getAll = async () => {
  try {
    const response = await axios.get(apiUrl.warehouse.bom_get)
    return response.data.data
  } catch (error) {
    window.console.error(error)
  }
}

module.exports.getByProduct = async (productId) => {
  try {
    const response = await axios.get(apiUrl.warehouse.bom_getByProduct + productId + '/list')
    return response.data.data
  } catch (error) {
    window.console.error(error)
  }
}

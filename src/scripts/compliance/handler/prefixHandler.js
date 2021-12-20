/*
 * Last modified : 3/25/21, 3:47 PM in Project banhji-accounting-web-module
 * Copyright (c) 2021. Chandarith Chea under Company BanhJi Fintech Co., Ltd
 * Facebook Profile : https://www.facebook.com/profile.php?id=100011194806947
 * Github Profile : https://github.com/Darith-Mokpost
 * Instagram Profile : https://www.instagram.com/chandarith_chea
 */

const axios 	= require('axios')
const apiUrl 	= require('@/apiUrl.js')
// const store		= require("@/institute.js")

module.exports.get = async function (type) {
  try {
    return await axios.get(apiUrl.compliance.prefix_get + type)
  } catch (error) {
    window.console.error(error)
  }
}

// Last Number
module.exports.lastNumber = async (data) => {
  try {
    return await axios.post(apiUrl.compliance.number_post, data)
  } catch (error) {
    window.console.error(error)
  }
}

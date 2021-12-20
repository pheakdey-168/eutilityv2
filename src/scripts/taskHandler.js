/*
 * Last modified : 3/12/21, 10:36 AM in Project banhji-accounting-web-module
 * Copyright (c) 2021. Chandarith Chea under Company BanhJi Fintech Co., Ltd
 * Facebook Profile : https://www.facebook.com/profile.php?id=100011194806947
 * Github Profile : https://github.com/Darith-Mokpost
 * Instagram Profile : https://www.instagram.com/chandarith_chea
 */

const axios = require('axios')
const apiUrl = require('@/apiUrl')
module.exports.saveTask = async (data) => {
  try {
    // store.default.commit(vueXKey, data)
    return await axios.post(apiUrl.warehouse.task_post, data)
  } catch (error) {
    window.console.error(error)
  }

}

module.exports.saveTaskType = async (data) => {
  try {
    // store.default.commit(vueXKey, data)
    return await axios.post(apiUrl.warehouse.task_setting_post, data)
  } catch (error) {
    window.console.error(error)
  }
}

module.exports.saveTaskSubType = async (data) => {
  try {
    // store.default.commit(vueXKey, data)
    return await axios.post(apiUrl.warehouse.task_setting_post, data)
  } catch (error) {
    window.console.error(error)
  }

}

module.exports.saveTaskCategory = async (data) => {
  try {
    // store.default.commit(vueXKey, data)
    return await axios.post(apiUrl.warehouse.task_setting_post, data)
  } catch (error) {
    window.console.error(error)
  }

}

module.exports.getAllTask = async () => {
  try {
    const response = await axios.get(apiUrl.warehouse.task_get)
    return response.data.data
  } catch (error) {
    window.console.error(error)
  }
}

module.exports.getTaskByFrequency = async (frequency_id) => {
  try {
    const response = await axios.get(apiUrl.warehouse.task_getByFrequency + frequency_id + '/list')
    return response.data.data
  } catch (error) {
    window.console.error(error)
  }
}

module.exports.getAllTaskType = async () => {
  try {
    const response = await axios.get(apiUrl.warehouse.task_type_get)
    return response.data.data
  } catch (error) {
    window.console.error(error)
  }
}

module.exports.getAllTaskSubType = async () => {
  try {
    const response = await axios.get(apiUrl.warehouse.task_sub_type_get)
    return response.data.data
  } catch (error) {
    window.console.error(error)
  }
}

module.exports.getAllTaskCategory = async () => {
  try {
    const response = await axios.get(apiUrl.warehouse.task_category_get)
    return response.data.data
  } catch (error) {
    window.console.error(error)
  }
}


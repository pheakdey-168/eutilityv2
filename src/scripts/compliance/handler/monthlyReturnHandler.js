/*
 * Last modified : 3/26/21, 9:52 AM in Project banhji-accounting-web-module
 * Copyright (c) 2021. Chandarith Chea under Company BanhJi Fintech Co., Ltd
 * Facebook Profile : https://www.facebook.com/profile.php?id=100011194806947
 * Github Profile : https://github.com/Darith-Mokpost
 * Instagram Profile : https://www.instagram.com/chandarith_chea
 */

const axios 	= require('axios')
const apiUrl 	= require('@/apiUrl.js')
// const store		= require("@/institute.js")

module.exports.create = async function (data) {
  try {
    return await axios.post(apiUrl.compliance.monthly_return_post, data)
  } catch (error) {
    window.console.error(error)
  }
}

module.exports.delete = async function (id) {
  try {
    return await axios.post(apiUrl.compliance.monthly_return_delete + id)
  } catch (error) {
    window.console.error(error)
  }
}

module.exports.get = async function () {
  try {
    return await axios.get(apiUrl.compliance.monthly_return_get)
  } catch (error) {
    window.console.error(error)
  }
}

module.exports.getOne = async function (id) {
  try {
    return await axios.get(apiUrl.compliance.monthly_return_get + '/' + id)
  } catch (error) {
    window.console.error(error)
  }
}

module.exports.addTxnPPI = async function (data, meta, type) {
  try {
    return await axios.post(apiUrl.compliance.txn_ppi_post + '/' + meta + '/' + type, data)
  } catch (error) {
    window.console.error(error)
  }
}

module.exports.getBalance = async function (id, meta, type) {
  try {
    return await axios.get(apiUrl.compliance.bal_ppi_get + id + '/' + meta + '/' + type)
  } catch (error) {
    window.console.error(error)
  }
}

module.exports.addTxnVAT = async function (data, meta, type) {
  try {
    return await axios.post(apiUrl.compliance.txn_vat_post + '/' + meta + '/' + type, data)
  } catch (error) {
    window.console.error(error)
  }
}

module.exports.getBalanceVat = async function (id, meta, type) {
  try {
    return await axios.get(apiUrl.compliance.bal_vat_get + id + '/' + meta + '/' + type)
  } catch (error) {
    window.console.error(error)
  }
}

module.exports.getVat = async function () {
  try {
    return await axios.get(apiUrl.compliance.vat_get)
  } catch (error) {
    window.console.error(error)
  }
}

module.exports.getPpi = async function () {
  try {
    return await axios.get(apiUrl.compliance.ppi_get)
  } catch (error) {
    window.console.error(error)
  }
}
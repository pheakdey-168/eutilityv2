const axios = require('axios')
const apiUrl = require('@/apiUrl')
module.exports.save = async (data) => {
  try {
    const response = await axios.post(apiUrl.warehouse.warranty_post, data)
    return response
  } catch (error) {
    window.console.error(error)
  }
}

module.exports.getAll = async () => {
  try {
    return await axios.get(apiUrl.warehouse.warranty_get)
  } catch (error) {
    window.console.error(error)
  }
}
const axios = require('axios')
const apiUrl = require('@/apiUrl')
module.exports.save = async (data) => {
  try {
    // store.default.commit(vueXKey, data)
    const response = await axios.post(apiUrl.warehouse.batch_post, data)
    return response
  } catch (error) {
    window.console.error(error)
  }

}

module.exports.getAll = async () => {
  try {
    return await axios.get(apiUrl.warehouse.batch_get)
  } catch (error) {
    window.console.error(error)
  }
}
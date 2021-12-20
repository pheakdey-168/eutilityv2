const baseHandler 	= require('@/scripts/baseHandler.js');
const apiUrl 	= require('@/apiUrl.js');
const axios 	= require('axios');
const store		= require("@/institute.js");

// GET BY ID
module.exports.getOne = async (id) => {
    baseHandler.getOne(apiUrl.variance_rule_setting, id)
    .then(result => {
        return result.data;
    })
}

// GET LIST
module.exports.getAll = async () => {
    try {
        if(store.default.state.varianceRules.length === 0){
            const response = await axios.get(apiUrl.variance_rule_setting);
            
            store.default.commit("setVarianceRules", response.data);
        }
        
        return store.default.state.varianceRules;
    } catch (error) {
        window.console.error(error)
    }
}

// SAVE
module.exports.save = async (data) => {
    return baseHandler.save(apiUrl.variance_rule_setting, data)
}
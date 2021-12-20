const baseHandler = require('@/scripts/baseHandler.js');
const apiUrl = require('@/apiUrl.js');
const urlPath = apiUrl.working_capital + '/reimbursements';

// GET BY ID
module.exports.getOne = async (id) => {
    try {
        const response = await baseHandler.getOne(urlPath, id);
    
        return response;
    } catch (error) {
        window.console.error(error);
    }
}

// GET LIST
module.exports.getAll = async () => {
    try {
        const response = await baseHandler.getAll(urlPath);
        
        return response;
    } catch (error) {
        window.console.error(error);
    }
}

// SAVE
module.exports.save = async (data) => {
    try {
        const response = await baseHandler.save(urlPath, data);
        
        return response;
    } catch (error) {
        window.console.error(error);
    }
}
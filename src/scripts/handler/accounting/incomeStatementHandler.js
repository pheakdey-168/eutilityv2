/* Statement Of Profit Or Loss */
const axios = require('axios');
const apiUrl = require('@/apiUrl.js');
const urlPath = apiUrl.income_statement_get;

// GET
module.exports.getIncomeStatement = async (params) => {
    try {
        const response = await axios.get(urlPath, params);
        
        return response;
    } catch (error) {
        window.console.error(error);
    }
}

// GET BY SEGMENTS
module.exports.getBySegments = async (startDate, endDate, segIds) => {
    try {
        let requests = [];
        for (const segId of segIds) {
            let request = await axios.get(urlPath,{
                params: {
                    start_date: startDate,
                    end_date: endDate,
                    group_by: "1",
                    segment_uuid: segId,
                },
            })

            /* Add requests */
            requests.push(request);
        }

        let responses = await Promise.all(requests);

        let results = [];
        for (let i = 0; i < segIds.length; i++) {
            const element = responses[i];
            results.push(element.data);
        }
        return results;
    } catch (error) {
        window.console.error(error);
    }
}
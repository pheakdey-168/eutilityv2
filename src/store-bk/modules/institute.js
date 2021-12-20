/* Cookie */
const cookieJS = require("@/cookie.js");
const { instituteId } = cookieJS.getCookie();

const instituteHandler = require("@/scripts/instituteHandler.js");

const defaultData = {
    dateFormat : "dd-MM-yyyy",
    baseCurrency : {
        name : "United States dollar",
        symbol : "US$",
        code : "USD"
    },
    reportingCurrency : {
        name : "Cambodian riel",
        symbol : "៛",
        code : "KHR"
    },
    fiscalDate : [{
        end_date : new Date().getFullYear() + '-12-31',
        institute : "",
        uuid : "",
        first_fiscal_year : new Date().getFullYear() + '-01-01',
        start_date : new Date().getFullYear() + '-01-01'
    }],
    timeZone : {
        name : "Phnom Penh",
        value : "Asia/Phnom_Penh"
    },
};

// initial state
const state = () => ({
    institute : defaultData
})

// getters
const getters = {};

// actions
const actions = {
    async init({ commit }) {
        if (instituteId !== '') {
            let response = await instituteHandler.init();
            commit("setInstitute", response.data.data);
        } else {
            commit("setInstitute", defaultData);
        }
    },
};

// mutations
const mutations = {
    setInstitute(state, value) {
        state.institute = value;
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
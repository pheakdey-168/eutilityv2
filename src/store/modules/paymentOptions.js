const PaymentOptionHandler = require('@/scripts/paymentOptionHandler');

// initial state
const state = () => ({
    list: [],
    isLoaded: false,
})

// getters
const getters = {}

// actions
const actions = {
    async getList({state, commit}) {
        if (!state.isLoaded) {
            let response = await PaymentOptionHandler.getAll();
            commit("setList", response.data.data);
            commit("setLoaded", true);
        }

        return state.list;
    },
    addList({commit}, list) {
        commit("setList", list);
        commit("setLoaded", true);
    },
}

// mutations
const mutations = {
    setList(state, list) {
        state.list = list
    },
    setLoaded(state, status) {
        state.isLoaded = status
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
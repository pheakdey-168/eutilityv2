// const complianceHandler = require('@/scripts/compliance/handler/saleHandler');

// initial state
const state = () => ({
    sale: [],
    purchase: [],
    withholding: []
})

// getters
const getters = {}

// actions
const actions = {
    addSale({ commit }, list) {
        commit("setSale", list);
    },
    pushSale({ commit }, list) {
        commit("pushSale", list);
    },
    addPurchase({ commit }, list) {
        commit("setPurchase", list)
    },
    pushPurchase({ commit }, list) {
        commit("pushPurchase", list)
    },
    pushWithholding({ commit }, list) {
        commit("pushWithholding", list)
    }
}

// mutations
const mutations = {
    setSale (state, list) {
        state.sale = list
    },
    pushSale (state, list) {
        state.sale.push(list)
    },
    setPurchase (state, list) {
        state.purchase = list
    },
    pushPurchase (state, list) {
        state.purchase.push(list)
    },
    pushWithholding (state, list) {
        state.withholding.push(list)
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
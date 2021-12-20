const BudgetHandler = require('@/scripts/handler/workingcapital/budgetHandler');

// initial state
const state = () => ({
    list: [],
    isLoaded: false,
})

// getters
const getters = {}

// actions
const actions = {
    async getList ({ state, commit }) {
        if(!state.isLoaded){
            let response = await BudgetHandler.getAll();
            commit("setList", response.data);
            commit("setLoaded", true);
        }

        return state.list;
    },
    addList({ commit }, list) {
        commit("setList", list);
        commit("setLoaded", true);
    },
    saveBudget({ state, commit }, budget) {
        let index = state.list.findIndex(i => i.uuid === budget.uuid)
        if (index > -1) { /* Update budget */
            /* Replaces 1 element at specific index */
            state.list.splice(index, 1, budget);
        }else{
            /* Add new budget */
            commit("pushBudget", budget);
        }
    },
}

// mutations
const mutations = {
    setList (state, list) {
        state.list = list
    },
    setLoaded (state, status) {
        state.isLoaded = status
    },
    pushBudget(state, budget) {
        state.list.push(budget);
    },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
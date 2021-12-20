// initial state
const state = () => ({
    pages: []
})

// getters
const getters = {}

// actions
const actions = {
    addPage ({ state, commit }, page) {
        let index = state.pages.findIndex(i => i.name === page.name);
        if (index > -1) { /* Update page */
            /* Replaces 1 element at specific index */
            state.pages.splice(index, 1, page);
        }else{
            /* Add new page */
            commit("pushPage", page);
        }
    }
}

// mutations
const mutations = {
    pushPage (state, page) {
        state.pages.push(page);
    },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
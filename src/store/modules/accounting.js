const AccountHandler = require("@/scripts/handler/accounting/account.js");
const AccountTypeHandler = require("@/scripts/handler/accounting/accountType.js");
const AccountGroupHandler = require("@/scripts/handler/accounting/accountGroup.js");

// initial state
const state = () => ({
    accounts : [],
    types : [],
    groups : [],
    accountLoaded : false,
    typeLoaded : false,
    groupLoaded : false,
})

// getters
const getters = {}

// actions
const actions = {
    /* ACCOUNT */
    async getAccounts({ state, commit }) {
        if(!state.accountLoaded){
            let response = await AccountHandler.getAll();
            commit("setAccountLoaded", true);
            commit("setAccounts", response.data);
        }

        return state.accounts;
    },
    putAccounts({ commit }, value) {
        commit("setAccounts", value);
        commit("setAccountLoaded", true);
    },
    saveAccount({ state, commit }, value) {
        let index = state.accounts.findIndex(i => i.uuid === value.uuid)
        if (index > -1) { /* Update account */
            /* Replaces 1 element at specific index */
            state.accounts.splice(index, 1, value);
        }else{
            /* Add new account */
            commit("pushAccount", value);
        }
    },

    /* TYPE */
    async getTypes({ state, commit }) {
        if(!state.typeLoaded){
            let response = await AccountTypeHandler.getAll();
            commit("setTypes", response.data);
        }

        return state.types;
    },
    putTypes({ commit }, value) {
        commit("setTypes", value);
        commit("setTypeLoaded", true);
    },
    saveType({ state, commit }, value) {
        let index = state.types.findIndex(i => i.code === value.code)
        if (index > -1) { /* Update account type */
            /* Replaces 1 element at specific index */
            state.types.splice(index, 1, value);
        }else{
            /* Add new account type */
            commit("pushType", value);
        }
    },

    /* GROUP */
    async getGroups({ state, commit }) {
        if(!state.groupLoaded){
            let response = await AccountGroupHandler.getAll();
            commit("setGroups", response.data);
        }

        return state.groups;
    },
    putGroups({ commit }, value) {
        commit("setGroups", value);
        commit("setGroupLoaded", true);
    },
    saveGroup({ state, commit }, value) {
        let index = state.groups.findIndex(i => i.code === value.code)
        if (index > -1) { /* Update account group */
            /* Replaces 1 element at specific index */
            state.groups.splice(index, 1, value);
        }else{
            /* Add new account group */
            commit("pushGroup", value);
        }
    },
}

// mutations
const mutations = {
    /* ACCOUNT */
    setAccounts(state, value) {
        state.accounts = value;
    },
    setAccountLoaded(state, value) {
        state.accountLoaded = value;
    },
    pushAccount(state, value) {
        state.accounts.push(value);
    },

    /* TYPE */
    setTypes(state, value) {
        state.types = value;
    },
    setTypeLoaded(state, value) {
        state.typeLoaded = value;
    },
    pushType(state, value) {
        state.types.push(value);
    },

    /* GROUP */
    setGroups(state, value) {
        state.groups = value;
    },
    setGroupLoaded(state, value) {
        state.groupLoaded = value;
    },
    pushGroup(state, value) {
        state.groups.push(value);
    },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
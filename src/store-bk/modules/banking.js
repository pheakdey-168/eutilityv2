const BankHandler = require("@/scripts/bankHandler.js");
const BankAccountHandler = require("@/scripts/bankAccountHandler.js");
const BankTransactionMappingHandler = require("@/scripts/bankTransactionMappingHandler.js");

// initial state
const state = () => ({
    banks : [],
    bankAccounts : [],
    bankAccountTypes : [],
    bankMappings : [],
    bankLoaded : false,
    bankAccountLoaded : false,
    bankAccountTypeLoaded : false,
    bankMappingLoaded : false,
})

// getters
const getters = {}

// actions
const actions = {
    /* BANK */
    async getBanks({ state, commit }) {
        if(!state.bankLoaded){
            let response = await BankHandler.getAll();
            commit("setBankLoaded", true);
            commit("setBanks", response.data);
        }

        return state.banks;
    },
    putBanks({ commit }, value) {
        commit("setBanks", value);
        commit("setBankLoaded", true);
    },
    saveBank({ state, commit }, value) {
        let index = state.banks.findIndex(i => i.uuid === value.uuid)
        if (index > -1) { /* Update bank */
            /* Replaces 1 element at specific index */
            state.banks.splice(index, 1, value);
        }else{
            /* Add new bank */
            commit("pushBank", value);
        }
    },

    /* BANK ACCOUNT */
    async getBankAccounts({ state, commit }) {
        if(!state.bankAccountLoaded){
            let response = await BankAccountHandler.getAll();
            commit("setBankAccountLoaded", true);
            commit("setBankAccounts", response.data);
        }

        return state.bankAccounts;
    },
    putBankAccounts({ commit }, value) {
        commit("setBankAccounts", value);
        commit("setBankAccountLoaded", true);
    },
    saveBankAccount({ state, commit }, value) {
        let index = state.bankAccounts.findIndex(i => i.uuid === value.uuid)
        if (index > -1) { /* Update bank account */
            /* Replaces 1 element at specific index */
            state.bankAccounts.splice(index, 1, value);
        }else{
            /* Add new bank account */
            commit("pushBankAccount", value);
        }
    },

    /* BANK ACCOUNT TYPE */
    async getBankAccountTypes({ state, commit }) {
        if(!state.bankAccountTypeLoaded){
            let response = await BankAccountHandler.getAllTypes();
            commit("setBankAccountTypes", response.data);
        }

        return state.bankAccountTypes;
    },
    putBankAccountTypes({ commit }, value) {
        commit("setBankAccountTypes", value);
        commit("setBankAccountTypeLoaded", true);
    },
    saveBankAccountType({ state, commit }, value) {
        let index = state.bankAccountTypes.findIndex(i => i.uuid === value.uuid)
        if (index > -1) { /* Update bank account type */
            /* Replaces 1 element at specific index */
            state.bankAccountTypes.splice(index, 1, value);
        }else{
            /* Add new bank account type */
            commit("pushBankAccountType", value);
        }
    },

    /* BANK MAPPING */
    async getBankMappings({ state, commit }) {
        if(!state.bankMappingLoaded){
            let response = await BankTransactionMappingHandler.getAll();
            commit("setBankMappingLoaded", true);
            commit("setBankMappings", response.data);
        }

        return state.bankMappings;
    },
    putBankMappings({ commit }, value) {
        commit("setBankMappings", value);
        commit("setBankMappingLoaded", true);
    },
    saveBankMapping({ state, commit }, value) {
        let index = state.bankMappings.findIndex(i => i.uuid === value.uuid)
        if (index > -1) { /* Update bank */
            /* Replaces 1 element at specific index */
            state.bankMappings.splice(index, 1, value);
        }else{
            /* Add new bank */
            commit("pushBankMapping", value);
        }
    },
}

// mutations
const mutations = {
    /* BANK */
    setBanks(state, value) {
        state.banks = value;
    },
    setBankLoaded(state, value) {
        state.bankLoaded = value;
    },
    pushBank(state, value) {
        state.banks.push(value);
    },

    /* BANK ACCOUNT */
    setBankAccounts(state, value) {
        state.bankAccounts = value;
    },
    setBankAccountLoaded(state, value) {
        state.bankAccountLoaded = value;
    },
    pushBankAccount(state, value) {
        state.bankAccounts.push(value);
    },

    /* BANK ACCOUNT TYPE */
    setBankAccountTypes(state, value) {
        state.bankAccountTypes = value;
    },
    setBankAccountTypeLoaded(state, value) {
        state.bankAccountTypeLoaded = value;
    },
    pushBankAccountType(state, value) {
        state.bankAccountTypes.push(value);
    },

    /* BANK MAPPING */
    setBankMappings(state, value) {
        state.bankMappings = value;
    },
    setBankMappingLoaded(state, value) {
        state.bankMappingLoaded = value;
    },
    pushBankMapping(state, value) {
        state.bankMappings.push(value);
    },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
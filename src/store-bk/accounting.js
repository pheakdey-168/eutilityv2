import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        accounts : [],
        accountTypes : [],
        accountGroups : [],
    },
    mutations: {
        setAccounts(state, value) {
            state.accounts = value;
        },
        setAccountTypes(state, value) {
            state.accountTypes = value;
        },
        setAccountGroups(state, value) {
            state.accountGroups = value;
        },
    },
})

export default store;
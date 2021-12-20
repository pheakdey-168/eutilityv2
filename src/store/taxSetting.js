import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        typeTax: [],
        listTax: [],
        natureTaxPayer: [],
        taxPayer: [],
        supplierCustomerTax: []
    },
    mutations: {
        setTypeTax(state, value) {
            state.typeTax = value
        },
        setListTax(state, value) {
            state.listTax = value
        },
        setNatureTaxPayer(state, value) {
            state.natureTaxPayer = value
        },
        setTaxPayer(state, value) {
            state.taxPayer = value
        },
        setSupplierCustomerTax(state, value) {
            state.supplierCustomerTax = value
        },
        pushListTax(state, value) {
            state.listTax.push(value)
        }
    },
    getters: {
        getTypeTax: state => {
            return state.typeTax
        },
        getListTax: state => {
            return state.listTax
        },
        getNatureTaxPayer: state => {
            return state.natureTaxPayer
        },
        getTaxPayer: state =>  {
            return state.taxPayer
        },
        getSupplierCustomerTax: state => {
            return state.supplierCustomerTax
        }
    }
})

export default store
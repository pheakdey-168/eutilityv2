import Vue from 'vue';
import Vuex from 'vuex';

import accounting from './modules/accounting';
import banking from './modules/banking';
import budgets from './modules/budgets';
import classes from './modules/classes';
import currencies from './modules/currencies';
import customers from './modules/customers';
import discountItems from './modules/discountItems';
import employees from './modules/employees';
import historyPage from './modules/historyPage';
import institute from './modules/institute';
import locations from './modules/locations';
import paymentOptions from './modules/paymentOptions';
import paymentTerms from './modules/paymentTerms';
import prefixes from './modules/prefixes';
import projects from './modules/projects';
import segments from './modules/segments';
import suppliers from './modules/suppliers';
import taxes from './modules/taxes';
import unitOfMeasurements from './modules/unitOfMeasurements';
import compliance from './modules/compliance';
// import createLogger from '../../../src/plugins/logger';

Vue.use(Vuex);

// const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        accounting,
        banking,
        budgets,
        classes,
        currencies,
        customers,
        discountItems,
        employees,
        historyPage,
        institute,
        locations,
        paymentOptions,
        paymentTerms,
        prefixes,
        projects,
        segments,
        suppliers,
        taxes,
        unitOfMeasurements,
        compliance
    },
    // strict: debug,
    // plugins: debug ? [createLogger()] : []
})
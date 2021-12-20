import Vue from 'vue'
export const data =  Vue.observable({
    show: false,
    resources: '',
    app:   '' ,
    cookie : ''
})
export const dataStore =  Vue.observable({
    productType: 'advances',
    isValidUser: true,
    company: {},
    pin: '',
    pinname: '',
    businessType: ''
})
export const ShowResource = () =>{
    data.show = true
}
export const hideResource = () =>{
    data.show = false
}
export const setTabActiveBudget  = (main,sub) =>{
    data.budget_tab_main = main
    data.budget_tab_sub  = sub
}


import Vue from 'vue'
import VueRouter from 'vue-router'
import {Trans} from '@/plugins/Translation'
import {dataStore} from '@/observable/store'
// import {i18n} from '@/i18n'

const store = require("@/institute.js")
// import {  data } from '@/observable/store'

function load(component) {
    // '@' is aliased to src/components
    return () => import(`@/views/${component}.vue`)
}
const jwt = require("jsonwebtoken")
Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
const routes = [{
        path: '/:locale',
        component: {
            template: "<keep-alive><router-view></router-view></keep-alive>"
        },
        beforeEnter: Trans.routeMiddleware,
        children:[
            {
                path: '/',
                name: 'dashboard',
                component: load('DashboardIndex'),
                children: [
                    {
                        path: '',
                        name: 'HomeDashboard',
                        component: load('Dashboard'),
                        meta: {
                            mainMenu: 'welcome',
                            is_first : true,
                            title:'Cooperative'

                        }
                    },
                    {
                        path: 'individual_customer/:id?',
                        name: 'Individual Customer',
                        component: () => import('../views/customers/IndividualCustomer'),
                        props: true,
                        meta: {
                            mainMenu: 'receiveable_revenue',
                            miniSideBar: false,
                            title: ('receiveable_revenue')
                        }
                    },
                    {
                        path: 'individual_supplier/:id?',
                        name: 'Individual Supplier',
                        component: load('suppliers/IndividualSupplier'),
                        props: true,
                        meta: {
                            mainMenu: 'suppliers_purchases',
                            title: 'Payables'
                            // miniSideBar: true
                        }
                    },
                    
                    
                    //main_settings
                    {
                        path: 'main_settings',
                        name: 'main_settings',
                        component: () => import('../views/settings/Settings'),
                        meta: {
                            mainMenu: 'main_settings',
                            title:'Cooperative'
                        }
                    },
                ]
            },
            {
                path: 'members',
                name: 'members',
                component: load('MemberIndex'),
                meta: {
                    product: true,
                },
                children:[
                    {
                        path: '/',
                        name: 'Members',
                        component: () => import('../views/members/Overview'),
                        meta: {
                            mainMenu: 'member_share',
                            title:'Member & Share'

                        },

                    },
                    {
                        path: 'member_center',
                        name: 'member_center',
                        component: () => import('../views/members/member/CanterTab'),
                        meta: {
                            mainMenu: 'member_share',
                            title:'Member & Share'
                        }
                    },
                    {
                        path: 'share',
                        name: 'Share',
                        component: () => import('../views/members/Share'),
                        meta: {
                            mainMenu: 'member_share',
                            title:'Member & Share'
                        }
                    },
                    {
                        path: 'share_withdrawal',
                        name: 'Share Withdrawal',
                        component: () => import('../views/members/ShareWithdrawal'),
                        meta: {
                            mainMenu: 'member_share',
                            title:'Member & Share'
                        }
                    },
                    {
                        path: 'withdraw_dividend',
                        name: 'Withdraw Dividend',
                        component: () => import('../views/members/WithdrawDividend'),
                        meta: {
                            mainMenu: 'member_share',
                            title:'Member & Share'
                        }
                    },
                    {
                        path: 'dividend',
                        name: 'Dividend',
                        component: () => import('../views/members/Dividend'),
                        meta: {
                            mainMenu: 'member_share',
                            title:'Member & Share'
                        }
                    },
                    {
                        path: 'member/:id?',
                        name: 'Add Member',
                        component: () => import('../views/members/Member'),
                        props: true,
                        meta: {
                            mainMenu: 'member_share',
                            miniSideBar: false,
                            title:'Member & Share'
                        }
                    },

                    {
                        path: 'list_of_share',
                        name: 'List of share',
                        component: () => import('../views/members/Reports'),
                        meta: {
                            mainMenu: 'reports',
                            title:'Member & Share'
                        }
                    },
                    {
                        path: 'member_list',
                        name: 'List of member',
                        component: () => import('../views/members/Reports2'),
                        meta: {
                            mainMenu: 'reports',
                            title:'Member & Share'
                        }
                    },

                    // Saving
                    {
                        path: 'savings',
                        name: 'saving',
                        component: () => import('../views/savings/saving/SavingsTab'),
                        meta: {
                            mainMenu: 'saving_management',
                            title:'Member & Share'
                        }
                    },
                    
                    
                    {
                        path: 'saving_account/:id?',
                        name: 'Add Saving',
                        component: () => import('../views/savings/AddSaving'),
                        props: true,
                        meta: {
                            mainMenu: 'saving_management',
                            miniSideBar: false,
                            title:'Member & Share'
                        }
                    },
                    {
                        path: 'saving_deposit/:id?',
                        name: 'Add Saving Deposit',
                        component: () => import('../views/savings/AddSavingDeposit'),
                        props: true,
                        meta: {
                            mainMenu: 'saving_management',
                            miniSideBar: false,
                            title:'Member & Share'
                        }
                    },
                    {
                        path: 'withdraw/:id?',
                        name: 'Add withdraw',
                        component: () => import('../views/savings/Withdraw'),
                        props: true,
                        meta: {
                            mainMenu: 'saving_management',
                            miniSideBar: false,
                            title:'Member & Share'
                        }
                    },
                    {
                        path: 'close_saving/:id?',
                        name: 'Close saving',
                        component: () => import('../views/savings/CloseSaving'),
                        props: true,
                        meta: {
                            mainMenu: 'saving_management',
                            miniSideBar: false,
                            title:'Member & Share'
                        }
                    },
                    {
                        path: 'close_month/:id?',
                        name: 'Close Month',
                        component: () => import('../views/savings/CloseMonth'),
                        props: true,
                        meta: {
                            mainMenu: 'saving_management',
                            miniSideBar: true,
                            title:'Member & Share'
                        }
                    },
                    {
                        path: 'list_of_saving',
                        name: 'List of saving',
                        component: () => import('../views/savings/Reports'),
                        meta: {
                            mainMenu: 'reports',
                            title:'Member & Share'
                        }
                    },

                    // supplier
                    {
                        path: 'vendors',
                        name: 'Vendors',
                        component: load('suppliers/Suppliers'),
                        meta: {
                            mainMenu: 'suppliers_purchases',
                            title: 'Vendors & Purchases'
                        }
                    },
                    {
                        path: 'individual_customer/:id?',
                        name: 'Individual Customer',
                        component: () => import('../views/customers/IndividualCustomer'),
                        props: true,
                        meta: {
                            mainMenu: 'receiveable_revenue',
                            miniSideBar: false,
                            title: ('Receiveable revenue')
                        }
                    },
                    {
                        path: 'individual_supplier/:id?',
                        name: 'Individual Supplier',
                        component: load('suppliers/IndividualSupplier'),
                        props: true,
                        meta: {
                            mainMenu: 'suppliers_purchases',
                            title: 'Payables'
                            // miniSideBar: true
                        }
                    },

                    {
                        path: 'credit_purchase/:id?',
                        name: 'Credit Purchase',
                        component: load('suppliers/CreditPurchases'),
                        props: true,
                        meta: {
                            mainMenu: 'suppliers_purchases',
                            miniSideBar: false,
                            title: 'Vendors & Purchases'
                        }
                    },
                    {
                        path: 'credit_purchase_view/:id?',
                        name: 'Credit Purchase View',
                        props: true,
                        component: load('suppliers/CreditPurchaseViews'),
                        meta: {
                            mainMenu: 'suppliers_purchases',
                            miniSideBar: true,
                            title: 'Vendors & Purchases'
                        }
                    },
                    {
                        path: 'expenses/:id?',
                        name: 'Expenses',
                        component: load('suppliers/Expenses'),
                        props: true,
                        meta: {
                            mainMenu: 'suppliers_purchases',
                            miniSideBar: false,
                            title: 'Vendors & Purchases'
                        }
                    },
                    {
                        path: 'expenses/view/:id',
                        name: 'Expenses View',
                        component: load('suppliers/ExpensesView'),
                        props: true,
                        meta: {
                            mainMenu: 'suppliers_purchases',
                            miniSideBar: false,
                            title: 'Vendors & Purchases'
                        }
                    },
                    {
                        path: 'cash_payment/:id?',
                        name: 'Cash Payment',
                        component: load('suppliers/CashPayments'),
                        props: false,
                        meta: {
                            mainMenu: 'suppliers_purchases',
                            miniSideBar: false,
                            title: 'Vendors & Purchases'
                        }
                    },
                    {
                        path: 'cash_payment_view/:id?',
                        name: 'Cash Payment View',
                        component: load('suppliers/CashPaymentView'),
                        props: true,
                        meta: {
                            mainMenu: 'suppliers_purchases',
                            miniSideBar: false,
                            title: 'Vendors & Purchases'
                        }
                    },
                    
                    {
                        path: 'finances',
                        name: 'Finances',
                        component: load('finances/Finances'),
                        meta: {
                            mainMenu: 'debt_financing',
                            title: 'Financing ',
                        }
                    },
                    {
                        path: 'new_loan',
                        name: 'New Loan',
                        props: true,
                        component: load('finances/NewLoan'),
                        meta: {
                            moduleId: 11,
                            mainMenu: 'debt_financing',
                            title: 'Finacing - BanhJi Accounting',
                        }
                    },
                    {
                        path: 'new_loan_view',
                        name: 'New Loan View',
                        props: true,
                        component: load('finances/views/NewLoanView'),
                        meta: {
                            moduleId: 11,
                            mainMenu: 'debt_financing',
                            title: 'Financing ',
                        }
                    },
                    {
                        path: 'approved_loan',
                        name: 'Approved Loan',
                        props: true,
                        component: load('finances/ApprovedLoan'),
                        meta: {
                            moduleId: 11,
                            mainMenu: 'debt_financing',
                            title: 'Financing ',
                        }
                    },
                    {
                        path: 'record_loan_receipt',
                        name: 'Record Loan Receipt',
                        props: true,
                        component: load('finances/RecordLoanReceipt'),
                        meta: {
                            moduleId: 11,
                            mainMenu: 'debt_financing',
                            title: 'Financing ',
                        }
                    },
                    {
                        path: 'record_loan_receipt_view',
                        name: 'Record Loan Receipt View',
                        props: true,
                        component: load('finances/views/RecordLoanReceiptView'),
                        meta: {
                            moduleId: 11,
                            mainMenu: 'debt_financing',
                            title: 'Financing ',
                        }
                    },
                    {
                        path: 'record_loan_periodic_payment',
                        name: 'Record Loan Periodic Payment',
                        props: true,
                        component: load('finances/RecordLoanPeriodicPayment'),
                        meta: {
                            moduleId: 11,
                            mainMenu: 'debt_financing',
                            title: 'Financing ',
                        }
                    },
                    {
                        path: 'record_loan_periodic_payment_view',
                        name: 'Record Loan Periodic Payment View',
                        props: true,
                        component: load('finances/views/RecordLoanPeriodicPaymentView'),
                        meta: {
                            moduleId: 11,
                            mainMenu: 'debt_financing',
                            title: 'Financing ',
                        }
                    },
                    {
                        path: 'close_loan',
                        name: 'Close Loan',
                        component: load('finances/CloseLoan'),
                        meta: {
                            moduleId: 11,
                            mainMenu: 'debt_financing',
                            title: 'Financing ',
                        }
                    },
                    {
                        path: 'close_loan_view',
                        name: 'Close Loan View',
                        component: load('finances/views/CloseLoanView'),
                        meta: {
                            moduleId: 11,
                            mainMenu: 'debt_financing',
                            title: 'Financing ',
                        }
                    },
                    
                ]

            },


            {
                path: 'credit_biz',
                name: 'credit_biz',
                component: load('CreditIndex'),
                meta: {
                    product: true,
                },
                children:[
                    {
                        path: '/',
                        name: 'credit_biz',
                        component: () => import('../views/credit_business/Overview'),
                        meta: {
                            mainMenu: 'credit_biz',
                            title:'Credit Management'

                        },

                    },
                    

                    // loan
                    {
                        path: 'loans',
                        name: 'loans',
                        component: () => import('../views/loans/loan/LoansTab'),
                        meta: {
                            mainMenu: 'credit_management',
                            title:'Credit Management'
                        }
                    },

                    {
                        path: 'loan_agreement/:id?',
                        name: 'Loan agreement',
                        component: () => import('../views/loans/LoanAgreement'),
                        props: true,
                        meta: {
                            mainMenu: 'credit_management',
                            miniSideBar: false,
                            title:'Credit Management'
                            
                        }
                    },
                    {
                        path: 'close_loans/:id?',
                        name: 'close_loan',
                        component: () => import('../views/loans/CloseLoan'),
                        props: true,
                        meta: {
                            mainMenu: 'credit_management',
                            miniSideBar: false,
                            title:'Credit Management'
                        }
                    },
                    {
                        path: 'loan_disbursement/:id?',
                        name: 'Loan disbursement',
                        component: () => import('../views/loans/Disbursement'),
                        props: true,
                        meta: {
                            mainMenu: 'credit_management',
                            miniSideBar: false,
                            title:'Credit Management'
                        }
                    },
                    {
                        path: 'loan_close_month/:id?',
                        name: 'Close month',
                        component: () => import('../views/loans/CloseMonth'),
                        props: true,
                        meta: {
                            mainMenu: 'credit_management',
                            miniSideBar: false,
                            title:'Credit Management'
                        }
                    },
                    
                    {
                        path: 'loan_approval',
                        name: 'loan_approval',
                        component: () => import('../views/loans/Approval'),
                        meta: {
                            mainMenu: 'credit_management',
                            title:'Credit Management'
                        }
                    },
                    {
                        path: 'review_loan',
                        name: 'review_loan',
                        component: () => import('../views/loans/ReviewLoan'),
                        meta: {
                            mainMenu: 'credit_management',
                            title:'Credit Management'
                        }
                    },
                    {
                        path: 'reschedule_loan',
                        name: 'reschedule_loan',
                        component: () => import('../views/loans/Reschedule'),
                        meta: {
                            mainMenu: 'credit_management',
                            title:'Credit Management'
                        }
                    },
                   
                    {
                        path: 'attachment',
                        name: 'Attachment',
                        component: load('Attachment'),
                        meta: {
                            mainMenu: 'attachment',
                            title:'Credit Management'
                        }
                    },
                    {
                        path: 'list_of_loan',
                        name: 'List of loan',
                        component: () => import('../views/loans/Reports'),
                        meta: {
                            mainMenu: 'reports',
                            title:'Credit Management'
                        }
                    },
                    {
                        path: 'list_of_saving',
                        name: 'List of saving',
                        component: () => import('../views/savings/Reports'),
                        meta: {
                            mainMenu: 'reports',
                            title:'Credit Management'
                        }
                    },
                    {
                        path: 'portfolio_quality',
                        name: 'Portfolio Quality',
                        component: () => import('../views/loans/Reports2'),
                        meta: {
                            mainMenu: 'reports',
                            title:'Credit Management'
                        }
                    },
                    {
                        path: 'list_of_share',
                        name: 'List of share',
                        component: () => import('../views/members/Reports'),
                        meta: {
                            mainMenu: 'reports',
                            title:'Credit Management'
                        }
                    },
                    {
                        path: 'member_list',
                        name: 'List of member',
                        component: () => import('../views/members/Reports2'),
                        meta: {
                            mainMenu: 'reports',
                            title:'Credit Management'
                        }
                    },

                    // supplier
                    {
                        path: 'vendors',
                        name: 'Vendors',
                        component: load('suppliers/Suppliers'),
                        meta: {
                            mainMenu: 'suppliers_purchases',
                            title: 'Vendors & Purchases'
                        }
                    },
                    {
                        path: 'individual_customer/:id?',
                        name: 'Individual Customer',
                        component: () => import('../views/customers/IndividualCustomer'),
                        props: true,
                        meta: {
                            mainMenu: 'receiveable_revenue',
                            miniSideBar: false,
                            title: ('Receiveable revenue')
                        }
                    },
                    {
                        path: 'individual_supplier/:id?',
                        name: 'Individual Supplier',
                        component: load('suppliers/IndividualSupplier'),
                        props: true,
                        meta: {
                            mainMenu: 'suppliers_purchases',
                            title: 'Payables'
                            // miniSideBar: true
                        }
                    },

                    {
                        path: 'credit_purchase/:id?',
                        name: 'Credit Purchase',
                        component: load('suppliers/CreditPurchases'),
                        props: true,
                        meta: {
                            mainMenu: 'suppliers_purchases',
                            miniSideBar: false,
                            title: 'Vendors & Purchases'
                        }
                    },
                    {
                        path: 'credit_purchase_view/:id?',
                        name: 'Credit Purchase View',
                        props: true,
                        component: load('suppliers/CreditPurchaseViews'),
                        meta: {
                            mainMenu: 'suppliers_purchases',
                            miniSideBar: true,
                            title: 'Vendors & Purchases'
                        }
                    },
                    {
                        path: 'expenses/:id?',
                        name: 'Expenses',
                        component: load('suppliers/Expenses'),
                        props: true,
                        meta: {
                            mainMenu: 'suppliers_purchases',
                            miniSideBar: false,
                            title: 'Vendors & Purchases'
                        }
                    },
                    {
                        path: 'expenses/view/:id',
                        name: 'Expenses View',
                        component: load('suppliers/ExpensesView'),
                        props: true,
                        meta: {
                            mainMenu: 'suppliers_purchases',
                            miniSideBar: false,
                            title: 'Vendors & Purchases'
                        }
                    },
                    {
                        path: 'cash_payment/:id?',
                        name: 'Cash Payment',
                        component: load('suppliers/CashPayments'),
                        props: false,
                        meta: {
                            mainMenu: 'suppliers_purchases',
                            miniSideBar: false,
                            title: 'Vendors & Purchases'
                        }
                    },
                    {
                        path: 'cash_payment_view/:id?',
                        name: 'Cash Payment View',
                        component: load('suppliers/CashPaymentView'),
                        props: true,
                        meta: {
                            mainMenu: 'suppliers_purchases',
                            miniSideBar: false,
                            title: 'Vendors & Purchases'
                        }
                    },
                    
                ]

            },

            {
                path: 'statistics',
                name: 'statistics',
                component: load('StatisticsIndex'),
                children:[
                    {
                        path: '/',
                        name: 'statistics',
                        component: load('statistics_compliance/Overview'),
                        meta: {
                            mainMenu: 'ACs Financial Management',
                            title:'Statistics Compliance'

                        },

                    },
                    {
                        path: 'key_ratios_statistics',
                        name: 'key_ratios_statistics',
                        component: load('statistics_compliance/statistics/Reports'),
                        meta: {
                            mainMenu: 'key_ratios_statistics',
                            title:'Statistics Compliance'

                        },

                    },
                    {
                        path: 'annual_reports',
                        name: 'annual_reports',
                        component: load('statistics_compliance/annual_reports/Reports'),
                        meta: {
                            mainMenu: 'annual_reports',
                            title:'Statistics Compliance'
                        }
                    },
                    {
                        path: 'financial_ratio',
                        name: 'financial_ratio',
                        component: load('statistics_compliance/financial_ratio/Reports'),
                        meta: {
                            mainMenu: 'financial_ratio',
                            title:'Statistics Compliance'
                        }
                    },
                    {
                        path: 'setting',
                        name: 'setting',
                        component: load('statistics_compliance/settings/Settings'),
                        meta: {
                            mainMenu: 'setting',
                            title:'Statistics Compliance'
                        }
                    },
                    
                    
                ]

            },
            
            // Login Route
            {
                path: 'app',
                name: 'login',
                component: load('HomeIndex'),
                meta: {
                  requiresAuth: false
                },
                children: [
                  {
                    path: '',
                    name: "HomeDashbord",
                    component: load('Dashboard'),
                    meta: {
                      requiresAuth: false,
                      userLogin: true
                    },
                  },
                ]
            },
        ]
    },
    {
        path: '*',
        redirect() {
            return Trans.defaultLocale;
        }
        // component: load('NotFound'),
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
let getCookie = function (cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1);
        if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
    }
    return "";
}

router.beforeEach((to,from,next) => {
    document.title = to.meta.title
    const credit_biz = to.matched.some(x => x.meta.product)

    if (dataStore.isValidUser === false) return
    else next()

    if(credit_biz){
        var cookie = getCookie ('accgroup-token')
        // window.console.log(cookie, 'cookie on rout a')
        jwt.verify(cookie,process.env.VUE_APP_JWT_SESCRET, (err, decoded) => {
            // window.console.log(decoded, 'decode on rout')
            // window.console.log(err, 'error on rout')
            if (!err){
                dataStore.pinname = decoded
            }else{
                // window.console.log(cookie, 'cookie on rout b')
                return next({
                    name: 'dashboard'
                })
            }
        });
    }

})

router.afterEach((to) => {
    let historyPages = store.default.state.historyPages

    // Remove existing route
    let oldIndex = historyPages.findIndex(i => i.name === to.name)
    if (oldIndex > -1) {
        historyPages.splice(oldIndex, 1)
    }
    // Add route
    store.default.commit("setHistoryPage", to)
})

export default router

<template>
    <v-row class="">
        <v-col sm="12" cols="12" class="pt-0">
            <h2 class="mb-0 font_20">{{ $t('loan_product') }}</h2>
            <v-dialog v-model="dialogm2" max-width="900px">
                <template v-slot:activator="{ on }">
                    <v-btn class="white--text float-right text-capitalize" color="primary" v-on="on"
                           @click="onNewClick">
                        {{ $t('create_new') }}
                    </v-btn>
                </template>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-card>
                        <v-card-title>{{ $t('add_loan_product') }}</v-card-title>
                        <v-icon class="btn_close" @click="dialogm2 = false">close</v-icon>
                        <v-divider/>
                        <v-card-text style="height: 410px; background-color: #EDF1F5; color: #333333;">
                            <v-row>
                                <v-col sm="4" cols="12" class="pb-0">
                                    <label class="label">{{ $t('currency') }}</label>
                                    <v-select
                                        class="mt-1"
                                        outlined
                                        return-object
                                        id=""
                                        :items="currencyList"
                                        item-text="name"
                                        item-value="id"
                                        v-model="loanProduct.currency"
                                        :rules="[v => !!v || 'Currency is required']"
                                    />
                                </v-col>
                                <v-col sm="4" cols="12" class="pb-0">
                                    <label class="label">{{ $t('name') }}</label>
                                    <v-text-field class="mt-1"
                                                  v-model="loanProduct.name"
                                                  outlined
                                                  placeholder=""
                                                  :rules="[v => !!v || 'Name is required']"
                                    />
                                </v-col>
                                <v-col sm="4" cols="12" class="pb-0">
                                    <label class="label">{{ $t('abbr') }}</label>
                                    <v-text-field class="mt-1"
                                                  v-model="loanProduct.abbr"
                                                  outlined
                                                  placeholder=""
                                                  :rules="[v => !!v || 'Abbr is required']"
                                    />
                                </v-col>
                                <v-col sm="4" cols="12" class="pb-0">
                                    <label class="label">{{ $t('loan_level') }}</label>
                                    <v-row>
                                        <v-col sm="2" cols="12" class="py-0">
                                            <v-checkbox
                                                v-model="loanProduct.allowLimit"
                                                hide-details
                                                class="shrink mr-2 mt-0"
                                            ></v-checkbox>
                                        </v-col>
                                        <v-col sm="5" cols="12" class="py-0">
                                            <v-text-field
                                                :disabled="!loanProduct.allowLimit"
                                                class="mt-1"
                                                v-model="loanProduct.minimumAmount"
                                                :type="'number'"
                                                :max="loanProduct.maximumAmount"
                                                outlined
                                                placeholder="From..."
                                            />
                                        </v-col>
                                        <v-col sm="5" cols="12" class="py-0">
                                            <v-text-field
                                                :disabled="!loanProduct.allowLimit"
                                                class="mt-1"
                                                v-model="loanProduct.maximumAmount"
                                                :type="'number'"
                                                :min="1"
                                                outlined
                                                placeholder="To.."
                                            />
                                        </v-col>
                                    </v-row>
                                </v-col>
                                <v-col sm="4" cols="12" class="pb-0">
                                    <label class="label">{{ $t('interest_rate_per_month') }}</label>
                                    <v-select
                                        class="mt-1"
                                        outlined
                                        return-object
                                        id=""
                                        :items="loanInterests"
                                        item-text="name"
                                        item-value="id"
                                        v-model="loanProduct.interestRatePerMonth"
                                        :rules="[v => !!v || 'Interest rate is required']"
                                    />
                                </v-col>
                                <v-col sm="4" cols="12" class="pb-0">
                                    <label class="label">{{ $t('days_in_year') }}</label>
                                    <v-select
                                        class="mt-1"
                                        outlined
                                        return-object
                                        id=""
                                        :items="dayInYears"
                                        item-text="name"
                                        item-value="id"
                                        v-model="loanProduct.daysInYear"
                                        :rules="[v => !!v || 'Days in year is required']"
                                    />
                                </v-col>
                                <v-col sm="4" cols="12" class="pb-0">
                                    <label class="label">{{ $t('loan_account') }}</label>
                                    <v-select
                                        class="mt-1"
                                        outlined
                                        return-object
                                        id=""
                                        :items="loanAccounts"
                                        :item-text="item => `${accountName=='name'?item.name:item.local_name}`"
                                        item-value="id"
                                        v-model="loanProduct.loanAccount"
                                        :rules="[v => !!v || 'Loan account is required']"
                                    />
                                </v-col>
                                <v-col sm="4" cols="12" class="pb-0">
                                    <label class="label">{{ $t('interest_income') }}</label>
                                    <v-select
                                        class="mt-1"
                                        outlined
                                        return-object
                                        id=""
                                        :items="interestAccounts"
                                        :item-text="item => `${accountName=='name'?item.name:item.local_name}`"
                                        item-value="id"
                                        v-model="loanProduct.interestRevenueAccount"
                                        :rules="[v => !!v || 'Exspense is required']"
                                    />
                                </v-col>
                                <v-col sm="4" cols="12" class="pb-0">
                                    <label class="label">{{ $t('loan_method') }}</label>
                                    <v-select
                                        class="mt-1"
                                        outlined
                                        return-object
                                        id=""
                                        :items="loanMethods"
                                        item-text="name"
                                        item-value="id"
                                        v-model="loanProduct.loanMethod"
                                        :rules="[v => !!v || 'Loan method is required']"
                                    />
                                </v-col>
                                <v-col sm="4" cols="12" class="pb-0">
                                    <label class="label">{{ $t('over_due_one_month') }}</label>
                                    <v-text-field
                                        v-model="loanProduct.dueOneMonth"
                                        class="mt-1"
                                        outlined
                                        placeholder=""/>
                                </v-col>
                                <v-col sm="4" cols="12" class="pb-0">
                                    <label class="label">{{ $t('over_due_two_month') }}</label>
                                    <v-text-field
                                        v-model="loanProduct.dueTwoMonth"
                                        class="mt-1"
                                        outlined
                                        placeholder=""/>
                                </v-col>
                                <v-col sm="4" cols="12" class="pb-0">
                                    <label class="label">{{ $t('over_due_three_month') }}</label>
                                    <v-text-field
                                        v-model="loanProduct.dueThreeMonth"
                                        class="mt-1"
                                        outlined
                                        placeholder=""/>
                                </v-col>
                            </v-row>
                        </v-card-text>
                        <v-divider/>
                        <v-card-actions class="pa-4">
                            <v-row>
                                <v-col sm="6" cols="6" class="py-0">
                                    <v-btn color="black"
                                           outlined
                                           class=" text-capitalize  black--text float-left"
                                           @click="dialogm2 = false">{{ $t('cancel') }}
                                    </v-btn>
                                </v-col>
                                <v-col sm="6" cols="6" class="py-0">
                                    <v-btn color="secondary"
                                           class="px-3  white--text text-capitalize float-right"
                                           @click="saveClose">
                                        {{ $t('save_close') }}
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-card-actions>

                    </v-card>
                </v-form>
            </v-dialog>
            <!-- <p class="mb-0">{{ $t('loan_product_description') }} </p> -->
        </v-col>
        <v-col sm="12" cols="12">
            <template>
                <v-simple-table class="attachment_table">
                    <template v-slot:default>
                        <thead>
                        <tr>
                            <th class="text-uppercase">{{ $t('name') }}</th>
                            <th class="text-uppercase">{{ $t('abbr') }}</th>
                            <th class="text-uppercase">{{ $t('interest_rate_per_month') }}</th>
                            <th class="text-uppercase">{{ $t('currency') }}</th>
                            <th class="text-uppercase">{{ $t('payment_method') }}</th>
                            <th class="text-uppercase">{{ $t('days_in_year') }}</th>
                            <th style="width: 50px"/>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="lp in loanProducts" v-bind:key="lp.id">
                            <td>{{ lp.name }}</td>
                            <td>{{ lp.abbr ? lp.abbr : '' }}</td>
                            <td>{{ lp.interestRatePerMonth ? lp.interestRatePerMonth.name : '' }}</td>
                            <td>{{ lp.currency ? lp.currency.code : '' }}</td>
                            <td class="">{{ lp.loanMethod ? lp.loanMethod.name : "" }}</td>
                            <td class="">{{ lp.daysInYear ? lp.daysInYear.name : "" }}</td>
                            <td>
                                <v-btn class="btn_edit_setting" @click="onEditClick(lp)">
                                    <v-icon class="white--text" size="12">fa fa-pen</v-icon>
                                    <span class="capitalize ml-1 white--text font_14">{{ $t('edit') }}</span>
                                </v-btn>
                            </td>
                        </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </template>
        </v-col>
        <LoadingMe
            :isLoading="showLoading"
            :fullPage="true"
            :myLoading="true" />
    </v-row>
</template>

<script>
// const apiUrl = require('../../../apiUrl.js')
import {i18n} from '@/i18n'
import LoanProduct from "@/scripts/model/credit/LoanProduct"
import Helper from "@/helper"
//handler
const loanHandler = require("@/scripts/loanHandler")
const accountHandler = require("@/scripts/accountHandler")
const currencyHandler = require("@/scripts/currency/handler/currencyHandler")
const currencyType = {
    FUNCTIONAL_CURRENCY: 'fun-c',
    TRANSACTION_CURRENCY: 'txn-c',
    REPORTING_CURRENCY: 'rpt-c',
    TAX_EXCHANGE_CURRENCY: 'tax-c',
}

export default {
    components: {
        LoadingMe: () => import(`@/components/Loading`),
    },
    data: () => ({
        allowLimit: false,
        showLoading: false,
        dialogm1: '',
        dialogm2: false,
        compeletLoading: true,
        isFullpage: false,
        snackbar: false,
        textStatus: 'Success',
        color: '#3DA72E',
        timeout: 6000,
        x: 'right',
        y: 'top',
        accountTypes: [],
        accountType: {
            name: '',
            nature: '',
            statement_group: '',
            number: 0,
        },
        paymentOptions: [],
        headers: [
            {
                text: i18n.t('name'),
                align: 'start',
                sortable: false,
                value: 'name',
            },
            {text: i18n.t('description'), value: 'description', sortable: false,},
            {text: i18n.t('account_type'), value: 'account_type', sortable: false, align: ' d-none'},
            {text: i18n.t('account_type'), value: 'account_type.name', sortable: false,},
            {text: i18n.t('action'), value: 'actions', sortable: false},
        ],
        option: 1,
        //
        saveOption: '',
        loanProducts: [],
        loanProduct: new LoanProduct({}),
        loanLevels: [],
        dayInYears: [
            {id: "diy-eafb935c-9849-11eb-a8b3-0242ac130003", name: 365},
            {id: "diy-eafb95c8-9849-11eb-a8b3-0242ac130003", name: 366}
        ],
        currencyList: [],
        loanAccounts: [],
        interestAccounts: [],
        loanMethods: [
            {id: "lpm-57bb825e-984a-11eb-a8b3-0242ac130003", name: "ការបង់ការប្រាក់រាល់ខែនិងបង់ប្រាក់ដើមផ្តាច់ចុងគ្រា"},
            {id: "lpm-57bb84ac-984a-11eb-a8b3-0242ac130003", name: "ការបង់ប្រាក់ដើមតាមរដូវកាល 3ខែម្តង"},
            {id: "lpm-57bb85a6-984a-11eb-a8b3-0242ac130003", name: "ការបង់ប្រាក់ដើមតាមរដូវកាល 6ខែម្តង"},
            {id: "lpm-57bb884e-984a-11eb-a8b3-0242ac130003", name: "ការបង់រំលោះប្រាក់ដើមស្មើរគ្នាជារៀងរាល់ខែ"},
            {id: "lpm-57bb8920-984a-11eb-a8b3-0242ac130003", name: "ការបង់រំលោះស្មើរគ្នារៀងរាល់ខែ"},
            {id: "lpm-2e381d5a-3612-11ec-8d3d-0242ac130003", name: "ការបង់ការប្រាក់នឹងប្រាក់ដើមផ្តាច់ចុងគ្រា"}
        ],
        valid: true,
        loanInterests: [],
        accountName: '',
    }),
    props: {},
    computed: {},
    watch: {
        dialogm2(val) {
            val || this.close()
        },
    },
    methods: {
        async onNewClick() {
            await this.loadLoanInterest()
            await this.loadLoanLevel()
            // await this.loadLoanProduct()
            this.loanProduct = new LoanProduct({})
            this.loanProduct.id = ''
            this.loanProduct.minimumAmount = 1
            this.loanProduct.maximumAmount = 100
            this.loanProduct.interestRatePerMonth = this.loanInterests[0]
            this.loanProduct.daysInYear = {id: "diy-eafb935c-9849-11eb-a8b3-0242ac130003", name: 365}
            this.loanProduct.currency = this.currencyList[0]
            this.loanProduct.loanMethod = {
                id: "lpm-57bb825e-984a-11eb-a8b3-0242ac130003",
                name: "ការបង់ការប្រាក់រាល់ខែនិងបង់ប្រាក់ដើមផ្តាច់ចុងគ្រា"
            }
            this.loanProduct.interestRevenueAccount = this.interestAccounts[0]
            this.loanProduct.loanAccount = this.loanAccounts[0]
            this.clear()
        },
        async onEditClick(value) {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    this.loanProduct = value
                    this.dialogm2 = true
                }, 300);
            })
        },
        saveClose() {
            this.saveOption = 'saveClose'
            this.save()
        },
        save() {
            if (!this.$refs.form.validate()) {
                this.$refs.form.validate()
                return
            }
            let obj = this.loanProduct
            if(obj.maximumAmount <= obj.minimumAmount){
                this.$snotify.error("Maximum amount can't smaller then minimum amount")
                return
            }
            let self = this;
            this.showLoading = true
            loanHandler.productCreate(new LoanProduct(this.loanProduct))
                .then(function () {
                    // window.console.log(response)
                    self.close()
                    self.loadLoanProduct()
                    self.$refs.form.reset()
                    self.$snotify.success('Successfully')
                })
                .catch(function (error) {
                    Helper.alertErrorMsg(error);
                })
                .finally(() => {
                    self.showLoading = false;
                });
        },
        close() {
            this.dialogm2 = false
        },
        clear() {
        },
        async loadLoanLevel() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    loanHandler.loanLevelGet().then(res => {
                        this.loanLevels = res.data.data
                    })
                }, 300);
            })
        },
        async loadLoanProduct() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    loanHandler.productGet().then(res => {
                        this.loanProducts = res.data.data
                    })
                }, 300);
            })
        },
        async loadCurrencyData() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.showLoading = true
                    currencyHandler.list(currencyType.FUNCTIONAL_CURRENCY).then(response => {
                        if (response.data.statusCode === 200) {
                            this.currencyList = response.data.data
                            this.showLoading = false
                        }
                    }).catch()
                    {
                        this.showLoading = false
                    }
                }, 300)
            })
        },
        async loadAccount() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    accountHandler.getAll().then(res => {
                        this.showLoading = false
                        //Receivable Account
                        this.interestAccounts = res.filter(m => m.account_type.number === 32).map(item => {
                            return {
                                id: item.uuid,
                                uuid: item.uuid,
                                name: item.name,
                                local_name: item.local_name,
                                number: item.number,
                                is_taxable: item.is_taxable,
                                banhjiAccCode: item.banhjiAccCode,
                                group_code: item.group_code,
                                parent_account: item.parent_account,
                                type_code: item.type_code
                            }
                        })
                        this.loanAccounts = res.filter(m => m.account_type.number === 7).map(item => {
                            return {
                                id: item.uuid,
                                uuid: item.uuid,
                                name: item.name,
                                local_name: item.local_name,
                                number: item.number,
                                is_taxable: item.is_taxable,
                                banhjiAccCode: item.banhjiAccCode,
                                group_code: item.group_code,
                                parent_account: item.parent_account,
                                type_code: item.type_code
                            }
                        })
                    })
                }, 300);
            })
        },
        async loadLoanInterest() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    loanHandler.loanInterestGet().then(res => {
                        this.loanInterests = res.data.data
                    })
                }, 300);
            })
        },
        async loadAccountName() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.segments = []
                    loanHandler.accountNameGet().then(res => {
                        this.showLoading = true
                        if (res.data.statusCode === 200) {
                            this.showLoading = false
                            window.console.log(res)
                            if(res.data.data.length > 0) {
                                this.accountName = res.data.data[0].name
                            }
                        }
                    }).catch()
                    {
                        this.showLoading = false
                    }
                }, 300)
            })
        },
    },
    mounted: async function () {
        await this.loadCurrencyData()
        await this.loadLoanProduct()
        await this.loadLoanLevel()
    },
    created: async function () {
        await this.loadAccountName()
        await this.loadAccount()
        await this.loadLoanInterest()
    }
};
</script>
<style scoped>
.attachment_table table tr th {
    height: 55px !important;
}

@media (max-width: 576px) {

}
</style>
<template>
    <v-row class="">
        <v-col sm="12" cols="12" class="pt-0">
            <h2 class="mb-0 font_20">{{ $t('saving_products') }}</h2>
            <v-dialog v-model="dialogm2" max-width="800px">
                <template v-slot:activator="{ on }">
                    <v-btn class="white--text float-right text-capitalize" color="primary" v-on="on"
                           @click="onNewClick">
                        {{ $t('create_new') }}
                    </v-btn>
                </template>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-card>
                        <v-card-title>{{ $t('add_saving_product') }}</v-card-title>
                        <v-icon class="btn_close" @click="dialogm2 = false">close</v-icon>
                        <v-divider/>
                        <v-card-text style="height: 350px; background-color: #EDF1F5; color: #333333;">
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
                                        v-model="savingProduct.currency"
                                    />
                                </v-col>
                                <v-col sm="4" cols="12" class="pb-0">
                                    <label class="label">{{ $t('saving_type') }}</label>
                                    <v-select
                                        class="mt-1"
                                        outlined
                                        return-object
                                        id=""
                                        :items="savingTypes"
                                        item-text="name"
                                        item-value="id"
                                        v-model="savingProduct.savingType"
                                        @change="savingTypeChange"
                                    />
                                </v-col>
                                <v-col sm="4" cols="12" class="pb-0">
                                    <label class="label">{{ $t('name') }}</label>
                                    <v-text-field
                                        class="mt-1"
                                        v-model="savingProduct.name"
                                        :rules="[v => !!v || 'name is required']"
                                        outlined
                                        placeholder=""
                                    />
                                </v-col>
                                <v-col sm="4" cols="12" class="pb-0">
                                    <label class="label">{{ $t('abbr') }}</label>
                                    <v-text-field
                                        class="mt-1"
                                        v-model="savingProduct.abbr"
                                        :rules="[v => !!v || 'abbr is required']"
                                        outlined
                                        placeholder=""
                                    />
                                </v-col>
                                <v-col sm="4" cols="12" class="pb-0">
                                    <label class="label">{{ $t('interest_rate_per_year') }}</label>
                                    <v-select
                                        class="mt-1"
                                        outlined
                                        return-object
                                        id=""
                                        :items="savingInterests"
                                        item-text="name"
                                        item-value="id"
                                        v-model="savingProduct.savingInterest"
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
                                        v-model="savingProduct.daysInYear"
                                    />
                                </v-col>
                                <v-col sm="4" cols="12" class="pb-0">
                                    <label class="label">{{ $t('saving_account') }}</label>
                                    <v-select
                                        class="mt-1"
                                        outlined
                                        return-object
                                        id=""
                                        :items="Accounts"
                                        :item-text="item => `${accountName=='name'?item.name:item.local_name}`"
                                        item-value="id"
                                        v-model="savingProduct.Account"
                                    />
                                </v-col>
                                <v-col sm="4" cols="12" class="pb-0">
                                    <label class="label">{{ $t('interest_payable') }}</label>
                                    <v-select
                                        class="mt-1"
                                        outlined
                                        return-object
                                        id=""
                                        :items="interestPayAccounts"
                                        :item-text="item => `${accountName=='name'?item.name:item.local_name}`"
                                        item-value="id"
                                        v-model="savingProduct.interestPayableAccount"
                                    />
                                </v-col>
                                <v-col sm="4" cols="12" class="pb-0">
                                    <label class="label">{{ $t('interest_expense') }}</label>
                                    <v-select
                                        class="mt-1"
                                        outlined
                                        return-object
                                        id=""
                                        :items="interestAccounts"
                                        :item-text="item => `${accountName=='name'?item.name:item.local_name}`"
                                        item-value="id"
                                        v-model="savingProduct.interestExpenseAccount"
                                    />
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
            <!-- <p class="mb-0">{{ $t('saving_account_description') }} </p> -->
        </v-col>
        <v-col sm="12" cols="12">
            <template>
                <v-simple-table class="attachment_table">
                    <template v-slot:default>
                        <thead>
                        <tr>
                            <th class="text-uppercase">{{ $t('name') }}</th>
                            <th class="text-uppercase">{{ $t('abbr') }}</th>
                            <th class="text-uppercase">អត្រាការប្រាក់/១ ឆ្នាំ</th>
                            <th class="text-uppercase">{{ $t('currency') }}</th>
                            <th class="text-uppercase">{{ $t('saving_type') }}</th>
                            <th style="width: 50px"/>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="sa in savingProducts" v-bind:key="sa.id">
                            <td>{{ sa.name }}</td>
                            <td>{{ sa.abbr ? sa.abbr : '' }}</td>
                            <td>{{ sa.savingInterest ? sa.savingInterest.name : '' }}</td>
                            <td>{{ sa.currency ? sa.currency.code : '' }}</td>
                            <td class="">{{ sa.hasOwnProperty('savingType') ? sa.savingType.name : "" }}</td>
                            <td>
                                <v-btn class="btn_edit_setting" @click="onEditClick(sa)">
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
            :myLoading="true"/>
    </v-row>
</template>

<script>
// const apiUrl = require('../../../apiUrl.js')
import {i18n} from '@/i18n'
import SavingProduct from "@/scripts/model/credit/SavingProduct"
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
        interestPayAccounts: [],
        //
        saveOption: '',
        savingProducts: [],
        savingProduct: new SavingProduct({}),
        savingTypes: [
            {id: 1, name: i18n.t('general_saving')},
            {id: 2, name: i18n.t('limited_saving')}
        ],
        dayInYears: [
            {id: 365, name: 365},
            {id: 366, name: 366}
        ],
        currencyList: [],
        Accounts: [],
        interestAccounts: [],
        valid: true,
        savingInterests: [],
        isLimit: false,
        accountName: 'name',
    }),
    props: {},
    computed: {},
    watch: {
        dialogm2(val) {
            val || this.close()
        },
    },
    methods: {
        onNewClick() {
            this.savingProduct = new SavingProduct({})
            this.savingProduct.id = ''
            this.savingProduct.abbr = ''
            this.savingProduct.savingInterest = this.savingInterests[0]
            this.savingProduct.savingType = {id: 1, name: "បញ្ញើសន្សំធម្មតា"}
            this.savingProduct.daysInYear = {id: 365, name: 365}
            this.savingProduct.currency = this.currencyList[0]
            this.savingProduct.interestExpenseAccount = this.interestAccounts[0]
            this.savingProduct.Account = this.Accounts[0]
            this.savingProduct.interestPayableAccount = this.interestPayAccounts[0]
            this.clear()
        },
        async onEditClick(value) {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    this.savingProduct = value
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
            let self = this;
            this.showLoading = true
            loanHandler.savingCreate(new SavingProduct(this.savingProduct))
                .then(function (response) {
                    window.console.log(response)
                    self.close()
                    self.loadSavingProduct()
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
        async loadSavingInterest() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    loanHandler.savingInterestGet().then(res => {
                        this.savingInterests = res.data.data
                    })
                }, 300);
            })
        },
        async loadSavingProduct() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    loanHandler.savingGet().then(res => {
                        this.savingProducts = res.data.data
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
        savingTypeChange() {
            this.isLimit = false
            if (this.savingProduct.savingType.id === 'savingt-7a9098f4-9b75-11eb-a8b3-0242ac130003') {
                this.isLimit = true
            }
        },
        async loadAccount() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    accountHandler.getAll().then(res => {
                        this.showLoading = false
                        //Receivable Account
                        this.interestAccounts = res.filter(m => m.account_type.number === 33).map(item => {
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
                        //Receivable Account
                        this.interestPayAccounts = res.filter(m => m.account_type.number === 24).map(item => {
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
                        this.Accounts = res.filter(m => m.account_type.number === 19 || m.account_type.number === 28).map(item => {
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
                            if (res.data.data.length > 0) {
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
        await this.loadSavingProduct()
    },
    created: async function () {
        await this.loadAccountName()
        await this.loadAccount()
        await this.loadSavingInterest()
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
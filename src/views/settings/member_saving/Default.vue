<template>
    <v-row>
        <v-col sm="12" cols="12" class="pt-0 pl-0">
            <v-card color="white" class="pl-0 no_border" elevation="0">
                <LoadingMe
                    :isLoading="showLoading"
                    :fullPage="false"
                    :myLoading="true" />
                <v-row style="border-bottom: 1px solid gainsboro;">
                    <v-col sm="9" cols="9" class="kendo_dropdown_custom py-0">
                        <h2>{{ $t('default_business_segment') }}</h2>
                        <p>{{ $t('dis_default_business_segment') }}</p>
                    </v-col>

                    <v-col sm="3" cols="3" class="kendo_dropdown_custom py-0">
                        <v-select
                            class="mt-1"
                            v-model="s.segment"
                            :items="segments"
                            item-value="id"
                            :item-text="item =>`${item.code} - ${item.name}`"
                            return-object
                            outlined=""/>
                    </v-col>
                </v-row>
                <v-row style="border-bottom: 1px solid gainsboro;">
                    <v-col sm="9" cols="9" class="kendo_dropdown_custom pt-4 pb-0">
                        <h2>{{$t('default_cash_acc')}}</h2>
                        <p>{{$t('dis_default_cash_acc')}}</p>
                    </v-col>

                    <v-col sm="3" cols="3" class="kendo_dropdown_custom pt-4 pb-0">
                        <v-select
                            class="mt-1"
                            v-model="s.cashAccount"
                            :items="cashAccounts"
                            :item-text="item => `${accountName=='name'?item.name:item.local_name}`"
                            item-value="id"
                            return-object
                            outlined=""/>
                    </v-col>
                </v-row>
                <v-row style="border-bottom: 1px solid gainsboro;">
                    <v-col sm="9" cols="9" class="kendo_dropdown_custom pt-4 pb-0">
                        <h2>{{$t('default_ap')}}</h2>
                        <p>{{$t('dis_default_ap')}}</p>
                    </v-col>

                   <v-col sm="3" cols="3" class="kendo_dropdown_custom pt-4 pb-0">
                        <v-select
                            class="mt-1"
                            v-model="s.payableAccount"
                            :items="payableAccounts"
                            item-value="id"
                            :item-text="item => `${accountName=='name'?item.name:item.local_name}`"
                            return-object
                            outlined=""/>
                    </v-col>
                </v-row>
                 <!-- //exspense account -->
                <v-row class="">
                    <v-col sm="12" cols="12" class="kendo_dropdown_custom pt-4 pb-0">
                        <h2>{{$t('default_expense_account')}}</h2>
                        <p>{{$t('dis_default_expense_account')}}</p>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col sm="12" cols="12" class="py-0">
                        <template>
                            <v-simple-table class="attachment_table">
                                <template v-slot:default>
                                    <thead>
                                    <tr>
                                        <th>{{ $t('name') }}</th>
                                        <th>{{ $t('number') }}</th>
                                        <th>{{ $t('type') }}</th>
                                        <th>{{ $t('group') }}</th>
                                        <th>{{ $t('action') }}</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="pl in exAccounts" v-bind:key="pl.account.id">
                                        <td>
                                            <v-select
                                                class="mt-4"
                                                v-model="pl.account"
                                                :items="exspenseAccounts"
                                                item-value="id"
                                                :item-text="item => `${accountName=='name'?item.name:item.local_name}`"
                                                @change="exAccountChange(pl.account)"
                                                return-object
                                                outlined=""/>
                                        </td>
                                        <td class="text-bold">{{ pl.number }}</td>
                                        <td>{{ pl.type }}</td>
                                        <td>{{ pl.group }}</td>
                                        <td>
                                            <v-btn class="btn_edit_setting"
                                                   @click="exRemoveRow(pl)">
                                                <v-icon class="white--text" size="12">fa
                                                    fa-pen
                                                </v-icon>
                                                <span
                                                    class="capitalize ml-1 white--text font_14">{{
                                                        $t('delete')
                                                    }}</span>
                                            </v-btn>
                                        </td>
                                    </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </template>
                    </v-col>
                </v-row>
                <div class="function_footer">
                    <v-btn color="primary" class="float-left btn_plus rounded-0 mr-2" @click="addExRow">
                        <v-icon size="" class="ma-1">mdi mdi-plus</v-icon>
                    </v-btn>
                    <v-btn color="primary"
                           @click="save"
                           class="float-right  white--text text-capitalize mr-3 "
                    >
                        {{ $t('save') }}
                    </v-btn>
                </div>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import kendo from "@progress/kendo-ui"
const $ = kendo.jQuery
const axios = require('axios')
const apiUrl = require('@/apiUrl.js')
const loanHandler = require("@/scripts/loanHandler")
const settingsHandler = require("@/scripts/settingsHandler")
const accountHandler = require("@/scripts/accountHandler")
const paymentOptionHandler = require("@/scripts/paymentOptionHandler")
const categoryHandler = require("@/scripts/categoryHandler");

const OPTION_TYPE = 'Customer'

import BusinessSetting from "@/scripts/model/credit/BusinessSetting"
export default {
    data: () => ({
        asOf: new Date().toISOString().substr(0, 10),
        showLoading: false,
        loadingAlert: false,
        loadingColorAlert: '',
        loadingTextAlert: '',
        accountList: [],
        business: [
            'SAVING & CREDIT',
            'SUPPLY',
            'MARKETING',
            'SERVICE'
        ],
        segment: {},
        accounts: [],
        accountName: 'name',
        segments: [],
        accountGroupList: [],
        errors: [],
        s: new BusinessSetting({}),
        paymentOptions: [],
        recievableAccounts: [],
        payableAccounts: [],
        exspenseAccounts: [],
        productCategories: [],
        serviceCategories: [],
        productCateList: [],
        serviceCateList: [],
        //exspense account
        exAccounts: [],
        cashAccounts: [],
    }),
    components: {
        LoadingMe: () => import(`@/components/Loading`),
    },
    methods: {
        search() {
            this.showLoading = true
            setTimeout(() => {
                this.showLoading = false
            }, 300);
        },
        async loadSingleSegment() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.segments = []
                    loanHandler.segmentGet().then(res => {
                        this.showLoading = true
                        if (res.data.statusCode === 200) {
                            this.showLoading = false
                            if (res.data.data.length > 0) {
                                this.segment = res.data.data[0]
                                window.console.log(this.segment)
                            }
                        }
                    }).catch()
                    {
                        this.showLoading = false
                    }
                }, 300)
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
        async loadSegment() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.segments = []
                    settingsHandler.getSeg().then(res => {
                        this.showLoading = true
                        if (res.data.statusCode === 200) {
                            this.showLoading = false
                            this.segments = res.data.data
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
                        this.recievableAccounts = res.filter(m => m.account_type.number === 7).map(item => {
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
                        //payable account
                        this.payableAccounts = res.filter(m => m.account_type.number === 18).map(item => {
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
                        //exspense account
                        this.exspenseAccounts = res.filter(m => m.account_type.number === 38 || m.account_type.number === 39 || m.account_type.number === 40 || m.account_type.number === 41 || m.account_type.number === 42).map(item => {
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
                        this.cashAccounts = res.filter(m => m.account_type.number === 1).map(itm => {
                            return {
                                id: itm.uuid,
                                name: itm.name,
                                local_name: itm.local_name,
                                number: itm.number,
                                is_taxable: itm.is_taxable,
                                banhjiAccCode: itm.banhjiAccCode,
                                group_code: itm.group_code,
                                parent_account: itm.parent_account,
                                type_code: itm.type_code,
                                uuid: itm.uuid,
                            }
                        })
                    })
                }, 300);
            })
        },
        addProRow() {
            this.productCategories.push({
                id: '',
                number: '',
                abbr: '',
                color: '',
                category: {}
            })
        },
        addServRow() {
            this.serviceCategories.push({
                id: '',
                number: '',
                abbr: '',
                color: '',
                category: {}
            })
        },
        proCategoryChange(e) {
            let ex = this.productCategories.filter((obj) => {
                return obj.category.id === e.id
            })
            window.console.log(ex, 'pro')
            if (ex.length > 0) {
                ex[0].abbr = e.abbr
                ex[0].number = e.number
                ex[0].color = e.color
            }
        },
        servCategoryChange(e) {
            let ex = this.serviceCategories.filter((obj) => {
                return obj.category.id === e.id
            })
            if (ex.length > 0) {
                ex[0].abbr = e.abbr
                ex[0].number = e.number
                ex[0].color = e.color
            }
        },
        async loadAccountGroupList() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    axios.get(apiUrl.account_groups)
                        .then(res => {
                            this.accountGroupList = res.data
                            this.compeletLoading = false
                        })
                }, 500);
            })
        },
        async save() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.showLoading = true
                    this.removeDublicate()
                    this.s.type = 'Member'
                    this.s.productCategories = this.productCategories
                    this.s.serviceCategories = this.serviceCategories
                    //exspense account
                    this.s.exspenseAccounts = this.exAccounts
                    loanHandler.businessSettingCreate(new BusinessSetting(this.s)).then(response => {
                        this.showLoading = false
                        if (response.data.statusCode === 201) {
                            this.$snotify.success('Successfully')
                        }
                    }).catch(e => {
                        this.showLoading = false
                        this.$snotify.error('Something went wrong')
                        this.errors.push(e)
                        window.console.log(e)
                    })
                }, 300);
            })
        },
        removeDublicate(){
            let aAr = []
            this.serviceCategories.forEach(m => {
                if($.inArray(m.category.id, aAr) != -1) {
                    const index = this.serviceCategories.indexOf(m);
                    this.serviceCategories.splice(index,1);
                } else {
                    aAr.push(m.category.id)
                }
            })
            let bAr = []
            this.productCategories.forEach(m => {
                if($.inArray(m.category.id, bAr) != -1) {
                    const index = this.productCategories.indexOf(m);
                    this.productCategories.splice(index,1);
                } else {
                    bAr.push(m.category.id)
                }
            })
        },
        proRemoveRow(e){
            const index = this.productCategories.indexOf(e);
            this.productCategories.splice(index,1);
        },
        servRemoveRow(e){
            const index = this.serviceCategories.indexOf(e);
            this.serviceCategories.splice(index,1);
        },
        async loadPaymentOption() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.paymentOptions = []
                    paymentOptionHandler.list('?optionType=' + OPTION_TYPE).then(res => {
                        this.showLoading = true
                        if (res.data.statusCode === 200) {
                            this.showLoading = false
                            this.paymentOptions = res.data.data
                        }
                    }).catch()
                    {
                        this.showLoading = false
                    }
                }, 300)
            })
        },
        async loadCategory() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    this.showLoading = true
                    categoryHandler.get().then((res) => {
                        this.showLoading = false
                        this.productCateList = res.filter(o => o.type.name === 'Product')
                        this.serviceCateList = res.filter(o => o.type.name === 'Service')
                    });
                }, 10)
            });
        },
        async loadSetting() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    this.showLoading = true
                    loanHandler.businessSettingGet().then((res) => {
                        this.showLoading = false
                        if(res.data.data.length > 0){
                            let s = res.data.data.filter((obj) => {return obj.type == "Member"})
                            if(s.length > 0){
                                window.console.log(s, 'member')
                                this.s = s[0]
                                this.exAccounts = s[0].exspenseAccounts
                                this.productCategories = s[0].productCategories
                                this.serviceCategories = s[0].serviceCategories
                            }
                        }
                    });
                }, 10)
            });
        },
        //exspense account
        addExRow() {
            this.exAccounts.push({
                id: '',
                uuid: '',
                number: '',
                type: '',
                group: '',
                account: {}
            })
        },
        exRemoveRow(e){
            const index = this.exAccounts.indexOf(e);
            this.exAccounts.splice(index,1);
        },
        exAccountChange(e) {
            window.console.log(e, this.exspenseAccounts)
            let ex = this.exAccounts.filter((obj) => {
                return obj.account.id === e.id
            })
            if (ex.length > 0) {
                ex[0].type = e.type
                ex[0].number = e.number
                ex[0].group = e.group
                ex[0].uuid = e.id
            }
        },
    },
    computed: {},
    mounted: async function () {
        await this.loadSegment()
        await this.loadSingleSegment()
        // await this.loadPaymentOption()
        // await this.loadCategory()
        await this.loadSetting()
    },
    created: async function () {
        await this.loadAccountName()
        await this.loadAccount()
        // await this.loadAccountGroupList()
    }
};
</script>
<style scoped>
.k-chart {
    height: 180px;
}

.theme--light.v-data-table {
    background-color: transparent !important;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
    height: 32px !important;
    border-bottom: thin solid rgba(0, 0, 0, 0.12) !important;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr:first-child > td {
    border-top: thin solid rgba(0, 0, 0, 0.12) !important;
}

.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
    background-color: transparent !important;
}

.k-grid th {
    padding: 8px 12px;
    border-width: 0 0 1px 1px;
    white-space: break-spaces !important;
    text-align: center !important;
}
.container h2{
    font-size: 18px !important;
    margin-bottom: 0px !important;
}
</style>

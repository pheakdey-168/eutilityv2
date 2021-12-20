<template>
    <v-row class="">
        <v-col sm="12" cols="12" class="pt-0">
            <h2 class="mb-0 font_20">{{ $t('member_type') }}</h2>
            <v-dialog v-model="dialogm2" max-width="680px">
                <template v-slot:activator="{ on }">
                    <v-btn class="white--text float-right text-capitalize" color="primary" v-on="on"
                           @click="onNewClick">
                        {{ $t('create_new') }}
                    </v-btn>
                </template>
                <v-card>
                    <v-card-title>{{ $t('member_type') }}</v-card-title>
                    <v-icon class="btn_close" @click="dialogm2 = false">close</v-icon>
                    <v-divider/>
                    <v-card-text style="height: 160px; background-color: #EDF1F5; color: #333;">
                        <v-form
                            ref="form"
                            v-model="valid"
                            lazy-validation
                        >
                            <v-row class="pt-3">
                                <v-col sm="12" cols="12" class="py-0">
                                    <v-row>
                                        <v-col class="py-0" sm="6" cols="12">
                                            <label class="label">{{ $t('member_type_name') }}</label>
                                            <v-text-field
                                                class="mt-1"
                                                outlined
                                                :rules="[v => !!v || $t('name_is_required')]"
                                                v-model="memberType.name"
                                                placeholder=""
                                            />
                                        </v-col>
                                        <v-col class="py-0" sm="6" cols="12">
                                            <label class="label">{{ $t('abbreviation') }}</label>
                                            <v-text-field
                                                class="mt-1"
                                                outlined
                                                tage="Abbreviation"
                                                v-model="memberType.abbr"
                                                placeholder=""
                                            />
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>
                        </v-form>
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
            </v-dialog>
            <!-- <p class="mb-0">{{ $t('loan_purpose_description') }} </p> -->
        </v-col>
        <v-col sm="12" cols="12">
            <template>
                <v-simple-table class="attachment_table">
                    <template v-slot:default>
                        <thead>
                        <tr>
                            <th class="text-uppercase">{{ $t('type') }}</th>
                            <th class="text-uppercase">{{ $t('abbr') }}</th>
                            <th style="width: 50px"/>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="m in memberTypes" v-bind:key="m.id">
                            <td>{{ m.name }}</td>
                            <td class="">{{ m.abbr }}</td>
                            <td>
                                <v-btn class="btn_edit_setting" @click="onEditClick(m)">
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
// const axios = require('axios')
// const apiUrl = require('../../../apiUrl.js')
import {i18n} from '@/i18n'
import MemberType from "@/scripts/model/MemberType"
import Helper from "@/helper";
const loanHandler = require("@/scripts/loanHandler")
const accountHandler = require("@/scripts/accountHandler")
// const otherHandler = require("@/scripts/otherHandler")
const settingsHandler = require("@/scripts/settingHandler")
const settingHandler = require("@/scripts/settingsHandler")
const paymentOptionHandler = require("@/scripts/paymentOptionHandler")
const OPTION_TYPE = 'Customer'
const strFilter = '?optionType=' + OPTION_TYPE
const strFilterTerm = '?type=pmt-customer'
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
        memberType: new MemberType({}),
        paymentMethods: [],
        paymentTerms: [],
        vat: [],
        tax: [],
        accDeposits: [],
        accDiscount: [],
        accReceiveables: [],
        valid: true,
        saveOption: '',
        memberTypes: [],
        accDiscounts: [],
    }),
    props: {},
    computed: {},
    watch: {
        dialogm2(val) {
            val || this.close()
        },
    },
    methods: {
        async loadMemberType() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    loanHandler.memberTypeGet().then(res => {
                        this.memberTypes = res.data.data
                    })
                }, 300);
            })
        },
        async onEditClick(value) {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    this.memberType = value
                    this.dialogm2 = true
                }, 300);
            })
        },
        onNewClick() {
            this.memberType = new MemberType({})
            this.memberType.id = ''
        },
        saveClose() {
            this.saveOption = "saveClose"
            this.save()
        },
        async save() {
            if (!this.$refs.form.validate()) {
                this.$refs.form.validate()
                return
            }
            let self = this;
            this.showLoading = true
            loanHandler.memberTypeCreate(new MemberType(this.memberType))
                .then(function (response) {
                    window.console.log(response)
                    self.close()
                    self.loadMemberType()
                    self.$refs.form.reset()
                    self.$snotify.success('Successfully')
                })
                .catch(function (error) {
                    Helper.alertErrorMsg(error);
                })
                .finally(()=>{
                    self.showLoading = false;
                });
        },
        close() {
            this.dialogm2 = false
        },
        clear() {
        },
        async loadAccount() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    accountHandler.getAll().then(res => {
                        this.showLoading = false
                        //Receivable Account
                        this.accReceiveables = res.filter(m => m.account_type.number === 7).map(item => {
                            return {
                                id: item.uuid,
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
                        //Deposit Account
                        this.accDeposits = res.filter(m => m.account_type.number === 20 || m.account_type.number === 28).map(item => {
                            return {
                                id: item.uuid,
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
                        //Discount Account
                        this.accDiscounts = res.filter(m => m.account_type.number === 38).map(item => {
                            return {
                                id: item.uuid,
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
        async loadTax() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    settingsHandler.get().then(res => {
                        this.showLoading = false
                        this.tax = res
                        let vAT = this.tax.filter(m => m.taxType.typeId === 1 && m.transactionType === 'Sale') // valuable tax
                        this.vat = vAT // valuable tax
                    })
                }, 300);
            })
        },
        async loadPaymentMethod() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    paymentOptionHandler.list(strFilter).then(res => {
                        if (res.data.statusCode === 200) {
                            this.showLoading = false
                            this.paymentMethods = res.data.data
                        }

                    })
                }, 300);
            })
        },
        async loadPaymentTerm() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    settingHandler.getPaymentTerm(strFilterTerm).then(res => {
                        this.showLoading = false
                        if (res.data.statusCode === 200) {
                            this.paymentTerms = res.data.data
                        }
                    })
                }, 300);
            })
        },
    },
    mounted: async function () {
        await this.loadMemberType()
        await this.loadAccount()
        await this.loadPaymentMethod()
        await this.loadPaymentTerm()
        await this.loadTax()
    },
    created: async function () {
        await this.loadAccount()
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
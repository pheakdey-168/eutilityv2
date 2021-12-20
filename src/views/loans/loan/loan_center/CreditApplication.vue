<template>
    <v-row>
        <v-col sm="12" cols="12" class="pt-0">
            <v-simple-table>
                <template>
                    <v-simple-table class="attachment_table">
                        <template v-slot:default>
                            <thead>
                            <tr>
                                <th class="text-uppercase px-2 py-2" style="text-align: left;">{{ $t('date') }}</th>
                                <th class="text-uppercase px-2 py-2" style="text-align: left;">{{ $t('number') }}</th>
                                <th class="text-uppercase px-2 py-2" style="text-align: left;">{{ $t('amount') }}</th>
                                <th class="text-uppercase px-2 py-2" style="text-align: left;">{{ $t('status') }}</th>
                                <th class="text-uppercase px-2 py-2" style="text-align: left;">{{ $t('action') }}</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="d in loanList" v-bind:key="d.id">
                                <td>{{ d.issuedDate }}</td>
                                <td class="px-2" style="text-align: right;">{{ d.number}}</td>
                                <td class="px-2" style="text-align: right;">{{ numberFormat(d.amount, d.loanProduct.currency.code) }}</td>
                                <td class="px-2" style="text-align: left;">{{ statusName(d.status) }}</td>
                                <td class="px-2 py-1" style="text-align: center;">
                                    <v-btn color="primary" class="" v-show="d.status == 1" @click="editLoan(d)" style="font-size: 14px;">
                                        {{ $t('edit') }}
                                    </v-btn>
                                </td>
                            </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </template>
            </v-simple-table>
        </v-col>
        <LoadingMe
            :isLoading="showLoading"
            :fullPage="true"
            type="loading"
            :myLoading="true"/>
    </v-row>
</template>
<script>
import { i18n } from '@/i18n';
// import kendo from "@progress/kendo-ui";
import kendo from "@progress/kendo-ui"
// const $ = kendo.jQuery
const memberHandler = require("@/scripts/memberHandler")
const loanHandler = require("@/scripts/loanHandler")
export default {
    name: "ListOfLoan",
    props: {member: {}},
    computed: {
    },
    components: {
        LoadingMe: () => import(`@/components/Loading`),
        // 'app-datepicker': () => import('@/components/custom_templates/DatePickerComponent')
    },
    data: () => ({
        errors: [],
        scheduleAR: [],
        format: '',
        totalPaid: '',
        endingBalance: '',
        saleFormContent: {},
        loanList: [],
        showLoading: false,
        decimals: []
    }),
    methods: {
        numberFormat(value, currency){
            if (currency) {
                let dec = this.decimals.filter((obj) => {
                    return obj.currency.code == currency
                })
                let fo = 0
                if (dec.length > 0) {
                    fo = dec[0].decimal
                }
                value = parseFloat(value)
                value = parseFloat(value.toFixed(fo))
                return kendo.toString(value, 'n' + fo)
            }
        },
        statusName(s){
            let status = ''
            if(s == 1){
                status = i18n.t('padding')
            }else if(s == 2){
                status = i18n.t('approved')
            }else if(s == 3){
                status = i18n.t('disbursed')
            }else if(s == 4){
                status = i18n.t('rejected')
            }
            return status
        },
        getLoan() {
            // this.disburs.member = member
            this.showLoading = true
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    this.loanList = []
                    memberHandler.getLoanByMemberId(this.member.id).then(res => {
                        this.showLoading = false
                        window.console.log(res.data.data, 'data')
                        this.loanList = res.data.data
                    })
                }, 300);
            })
        },
        editLoan(e){
            window.console.log(e, 'loan edit')
            this.$router.push({
                path: 'loan_agreement' + `/${e.id}`,
                params: {id: e.id},
                query: {type: 'edit'}
            })
        },
        async loadDecimal() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    loanHandler.decimalGet().then(res => {
                        this.decimals = res.data.data
                    })
                }, 300);
            })
        },
    },
    watch: {
        member(){
            if(this.member.hasOwnProperty('id')){
                this.getLoan()
            }
        }
    },
    mounted: async function () {
        await this.loadDecimal()
    },
    created: async function () {
        if(this.member.hasOwnProperty('id')){
            this.getLoan()
        }
    },
}
</script>
<style scoped>
.attachment_table table tr th {
    vertical-align: baseline !important;
}

.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr.third:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
    background-color: #92d050 !important;
}



.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > td:not(.v-data-table__mobile-row),
.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > th:not(.v-data-table__mobile-row) {
    border-bottom: thin solid #ddd;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
    height: 32px !important;
}

.v-application .third,
.v-application .secondary {
    border-color: #fff !important;
}
</style>
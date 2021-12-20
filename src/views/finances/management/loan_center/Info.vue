<template>
    <v-row class="mx-3 white">
        <v-col sm="12" cols="12">
            <v-simple-table>
                <template>
                    <tbody>
                        <tr>
                            <td width="230" class="text-uppercase">{{$t('loan_type')}}</td>
                            <td class="text-left text-bold">{{ typeOfLoan }}</td>
                        </tr>
                        <tr>
                            <td class="text-uppercase">{{$t('loan_name')}}</td>
                            <td class="text-left text-bold">{{ loanName }}</td>
                        </tr>
                        <tr>
                            <td class="text-uppercase">{{$t('loan_currency')}}</td>
                            <td class="text-left text-bold">{{ currencyCode }}</td>
                        </tr>
                        <tr>
                            <td class="text-uppercase">{{$t('interest_rate')}}</td>
                            <td class="text-left text-bold">{{ numberFormata(interestRate) }}</td>
                        </tr>
                        <tr>
                            <td class="text-uppercase">{{$t('loan_date')}}</td>
                            <td class="text-left text-bold">{{ Helper.dateFormat(issuedDate) }}</td>
                        </tr>
                        <tr>
                            <td class="text-uppercase">{{$t('maturity_date')}}</td>
                            <td class="text-left text-bold">{{ maturityDate }}</td>
                        </tr>
                        <tr>
                            <td class="text-uppercase">{{$t('loan_account')}}</td>
                            <td class="text-left text-bold">{{ Account }}</td>
                        </tr>
                        <tr>
                            <td class="text-uppercase">{{$t('status')}}</td>
                            <td class="text-left text-bold">{{ statusTran(loanStatus) }}</td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </v-col>
        <v-col sm="12" cols="12">
            <v-simple-table >
                <template v-slot:default>
                    <tbody>
                        <tr class="third text-bold">
                            <td class="text-uppercase white--text">{{$t('outstanding_balance')}}</td>
                            <td class="white--text text-right">{{ numberFormata(outstandingAmount) }}</td>
                        </tr>
                        <tr>
                            <td class="text-uppercase">{{$t('approved_amount')}}</td>
                            <td class="primary--text text-right text-bold">{{ numberFormata(approvedAmount) }}</td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </v-col>
        <v-col sm="12" cols="12" class="">
            <div v-if="loan.id" class="float-right">
                    <v-btn @click="onEditClicked"
                           v-show="allowEdit"
                           color="primary"
                           class=" white--text  text-capitalize mx-1">
                        {{$t('edit')}}
                    </v-btn>
                    <v-btn @click="onApproveLoanClicked"
                           v-show="loan.status===LoanStatus.PENDING"
                           color="primary"
                           class=" white--text  text-capitalize">
                        {{$t('approve')}}
                    </v-btn>
                    <v-btn @click="onRecordReceiptClicked"
                           v-show="loan.status===LoanStatus.APPROVED"
                           color="primary"
                           class=" white--text  text-capitalize">
                        {{$t('record_receipt')}}
                    </v-btn>
<!--                <v-col sm="3" cols="3" class="py-0">-->
<!--                    <v-btn @click="onRecordPaymentClicked"-->
<!--                           v-show="loan.status===LoanStatus.ACTIVE"-->
<!--                           color="primary"-->
<!--                           class=" white&#45;&#45;text float-right text-capitalize">-->
<!--                        {{$t('record_payment')}}-->
<!--                    </v-btn>-->
<!--                </v-col>-->
            </div>
        </v-col>
    </v-row>
</template>
<script>
    import Helper from "@/helper.js"
    import {i18n} from "@/i18n";
    import kendo from "@progress/kendo-ui";
    import saleFormContentHandler from "@/scripts/saleFormContentHandler";
    // import { LoanModel } from "@/scripts/model/AppModels";
    const { LoanStatus } = require("@/scripts/default_setup/Collections");

    export default {
        name: "LoanInfo",
        props: {
            initLoan: {},
        },
        data () {
            return {
                Helper              : Helper,
                loan                : {},
                LoanStatus          : LoanStatus,
                banhjiBalance       : 0,
                bankBalance         : 0,
                reconcileItem       : 0,
                bankFeedConnection  : "Not Connect",
                allowEdit           : true,
                saleFormContent     : {}
            }
        },
        computed: {
            typeOfLoan(){
                if (this.initLoan) {
                    // window.console.log(this.member, 'member')
                    if (this.initLoan.hasOwnProperty('typeOfLoan')) {
                        return this.initLoan.typeOfLoan.name
                    }
                }
                return ''
            },
            loanName(){
                if (this.initLoan) {
                    // window.console.log(this.member, 'member')
                    if (this.initLoan.hasOwnProperty('name')) {
                        return this.initLoan.name
                    }
                }
                return ''
            },
            currencyCode(){
                if (this.initLoan) {
                    // window.console.log(this.initLoan, 'member')
                    if (this.initLoan.hasOwnProperty('currency')) {
                        return this.initLoan.currency.code
                    }
                }
                return ''
            },
            issuedDate(){
                if (this.initLoan) {
                    if (this.initLoan.hasOwnProperty('issuedDate')) {
                        return this.initLoan.issuedDate
                    }
                }
                return ''
            },
            interestRate(){
                if (this.initLoan) {
                    if (this.initLoan.hasOwnProperty('interestRate')) {
                        return this.initLoan.interestRate
                    }
                }
                return ''
            },
            loanStatus(){
                if (this.initLoan) {
                    if (this.initLoan.hasOwnProperty('status')) {
                        return this.initLoan.status
                    }
                }
                return ''
            },
            Account(){
                if (this.initLoan) {
                    let accName = ''
                    if (this.initLoan.hasOwnProperty('loanAccount')) {
                        let abbr = this.initLoan.loanAccount.number != undefined ? this.initLoan.loanAccount.number : ''
                        let name = this.initLoan.loanAccount.name != undefined ? this.initLoan.loanAccount.name : ''
                        accName =  abbr + ' - ' + name
                    }
                    // if(isNaN(accName)){
                    //     accName = ''
                    // }
                    return accName
                }
                return ''
            },
            maturityDate(){
                if (this.initLoan) {
                    if (this.initLoan.hasOwnProperty('maturityDate')) {
                        if(this.initLoan.maturityDate != '') {
                            return Helper.dateFormat(this.initLoan.maturityDate)
                        }
                    }
                }
                return ''
            },
            outstandingAmount(){
                if (this.initLoan) {
                    window.console.log(this.initLoan, 'out')
                    if (this.initLoan.hasOwnProperty('outStandingBalance')) {
                        return this.initLoan.outStandingBalance
                    }
                }
                return ''
            },
            availableCredit(){
                if (this.initLoan) {
                    if (this.initLoan.hasOwnProperty('availableCredit')) {
                        return this.initLoan.availableCredit
                    }
                }
                return ''
            },
            approvedAmount(){
                if (this.initLoan) {
                    if (this.initLoan.hasOwnProperty('approvedAmount')) {
                        return parseFloat(this.initLoan.approvedAmount)
                    }
                }
                return ''
            },
        },
        methods: {
            getLoan(){
                return this.loan
            },
            onEditClicked () {
                if (this.loan) {
                    this.$router.push({ name: 'New Loan', params: { initLoan: this.getLoan() } })
                }
            },
            onApproveLoanClicked() {
                if (this.loan) {
                    this.$router.push({ name: 'Approved Loan', params: { initLoan: this.initLoan } })
                }
            },
            onRecordReceiptClicked() {
                if (this.loan) {
                    this.$router.push({ name: 'Record Loan Receipt', params: { initLoan: this.getLoan() } })
                }
            },
            onRecordPaymentClicked() {
                if (this.loan) {
                    this.$router.push({ name: 'Record Loan Periodic Payment', params: { initLoan: this.getLoan() } })
                }
            },
            statusTran(val){
                return i18n.t(val)
            },
            numberFormata(value) {
                // window.console.log(this.saleFormContent.decimal,'nimol')
                return kendo.toString(value, `n${this.saleFormContent.decimal}`);
                // return value
            },
            async loadSaleFormContent() {
                new Promise((resolve) => {
                    setTimeout(() => {
                        resolve("resolved");
                        saleFormContentHandler.list().then((res) => {
                            if (res.data.statusCode === 200) {
                                const data = res.data.data;
                                if (data.length > 0) {
                                    this.saleFormContent = data[0];
                                }
                            }
                        });
                    }, 10);
                });
            },
        },
        watch: {
            initLoan () {
                this.loan = this.initLoan
                window.console.log(this.loan.status)
                this.allowEdit = true
                if(this.loan.status != 'pending'){
                    this.allowEdit = false
                }
            }
        },
        mounted: async function () {
            await this.loadSaleFormContent()
            this.loan = this.initLoan
        }
    }
</script>

<style scoped>
    .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper){
        background-color: transparent !important;
    }
    .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr.secondary:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper){
        background-color: #4d4848 !important;
    }
    .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr.third:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper){
        background-color: #898C8F !important;
    }
    .theme--light.v-data-table{
        background-color: transparent !important;
        border-top: 1px solid rgba(0, 0, 0, 0.12) !important;
        border-bottom: 1px solid rgba(0, 0, 0, 0.12) !important;
        border-radius: 0 !important;
    }
    .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > td:not(.v-data-table__mobile-row),
    .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > th:not(.v-data-table__mobile-row){
        border-bottom: 1px solid rgba(0, 0, 0, 0.12) !important;
    }
    .v-data-table > .v-data-table__wrapper > table > tbody > tr > td{
        height: 32px !important;
    }
</style>
<template>
    <v-row>
        <v-col sm="12">
            <p class="font_16">{{$t('please_make_another_review')}}</p>
             <v-simple-table>
                <template v-slot:default>
                    <tbody>
                    <tr>
                        <td class="text-bold text-uppercase">{{$t('financial_institutions')}}</td>
                        <td>:</td>
                        <td>{{ bank.bankName ? bank.bankName: ''}}</td>
                    </tr>
                    <tr>
                        <td class="text-bold text-uppercase">{{$t('account_number')}}</td>
                        <td>:</td>
                        <td>{{ bankAccount.account ? bankAccount.account: ''}}</td>
                    </tr>
                    <tr>
                        <td class="text-bold text-uppercase">{{$t('number_of_employees')}}</td>
                        <td>:</td>
                        <td>{{batchPayment.totalBatch}}</td>
                    </tr>
                    <tr>
                        <td class="green text-uppercase white--text text-bold">{{$t('total_amount')}}</td>
                        <td class="green">:</td>
                        <td class="green white--text text-right text-bold">{{format(batchPayment.batchAmount)}}</td>
                    </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </v-col>
    </v-row>
</template>
<script>
import kendo from "@progress/kendo-ui"
const payrollHandler    = require("@/scripts/payrollHandler")
const settingsHandler   = require("@/scripts/settingsHandler")
export default({
    prop:['batch'],
    data() {
        return {
            batchPayment: [],
            bank: {} ,
            bankAccount: {},
            suffix: ''
        }
    },
    methods:{
        format(val){
            return kendo.toString(val,'c2')
        },
        returnData(data){
            this.$emit('returnData', data)
        },
        loadSuccess(data){
            this.$emit('headline',data)
        },
        loadBatchSingle(){
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    payrollHandler.getBatchSingle(this.$route.params.id).then(res => {
                        if (res.statusCode === 200) {
                            let result = res.data
                            this.batchPayment = result[0]
                            this.bank = this.batchPayment.bank
                            this.bankAccount = this.batchPayment.bankAccount.account
                            this.generateNumber()
                        }
                    }).catch()
                    {
                        this.showLoading = false
                    }
                }, 300)
            })
        },
        saveSpets(){
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    let data = {
                        "id":                 this.$route.params.id ? this.$route.params.id : '',
                        "monthOf":            this.batchPayment.monthOf,
                        "bank":               this.batchPayment.bank,
                        "bankAccount":        this.batchPayment.bankAccount,
                        "balanceInBanhJi":    this.batchPayment.balanceInBanhJi,
                        "batchItem":          this.batchPayment.batchItem,
                        "batchAmount":        this.batchPayment.batchAmount,
                        "totalBatch":         this.batchPayment.totalBatch,
                        "amountInWord":       this.batchPayment.amountInWord,
                        "referencePayroll":   this.batchPayment.referencePayroll,
                        "confirm":            'done',
                        "suffix":             this.suffix,
                        "payNumber":          this.payNumber,
                        "abbr":               this.payNumber.abbr,
                        "lastNumber":         this.lastNumber,
                        "step":               3,
                        "status":             1,
                    };
                    payrollHandler.createBatchPayment(data).then(response => {
                        if (response.data.statusCode === 201) {
                            this.$snotify.success('Success')
                            this.loadSuccess(response.data.statusCode)
                            this.close()
                        }
                    }).catch(e => {
                        this.$snotify.error('Something went wrong')
                        this.errors.push(e)
                    })
                }, 300);
            })
        },
        close(){
            window.history.go(-1)
        },
        zeroPad(num, places) {
            return String(num).padStart(places, '0')
        },
        loadPrefixes() {
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        settingsHandler.getPrefixes().then(res => {
                            if (res.data.statusCode === 200) {
                                let result = res.data.data
                                this.prefixList = result.filter(p => p.type =='payroll_payment')
                                this.prefix = this.prefixList[0]
                                this.payNumber = this.prefix
                            }
                        })
                    }, 300)
                })
        },
        generateNumber() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    let data = {
                        abbr: this.payNumber.abbr,
                        structure: this.payNumber.structure,
                        date: new Date(),
                        type: 'payroll_payment',
                        pkId: 'ppm-'
                    }
                    payrollHandler.getPrefixNumber(data).then(res => {
                        this.showLoading = true;
                        if(res.data.statusCode === 200){
                            this.showLoading = false;
                            const result = res.data.data
                            const lastNumber = this.zeroPad(parseInt(result.lastNumber), this.payNumber.format)
                            this.suffix = result.suffix
                            this.lastNumber = lastNumber
                        }
                    })
                }, 300);
            })
        },
    },
    async mounted(){
        await this.loadBatchSingle()
        await this.loadPrefixes()
    },
    watch:{
        batch(){
           if(this.batch !== undefined){
                this.loadBatchSingle()
            }
        }
    }
})
</script>
<style scoped>
    .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
        background-color: transparent !important;
    }

    .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr.third:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
        background-color: #92d050 !important;
    }

    .theme--light.v-data-table {
        background-color: transparent !important;
        border-top: thin solid #ddd;
        border-bottom: thin solid #ddd;
        border-radius: 0 !important;
    }

    .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > td:not(.v-data-table__mobile-row),
    .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > th:not(.v-data-table__mobile-row) {
        border-bottom: thin solid #ddd;
    }

    .v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
        height: 32px !important;
        border-bottom: thin solid rgba(0, 0, 0, 0.12) !important;
    }
</style>

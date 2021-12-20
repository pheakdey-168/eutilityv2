<template>
    <v-row>
        <v-col sm="12">
            <h2 class="capitalize">{{$t('payroll_bank_payment_letter')}}</h2>
            <p class="text-uppercase mb-0">{{$t('payroll_bank_payament_pa')}}</p>
            <p class="mb-0">{{$t('for_the_month_of')}}: <span class="text-bold">{{monthOf}}</span></p>
            <p class="  mb-0">{{$t('reference_no')}}: <span class="text-bold"> PRP2009-001</span></p>
            <p class="">{{$t('date')}}: <span class="text-bold"> {{createdAt}}</span></p>
            <p>{{$t('bank_payment_desc_function1')}}:<span class="text-bold"> {{ bankAccount.account }}</span> 
                {{$t('bank_payment_desc_function2')}}
                <span class="text-bold"> {{format(batchPayment.batchAmount)}} ({{batchPayment.amountInWord}})</span>
                {{$t('bank_payment_desc_function3')}}
            </p>
            <v-simple-table>
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="text-bold text-uppercase">{{ $t('no') }}</th>
                            <th class="text-bold text-uppercase">{{$t('name')}}</th>
                            <th class="text-bold text-uppercase">{{$t('account_name')}}</th>
                            <th class="text-bold text-uppercase">{{$t('account_number')}}</th>
                            <th class="text-bold text-uppercase">{{$t('salary_amount')}}</th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr v-for="bathitem in batchItem" v-bind:key="bathitem.employeeId">
                        <td>{{bathitem.employeeId}}</td>
                        <td>{{bathitem.employeeName}}</td>
                        <td>{{bathitem.bank.name ? bathitem.bank.name: '' }}</td>
                        <td>{{bathitem.bankAccount}}</td>
                        <td style="text-align: right!important;">{{formatAmount(bathitem.netPay)}}</td>
                    </tr>
                    <!-- <tr>
                        <td class=""></td>
                         <td class=""></td>
                        <td class="text-uppercase text-bold text-right">{{$t('total')}}</td>
                        <td class="black white--text text-right text-bold">13,3838.49</td>
                    </tr> -->
                    </tbody>
                </template>
            </v-simple-table>
        </v-col>
    </v-row>
</template>
<script>
import kendo from "@progress/kendo-ui"
const payrollHandler    = require("@/scripts/payrollHandler")
export default({
    prop:{
        batch:{}
    },
    data() {
        return {
            batchPayment: {},
            batchItem: [],
            monthOf: '',
            batchAmount: 0,
            bankAccount: '',
            createdAt: ''
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
                            let result          = res.data
                            this.batchPayment   = result[0]
                            this.batchItem      = this.batchPayment.batchItem
                            this.monthOf        = kendo.toString(new Date(this.batchPayment.monthOf), 'y')
                            this.createdAt      = kendo.toString(new Date(this.batchPayment.createdAt),'dd MMMM yyyy')
                            this.bankAccount    = this.batchPayment.bankAccount.account 
                            this.batchItem.sort(function(i, j){
                                var keyA = i.employeeId,
                                    keyB = j.employeeId;
                                if (keyA < keyB) return -1;
                                if (keyA > keyB) return 1;
                                return 0;
                            })
                        }
                    }).catch()
                    {
                        this.showLoading = false
                    }
                }, 300)
            })
        },
        formatAmount(value){
            return kendo.toString(value,'n2')
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
                        "step":               3,
                        "status":             0,
                    };
                    payrollHandler.createBatchPayment(data).then(response => {
                        if (response.data.statusCode === 201) {
                            this.$snotify.success('Success')
                            this.loadSuccess(response.data.statusCode)
                        }
                    }).catch(e => {
                        this.$snotify.error('Something went wrong')
                        this.errors.push(e)
                    })
                }, 300);
            })
        },
    },
    async mounted(){
        await this.loadBatchSingle()
    },
    watch:{
        '$route': 'loadBatchSingle'
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
        border-collapse: collapse !important;
    }

    .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > td:not(.v-data-table__mobile-row),
    .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > th:not(.v-data-table__mobile-row) {
        border-bottom: thin solid #ddd;
    }

    .v-data-table > .v-data-table__wrapper > table td{
        height: 32px !important;
        border: thin solid rgba(0, 0, 0, 0.12) !important;
        border-collapse: collapse !important;
    }
    .v-data-table > .v-data-table__wrapper > table > thead > tr > th {
        height: 32px !important;
        border: thin solid rgba(0, 0, 0, 0.12) !important;
        color: #000 !important;
        border-collapse: collapse !important;
    }
</style>


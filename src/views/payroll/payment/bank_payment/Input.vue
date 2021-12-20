<template>
    <v-row>
        <v-col sm="3" class="pr-1">
            <p>{{$t('p_select_month')}}</p>
            <p>{{$t('financial_this_payroll')}}</p> 
        </v-col>
        <v-col sm="3" class="px-1">
            <month-picker :initialMonth="start_date"  @emitMonth="start_date = $event" @onChanged="monthChange"/>
             <v-select class="mt-1"
                id="acc_type_selector"
                :items="payrollBank"
                :rules="[v => !!v || $t('bank_name_require')]"
                item-text="bankName"
                item-value="bankUuid"
                v-model="selectBank"
                @change="bankChange"
                outlined
                return-object/>
            <v-btn color="third white--text float-right capitalize">
                {{$t('view')}}
            </v-btn>
        </v-col>
        <v-col sm="1" class=""></v-col>
        <v-col sm="1" class="pr-0 pt-4">
            <p>{{$t('payroll_batch_no')}}</p>
            <p>{{$t('bank_account')}}</p>
            <p>{{$t('balance_in_banhji')}}</p>
        </v-col>
        <v-col sm="4" class="pt-4">
            <v-select id="acc_type_selector"
                :items="payrolls"
                :rules="[v => !!v || $t('reference_number_require')]"
                item-text="referenceNumber"
                item-value="id"
                v-model="selectReference"
                outlined
                return-object
                @change="referenceChange"/>
            <v-select class="mt-1"
                id="acc_type_selector"
                :items="bankAccount"
                :rules="[v => !!v || $t('bank_name_require')]"
                item-text="account.account"
                item-value="account.id"
                v-model="selectBankAccount"
                outlined
                return-object/>
            <v-text-field outlined v-model="balanceInBanhJi"/>
        </v-col>
        <v-col sm="12">
            <kendo-datasource ref="dataSourceInputPayment"
                :data="payroll_list"
                :page-size='100'
                :sort="sort"/>
                <kendo-grid id="gridInputPayment" class="grid-function"
                    :data-source-ref="'dataSourceInputPayment'"
                    :editable="false"
                    :pageable="true"
                    :pageable-refresh="true"
                    :column-menu="true">
                    <kendo-grid-column
                        :width="150"
                        :field="'monthOf'"
                        :title="$t('month_of')"
                        :template="'<span>#= monthOf#</span>'"
                        :headerAttributes="{style: 'background-color: #EDF1F5'}"/>
                    <kendo-grid-column
                        :width="200"
                        :field="'referenceNumber'"
                        :title="$t('pay_slip')"
                        :template="'<span>#= referenceNumber#</span>'"
                        :headerAttributes="{style: 'background-color: #EDF1F5'}"/>
                    <kendo-grid-column
                        :width="100"
                        :field="'employeeId'"
                        :title="$t('employee_id')"
                        :template="'<span>#= employeeId#</span>'"
                        :headerAttributes="{style: 'background-color: #EDF1F5'}"/>
                    <kendo-grid-column
                        :width="150"
                        :field="'employeeName'"
                        :title="$t('employee_name')"
                        :template="'<span>#= employeeName#</span>'"
                        :headerAttributes="{style: 'background-color: #EDF1F5'}"/>
                    <kendo-grid-column
                        :width="100"
                        :field="'bank'"
                        :title="$t('bank')"
                        :template="'<span>#= bank.name #</span>'"
                        :headerAttributes="{style: 'background-color: #EDF1F5'}"/>
                    <kendo-grid-column
                        :width="200"
                        :field="'bankAccount'"
                        :title="$t('bank_account')"
                        :template="'<span>#= bankAccount #</span>'"
                        :headerAttributes="{style: 'background-color: #EDF1F5'}"/>
                    <kendo-grid-column
                        :width="150"
                        :field="'netPay'"
                        :title="$t('amount')"
                        :template="'<span>#= kendo.toString(netPay, `n2`) #</span>'"
                        :headerAttributes="{style: 'background-color: #EDF1F5'}"
                        :attributes="{style: 'text-align: right;'}"/>
                </kendo-grid>
                <LoadingMe
                    :isLoading="showLoading"
                    :fullPage="true"
                    :myLoading="true"
                />
        </v-col>
    </v-row>
</template>
<script>
import kendo from "@progress/kendo-ui"
import LoadingMe from '@/components/Loading'
const payrollHandler    = require("@/scripts/payrollHandler")
let number = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ','eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen ']
let words = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety']
export default({
    prop:{
        batch:{}
    },
    data() {
        return {
            showLoading: false,
            start_date: '',
            selectBank: '',
            payrollBank:   [],
            selectBankAccount: '',
            bankAccount: [],
            search:{
                start_date: "",
                end_date: ""
            },
            payrolls: [],
            payroll_list: [],
            selectReference: '',
            sort:[
                { field: 'referenceNumber', dir: 'asc' }
            ],
            num: 0,
            batchPayment: {},
            balanceInBanhJi: 0,
        }
    },
    components: {
        'LoadingMe': LoadingMe,
        'month-picker' : ()=> import('@/components/custom_templates/MonthPicker')
    },
    computed:{
        loadBatch(){
            if(this.batch !== undefined){
                return this.batch
            }else{
                return []
            }
        }
    },
    methods:{
        returnData(data){
            this.$emit('returnData', data)
        },
        loadSuccess(data){
            this.$emit('headline',data)
        },
        async loadPayrollBank(){
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    payrollHandler.getBank().then(res => {
                        this.payrollBank = res.data.data
                        this.bankChange()
                    })
                }, 300);
            })
        },
        bankChange(){
            this.bankAccount =  this.payrollBank.filter(item => item.bankUuid ===  this.selectBank.bankUuid)
        },
        monthChange(){
            let month_of = kendo.toString(new Date(this.start_date),'yyyy-MM-dd')
            this.search = {
                'start_date': month_of,
                'end_date': month_of
            }
            this.loadPayroll()
        },
        loadPayroll(){
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.employee = []
                    payrollHandler.getPayrollSummary(this.search).then(res => {
                        this.showLoading = true
                        if (res.data.statusCode === 200) {
                            this.showLoading = false
                            let result = res.data.data
                            this.payrolls = result.payrolls
                        }
                    }).catch()
                    {
                        this.showLoading = false
                    }
                }, 300)
            })
        },
        referenceChange(){
            let payroll_id = this.selectReference.id
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.employee = []
                    payrollHandler.getTransactionList(payroll_id).then(res => {
                        if (res.data.statusCode === 200) {
                            let result = res.data.data
                            this.payroll_list = result
                        }
                    }).catch()
                    {
                        this.showLoading = false
                    }
                }, 300)
            })
        },
        loadBatchSingle(){
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    payrollHandler.getBatchSingle(this.$route.params.id).then(res => {
                        this.showLoading = true
                        if (res.statusCode === 200) {
                            this.showLoading = false
                            let result = res.data
                            this.batchPayment           = result[0]
                            this.selectBank             = this.batchPayment.bank
                            this.selectBankAccount      = this.batchPayment.bankAccount
                            let monthOf                 = this.batchPayment.monthOf ? this.batchPayment.monthOf: new Date()
                            this.start_date             = kendo.toString(new Date(monthOf),'yyyy-MM')
                            this.selectReference        = this.batchPayment.referencePayroll
                            this.balanceInBanhJi        = this.batchPayment.balanceInBanhJi
                            this.payroll_list           = this.batchPayment.batchItem
                        }
                    }).catch()
                    {
                        this.showLoading = false
                    }
                }, 300)
            })
        },
        saveSpets(){
            let ds = this.$refs.dataSourceInputPayment.kendoWidget()
            let batchAmount = 0;
            let totalBatch = 0;
            ds.data().forEach(element => {
                totalBatch += 1
                batchAmount += parseFloat(element.netPay)
            });
            this.batchAmount = batchAmount
            this.totalBatch = totalBatch
            let amountInWord   = this.inWords(this.batchAmount)
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    let data = {
                        "id":                 this.$route.params.id ? this.$route.params.id : '',
                        "monthOf":            kendo.toString(new Date(this.start_date),'yyyy-MM-dd'),
                        "bank":               this.selectBank,
                        "bankAccount":        this.selectBankAccount,
                        "balanceInBanhJi":    this.balanceInBanhJi,
                        "batchItem":          ds.data(),
                        "batchAmount":        this.batchAmount,
                        "totalBatch":        this.totalBatch,
                        "referencePayroll":   this.selectReference,
                        "amountInWord":       amountInWord,
                        "step":               2,
                        "status":             0,
                    };
                    payrollHandler.createBatchPayment(data).then(response => {
                        this.showLoading = true
                        if (response.data.statusCode === 201) {
                            this.showLoading = false
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
        inWords (num) {
            if ((num = num.toString()).length > 9) return 'overflow';
            let n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
            if (!n) return; var str = '';
            str += (n[1] != 0) ? (number[Number(n[1])] || words[n[1][0]] + ' ' + number[n[1][1]]) + 'crore ' : '';
            str += (n[2] != 0) ? (number[Number(n[2])] || words[n[2][0]] + ' ' + number[n[2][1]]) + 'lakh ' : '';
            str += (n[3] != 0) ? (number[Number(n[3])] || words[n[3][0]] + ' ' + number[n[3][1]]) + 'thousand ' : '';
            str += (n[4] != 0) ? (number[Number(n[4])] || words[n[4][0]] + ' ' + number[n[4][1]]) + 'hundred ' : '';
            str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (number[Number(n[5])] || words[n[5][0]] + ' ' + number[n[5][1]]) + 'only ' : '';
            return str;
        }
    },
    async mounted(){
        await this.loadPayrollBank()
        this.loadBatchSingle()
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

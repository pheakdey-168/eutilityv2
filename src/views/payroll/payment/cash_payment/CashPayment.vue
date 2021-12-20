<template>
    <v-app>
        <v-container>
            <v-row>
                <v-col cols="12" sm="12">
                    <v-card outlined dense class="pa-4 no_border rounded-sm" color="white">
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-card outlined dense class="no_border">
                                <h2 class="mb-0">{{ $t('cash_payment') }}</h2>
                                <v-icon
                                    onclick="window.history.go(-1); return false;"
                                    style="cursor: pointer; color: #333; font-size: 40px;"
                                    class="float-right"
                                >close
                                </v-icon>
                            </v-card>
                            <v-card outlined dense class="px-3 no_border mb-3" color="white">
                                <v-row class="grayBg">
                                    <v-col sm="4" cols="12" class="pb-0">
                                        <label class="label">{{ $t("employee") }}</label>
                                        <v-autocomplete
                                            v-model="employeeSelect"
                                            style="padding-top: 0px"
                                            :items="employees"
                                            item-value="id"
                                            :filter="employeeFilter"
                                            item-text="name"
                                            :search-input.sync="search"
                                            hide-no-data
                                            hide-selected
                                            placeholder="Start typing to Search"
                                            @change="employeeChange"
                                            return-object
                                            outlined
                                            append-icon="mdi-database-search"
                                        />
                                    </v-col>
                                    <v-col sm="4" cols="12" class="pb-0">
                                        <label class="label">{{ $t("date") }}</label>
                                        <app-datepicker  @emitDate="start_date = $event" hint="MM/DD/YYYY format"/>
                                    </v-col>
                                    <v-col sm="4" cols="12" class="pb-0">
                                        <label>{{ $t('payslip') }}</label>
                                        <v-row class="my-3 mr-0">
                                            <v-col sm="3" cols="3" class="pt-0 pr-0">
                                                <div style="line-height: 20px;" class="code_text text-bold">{{
                                                    prefix.abbr}}
                                                </div>
                                            </v-col>
                                            <v-col sm="7" cols="7" class="pt-0 pl-0 pr-1">
                                                <v-text-field class=" custom-border "
                                                    v-model="number"
                                                    outlined
                                                    :rules="[v => !!v || 'Number is required']"
                                                    required
                                                    readonly/>
                                            </v-col>
                                            <v-col sm="2" cols="2" class="pt-0 px-0">
                                                <v-icon color="black" size="30" class="border_qrcode"
                                                        @click="generateNumber">mdi-qrcode
                                                </v-icon>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="12">
                                        <kendo-datasource ref="dataSource"
                                            :data="result"
                                            :change="dataSourceChanged"
                                            />
                                            <kendo-grid id="grid" class="grid-function"
                                                :data-source-ref="'dataSource'"
                                                :sortable="false"
                                                :filterable="false"
                                                :column-menu="true"
                                                :editable="true"
                                                :scrollable-virtual="true">
                                                <kendo-grid-column
                                                    :title="$t('month_of')"
                                                    :width="150"
                                                    :field="'monthOf'"
                                                    :column-menu="false"
                                                    :editable="()=>{ return false}"
                                                    :template="'<span>#=monthOf#</span>'"
                                                    :headerAttributes="{style: 'background-color: #EDF1F5;', class: 'text-products'}"
                                                    :attributes="{style: 'text-align: products'}"/>
                                                <kendo-grid-column
                                                    :field="'referenceNumber'"
                                                    :title="$t('pay_slip')"
                                                    :width="150"
                                                    :editable="()=>{ return false}"
                                                    :template="'<span>#=referenceNumber#</span>'"
                                                    :headerAttributes="{
                                                    style: 'background-color: #EDF1F5'}"/>
                                                <kendo-grid-column
                                                    :field="'netPay'"
                                                    :title="$t('open_balance')"
                                                    :width="150"
                                                    :editable="()=>{ return false}"
                                                    :template="'<span>#=kendo.toString(netPay, `n2`)#</span>'"
                                                    :headerAttributes="{
                                                    style: 'background-color: #EDF1F5'}"
                                                    :attributes="{style: 'text-align: right; '}"/>
                                                <kendo-grid-column
                                                    :field="'currency'"
                                                    :title="$t('currency')"
                                                    :width="100"
                                                    :editable="()=>{ return false}"
                                                    :template="'<span>#=currency.code#</span>'"
                                                    :headerAttributes="{
                                                    style: 'background-color: #EDF1F5; text-align: center'}"
                                                    :attributes="{style: 'text-align: center; '}"/>
                                                <kendo-grid-column
                                                    :field="'paidAmount'"
                                                    :title="$t('paid_amount')"
                                                    :width="200"
                                                    :lockable="false"
                                                    :editor="paidAmountEditor"
                                                    :headerAttributes="{style: 'text-align: right; background-color: #EDF1F5'}"
                                                    :attributes="{style: 'text-align: right; '}"/>
                                                <kendo-grid-column
                                                    :field="'paymentOption'"
                                                    :title="$t('payment_option')"
                                                    :width="200"
                                                    :lockable="false"
                                                    :editor="paymentOptionEditor"
                                                    :template="'<span>#= paymentOption.name#</span>'"
                                                    :headerAttributes="{style: 'text-align: right; background-color: #EDF1F5'}"
                                                    :attributes="{style: 'text-align: right; '}"/>
                                                <kendo-grid-column
                                                    :width="100"
                                                    :command="{iconClass: 'k-icon k-i-trash', text: 'Delete', click: removeRow, class: 'btn-plus'}"
                                                    :title="$t('action')"
                                                    :headerAttributes="{style: 'text-align: left; background-color: #EDF1F5'}"/>
                                            </kendo-grid>
                                    </v-col>
                                    <v-col cols="12" class="py-0">
                                        <v-row>
                                            <v-col md="4" sm="5" cols="12" class="py-0">
                                                <v-file-input class="mt-0 pt-0 "
                                                    v-model="files"
                                                    :placeholder="$t('attachment')"
                                                    multiple
                                                    prepend-icon="mdi-paperclip">
                                                    <template v-slot:selection="{ text }">
                                                        <v-chip
                                                            small
                                                            label
                                                            color="primary">
                                                            {{ text }}
                                                        </v-chip>
                                                    </template>
                                                </v-file-input>
                                            </v-col>
                                             <v-col md="4" sm="2" cols="12" class="py-0"></v-col>
                                            <v-col md="4" sm="5" cols="12" class="py-0">
                                                <v-simple-table>
                                                    <template v-slot:default>
                                                        <tbody>
                                                            <tr>
                                                                <td class="text-left text-uppercase pr-0">{{
                                                                    $t('total')
                                                                    }}
                                                                </td>
                                                                <td class="text-center">:</td>
                                                                <td class="text-right green--text text-bold"
                                                                    id="total">
                                                                    {{amountFormat(totalNetPay)}}
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </template>
                                                </v-simple-table>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                    <v-col sm="6" class="py-0">
                                        <v-row>
                                            <v-col sm="6" cols="12" class="py-0">
                                                <label>{{$t('message_on_payment')}}</label>
                                                <v-textarea height="80px"
                                                    no-resize
                                                    outlined
                                                    rows="4"
                                                    v-model="messageOnPayment"
                                                />
                                            </v-col>
                                            <v-col sm="6" cols="12" class="py-0">
                                                <label>{{$t('message_on_journal')}}</label>
                                                <v-textarea height="80px"
                                                    v-model="messageOnJournal"
                                                    no-resize
                                                    outlined
                                                    rows="4"
                                                />
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                </v-row>
                            </v-card>
                            <v-divider class="mt-4"/>
                            <v-card outlined dense class="no_border function_footer">
                                <v-menu>
                                    <template v-slot:activator="{ on }">
                                        <v-btn color="black" outlined class="mr-2 text-capitalize rounded-pill black--text float-left" v-on="on">
                                            {{$t('select_template')}}
                                            <v-icon size="" class="ma-1">expand_more</v-icon>
                                        </v-btn>
                                    </template>
                                    <v-list>
                                        <v-list-item v-for="(item, index) in templates" :key="index">
                                            <v-list-item-title>{{ item.title }}</v-list-item-title>
                                        </v-list-item>
                                    </v-list>
                                </v-menu>
                                <v-btn color="black"  class="text-capitalize rounded-pill white--text float-left" @click="close">{{$t('cancel')}}</v-btn>
                                <v-menu>
                                    <template v-slot:activator="{ on }">
                                        <v-btn class="ml-2 float-right text-capitalize rounded-pill white--text"
                                                color="green" v-on="on">
                                            {{ $t('save_option') }}
                                            <v-icon size="" class="ma-1">expand_more</v-icon>
                                        </v-btn>
                                    </template>
                                    <v-list rounded>
                                        <v-list-item-group>
                                            <v-list-item>
                                                <v-list-item-content>
                                                    <v-list-item-title @click="saveNew">
                                                        {{ $t('save_new') }}
                                                    </v-list-item-title>
                                                </v-list-item-content>
                                            </v-list-item>
                                            <v-list-item>
                                                <v-list-item-content>
                                                    <v-list-item-title  @click="saveClose">{{
                                                            $t('save_close')
                                                        }}
                                                    </v-list-item-title>
                                                </v-list-item-content>
                                            </v-list-item>
                                        </v-list-item-group>
                                    </v-list>
                                </v-menu>
                                <v-btn class="float-right text-capitalize rounded-pill white--text"
                                        color="third">
                                    {{ $t('save_draft') }}
                                </v-btn>
                            </v-card>
                        </v-form>
                    </v-card>
                    <LoadingMe
                        :isLoading="showLoading"
                        :fullPage="false"
                        :myLoading="true"
                       />
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<script>
    import LoadingMe from "@/components/Loading";
    import DatePickerComponent from '@/components/custom_templates/DatePickerComponent'
    import kendo from "@progress/kendo-ui"
    import Helper from "@/helper.js";
    import {JournalModel,
        JournalEntryModel,
        AccountModel,
        CurrencyModel,} from "@/scripts/model/AppModels";
    const { EntityType, } = require("@/scripts/default_setup/Collections");
    const employeeHandler   = require("@/scripts/employeeHandler")
    const payrollHandler    = require("@/scripts/payrollHandler")
    const settingsHandler   = require("@/scripts/settingsHandler")
    const {journalHandler} = require("@/scripts/AppHandlers");
    const paymentOptionHandler = require("@/scripts/paymentOptionHandler");
    const $ = require("jquery")
    export default {
        name: "Task",
        components: {
            'LoadingMe': LoadingMe,
            'app-datepicker' : DatePickerComponent
        },
        data: () => ({
            showLoading: false,
            template: [],
            start_date: new Date(),
            files: [],
            templates: [],
            result:  [],
            valid: true,
            employees: [],
            employeeSelect: '',
            search: null,
            totalNetPay: 0,
            prefix:'',
            number: '',
            messageOnPayment: '',
            messageOnJournal: '',
            selectAccount: '',
            accounts: [],
            paymentOption: [],
            resultPay: [],
        }),
        methods:{
            amountFormat(value){
                return kendo.toString(value,'n2');
            },
            async loadEmployee(){
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved')
                        employeeHandler.center().then(res => {
                            this.showLoading = true
                            if (res.data.statusCode === 200) {
                                this.showLoading = false
                                this.employees = res.data.data
                            }
                        }).catch()
                        {
                            this.showLoading = false
                        }
                    }, 300)
                })
            },
            employeeFilter(item, queryText){
                const textOne = item.name.toLowerCase()
                const textTwo = item.employeeId.toLowerCase()
                const searchText = queryText.toLowerCase()
                return textOne.indexOf(searchText) > -1 ||
                textTwo.indexOf(searchText) > -1
            },
            async payrollTansactions(){
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved')
                        payrollHandler.getTransaction(this.employeeSelect.id).then(res => {
                            if (res.data.statusCode === 200) {
                                this.showLoading = false
                                this.result = res.data.data 
                                this.initData()                           
                            }
                        }).catch()
                        {
                            this.showLoading = false
                        }
                    }, 300)
                })
            },
            employeeChange(){
                this.payrollTansactions()
                this.laodPaymentOption()
            },
            removeRow(e) {
                e.preventDefault();
                const grid = $("#grid").data("kendoGrid"),
                    dataSource = grid.dataSource,
                    dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
                if (dataSource.total() > 1) {
                    dataSource.remove(dataItem);
                    this.initData()
                }
            },
            async initData(){
                let ds = this.$refs.dataSource.kendoWidget();
                let result = ds.data()
                let totale = 0;
                result.forEach(function(r){
                    if(r.paidAmount){
                            totale  += parseFloat(r.paidAmount)
                    }
                
                })
                this.totalNetPay = totale
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
                                const number = result.suffix + this.payNumber.numberSeparator + lastNumber
                                this.lastNumber = lastNumber
                                this.number = number
                            }
                        })
                    }, 300);
                })
            },
            zeroPad(num, places) {
                return String(num).padStart(places, '0')
            },
            saveClose(){
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        let ds = this.$refs.dataSource.kendoWidget();
                        const result = ds.data().filter(n => n.paidAmount > 0)
                        if (result) {
                            let data = {
                                "id":                   this.resultPay.id ? this.resultPay.id: '',
                                "date":                 this.start_date,
                                "amountPay":            parseInt(this.totalNetPay),
                                "number":               this.number,
                                "payNumber":            this.payNumber,
                                "referenceNumber":      this.payNumber.abbr+this.payNumber.numberSeparator + this.number,
                                "abbr":                 this.payNumber.abbr,
                                "method":               "payroll_payment",
                                "lastNumber":           parseInt(this.lastNumber),
                                "messageOnJournal":     this.messageOnJournal,
                                "messageOnPayment":     this.messageOnPayment,
                                "payrollline":          result,
                                "employee":             this.employeeSelect,
                            };
                            payrollHandler.createPayment(data).then(response => {
                                if (response.data.statusCode === 201) {
                                    // this.saveJournal()  
                                }
                            }).catch(e => {
                                this.$snotify.error('Something went wrong')
                                this.errors.push(e)
                                this.close()
                            })
                        }
                    }, 300);
                })
            },
            saveNew(){
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        let ds = this.$refs.dataSource.kendoWidget();
                        const result = ds.data().filter(n => n.paidAmount > 0)
                        if (result) {
                            let data = {
                                "dete":                 this.start_date,
                                "amountPay":            parseInt(this.totalNetPay),
                                "number":               this.number,
                                "payNumber":            this.payNumber,
                                "referenceNumber":      this.payNumber.abbr+this.payNumber.numberSeparator + this.number,
                                "type":                 "payroll_payment",
                                "abbr":                 this.payNumber.abbr,
                                "method":               "payroll_payment",
                                "lastNumber":           parseInt(this.lastNumber),
                                "messageOnJournal":     this.messageOnJournal,
                                "messageOnPayment":     this.messageOnPayment,
                                "payrollline":          result,
                                "employee":             this.employeeSelect,
                                "account":              this.selectAccount
                            };
                            payrollHandler.createPayment(data).then(response => {
                                if (response.data.statusCode === 201) {
                                    this.$snotify.success('Success') 
                                    this.clear()     
                                }
                            }).catch(e => {
                                this.$snotify.error('Something went wrong')
                                this.errors.push(e)
                                this.close()
                            })
                        }
                    }, 300);
                })
            },
            close(){
                window.history.go(-1)
                this.clear()
            },
            clear(){
                this.employeeSelect = ''
                this.start_date = new Date('dd-MM-yyyy')
                this.result = []
                this.messageOnPayment = ''
                this.messageOnJournal = ''
                this.totalNetPay = 0
                this.loadPrefixes()
            },
            paidAmountEditor(container, options) {
                $('<input data-bind="value:' + options.field + '"/>')
                    .appendTo(container)
                    .kendoNumericTextBox({
                        decimals: 30,
                    });
            },
            paymentOptionEditor(container, options){
                $('<input name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDropDownList({
                    autoBind: true,
                    autoWidth: true,
                    height: 400,
                    filter: "contains",
                    dataTextField: "name",
                    dataValueField: "name",
                    template: "<span>#=name#</span>",
                    optionLabel: "--- Select ---",
                    dataSource: new kendo.data.DataSource({
                        data: this.paymentOption,
                    })
                })
            },
            dataSourceChanged(e) {
                if (e.field) {
                    this.initData()
                }
            },
            saveJournal(){
                let ds = this.$refs.dataSource.kendoWidget();
                let lastResult = {}
                let last_result = ds.data().reduce(function(m, n) {
                    let key = n.paymentOption.name + n.paymentOption.code
                    if(!lastResult[key]) {
                        lastResult[key] = Object.assign({}, n); // create a copy of o
                        m.push(lastResult[key]);
                    } else {
                        lastResult[key].paidAmount += n.paidAmount;
                    }
                    return m;
                }, []);
                let journals = []
                last_result.forEach(item=>{
                    journals.push(
                        new JournalEntryModel({
                            'description': 'Salary Tax',
                            'account': new AccountModel(item.paymentOption.account),
                            'currency': new CurrencyModel(item.currency),
                            'amount':           item.paidAmount * -1 
                        })
                    )
                })
                let resultEmployee = {}
                let employee_result =  last_result.reduce(function(o, p) {
                    let key = p.employeeId + p.employeeName
                    if(!resultEmployee[key]) {
                        resultEmployee[key] = Object.assign({}, p); // create a copy of o
                        o.push(resultEmployee[key]);
                    }
                    return o;
                }, []);
                journals.push(
                    new JournalEntryModel({
                        'description':  'Salary Expence',
                        'account': new AccountModel(this.employeeSelect.payrollLiabilitie),
                        'currency': new CurrencyModel(employee_result[0].currency),
                        'amount':           this.totalNetPay // dr,
                    }),
                )
                let data = new JournalModel({
                    'description':                  'Payroll Payment',
                    'number':                       this.payNumber.abbr+this.payNumber.numberSeparator + this.number,
                    'journal_date':                 Helper.toISODate(new Date(this.start_date).toISOString().substr(0, 7)),//'2021-02-01',
                    'month_of':                     Helper.toISODate(new Date(this.start_date).toISOString().substr(0, 7)),//'2021-02-01',   
                    'journal_type':                 EntityType.GENERAL_JOURNAL,
                    'transaction_type':             EntityType.JOURNAL,
                    'journal_entries':              journals,
                })
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        this.showLoading = true
                        journalHandler.save(data).then(response => {
                            this.showLoading = true
                            if (response.status == 200) {
                                this.showLoading = false
                                this.$snotify.success('Success')
                                this.close()
                            }
                        }).catch(e => {
                            this.$snotify.error('Something went wrong')
                            this.errors.push(e)
                            this.close()
                        })
                    }, 300);
                })
            },
            laodPaymentOption(){
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        paymentOptionHandler.list()
                        .then(res => {
                            if(res){
                                let resultPayOption = res.data
                                this.paymentOption = resultPayOption.data
                                this.showLoading = false
                            }
                        })
                    }, 300);
                })
            },
            async loadSinglePayment(){
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved')
                        payrollHandler.getPaymentSingle(this.$route.params.id).then(res => {
                            this.showLoading = true
                            if (res.statusCode === 200) {
                                this.showLoading = false
                                if(res.data.length > 0){
                                    this.resultPay          =  res.data[0]
                                    this.result             = this.resultPay.payrollline
                                    this.employeeSelect     = this.resultPay.employee
                                    this.start_date         = kendo.toString(new Date(this.resultPay.date), 'dd-MM-yyyy')
                                    this.number             = this.resultPay.number
                                    this.messageOnPayment   = this.resultPay.messageOnPayment
                                    this.messageOnJournal   = this.resultPay.messageOnJournal
                                    this.totalNetPay        = parseFloat(this.resultPay.amountPay)
                                }else{
                                    this.generateNumber()
                                    this.loadEmployee()
                                }
                            }
                        }).catch()
                        {
                            this.showLoading = false
                        }
                    }, 300)
                })
            }
        },
        async mounted(){
            await this.loadEmployee()
            await this.loadPrefixes()
            await this.laodPaymentOption()
            await this.loadSinglePayment()
        },
        watch:{
            '$route': 'loadSinglePayment'
        },        
    };
</script>

<style scoped>
    .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > td:not(.v-data-table__mobile-row),
    .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > th:not(.v-data-table__mobile-row) {
        border-bottom: thin solid #ddd;
    }

    .v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
        height: 32px !important;
        border-bottom: thin solid rgba(0, 0, 0, 0.12) !important;
        border-top: thin solid rgba(0, 0, 0, 0.12) !important;
    }
    .v-text-field__details{
        display: none !important;
    }

@media (min-width: 1264px) {
    .container {
        max-width: 1080px !important;
    }

}

.k-dropdown {
    width: 100%;
    margin-top: 3px;
}
</style>

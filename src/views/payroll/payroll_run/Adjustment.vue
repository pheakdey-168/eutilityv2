<template>
    <v-row>
        <v-col cols="12" class="pt-0">
            <v-row>
                <v-col sm="4" cols="12">
                    <h3>{{$t('payroll_adjustment')}}</h3>
                </v-col>
            </v-row>
        </v-col>
        <v-col cols="12">
            <kendo-datasource ref="dataSourceAdjus"
                :data="adjustmentList"
                :change="onChanges"/>
                <kendo-grid id="gridAdjus" class="grid-function"
                    :data-source-ref="'dataSourceAdjus'"
                    :editable="true"
                    :scrollable-virtual="true">
                <kendo-grid-column
                    :field="'no'"
                    :title="$t('no')"
                    :template="rowNumberTmpl"
                    :width="80"
                    :column-menu="false"
                    :headerAttributes="{ style: 'background-color: #EDF1F5;', class: 'text-center'	}"
                    :attributes="{style: 'text-align: center'}"/>
                <kendo-grid-column
                    :field="'employee'"
                    :title="$t('employee_name')"
                    :template="'<span>#= employee.name#</span>'"
                    :editor="employeeDropDownEditor"
                    :headerAttributes="{
                        style: 'background-color: #EDF1F5'
                    }"/>
                <kendo-grid-column
                    :field="'payrollComponent'"
                    :title="$t('payroll_component')"
                    :template="'<span>#= payrollComponent.name#</span>'"
                    :editor="payrollComponentDropDownEditor"
                    :headerAttributes="{
                        style: 'background-color: #EDF1F5'
                    }"/>
                <kendo-grid-column
                    :field="'amount'"
                    :title="$t('amount')"
                    :template="'<span>#= amount#</span>'"
                    :headerAttributes="{
                        style: 'background-color: #EDF1F5'
                    }"/>
                 <kendo-grid-column
                    :width="100"
                    :command="{ iconClass: 'k-icon k-i-trash', text: 'Delete', click: removeRow, class: 'btn-plus' }"
                    :title="$t('action')"
                    :headerAttributes="{style: 'text-align: left; background-color: #EDF1F5'}"/>
            </kendo-grid>
            <v-btn color="greenText"
                    class="float-left rounded-0 white--text mt-3"
                    @click="addRow">
                <v-icon size="" class="ma-1">mdi mdi-plus</v-icon>
            </v-btn>
        </v-col>
        <LoadingMe :isLoading="showLoading" :fullPage="true" :myLoading="true"/>
    </v-row>
</template>
<script>
    import kendo from "@progress/kendo-ui"
    import PayrollList from "@/scripts/model/PayrollList"
    import Adjustment from "@/scripts/model/Adjustment"
    const payrollHandler = require("@/scripts/payrollHandler")
    const employeeHandler = require("@/scripts/employeeHandler")
    const payrollListModel = new PayrollList({})
    const adjustmentModel = new Adjustment({})
    const $ = require("jquery")
    export default {
        props:['loadPayrolls'],
        data: () =>({
            journal_date: "",
            dialogm: false,
            pyrollList: [],
            showLoading: false,
            payrollList: payrollListModel,
            adjustment: adjustmentModel,
            adjustmentList: []
        }),
        components: {
            LoadingMe: () => import(`@/components/Loading`)
        },
        methods:{
            loadPayrollList(){
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        payrollHandler.getPayroll(this.$route.params.id).then(res => {
                            this.showLoading = true;
                            if(res.data.statusCode === 200){
                                this.showLoading = false;
                                const resultPay = res.data.data[0]
                                this.payrollList = resultPay.payrollList
                                this.payrolls   = resultPay
                                if(resultPay.adjustment.length > 0){
                                    this.adjustmentList = resultPay.adjustment
                                }
                            }
                        })
                    }, 300);
                })
            },
            rowNumberTmpl(dataItem) {
                    var ds = this.$refs.dataSourceAdjus.kendoWidget(),
                        index = ds.indexOf(dataItem);
                    return index + 1;
            },
            addRow() {
                let ds = this.$refs.dataSourceAdjus.kendoWidget(),
                    total = ds.total();
                ds.insert(total,{
                    payrollComponent: {
                        name: '-- Select --',
                    },
                    employee: {
                        name: '-- Select --',
                    },
                    amount: 0
                });

            },
            removeRow(e) {
                e.preventDefault();
                const grid = $("#gridAdjus").data("kendoGrid"),
                    dataSource = grid.dataSource,
                    dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
                if (dataSource.total() > 1) {
                    dataSource.remove(dataItem);
                }
            },
            onChanges(){
                this.loadEmployee()   
                this.loadPayrollComponent()     
            },
            employeeDropDownEditor(container, options){
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
                        data: this.employee,
                    })
                })
            },
            payrollComponentDropDownEditor(container, options){
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
                        data: this.payrollComponent,
                    })
                })
            },
            async loadEmployee(){
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved')
                        this.employee = []
                        employeeHandler.center().then(res => {
                            this.showLoading = true
                            if (res.data.statusCode === 200) {
                                this.showLoading = false
                                this.employee = res.data.data
                            }
                        }).catch()
                        {
                            this.showLoading = false
                        }
                    }, 300)
                })
            },
            async loadPayrollComponent(){
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved')
                        this.payrollComponent = []
                        payrollHandler.getComponent().then(res => {
                            this.showLoading = true
                            if (res.data.statusCode === 200) {
                                this.showLoading = false
                                const types = ['Deduction','Benefits']
                                this.payrollComponent =  res.data.data.filter(m => {
                                    const exist = types.filter(n=> n === m.compoType.name)
                                        if(exist.length > 0){
                                            return m
                                        }
                                    }
                                )
                            }
                        }).catch()
                        {
                            this.showLoading = false
                        }
                    }, 300)
                })
            },
            saveAdjust(){
                let ds = this.$refs.dataSourceAdjus.kendoWidget();
                let payrollList = this.loadPayrolls;
                let helper = {};
                let result = ds.data().reduce(function(index, value) {
                    if(value.employee.id){
                        let key = value.payrollComponent.compoType.name +'-'+value.employee.employeeId ;
                        if(!helper[key]) {
                            helper[key] = Object.assign({}, value); // create a copy of o
                            index.push(helper[key]);
                        } else {
                            helper[key].amount += parseFloat(value.amount);
                            helper[key].conponentType = value.payrollComponent.compoType.name;
                        }
                    }
                    return index
                }, []);
                let payList = [];
                payrollList.forEach(function(pa){
                    let deduction = 0;
                    let benefit = 0;
                    let employeeUuid = pa.employeeUuid;
                    result.forEach(function(r){
                        if(r.payrollComponent.compoType.id === "deduction" && r.employee.id === employeeUuid){
                            deduction = parseFloat(r.amount);
                        }else if(r.payrollComponent.compoType.id === "benefit" && r.employee.id === employeeUuid){
                            benefit = parseFloat(r.amount)
                        }
                    })
                    payList.push({
                        employeeUuid:               pa.employeeUuid,
                        deduction:                  deduction,
                        bank:                       pa.bank, 
                        bankAccount:                pa.bankAccount, 
                        totalBenefit:               pa.totalBenefit + benefit,
                        employeeName:               pa.employeeName,
                        employeeId:                 pa.employeeId,
                        natureEmployee:             pa.natureEmployee,
                        paymentMethod:              pa.paymentMethod,
                        payrollLiabilitie:          pa.payrollLiabilitie,
                        location:                   pa.location,
                        overTimeHoliday:            pa.overTimeHoliday,
                        overTimeWeekend:            pa.overTimeWeekend,
                        position:                   pa.position,
                        natureContract:             pa.natureContract,
                        salary:                     pa.salary,
                        salaryType:                 pa.salaryType,
                        startingTime:               pa.startingTime,
                        workDay:                    pa.workDay,
                        workTime:                   pa.workTime, 
                    })
                })
                this.payList = payList
                let payrolls = this.payrolls
                new Promise(resolve => {
                    setTimeout(() => {
                    resolve('resolved');
                        let data = {
                            "id":                   this.$route.params.id,
                            "monthOf":              payrolls.monthOf,
                            "payDate":              payrolls.payDate,
                            "totalEmployee":        payrolls.totalEmployee,
                            "number":               payrolls.number,
                            "lastNumber":           payrolls.lastNumber,
                            "abbr":                 payrolls.abbr,
                            "referenceNumber":      payrolls.referenceNumber,
                            "payNumber":            payrolls.payNumber,
                            "type":                 payrolls.type,
                            "currency":             payrolls.currency,
                            "exchangeRate":         payrolls.exchangeRate,
                            "totalDeduction":       0,
                            "totalGross":           0,
                            "totalBenefits":        0,
                            "totalNetSalary":       0,
                            "totalTaxPaymentUS":    0,
                            "totaleTax":            0,
                            "adjustment":           ds.data(),
                            "payrollList":          this.payList,
                            "step":                 2,          
                        };
                        payrollHandler.createPayroll(data).then(response => {
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
            loadSuccess(data){
                this.$emit('headline',data)
            }
        },
        mounted(){
            this.addRow()
            this.loadPayrollList()
        },
        watch: {
            loadPayrolls(){
                if (this.loadPayrolls !== undefined) {
                    this.loadPayrollList()
                }
            }
        }
    }
</script>
<style scoped>
    .grayBg{
        background-color: #f3f8ff;
    }
    .my_table_darkv .theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
        color: rgba(0, 0, 0, 0.6);
        background: #222a35;
        color: #fff !important;
    }
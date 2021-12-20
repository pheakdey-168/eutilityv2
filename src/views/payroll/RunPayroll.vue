<template>
    <v-row>
        <v-col cols="12" sm="12">
            <h2>{{$t('run_payroll')}}</h2>
                <v-btn width="120" color="third" @click="onSave"
                    class="rounded-pill white--text float-right text-capitalize ml-5">
                    {{ $t('create_new') }}
                </v-btn>
            <div class="reports_table">
                <kendo-datasource ref="dataSource"
                :data="payrollList"/>
                <kendo-grid id="gridPayrollRun" class="grid-function"
                    :data-source-ref="'dataSource'"
                    v-on:databound="dataBound"
                    :editable="true"
                    :scrollable-virtual="true">
                <kendo-grid-column
                    :width="200"
                    :field="'referenceNumber'"
                    :title="$t('reference_number')"
                    :template="'<span>#= referenceNumber#</span>'"
                    :headerAttributes="{style: 'background-color: #EDF1F5'}"
                    :attributes="{ style: 'text-align: center'}"/>
                <kendo-grid-column
                    :width="120"
                    :field="'monthOf'"
                    :title="$t('month_of')"
                    :template="'<span>#= monthOf#</span>'"
                    :headerAttributes="{style: 'background-color: #EDF1F5'}"/>
                <kendo-grid-column
                    :width="150"
                    :field="'totalEmployee'"
                    :title="$t('total_employee')"
                    :template="'<span>#= totalEmployee#</span>'"
                    :headerAttributes="{style: 'background-color: #EDF1F5'}"
                    :attributes="{ style: 'text-align: center'}"/>
                <kendo-grid-column
                    :width="150"
                    :field="'totalGross'"
                    :title="$t('gross_salary')"
                    :template="'<span>#= kendo.toString(totalGross,`n2`)#</span>'"
                    :headerAttributes="{style: 'background-color: #EDF1F5'}"
                    :attributes="{ style: 'text-align: right'}"/>
                <kendo-grid-column
                     :width="100"
                    :field="'totalBenefits'"
                    :title="$t('benefits')"
                    :template="'<span>#= kendo.toString(totalBenefits,`n2`)#</span>'"
                    :headerAttributes="{style: 'background-color: #EDF1F5'}"
                    :attributes="{ style: 'text-align: right'}"/>
                <kendo-grid-column
                     :width="100"
                    :field="'totalTaxPaymentUS'"
                    :title="$t('tax')"
                    :template="'<span>#= kendo.toString(totalTaxPaymentUS,`n2`)#</span>'"
                    :headerAttributes="{style: 'background-color: #EDF1F5'}"
                    :attributes="{ style: 'text-align: right'}"/>
                <kendo-grid-column
                    :width="120"
                    :field="'totalNetSalary'"
                    :title="$t('net_salary')"
                    :template="'<span>#= kendo.toString(totalNetSalary,`n2`)#</span>'"
                    :headerAttributes="{style: 'background-color: #EDF1F5'}"
                    :attributes="{ style: 'text-align: right'}"/>
                <kendo-grid-column
                    :field="''"
                    :title="$t('action')"
                    :width="120"
                    :visible="true"
                    :command="[{className: 'k-state-disabled isStatus', iconClass: 'k-icon k-i-edit', text: 'Edit', click: goEdit }]"
                    :headerAttributes="{style: 'text-align: right; background-color: #EDF1F5'}"
                    :attributes="{ style: 'text-align: right'}"/> 
            </kendo-grid>
            </div>
        </v-col>
    </v-row>
</template>

<script>
    import PayrollRun from "@/scripts/model/PayrollRun";
    const payrollRunModel = new PayrollRun({})
    const payrollHandler = require("@/scripts/payrollHandler")
    const $ = require("jquery")
    export default {
        name: "RunPayroll",
        components: {
        },
        data: () => ({
            payrollRun: payrollRunModel,
            payroll_id: '',
            payrollList: [],
        }),
        methods: {
            onSave(){
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        let data = new PayrollRun({
                        "id":                   this.payrollRun.id ? this.payrollRun.id : '',
                        "monthOf":              '',
                        "number":               '',
                        "referenceNumber":      '',
                        "lastNumber":           '',
                        "abbr":                 '',
                        "payNumber":            '',
                        "type":                 'payroll',
                        "totalEmployee":        0,
                        "totalGross":           0,
                        "totalBenefits":        0,
                        "totalDeduction":       0,
                        "totalTaxPaymentUS":    0,
                        "totalTaxBenefit":      0,
                        "totalNetSalary":       0,
                        "totalNetPay":          0,
                        "payrollList":          [],
                        "adjustment":           [],
                        "step":                 0,  
                        "final":                ''        
                        });
                        payrollHandler.createPayroll(new PayrollRun(data)).then(response => {
                            if (response.data.statusCode === 201) {
                                const result = response.data
                                this.payroll_id = result.data.id
                                this.routerTo()
                            }
                        }).catch(e => {
                            this.$snotify.error('Something went wrong')
                            this.errors.push(e)
                        })
                    }, 300);
                })
            },
            routerTo(){
                this.$router.push({
                    path: 'payroll_run' + `/${this.payroll_id}`,
                    params: {id: this.payroll_id}
                })
            },
            loadPayrolls(){
                let params = {}
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved')
                        this.employee = []
                        payrollHandler.getPayrollList(params).then(res => {
                            this.showLoading = true
                            if (res.data.statusCode === 200) {
                                this.showLoading = false
                                this.payrollList = res.data.data
                            }
                        }).catch()
                        {
                            this.showLoading = false
                        }
                    }, 300)
                })
            },
            dataBound: function (e) {
                const grid = $("#grid").data("kendoGrid")
                const items = e.sender.items()
                items.each(function () {
                    let dataItem = grid.dataItem(this);
                    $("tr[data-uid='" + dataItem.uid + "']").find(".isStatus").each(function () {
                        if (dataItem.status == 0) {
                            $(this).removeClass('k-state-disabled')
                        }
                    })
                })
            },
            goEdit(e) {
                e.preventDefault();
                let grid = $("#gridPayrollRun").data("kendoGrid");
                let dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
                this.$router.push({
                    path: 'payroll_run' + `/${dataItem.id}`,
                    params: {id: dataItem.id},
                    query: {type: 'edit'}
                })
            },
        },
        mounted() {
            this.loadPayrolls()
        },
        computed: { 
        },
        watch: {
            '$route': 'loadPayrolls'
        },
    };
</script>
<style scoped>
</style>
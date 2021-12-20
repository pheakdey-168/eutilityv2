    <template>
    <v-row class="">
        <v-col sm="12" cols="12" class="pt-0">
            <v-row class="">
                <v-col sm="12" cols="12" class="pt-0">
                    <v-row>
                        <v-col sm="7" cols="12" class="py-0">
                            <h2 class="mb-0 font_20">{{$t('payroll_payment')}}</h2>
                        </v-col>
                        <v-col sm="6" cols="1" class="pb-0 pl-6 pt-2 pb-0">
                            <v-btn to="payroll_cash_payment" class="capitalize float-right white--text"  color="third">
                                {{$t('cash_payment')}}
                            </v-btn>
                            <v-btn to="bank_payment" outlined class="capitalize float-right mx-2"  color="black" @click="addBatch">
                                {{$t('bank_payment')}}
                            </v-btn>
                        </v-col>
                    </v-row>
                    <v-row class="mt-2">
                        <v-col sm="4" cols="12" class="py-0 d-flex justify-space-between">
                            <label class="mt-3 mr-1">{{$t('from')}}</label>
                            <app-datepicker :initialDate="start_date" @emitDate="start_date = $event"/>
                        </v-col>

                        <v-col sm="4" cols="12" class="py-0  d-flex justify-space-between">
                            <label class="mt-3 mr-1">{{$t('to')}}</label>
                            <app-datepicker :initialDate="end_date" @emitDate="end_date = $event" :min="start_date"/>
                        </v-col>
                        <v-col sm="2" cols="1" class="py-1">
                            <v-btn color="third white--text" @click="onSearch">
                                {{$t('search')}}
                            </v-btn>
                        </v-col>
                
                    </v-row>
                </v-col>
            </v-row>

            <v-row class="">
                <v-col sm="12" cols="12" class="py-0">
                    <kendo-datasource ref="dataSource"
                    :data="payments"/>
                    <kendo-grid id="grid" class="grid-function"
                        :data-source-ref="'dataSource'"
                        :editable="false"
                        :scrollable-virtual="true">
                    <kendo-grid-column
                        :width="200"
                        :field="'employee'"
                        :title="$t('employee')"
                        :template="'<span>#= employee.name#</span>'"
                        :headerAttributes="{style: 'background-color: #EDF1F5'}"
                        :attributes="{ style: 'text-align: left'}"/>
                    <kendo-grid-column
                        :width="200"
                        :field="'referenceNumber'"
                        :title="$t('reference_number')"
                        :template="'<span>#= referenceNumber#</span>'"
                        :headerAttributes="{style: 'background-color: #EDF1F5'}"
                        :attributes="{ style: 'text-align: center'}"/>
                    <kendo-grid-column
                        :width="120"
                        :field="'amountPay'"
                        :title="$t('amount_pay')"
                        :template="'<span>#= kendo.toString(amountPay,`c2`)#</span>'"
                        :headerAttributes="{style: 'background-color: #EDF1F5'}"/>
                    <kendo-grid-column
                        :width="120"
                        :field="'date'"
                        :title="$t('date')"
                        :template="'<span>#= kendo.toString(new Date(date), `dd-MM-yyyy` )#</span>'"
                        :headerAttributes="{style: 'background-color: #EDF1F5'}"/>
                    <kendo-grid-column
                        :width="150"
                        :field="'method'"
                        :title="$t('method')"
                        :template="'<span>#= method #</span>'"
                        :headerAttributes="{style: 'background-color: #EDF1F5'}"/>
                    <kendo-grid-column
                        :field="''"
                        :title="$t('action')"
                        :width="70"
                        :command="[{iconClass: 'k-icon k-i-edit', text: 'Edit', click: goEdit }]"
                        :headerAttributes="{style: 'text-align: right; background-color: #EDF1F5'}"/>                       
                    </kendo-grid>
                    <LoadingMe
                        :isLoading="showLoading"
                        :fullPage="false"
                        :myLoading="true"
                       />
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>
<script>
import LoadingMe from "@/components/Loading";
import kendo from "@progress/kendo-ui"
const $ = require("jquery")
const payrollHandler = require("@/scripts/payrollHandler")
export default {
    data: () => ({
        showLoading: false,
        start_date: "",
        end_date: "",
        data: [],
        payments: [],
        search:{
            start_date: "",
            end_date: ""
        },
        batchPayment: [],
        batch_id: ''
    }),
    props: {},
    methods: {
        numberFormat(value){
            return kendo.toString( kendo.parseFloat(value),"c2")
        },
        loadPayment(){
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    payrollHandler.getPayment(this.search).then(res => {
                        this.showLoading = true
                        if (res.data.statusCode === 200) {
                            this.showLoading = false
                            this.payments = res.data.data
                        }
                    }).catch()
                    {
                        this.showLoading = false
                    }
                }, 300)
            })
        },
        onSearch(){
            this.search = {
                'start_date': this.start_date,
                'end_date': this.end_date
            }
            this.loadPayment()
        },
        goEdit(e){
            e.preventDefault();
                let grid = $("#grid").data("kendoGrid");
                let dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
                this.$router.push({
                path: 'payroll_cash_payment' + `/${dataItem.id}`,
                params: {id: dataItem.id},
                query: {type: 'edit'}
            })
        },
        addBatch(){
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    let data = {
                        "id":                 this.batchPayment.id ? this.batchPayment.id : '',
                        "monthOf":            '',
                        "bank":               '',
                        "bankAccount":        '',
                        "balanceInBanhJi":    0,
                        "batchItem":          '',
                        "step":               1,
                        "status":             0,
                    };
                    payrollHandler.createBatchPayment(data).then(response => {
                        if (response.data.statusCode === 201) {
                            let result = response.data
                            this.batch_id = result.data.id
                            this.routerTo()
                        }
                    }).catch(e => {
                        this.errors.push(e)
                    })
                }, 300);
            })
        },
        routerTo(){
            this.$router.push({
                path: 'bank_payment' + `/${this.batch_id}`,
                params: {id: this.batch_id}
            })
        },
    },
    async mounted() {
        await this.loadPayment()
    },
    computed: {},
    components: {
        'LoadingMe': LoadingMe,
        'app-datepicker' : ()=> import('@/components/custom_templates/DatePickerComponent')
    },
};
</script>
<style scoped>
.acc_group header {
    height: 10px !important;
}

table.acc_group tr td {
    border-bottom: 1px solid #ccc;
    padding: 8px;
    vertical-align: middle;
}

table.acc_group tr td:first-child {
    font-weight: 700;
}

table.acc_group tr td:last-child {
    text-align: center;
}

.v-card__actions .v-btn.v-btn {
    padding: 0 16px;
}

.exchange-table.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
    font-family: 'Krasar-Bold', serif;
    color: #000 !important;
    border-top: 1px solid #000 !important;
    border-bottom: 1px solid #000 !important;
    font-size: 15px !important;
}

.exchange-table.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > td {
    color: #000 !important;
    padding: 5px !important;
}

.exchange-table.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:last-child td {
    border-bottom: 1px solid #000 !important;
}

.function_footer {
    padding: 15px;
    display: inline-block;
}

p {
    color: rgba(0, 0, 0, 0.87);
}

.actionBtn {
    height: 47.2px !important;
}

.text_tip {
    font-size: 9px;
    line-height: 10px;
}
.v-btn {
    text-transform: capitalize !important;
}

@media (max-width: 576px) {

}
</style>

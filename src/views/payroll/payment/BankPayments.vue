    <template>
    <v-row class="">
        <v-col sm="12" cols="12" class="pt-0">
            <v-row class="">
                <v-col sm="12" cols="12" class="pt-0">
                    <v-row>
                        <v-col sm="10" cols="12" class="py-0">
                            <h2 class="mb-0 font_20">{{$t('bank_payments')}}</h2>
                        </v-col>
                     
                    </v-row>
                    <v-row class="mt-2">
                        <v-col sm="4" cols="12" class="py-0 d-flex justify-space-between">
                            <label class="mt-3 mr-1">{{$t('from')}}</label>
                            <month-picker :initialMonth="start_date" @emitMonth="start_date = $event"/>
                        </v-col>

                        <v-col sm="4" cols="12" class="py-0  d-flex justify-space-between">
                            <label class="mt-3 mr-1">{{$t('to')}}</label>
                            <month-picker :initialMonth="end_date" @emitMonth="end_date = $event" :min="start_date"/>
                        </v-col>
                        <v-col sm="2" cols="1" class="py-1">
                            <v-btn color="third white--text" @click="onSearch">
                                {{$t('view')}}
                            </v-btn>
                        </v-col>
                
                    </v-row>
                </v-col>
            </v-row>

            <v-row class="">
                <v-col sm="12" cols="12" class="py-0">
                    <v-simple-table class="attachment_table">
                        <kendo-datasource ref="dataSource"
                            :data="batchPayments"
                            />
                            <kendo-grid id="gridBatchPayment" class="grid-function"
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
                                    :title="$t('number_of_employee')"
                                    :width="150"
                                    :field="'totalBatch'"
                                    :column-menu="false"
                                    :editable="()=>{ return false}"
                                    :template="'<span>#=totalBatch#</span>'"
                                    :headerAttributes="{style: 'background-color: #EDF1F5;', class: 'text-products'}"
                                    :attributes="{style: 'text-align: products'}"/>
                                <kendo-grid-column
                                    :title="$t('bank_account')"
                                    :width="150"
                                    :field="'bank'"
                                    :column-menu="false"
                                    :editable="()=>{ return false}"
                                    :template="'<span>#=bank.bankName#</span>'"
                                    :headerAttributes="{style: 'background-color: #EDF1F5;', class: 'text-products'}"
                                    :attributes="{style: 'text-align: products'}"/>
                                <kendo-grid-column
                                    :title="$t('bank_account')"
                                    :width="150"
                                    :field="'bankAccount'"
                                    :column-menu="false"
                                    :editable="()=>{ return false}"
                                    :template="'<span>#=bankAccount.account.account#</span>'"
                                    :headerAttributes="{style: 'background-color: #EDF1F5;', class: 'text-products'}"
                                    :attributes="{style: 'text-align: products'}"/>
                                <kendo-grid-column
                                    :title="$t('total_amount')"
                                    :width="150"
                                    :field="'batchAmount'"
                                    :column-menu="false"
                                    :editable="()=>{ return false}"
                                    :template="'<span>#= kendo.toString(batchAmount, `n2`)#</span>'"
                                    :headerAttributes="{style: 'background-color: #EDF1F5;', class: 'text-products'}"
                                    :attributes="{style: 'text-align: right'}"/>
                                <kendo-grid-column
                                    :field="''"
                                    :title="$t('action')"
                                    :width="70"
                                    :command="[{iconClass: 'k-icon k-i-edit', text: 'Edit', click: goEdit }]"
                                    :headerAttributes="{style: 'text-align: right; background-color: #EDF1F5'}"/>  
                            </kendo-grid>
                    </v-simple-table>
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
        batchPayments: [],
        search:{
            start_date: "",
            end_date: ""
        },
    }),
    props: {},
    methods: {
        loadBatchPayment(){
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    payrollHandler.getBatchPaymentList(this.search).then(res => {
                        this.showLoading = true
                        if (res.data.statusCode === 200) {
                            this.showLoading = false
                            this.batchPayments = res.data.data
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
                'start_date': kendo.toString(new Date(this.start_date), 'yyyy-MM-dd'),
                'end_date': kendo.toString(new Date(this.end_date), 'yyyy-MM-dd')
            }
            this.loadBatchPayment()
        },
        goEdit(e){
            e.preventDefault();
                let grid = $("#gridBatchPayment").data("kendoGrid");
                let dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
                this.$router.push({
                path: 'bank_payment' + `/${dataItem.id}`,
                params: {id: dataItem.id},
                query: {type: 'edit'}
            })
        },
    },
    async mounted() {
        await this.loadBatchPayment()
    },
    computed: {},
    components: {
        'LoadingMe': LoadingMe,
        'month-picker' : ()=> import('@/components/custom_templates/MonthPicker')
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

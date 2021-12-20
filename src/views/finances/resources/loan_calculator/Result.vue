<template>
    <v-row>
        <v-col sm="12" cols="12" class="grayBg px-6">
            <v-card color="white" class="pa-4 no_border" elevation="0">
                <h2 class="font_20">{{ $t('loan_calculation_result') }}</h2>
                <v-row class="mt-3">
                    <v-col sm="12">
                        <v-simple-table class="table1">
                            <template v-slot:default>
                                <tbody>
                                <tr>
                                    <td class="text-left ">{{ $t("loan_principle") }}</td>
                                    <td class="text-right text-bold">{{ numberFormat(loanPrinciple) }}</td>
                                </tr>
                                <tr>
                                    <td class="text-left">{{ $t('loan_type') }}</td>
                                    <td class="text-right text-bold">{{ loanType }}</td>
                                </tr>
                                <tr>
                                    <td class="text-left ">{{ $t("loan_terms_month") }}</td>
                                    <td class="text-right text-bold">{{ loanTerm }}</td>
                                </tr>
                                <tr>
                                    <td class="text-left">{{ $t('total_interest') }}</td>
                                    <td class="text-right text-bold">{{ numberFormat(totalInterest) }}</td>
                                </tr>
                                <tr>
                                    <td class="text-left">{{ $t('interest_rate_per_month') }}</td>
                                    <td class="text-right text-bold">{{ numberFormat(interestRate) }}</td>
                                </tr>
                                <tr>
                                    <td class="text-left">{{ $t('total_payment') }}</td>
                                    <td class="text-right text-bold">{{ numberFormat(totalPayment) }}</td>
                                </tr>
                                <!--                                    <tr>-->
                                <!--                                        <td class="text-left">{{$t('origination_application_fee')}}</td>-->
                                <!--                                        <td class="text-right text-bold">USD 500</td>-->
                                <!--                                    </tr>-->
                                <!--                                    <tr>-->
                                <!--                                        <td class="text-left">{{$t('monthly_servicing_charge')}}</td>-->
                                <!--                                        <td class="text-right text-bold">USD 500</td>-->
                                <!--                                    </tr>-->
                                </tbody>
                            </template>
                        </v-simple-table>
<!--                        <v-simple-table class="mt-4 table2">-->
<!--                            <template v-slot:default>-->
<!--                                <tbody>-->
<!--                                -->
<!--                                &lt;!&ndash;                                    <tr class="primary white&#45;&#45;text">&ndash;&gt;-->
<!--                                &lt;!&ndash;                                        <td class="text-bold">{{ $t("monthly_payment") }}</td>&ndash;&gt;-->
<!--                                &lt;!&ndash;                                        <td class="text-bold">USA</td>&ndash;&gt;-->
<!--                                &lt;!&ndash;                                        <td class="text-right text-bold">{{ monthlyPayment }}</td>&ndash;&gt;-->
<!--                                &lt;!&ndash;                                    </tr>&ndash;&gt;-->
<!--                                &lt;!&ndash;                                    <tr class="primary white&#45;&#45;text">&ndash;&gt;-->
<!--                                &lt;!&ndash;                                        <td class="text-bold">{{ $t("total_financing_cost") }}</td>&ndash;&gt;-->
<!--                                &lt;!&ndash;                                        <td class="text-bold">USA</td>&ndash;&gt;-->
<!--                                &lt;!&ndash;                                        <td class="text-right text-bold">11.2%</td>&ndash;&gt;-->
<!--                                &lt;!&ndash;                                    </tr>&ndash;&gt;-->
<!--                                <tr class="black white&#45;&#45;text">-->
<!--                                    <td class="text-bold">{{ $t("") }}</td>-->
<!--                                    <td class="text-bold">USA</td>-->
<!--                                    <td class="text-right text-bold">{{  }}</td>-->
<!--                                </tr>-->

<!--                                </tbody>-->
<!--                            </template>-->
<!--                        </v-simple-table>-->
                    </v-col>
                </v-row>
                <v-row>
                    <v-col sm="12" cols="12" class="py-0">
                        <template>
                            <kendo-datasource
                                ref="scheduleAR"
                                :data="scheduleData"/>
                            <kendo-grid
                                id="scheduleAR" class="grid-function"
                                :data-source-ref="'scheduleAR'"
                                :column-menu="false"
                                :noRecords="true"
                                :editable="false"
                                :groupable="false"
                                :scrollable-virtual="true">
                                <kendo-grid-column
                                    :title="$t('no.')"
                                    :width="55"
                                    :column-menu="false"
                                    :template="rowNumberTmpl"
                                    :headerAttributes="{style: 'background-color: #EDF1F5;',class: 'text-products'}"
                                    :attributes="{style: 'text-align: center'}"
                                />
                                <kendo-grid-column
                                    :field="'disbursed_amt'"
                                    :title="$t('principle_remaining')"
                                    :template="'<span>#= kendo.toString(principal_r, numberFormat) #</span>'"
                                    :width="200"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"
                                    :attributes="{style: 'text-align: right'}"
                                />
                                <kendo-grid-column
                                    :field="'amount_to_be_paid'"
                                    :title="$t('amount_to_be_paid')"
                                    :template="'<span>#= kendo.toString(total, numberFormat) #</span>'"
                                    :width="150"
                                    :headerAttributes="{style: 'background-color: #EDF1F5' }"
                                    :attributes="{style: 'text-align: right; font-weight: bold'}"
                                />
                                <kendo-grid-column
                                    :field="'principal_amount'"
                                    :title="$t('principal_amount')"
                                    :template="'<span>#= kendo.toString(principal, numberFormat) #</span>'"
                                    :width="150"
                                    :headerAttributes="{style: 'background-color: #EDF1F5'}"
                                    :attributes="{style: 'text-align: right'}"
                                />
                                <kendo-grid-column
                                    :field="'interest'"
                                    :title="$t('interest')"
                                    :template="'<span>#= kendo.toString(interest, numberFormat) #</span>'"
                                    :width="200"
                                    :attributes="{style: 'text-align: right'}"
                                    :headerAttributes="{style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'ending_balance'"
                                    :title="$t('ending_balance')"
                                    :template="'<span>#= date!=`Total` ? kendo.toString(principal_r - principal, numberFormat) : `` #</span>'"
                                    :width="200"
                                    :attributes="{style: 'text-align: right'}"
                                    :headerAttributes="{style: 'background-color: #EDF1F5'}"
                                />
                            </kendo-grid>
                        </template>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col class="12">
                        <v-btn @click="back" color="black" outlined class="capitalize black--text float-left ">
                            {{ $t('back') }}
                        </v-btn>
<!--                        <v-btn @click="next" color="primary" class="capitalize white&#45;&#45;text float-right ">-->
<!--                            {{ $t('calculate') }}-->
<!--                        </v-btn>-->
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import kendo from "@progress/kendo-ui";
const $ = kendo.jQuery
export default {
    data: () => ({
        showLoading: false,
        scheduleData: []
    }),
    props: {
        result: {},
    },
    components: {
        // LoadingMe: () => import(`@/components/Loading`),
    },
    methods: {
        back() {
            this.$emit('back')
        },
        getSchedule(){
            // window.console.log('get schedule')
            this.scheduleData = []
            let sAR = []
            if(this.result.hasOwnProperty('schdules')) {
                if(this.result.schdules.length > 0) {
                    $.each(this.result.schdules, function (i, v) {
                        sAR.push(v)
                    })
                    this.scheduleData = sAR
                }
            }
            window.console.log(this.result, 'abc')
        },
        rowNumberTmpl(dataItem) {
            let ds = this.$refs.scheduleAR.kendoWidget(),
                index = ds.indexOf(dataItem);
            return index + 1;
        },
        numberFormat(value) {
            // window.console.log(this.saleFormContent.decimal,'nimol')
            return kendo.toString(parseFloat(value), `n${this.result.decimal}`);
            // return value
        },
    },
    computed: {
        loanPrinciple() {
            if (this.result) {
                this.getSchedule()
                return this.result.amount
            }
            return ''
        },
        loanType() {
            if (this.result) {
                let name = ''
                if (this.result.paymentMethod == 1) {
                    name = 'បង់ថយ'
                } else {
                    name = 'បង់ថេរ'
                }
                return name
            }
            return ''
        },
        loanTerm() {
            if (this.result) {
                return this.result.period
            }
            return ''
        },
        totalInterest() {
            if (this.result) {
                return this.result.totalInterest
            }
            return ''
        },
        monthlyPayment() {
            if (this.result) {
                return this.result.monthlyRepayment
            }
            return ''
        },
        totalPayment() {
            if (this.result) {
                return this.result.totalPayment
            }
            return ''
        },
        interestRate() {
            if (this.result) {
                return this.result.interestRate
            }
            return ''
        }
    },
    mounted: async function () {
        // this.getSchedule()
    },
    watch: {
        // '$route': 'getSchedule',
    },
};
</script>
<style scoped>
.table1.theme--light.v-data-table {
    background-color: transparent !important;
}

.table1.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
    height: 32px !important;
    border-bottom: thin solid rgba(0, 0, 0, 0.12) !important;
}

.table2.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
    height: 32px !important;
    border: thin solid #fff !important;
}

/* .v-data-table > .v-data-table__wrapper > table > tbody > tr:first-child > td {
    border-top: thin solid rgba(0, 0, 0, 0.12) !important;
} */

.table2.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
    background-color: transparent !important;
}

.table1.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
    background-color: transparent !important;
}

.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr.primary:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
    background-color: #92d050 !important;
}

.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr.black:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
    background-color: #92d050 !important;
}

</style>
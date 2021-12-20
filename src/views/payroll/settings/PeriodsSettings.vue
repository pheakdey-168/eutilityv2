<template>
    <v-row class="">
        <v-col sm="12" cols="12" class="pt-0" v-if="!periodList || formEdit === true">
            <v-row>
                <v-col sm="4" cols="12" class="pt-0">
                    <h3 class="black--text">{{$t('payment_period')}}</h3>
                    <p class="mb-0">{{$t('payment_period_desc')}} </p>
                </v-col>
                <v-col sm="8" cols="12">
                    <v-select class=" mb-3"
                        outlined
                        tage="Payment Period"
                        :items="paymentPeriod"
                        item-text="name"
                        item-value="id"
                        v-model="paymentPeriodSelected"
                        return-object />
                </v-col>
            </v-row>
            <v-row>
                <v-col sm="4" cols="12">
                    <h3 class="black--text">{{$t('work_period')}}</h3>
                    <p class="mb-0">{{$t('work_period_desc')}} </p>
                </v-col>
                <v-col sm="2" cols="12">
                    <label class="label">{{$t('hour_per_day')}}</label>
                </v-col>
                <v-col sm="6" cols="12">
                    <v-text-field class=""
                        outlined
                        tage="Hour per day"
                        v-model="period.hourPerDay"
                        placeholder=""/>
                </v-col>
            </v-row>
            <v-row>
                <v-col sm="4" cols="12">
                    <h3 class="black--text">{{$t('overtime_setting')}}</h3>
                    <p class="mb-0">{{$t('overtime_setting_desc')}} </p>
                </v-col>
                <v-col sm="2" cols="12">
                    <label class="label">{{$t('overtime_for_weekend')}}</label>
                </v-col>
                <v-col sm="2" cols="12">
                    <v-text-field class=""
                                  outlined
                                  tage="Overtime for Weekend"
                                  v-model="period.overtimeForWeekend"
                                  placeholder=""/>
                </v-col>
                <v-col sm="3" cols="12">
                    <label class="label">{{$t('overtime_for_national_holiday')}}</label>
                </v-col>
                <v-col sm="1" cols="12">
                    <v-text-field class=""
                        outlined
                        tage="Overtime for national holiday"
                        v-model="period.overtimeForNationalHoliday"
                        placeholder=""/>
                </v-col>
                <v-card-actions class="pa-12" cols="12">
                        <v-row>
                            <v-col sm="6" cols="6" class="py-0 text-right">
                                <v-btn color="secondary" class="px-3 rounded-pill white--text text-capitalize" @click="onSave">{{$t('save')}}
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card-actions>
            </v-row>
        </v-col>
        <v-col sm="12" cols="12" class="pt-0" v-else>
            <v-row>
                <v-col sm="4" cols="12">
                    <h3 class="black--text">{{$t('payment_period')}}</h3>
                    <p class="mb-0">{{$t('payment_period_desc')}} </p>
                </v-col>
                <v-col sm="8" cols="12">
                    <h3>{{paymentPeriodName}}</h3>
                </v-col>
            </v-row>
            <v-row>
                <v-col sm="4" cols="12">
                    <h3 class="black--text">{{$t('work_period')}}</h3>
                    <p class="mb-0">{{$t('work_period_desc')}} </p>
                </v-col>
                <v-col sm="2" cols="12">
                    <label class="label">{{$t('hour_per_day')}}</label>
                </v-col>
                <v-col sm="6" cols="12">
                    <h3>{{periodList.hourPerDay}}</h3>
                </v-col>
            </v-row>
            <v-row>
                <v-col sm="4" cols="12">
                    <h3 class="black--text">{{$t('overtime_setting')}}</h3>
                    <p class="mb-0">{{$t('overtime_setting_desc')}} </p>
                </v-col>
                <v-col sm="2" cols="12">
                    <label class="label">{{$t('overtime_for_weekend')}}</label>
                </v-col>
                <v-col sm="2" cols="12">
                   <h3>{{periodList.overtimeForWeekend}}</h3>
                </v-col>
                <v-col sm="3" cols="12">
                    <label class="label">{{$t('overtime_for_national_holiday')}}</label>
                </v-col>
                <v-col sm="1" cols="12">
                    <h3>{{periodList.overtimeForNationalHoliday}}</h3>
                </v-col>
                <v-card-actions class="pa-12" cols="12">
                        <v-row>
                            <v-col sm="6" cols="6" class="py-0 text-left">
                                <v-btn color="black" outlined class=" text-capitalize rounded-pill black--text float-left  third" @click="onEdit(periodList)">{{$t('edit')}}</v-btn>
                            </v-col>
                        </v-row>
                    </v-card-actions>
            </v-row>
        </v-col>
    </v-row>
</template>

<script>
    const payrollHandler = require("../../../scripts/payrollHandler")
    import Period from '@/scripts/model/Period'
    const PeriodModel = new Period({})
    export default {
        components: {},
        data: () => ({
            paymentPeriodSelected: '',
            paymentPeriod:[
                {id: 'weekly',      name: 'Weekly'},
                {id: 'bi_weekly',   name: 'Bi Weekly'},
                {id: 'monthly',     name: 'Monthly'},
            ],
            paymentPeriodName: '',
            period: PeriodModel,
            periodList: [],
            formEdit: false
        }),
        props: {},
        computed: {},
        watch: {
        },
        created() {
            
        },
        methods: {
            async onSave() {
                // if (!this.$refs.form.validate()) {
                //     this.$refs.form.validate()
                //     return
                // }
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        let data = {
                            "id": this.period.id ? this.period.id : '',
                            "paymentPeriod": this.paymentPeriodSelected,
                            "hourPerDay": this.period.hourPerDay,
                            "overtimeForWeekend": this.period.overtimeForWeekend,
                            "overtimeForNationalHoliday": this.period.overtimeForNationalHoliday
                        }
                        payrollHandler.createPeriod(data).then(response => {
                            if (response.data.statusCode === 201){
                                this.loadPeriod()
                                this.formEdit = false
                                this.$snotify.success('Success')
                            }
                        }).catch(e => {
                            this.$snotify.error('Something went wrong')
                            this.errors.push(e)
                        })
                    }, 300);
                })
            },
            async loadPeriod(){
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        payrollHandler.getPeriiod().then(res => {
                            this.periodList = res[0]
                            this.paymentPeriodName = this.periodList.paymentPeriod.name
                        })
                    }, 300);
                })
            },
            onEdit(value){
                this.formEdit = true
                this.period = value
                this.paymentPeriodSelected = value.paymentPeriod
            }
        },
        mounted: async function () {
            this.loadPeriod()
        }
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

    @media (max-width: 576px) {

    }
</style>
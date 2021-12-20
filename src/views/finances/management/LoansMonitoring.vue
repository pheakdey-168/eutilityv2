<template>
    <v-row>
        <v-col sm="12" cols="12" class="pt-0">
            <v-card color="white" class="no_border" elevation="0">
                <v-row>
                    <v-col sm="8" class="py-0">
                        <h2 class="mb-0 font_20">{{$t('list_of_loan_being_monitored')}}</h2>
                    </v-col>
                  
                </v-row>
                <v-row class="mt-2">
                    <v-col sm="4" class="py-0">
                        <v-card outlined dense class="pa-3 rounded-4 no_border white--text" color="secondary" min-height="60px">
                            <h3 class="text-left text-uppercase font_12 flex-1">{{$t('no_of_requests')}}</h3>
                            <h3 class="text-right font_20 flex-1 ">100,00</h3>
                        </v-card>
                    </v-col>
                     <v-col sm="4" class="py-0">
                        <v-card outlined dense class="pa-3 rounded-4 no_border white--text" color="secondary" min-height="60px">
                            <h3 class="text-left text-uppercase font_12 flex-1">{{$t('being_monitoring')}}</h3>
                            <h3 class="text-right font_20 flex-1 ">100</h3>
                        </v-card>
                    </v-col>
                    <v-col sm="4" class="d-flex py-0">
                        <month-picker :initialMonth="date" @emitMonth="date = $event"/>
                        <v-btn color="primary" class="white--text capitalize ml-3 mt-1">{{$t('view')}}</v-btn>
                    </v-col>
                </v-row>
                  
                <LoadingMe
                        :isLoading="compeletLoading"
                        :fullPage="false"
                        :myLoading="true">

                </LoadingMe>
                <!-- <v-row class="">
                   
                    <v-col sm="9" cols="12" class="py-0">
                        <app-searchdate :initStartDate="startDate" @emitStartDate="startDate = $event"
                                        :initEndDate="endDate" @emitEndDate="endDate = $event"/>
                    </v-col>
                    <v-col sm="1" cols="1" class="py-1">
                        <v-btn color="primary white--text">
                            <i class="b-search" style="font-size: 18px; color:#fff !important;"/>
                        </v-btn>
                    </v-col>
                    <v-col sm="2" cols="2" class="py-1">
                        <v-btn
                                icon
                                color="black"
                                class="bg-none float-right ml-2"
                        >
                            <v-icon class="font_34">fa fa-file-excel</v-icon>
                        </v-btn>
                        <v-btn
                                icon
                                color="black"
                                class="bg-none float-right ml-2"
                        >
                            <v-icon class="font_34">fa fa-print</v-icon>
                        </v-btn>

                    </v-col>
                </v-row> -->
                <v-row>
                    <v-col sm="12" cols="12" class="pb-0">
                        <template>
                            <v-simple-table class="attachment_table">
                                <template v-slot:default>
                                    <thead>
                                    <tr>
                                        <th>{{$t('loan_account')}}</th>
                                        <th>{{$t('financial_institution')}}</th>
                                        <th>{{$t('consent_date')}}</th>
                                        <th>{{$t('monitored_data_points')}}</th>
                                        <th>{{$t('status')}}</th>
                                        <th>{{$t('action')}}</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </template>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
    import LoadingMe from '@/components/Loading'
    // import DatePickerComponent from '@/components/custom_templates/DatePickerComponent'

    export default {
        name: "",
        components: {
            LoadingMe,
            // 'app-datepicker': DatePickerComponent,
            // 'app-searchdate' : ()=> import('@/components/custom_templates/SearchDate'),
            // BankConnection,
            'month-picker' : ()=> import('@/components/custom_templates/MonthPicker')
        },
        data: () => ({
            startDate: "",
            endDate: "",
            date: '',
            dateSorters: ['Today', 'This Week', 'This Month', 'This Year'],
            journal_entries: [],
            // LoadingMe
            compeletLoading: false,
            isLoaded: false,
        }),
        methods: {
        },
        mounted() {
        },
        computed: {
        },
    };
</script>
<style scoped>
</style>
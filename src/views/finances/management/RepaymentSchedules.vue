<template>
    <v-row>
        <v-col sm="12" cols="12" class="pt-0">
            <v-card color="white" class="no_border" elevation="0">
                <v-row>
                    <v-col sm="8" class="py-0">
                        <h2 class="mb-0 font_20">{{$t('loan_payment_schedule')}}</h2>
                    </v-col>
                    <v-col sm="4" class="py-0">
                        <v-select outlined/>
                    </v-col>
                </v-row>
                <LoadingMe
                        :isLoading="compeletLoading"
                        :fullPage="false"
                        :myLoading="true">

                </LoadingMe>
                <v-row class="">
                   
                    <v-col sm="9" cols="12" class="py-0">
                        <app-searchdate :initStartDate="startDate" @emitStartDate="startDate = $event"
                                        :initEndDate="endDate" @emitEndDate="endDate = $event"/>
                    </v-col>
                    <v-col sm="1" cols="12" class="py-1">
                        <v-btn color="primary white--text">
                            <i class="b-search" style="font-size: 18px; color:#fff !important;"/>
                        </v-btn>
                    </v-col>
                    <v-col sm="2" cols="12" class="py-1">
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
                </v-row>
                <v-row>
                    <v-col sm="12" cols="12" class="py-0">
                        <template>
                            <v-simple-table class="attachment_table">
                                <template v-slot:default>
                                    <thead>
                                    <tr>
                                        <th>{{$t('loan_account')}}</th>
                                        <th>{{$t('repayment_date')}}</th>
                                        <th>{{$t('repayment_amount')}}</th>
                                        <th>{{$t('remaining_balance')}}</th>
                                        <th>{{$t('principal_amount')}}</th>
                                        <th>{{$t('interest_amount')}}</th>
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
            'app-searchdate' : ()=> import('@/components/custom_templates/SearchDate'),
            // BankConnection,
        },
        data: () => ({
            startDate: "",
            endDate: "",
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
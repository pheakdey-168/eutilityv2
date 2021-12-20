<template>
    <v-row class="">
        <v-col sm="12" cols="12" class="pt-0">
            <v-row class="">
                <v-col sm="12" cols="12" class="pt-0">
                    <v-row>
                        <v-col sm="8" cols="12" class="py-0">
                            <h2 class="mb-0 font_20">{{$t('employee_balances')}}</h2>
                        </v-col>
                        <v-col sm="4" cols="12" class="py-0">
                            <v-select outlined :placeholder="$t('employee')" />
                        </v-col>
                    </v-row>
                    <v-row class="">
                       
                        <v-col sm="4" cols="12" class="pb-0 d-flex justify-space-between">
                            <label class="mt-3 mr-1">{{$t('from')}}</label>
                            <app-datepicker :initialDate="start_date" @emitDate="start_date = $event"/>
                        </v-col>

                        <v-col sm="4" cols="12" class="pb-0  d-flex justify-space-between">
                            <label class="mt-3 mr-1">{{$t('to')}}</label>
                            <app-datepicker :initialDate="end_date" @emitDate="end_date = $event"/>
                        </v-col>

                        <v-col sm="2" cols="1" class="pb-0 pt-4">
                            <v-btn color="third white--text">
                                {{$t('view')}}
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>

            <v-row class="">
                <v-col sm="12" cols="12" class="py-0">
                    <template>
                        <v-simple-table class="attachment_table">
                            <template v-slot:default>
                                <thead>
                                <tr>
                                    <th></th>
                                    <th class="text-uppercase">{{ $t('total') }}</th>
                                    <th>{{ $t('payroll_liabilities') }}</th>
                                    <th>{{ $t('other_business_balance') }}</th>
                                    <th>{{ $t('business_advance') }}</th>
                                    <th>{{ $t('personal_advance') }}</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>Emploery A</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>Emploery B</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>Total</td>
                                </tr>
                                </tbody>
                            </template>
                        </v-simple-table>
                    </template>
                    <LoadingMe
                        :isLoading="showLoading"
                        :fullPage="true"
                        :myLoading="true"
                       />
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>
<script>
import LoadingMe from "@/components/Loading";
export default {
    data: () => ({
        showLoading: false,
        start_date: "",
        end_date: "",

    }),
    props: {},
    methods: {

    },
    async mounted() {
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

@media (max-width: 576px) {

}
</style>

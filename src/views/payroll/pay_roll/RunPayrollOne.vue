<template>
    <v-app>
        <v-container>
            <v-row>
                <v-col cols="12" sm="12">
                    <v-card outlined dense class="pa-4 no_border rounded-sm" color="white">
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-card outlined dense class="no_border">
                                <h2 class="mb-0">{{ $t('payroll_run') }}</h2>
                                <v-icon
                                    onclick="window.history.go(-1); return false;"
                                    style="cursor: pointer; color: #333; font-size: 40px;"
                                    class="float-right"
                                >close
                                </v-icon>
                            </v-card>

                            <v-card outlined dense class="px-3 no_border mb-3" color="white">
                                <v-row class="grayBg">
                                    <v-col sm="4" cols="12" class="pb-0 pl-4">
                                        <label class="label">{{ $t("employee") }}</label>
                                        <v-select  return-object class="mt-1" outlined/>
                                    </v-col>
                                    <v-col sm="4" cols="12" class="pb-0">
                                        <label class="label">{{ $t("date") }}</label>
                                        <app-datepicker  @emitDate="start_date = $event"/>
                                    </v-col>
                                    <v-col  sm="4" cols="12" class="pb-0">
                                        <label class="label mb-0">{{ $t('number') }}</label>
                                        <v-row class="mt-1 mr-0">
                                            <v-col sm="3" cols="3" class="pt-0 pr-0">
                                                <div class="code_text text-bold">AA
                                                </div>
                                            </v-col>
                                            <v-col sm="7" cols="7" class="pt-0 pl-0 pr-1">
                                                <v-text-field class=" custom-border "
                                                                outlined
                                                                :disabled="true"
                                                                :rules="[v => !!v || 'Number is required']"
                                                                required/>
                                            </v-col>
                                            <v-col sm="2" cols="2" class="pt-0 pr-1 pl-0">
                                                <v-icon style="width: 100%" color="black" size="30" class="border_qrcode"
                                                       >mdi-qrcode
                                                </v-icon>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                </v-row>
                                <v-row>
                                   <v-col cols="12" sm="6">
                                        <v-row>
                                           <v-col sm="2" class="py-0">
                                               <label>{{$t('month_of')}}</label>
                                           </v-col>
                                           <v-col sm="6" class="py-0">
                                                <month-picker :initialMonth="month_of" @emitMonth="month_of = $event"/>
                                           </v-col>
                                        </v-row>
                                        <v-row>
                                           <v-col sm="4" class="py-0 pr-0">
                                               <p>{{$t('approve_exchange_rate')}}</p>
                                           </v-col>
                                           <v-col sm="4" class="py-0">
                                                <h3 class="green--text">4,050.00</h3>
                                           </v-col>
                                            <v-col sm="4" class="py-0">
                                                <v-btn class=" capitalize float-right white--text" color="third" >
                                                    {{$t('view')}}
                                                </v-btn>
                                           </v-col>
                                        </v-row>
                                        <v-simple-table>
                                            <template v-slot:default>
                                                <tbody>
                                                    <tr>
                                                        <td class="text-bold width_200 text-uppercase">{{$t('work_day')}}</td>
                                                        <td>:</td>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <td class="text-bold width_200 text-uppercase">{{$t('overtime_holiday')}}</td>
                                                        <td>:</td>
                                                        <td></td>
                                                    </tr>
                                                     <tr>
                                                        <td class="text-bold width_200 text-uppercase">{{$t('overtime_weekend')}}</td>
                                                        <td>:</td>
                                                        <td></td>
                                                    </tr>
                                                </tbody>
                                            </template>
                                        </v-simple-table>
                                        <v-simple-table class="mt-6">
                                            <template v-slot:default>
                                                <tbody>
                                                    <tr>
                                                        <th class="text-bold text-uppercase">{{$t('payroll_component')}}</th>
                                                        <th class="text-bold text-uppercase">{{$t('amount')}}</th>
                                                        <th class="text-bold text-uppercase">{{$t('action')}}</th>
                                                    </tr>
                                                    <tr>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                    </tr>
                                                     <tr>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                    </tr>
                                                </tbody>
                                            </template>
                                        </v-simple-table>
                                        <v-btn class="mt-3 capitalize float-right white--text" color="third" >
                                            {{$t('run_this_payroll')}}
                                        </v-btn>
                                   </v-col>
                                    <v-col cols="12" sm="6" class="pr-0">
                                        <v-card elevation="0" color="grayBg" class="pa-5">
                                            <h3 class="font_22 mb-3">{{$t('pay_slip_summary')}}</h3>
                                            <v-simple-table>
                                                <template v-slot:default>
                                                    <tbody>
                                                        <tr>
                                                            <td class="text-bold width_200 text-uppercase">{{$t('pay_slip_summary')}}</td>
                                                            <td>:</td>
                                                            <td></td>
                                                        </tr>
                                                        <tr>
                                                            <td class="text-bold width_200 text-uppercase">{{$t('salary')}}</td>
                                                            <td>:</td>
                                                            <td></td>
                                                        </tr>
                                                        <tr>
                                                            <td class="text-bold width_200 text-uppercase">{{$t('deduction')}}</td>
                                                            <td>:</td>
                                                            <td></td>
                                                        </tr>
                                                        <tr>
                                                            <td class="text-bold width_200 text-uppercase">{{$t('gross_salary')}}</td>
                                                            <td>:</td>
                                                            <td></td>
                                                        </tr>
                                                        <tr>
                                                            <td class="text-bold width_200 text-uppercase">{{$t('benefits')}}</td>
                                                            <td>:</td>
                                                            <td></td>
                                                        </tr>
                                                        <tr>
                                                            <td class="text-bold width_200 text-uppercase">{{$t('tax_on_salary')}}</td>
                                                            <td>:</td>
                                                            <td></td>
                                                        </tr>
                                                        <tr>
                                                            <td class="text-bold width_200 text-uppercase">{{$t('fbt_tax')}}</td>
                                                            <td>:</td>
                                                            <td></td>
                                                        </tr>
                                                        <tr>
                                                            <td class="text-bold text-uppercase">{{$t('net_salary')}}</td>
                                                            <td>:</td>
                                                            <td></td>
                                                        </tr>
                                                    </tbody>
                                                </template>
                                            </v-simple-table>
                                        </v-card>
                                   </v-col>
                                </v-row>
                            </v-card>
                            <v-divider class="mt-4"/>
                            <v-card outlined dense class="no_border function_footer">
                                <v-menu>
                                    <template v-slot:activator="{ on }">
                                        <v-btn color="black" outlined class="mr-2 text-capitalize rounded-pill black--text float-left">
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
                                <v-btn color="black"  class="text-capitalize rounded-pill white--text float-left" >{{$t('cancel')}}</v-btn>
                                <v-btn class="ml-2 float-right text-capitalize rounded-pill white--text"
                                        color="green">
                                    {{ $t('save_option') }}
                                </v-btn>
                            </v-card>

                        </v-form>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<script>
import DatePickerComponent from '@/components/custom_templates/DatePickerComponent'
export default {
    name: "RunPayroll",
    components: {
         'app-datepicker' : DatePickerComponent,
         'month-picker' : ()=> import('@/components/custom_templates/MonthPicker')
    },
    data: () => ({
        template: [],
        start_date: '',
        month_of : '',
        files: [],
        templates: [],
        data:  [],
        valid: true,

    }),
     
};
</script>

<style scoped>
   .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
        background-color: transparent !important;
    }

    .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr.third:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
        background-color: #92d050 !important;
    }

    .theme--light.v-data-table {
        background-color: transparent !important;
        border-top: thin solid #ddd;
        border-bottom: thin solid #ddd;
        border-radius: 0 !important;
    }
    .width_200{
        width: 200px;
    }
    .text-bold{
        font-size: 14px !important;
    }
    .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > td:not(.v-data-table__mobile-row),
    .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > th:not(.v-data-table__mobile-row) {
        border-bottom: thin solid #ddd;
    }

    .v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
        height: 32px !important;
    }
     .v-data-table > .v-data-table__wrapper > table > tbody > tr > th{
        height: 32px !important;
        font-size: 14px !important;
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

<template>
    <v-row>
        <v-col sm="12" cols="12" class="grayBg px-3">
            <v-card color="white" class="py-3 px-4 no_border" elevation="0">
                <h3 class="primary--text text-uppercase">{{$t('your_current_deb_financing_capacity')}}</h3>
                <v-row class="mt-3">
                    <v-col sm="12" cols="12" class="py-0">
                        <v-simple-table>
                            <template v-slot:default>
                                <!-- <thead>
                                    <tr>
                                        <th class="text-bold text-uppercase">{{$t('description')}}</th>
                                        <th></th>
                                        <th class="text-bold text-uppercase">{{$t('amount_exclusive_of_vat')}}</th>
                                        <th class="text-bold text-uppercase">{{$t('vat_amount')}}</th>
                                    </tr>
                                </thead> -->
                                <tbody>
                                <tr>
                                    <td></td>
                                    <td class="secondary white--text">{{$t('current')}}</td>
                                    <td class="secondary white--text text-center">
                                        {{$t('with_new_financing')}}
                                        <br/>
                                        ({{$t('indicative_number')}})
                                    </td>
                                    <td class="secondary white--text">%</td>
                                    <td class="primary--text"></td>
                                </tr>
                                <tr class="third">
                                    <td class="text-bold white--text">{{$t('outstanding_debts')}}</td>
                                    <td class="text-bold white--text">100000</td>
                                    <td class="black--text text-bold">30%</td>
                                    <td class="white--text  text-bold">300</td>
                                    <td class="white--text">{{$t('outstanding_debts_desc')}}</td>
                                </tr>
                                <tr class="third">
                                    <td class="text-bold white--text">{{$t('monthly_repayment')}}</td>
                                    <td class="white--text text-bold">100000</td>
                                    <td class="black--tex text-bold">100000</td>
                                    <td  class="white--text  text-bold">20%</td>
                                    <td class="white--text">{{$t('monthly_repayment_desc')}}</td>
                                </tr>
                                <tr>
                                    <td class="text-bold">{{$t('debt_service_coverage_ratio')}}</td>
                                    <td class="primary--text text-bold">2.00</td>
                                    <td class="text-bold">.10</td>
                                    <td class="text-bold grey--text">(50%)</td>
                                    <td class="grey--text">1> {{$t('show_the_ability_to_pay')}}</td>
                                </tr>
                                <tr>
                                   <td class="text-bold">{{$t('interest_coverage_ratio')}}</td>
                                    <td class="primary--text text-bold">2.00</td>
                                    <td class="text-bold">.10</td>
                                    <td class="text-bold grey--text">(50%)</td>
                                    <td class="grey--text">3> {{$t('interest_coverage_ratio_desc')}}</td>
                                </tr>
                                <tr>
                                    <td class="text-bold">{{$t('debt_ratio')}}</td>
                                    <td class="primary--text text-bold">2.00</td>
                                    <td class="text-bold">.10</td>
                                    <td class="text-bold grey--text">(50%)</td>
                                    <td class="grey--text">50% {{$t('debt_ratio_desc')}}</td>
                                </tr>
                                </tbody>
                            </template>
                        </v-simple-table>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-btn @click="next" color="primary" class="capitalize white--text float-right ">{{$t('next')}}</v-btn>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>

export default {
    data: () => ({
        showLoading: false,
    }),
    components: {
        // LoadingMe: () => import(`@/components/Loading`),

    },
    methods: {
      next(){
          this.$emit('next')
      }
    },
    computed: {},
    mounted: async function () {
   
    }
};
</script>
<style scoped>
    .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
        background-color: transparent !important;
    }
    .theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr:last-child > th {
        font-size: 14px;
        border-bottom: thin solid rgba(0, 0, 0, 0.12);
        height: 37px !important;
        color: #000;
    }
    .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr.third:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
        background-color: #898C8F !important;
    }

    .theme--light.v-data-table {
        background-color: transparent !important;
        border-bottom: thin solid #ddd;
        border-radius: 0 !important;
    }

    .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > td:not(.v-data-table__mobile-row),
    .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > th:not(.v-data-table__mobile-row) {
        border-bottom: thin solid #ddd;
    }

    .v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
        height: 32px !important;
        border-bottom: thin solid rgba(0, 0, 0, 0.12) !important;
    }
    .v-data-table > .v-data-table__wrapper > table > tbody > tr > td:nth-child(1) {
        height: 32px !important;
        border-top: none !important;
    }


</style>
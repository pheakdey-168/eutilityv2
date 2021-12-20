<template>
    <v-row>
        <v-col sm="12" cols="12" class="grayBg px-3">
            <v-card color="white" class="py-5 px-8 no_border" elevation="0">
                <h3 class="primary--text text-uppercase">{{$t('available_financing_options')}}</h3>
                <v-row>
                    <v-col sm="6">
                          <v-card
                            outlined
                            dense
                            class="pa-4 no_border text-center"
                            color="grayBg"
                            height="330px"
                        >
                            <v-row>
                                <v-col sm="8">
                                    <h3>{{ $t("this_current_offer_of") }}</h3>
                                </v-col>
                                <v-col sm="4">
                                    <img class="bank_logo" src="@/assets/images/amk1.png"/>
                                </v-col>
                            </v-row>
                            <v-simple-table>
                                <template v-slot:default>
                                    <tbody>
                                        <tr>
                                            <td class="text-left ">{{ $t("monthly_payment") }}</td>
                                            <td class="text-right text-bold">10000</td>
                                        </tr>
                                        <tr>
                                            <td class="text-left">{{$t('total_financing_cost')}}</td>
                                            <td class="text-right text-bold">111,110</td>
                                        </tr>
                                        <tr>
                                            <td class="text-left ">{{ $t("total_payment") }}</td>
                                            <td class="text-right text-bold">10000</td>
                                        </tr>
                                        <tr>
                                            <td class="text-left">{{$t('interest_per_annum')}}</td>
                                            <td class="text-right text-bold">10%</td>
                                        </tr>
                                        <tr>
                                            <td class="text-left">{{$t('origination_application_fee')}}</td>
                                            <td class="text-right text-bold">USD 500</td>
                                        </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                            <v-row>
                                <v-col sm="6">
                                    <p class="primary--text">{{$t('view_requirement_this_offer')}}</p>
                                </v-col>
                                <v-col sm="6">
                                    <v-btn to="loan_application" color="primary" class="capitalize  white--text float-right ">{{$t('apply_now')}}</v-btn>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-col>
                    <v-col sm="6">
                        <v-card
                            outlined
                            dense
                            class="pa-4 no_border text-center"
                            color="grayBg"
                            height="330px"
                        >
                            <v-row>
                                <v-col sm="8">
                                    <h3>{{ $t("this_current_offer_of") }}</h3>
                                </v-col>
                                <v-col sm="4">
                                    <img class="bank_logo"  src="@/assets/images/ppcbank1.png"/>
                                </v-col>
                            </v-row>
                            <v-simple-table>
                                <template v-slot:default>
                                    <tbody>
                                        <tr>
                                            <td class="text-left ">{{ $t("monthly_payment") }}</td>
                                            <td class="text-right text-bold">10000</td>
                                        </tr>
                                        <tr>
                                            <td class="text-left">{{$t('total_financing_cost')}}</td>
                                            <td class="text-right text-bold">111,110</td>
                                        </tr>
                                        <tr>
                                            <td class="text-left ">{{ $t("total_payment") }}</td>
                                            <td class="text-right text-bold">10000</td>
                                        </tr>
                                        <tr>
                                            <td class="text-left">{{$t('interest_per_annum')}}</td>
                                            <td class="text-right text-bold">10%</td>
                                        </tr>
                                        <tr>
                                            <td class="text-left">{{$t('origination_application_fee')}}</td>
                                            <td class="text-right text-bold">USD 500</td>
                                        </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                            <v-row>
                                <v-col sm="6">
                                    <p class="primary--text">{{$t('view_requirement_this_offer')}}</p>
                                </v-col>
                                <v-col sm="6">
                                    <v-btn to="loan_application" color="primary" class="capitalize white--text float-right ">{{$t('apply_now')}}</v-btn>
                                </v-col>
                            </v-row>
                        </v-card>
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
    .theme--light.v-data-table {
        background-color: transparent !important;
    }

    .v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
        height: 32px !important;
        border-bottom: thin solid rgba(0, 0, 0, 0.12) !important;
    }

    /* .v-data-table > .v-data-table__wrapper > table > tbody > tr:first-child > td {
        border-top: thin solid rgba(0, 0, 0, 0.12) !important;
    } */

    .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
        background-color: transparent !important;
    }
    .bank_logo{
        height: 60px;
        margin: auto;
        display: block;
    }


</style>
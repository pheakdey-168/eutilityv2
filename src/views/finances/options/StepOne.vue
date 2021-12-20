<template>
    <v-row>
        <v-col sm="12" cols="12" class="grayBg px-3">
            <v-card color="white" class="py-5 px-8 no_border" elevation="0">
                <h3 class="primary--text text-uppercase">{{$t('your_objectives')}}</h3>
                <v-row class="mt-3">
                    <v-col sm="6" cols="12" class="py-0">
                        <h3 class="mb-0">{{$t('use_of_fund')}}</h3>
                    </v-col>
                    <v-col sm="6" cols="12" class="py-0">
                        <v-select outlined placeholder="Working Capital Loan" />
                    </v-col>
                </v-row>
                 <v-row>
                    <v-col sm="6" cols="12" class="py-0">
                        <h3 class="mb-0">{{$t('amount_needed')}}</h3>
                    </v-col>
                    <v-col sm="6" cols="12" class="py-0">
                        <v-row class="mt-0 mr-0">
                            <v-col sm="2" cols="3" class="py-0 pr-0">
                                <div class="code_text text-bold">
                                    USA
                                </div>
                            </v-col>
                            <v-col sm="10" cols="7" class="py-0 px-0">
                                <v-text-field class=" custom-border "
                                            outlined
                                            :rules="[v => !!v || 'Number is required']"
                                            required/>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col sm="6" cols="12" class="py-0">
                        <h3 class="mb-0">{{$t('loan_term')}}</h3>
                    </v-col>
                    <v-col sm="6" cols="12" class="py-0">
                        <v-select outlined placeholder="Weeks" />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col sm="6" cols="12" class="py-0">
                        <h3 class="mb-0">{{$t('interest_rate')}}</h3>
                    </v-col>
                    <v-col sm="6" cols="12" class="py-0">
                        <v-select class="" outlined   prepend-inner-icon="mdi-percent"  />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col sm="6" cols="12" class="py-0">
                        <h3 class="mb-0">{{$t('type_of_collateral')}}</h3>
                    </v-col>
                    <v-col sm="6" cols="12" class="py-0">
                       <v-select outlined placeholder="Working Capital Loan" />
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

    .v-data-table > .v-data-table__wrapper > table > tbody > tr:first-child > td {
        border-top: thin solid rgba(0, 0, 0, 0.12) !important;
    }

    .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
        background-color: transparent !important;
    }


</style>
<template>
    <v-row>
        <v-col sm="12" cols="12" class="py-0">
            <v-card color="white" class="pa-0" elevation="0">
                <h2 class="font_20 mt-3">{{$t('request_loan_related_info')}}</h2>
                <v-row>
                    <v-col sm="8" cols="12">
                        <v-row>
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
                                    <v-col sm="3" cols="3" class="py-0 pr-0">
                                        <div class="code_text text-bold">
                                            USA
                                        </div>
                                    </v-col>
                                    <v-col sm="9" cols="7" class="py-0 px-0">
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
                    </v-col>
                    <v-col sm="4" cols="12">
                        <v-card elevation="0" color="grayBg" min-height="211px" class="pa-4">
                            <h3 class="my-3">{{$t('important_notice')}}:</h3>
                            <p>{{$t('laon_func_desc')}}</p>
                        </v-card>
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
    .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr.primary:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
        background-color: #92d050 !important;
    }

    .theme--light.v-data-table {
        background-color: transparent !important;
        border-radius: 0 !important;
    }
    .v-data-table > .v-data-table__wrapper > table > tbody > tr:first-child > td {
        border-top: thin solid rgba(0, 0, 0, 0.12) !important;
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
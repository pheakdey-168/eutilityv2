<template>
    <v-row>
        <v-col sm="12" cols="12" class="py-0">
            <v-card color="white" class="pa-0" elevation="0">
                <h2 class="font_20 mt-3">{{$t('we_need_following_consent_for_you')}}</h2>
                <v-row>
                    <v-col sm="6" cols="12">
                        <v-card elevation="0" color="grayBg" min-height="211px" class="pa-4">
                            <h3 class="my-3">{{$t('consent_banhji')}}</h3>
                            <p><input type="checkbox" id="agree" name="horns"> {{$t('consent_banhji_agree1')}} <span class="primary--text">{{$t('consent_letter')}}</span> {{$t('consent_banhji_agree1')}}</p>
                            <v-row>
                                <v-col sm="7">
                                    <month-picker top="mt-0" :initialMonth="month" @emitMonth="month = $event" :min="month"/>
                                </v-col>
                                <v-col sm="5">
                                    <v-btn  class="float-left  capitalize white--text"
                                        color="primary">{{ $t('agree') }}
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-col>
                    <v-col sm="6" cols="12">
                        <v-card elevation="0" color="grayBg" min-height="211px" class="pa-4">
                            <h3 class="my-3">{{$t('consent_banhji')}}</h3>
                   
                            <p> <input type="checkbox" id="agree" name="horns"> {{$t('consent_banhji_agree1')}} <span class="primary--text">{{$t('consent_letter')}}</span> {{$t('consent_banhji_agree1')}}</p>
                            <v-row>
                                <v-col sm="7">
                                    <month-picker top="mt-0" :initialMonth="month" @emitMonth="month = $event" :min="month"/>
                                </v-col>
                                <v-col sm="5">
                                    <v-btn  class="float-left  capitalize white--text"
                                        color="primary">{{ $t('agree') }}
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-col>
                </v-row>
            </v-card>
            <p>{{$t('loan_application_desc')}}</p>
        </v-col>
    </v-row>
</template>

<script>

export default {
    data: () => ({
        showLoading: false,
        month: ''
    }),
    components: {
        // LoadingMe: () => import(`@/components/Loading`),
        'month-picker' : ()=> import('@/components/custom_templates/MonthPicker')
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
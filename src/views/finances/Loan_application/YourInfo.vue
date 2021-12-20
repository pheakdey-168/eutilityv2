<template>
    <v-row>
        <v-col sm="12" cols="12" class="py-0">
            <v-card color="white" class="pa-0" elevation="0">
                <v-row class="mt-3">
                    <v-col sm="6" cols="12" class="py-0">
                        <h3 class="text-uppercase mb-2">{{$t('owner_information')}}</h3>
                        <v-simple-table>
                            <template v-slot:default>
                                <tbody>
                                    <tr>
                                        <td style="width: 50%" class=" grayBg text-uppercase">{{$t('first_name')}}</td>
                                        <td class="primary--text "></td>
                                    </tr>
                                    <tr>
                                        <td style="width: 50%" class=" text-uppercase grayBg">{{$t('date_of_birth')}}</td>
                                        <td class="primary--text "></td>
                                    </tr>
                                    <tr>
                                        <td style="width: 50%" class=" text-uppercase grayBg">{{$t('id_type')}}</td>
                                        <td class="primary--text "></td>
                                    </tr>
                                </tbody>
                            </template>
                        </v-simple-table>
                         <h3 class="text-uppercase my-2">{{$t('business_infromation')}}</h3>
                        <v-simple-table>
                            <template v-slot:default>
                                 <tbody>
                                    <tr>
                                        <td style="width: 50%" class=" grayBg text-uppercase">{{$t('legal_name')}}</td>
                                        <td class="primary--text "></td>
                                    </tr>
                                    <tr>
                                        <td style="width: 50%" class=" text-uppercase grayBg">{{$t('incorporation_num')}}</td>
                                        <td class="primary--text "></td>
                                    </tr>
                                    <tr>
                                        <td style="width: 50%" class=" text-uppercase grayBg">{{$t('last_patent_date')}}</td>
                                        <td class="primary--text "></td>
                                    </tr>
                                      <tr>
                                        <td style="width: 50%" class=" text-uppercase grayBg">{{$t('no_of_shareholder')}}</td>
                                        <td class="primary--text "></td>
                                    </tr>
                                    <tr>
                                        <td style="width: 50%" class=" text-uppercase grayBg">{{$t('operation_since')}}</td>
                                        <td class="primary--text "></td>
                                    </tr>
                                </tbody>
                            </template>
                        </v-simple-table>
                    </v-col>
                    <v-col sm="6" cols="12" class="py-0">
                          <v-simple-table class="mt-7 ">
                            <template v-slot:default>
                                 <tbody>
                                    <tr>
                                        <td style="width: 50%" class=" grayBg text-uppercase">{{$t('last_name')}}</td>
                                        <td class="primary--text "></td>
                                    </tr>
                                    <tr>
                                        <td style="width: 50%" class=" text-uppercase grayBg">{{$t('gender')}}</td>
                                        <td class="primary--text "></td>
                                    </tr>
                                    <tr>
                                        <td style="width: 50%" class=" text-uppercase grayBg">{{$t('id_number')}}</td>
                                        <td class="primary--text "></td>
                                    </tr>
                                </tbody>
                            </template>
                        </v-simple-table>
                        <v-simple-table class="mt-9">
                            <template v-slot:default>
                                 <tbody>
                                    <tr>
                                        <td style="width: 50%" class=" grayBg text-uppercase">{{$t('operation_name')}}</td>
                                        <td class="primary--text "></td>
                                    </tr>
                                    <tr>
                                        <td style="width: 50%" class=" text-uppercase grayBg">{{$t('incorporation_date')}}</td>
                                        <td class="primary--text "></td>
                                    </tr>
                                    <tr>
                                        <td style="width: 50%" class=" text-uppercase grayBg">{{$t('tax_registration_no')}}</td>
                                        <td class="primary--text "></td>
                                    </tr>
                                    <tr>
                                        <td style="width: 50%" class=" text-uppercase grayBg">{{$t('no_of_employee')}}</td>
                                        <td class="primary--text "></td>
                                    </tr>
                                    <tr>
                                        <td style="width: 50%" class=" text-uppercase grayBg">{{$t('registered_address')}}</td>
                                        <td class="primary--text "></td>
                                    </tr>
                                </tbody>
                            </template>
                        </v-simple-table>
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
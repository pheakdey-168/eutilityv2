<template>
    <v-row>
        <v-col sm="12" cols="12" class="tab_txn_att  pt-0">
            <v-tabs>
                <v-tab>
                    <span class="hidden-sm-and-up">
                        <v-icon left>mdi-pen</v-icon>
                    </span>
                    <span class="hidden-sm-and-down">{{ $t('interest_rate') }}</span>
                </v-tab>
                <v-tab>
                    <span class="hidden-sm-and-up">
                        <v-icon left>mdi-pen</v-icon>
                    </span>
                    <span class="hidden-sm-and-down">{{ $t('saving_products') }}</span>
                </v-tab>

                <v-tab-item>
                    <v-row>
                        <v-col sm="12" cols="12" class="pt-0 px-6">
                            <v-row class="grayBg">
                                <v-col sm="12" cols="12" class="">
                                    <v-card outlined color="white" class="pa-3">
                                        <SavingInterest/>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-tab-item>

                <v-tab-item>
                    <v-row>
                        <v-col sm="12" cols="12" class="pt-0 px-6">
                            <v-row class="grayBg">
                                <v-col sm="12" cols="12" class="">
                                    <v-card outlined color="white" class="pa-3">
                                        <SavingProduct/>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-tab-item>

            </v-tabs>
        </v-col>
    </v-row>
</template>

<script>
export default {
    name: 'SavingTab',
    data: () => ({
        isHide: false
    }),
    props: {},
    methods: { },
    components: {
        SavingProduct: () => import('./SavingProduct'),
        SavingInterest: () => import('./SavingInterest'),
    },
};
</script>
<style scoped>
.v-tab {
    text-transform: capitalize;
}
.attachment_table table tr th {
    height: 55px !important;
}

@media (max-width: 576px) {

}
</style>
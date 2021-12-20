<template>
    <v-row>
        <v-col sm="12" cols="12" class="tab_txn_att pl-1 pt-0">
            <v-tabs>
                
                <v-tab>
                    <span class="hidden-sm-and-up">
                        <v-icon left>mdi-pen</v-icon>
                    </span>
                    <span class="hidden-sm-and-down">{{ $t('provice') }}</span>
                </v-tab>
                <v-tab>
                    <span class="hidden-sm-and-up">
                        <v-icon left>mdi-pen</v-icon>
                    </span>
                    <span class="hidden-sm-and-down">{{ $t('district') }}</span>
                </v-tab>
                <v-tab>
                    <span class="hidden-sm-and-up">
                        <v-icon left>mdi-pen</v-icon>
                    </span>
                    <span class="hidden-sm-and-down">{{ $t('commune') }}</span>
                </v-tab>
                <v-tab>
                    <span class="hidden-sm-and-up">
                        <v-icon left>mdi-pen</v-icon>
                    </span>
                    <span class="hidden-sm-and-down">{{ $t('group') }}</span>
                </v-tab>

                

                <v-tab-item>
                    <v-row>
                        <v-col sm="12" cols="12" class="pt-0 px-6">
                            <v-row class="grayBg">
                                <v-col sm="12" cols="12" class="">
                                    <v-card outlined color="white" class="pa-3">
                                        <MainBlock/>
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
                                        <SubBlock/>
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
                                        <Zone/>
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
                                        <Group/>
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
    name: 'GroupMember',
    data: () => ({
        isHide: false
    }),
    props: {},
    methods: { },
    components: {
        Group: () => import('./group_member/Group'),
        MainBlock: () => import('./group_member/MainBlock'),
        SubBlock: () => import('./group_member/SubBlock'),
        Zone: () => import('./group_member/Zone'),
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
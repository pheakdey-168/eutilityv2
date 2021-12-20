<template>
    <v-row>
        <v-col sm="12" cols="12" class="pt-0 pl-6">
            <v-tabs>
                <v-tab>
                    <span class="hidden-sm-and-up">
                        <v-icon left>mdi-pen</v-icon>
                    </span>
                    <span class="hidden-sm-and-down">
                        {{ $t('account') }}
                    </span>
                </v-tab>
                <v-tab>
                    <span class="hidden-sm-and-up">
                        <v-icon left>mdi-pen</v-icon>
                    </span>
                    <span class="hidden-sm-and-down">
                        {{ $t('penalty') }}
                    </span>
                </v-tab>
                <v-tab>
                    <span class="hidden-sm-and-up">
                        <v-icon left>mdi-pen</v-icon>
                    </span>
                    <span class="hidden-sm-and-down">
                        {{ $t('decimal') }}
                    </span>
                </v-tab>
                <v-tab>
                    <span class="hidden-sm-and-up">
                        <v-icon left>mdi-pen</v-icon>
                    </span>
                    <span class="hidden-sm-and-down">
                        {{ $t('location') }}
                    </span>
                </v-tab>

                
                <v-tab-item>
                    <v-card flat>
                        <v-card-text class="">
                            <AccountName class="pt-4"/>
                        </v-card-text>
                    </v-card>
                </v-tab-item>
                <v-tab-item>
                    <v-card flat>
                        <v-card-text class="">
                            <Penalty class="pt-4"/>
                        </v-card-text>
                    </v-card>
                </v-tab-item>
                <v-tab-item>
                    <v-card flat>
                        <v-card-text class="">
                            <Decimal class="pt-4"/>
                        </v-card-text>
                    </v-card>
                </v-tab-item>
                <v-tab-item>
                    <v-col sm="12" cols="12" class=" pa-0 pl-4">
                            <Location class="pt-4"/>
                    </v-col>
                </v-tab-item>

            </v-tabs>
        </v-col>
    </v-row>
</template>

<script>
export default {
    name: "CustomerDeposit",
    components: {
        Decimal: () => import('./general/Decimal'),
        Location: () => import('./Location'),
        AccountName: () => import('./general/AccountName'),
        Penalty: () => import('./general/Penalty'),


    },
    data: () => ({}),
    watch: {},
    methods: {
        clickMe(data) {
            this.$route.push(data.link);
        }
    }
};
</script>
<style scoped>
/* .v-menu__content{
  top: 141px !important;
  left: 1098px !important;
} */
.v-menu__content .v-list .v-list-item {
    min-height: 35px !important;
}

.tab_wrapper {
    position: relative;
    display: inherit;
}

.v-tab {
    min-width: 30px;
    font-size: 17px;
    text-transform: capitalize;
}

.v-icon--left {
    margin-right: 0px;
}

.theme--light.v-tabs > .v-tabs-bar {
    border-bottom: 1px solid #ddd !important;
}

.menuable__content__active {
    left: 448px !important;
}



.v-tab--active {
    background-color: #E5EFFA;
    color: #000;
}

.theme--light.v-tabs >>> .v-tabs-bar {
    border-bottom: 1px solid #ddd !important;
}

.v-card__text {
    padding: 0 !important;
}
</style>
	
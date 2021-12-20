<template>
    <v-row>
        <v-col sm="12" cols="12" class="py-0">
            <v-card outlined dense color="white" class=" no_border" elevation="0">
                <v-row>
                    <v-col sm="12" cols="12" class="tab_wrapper pt-4 pb-0">
                        <v-tabs
                            vertical
                            class="tab_setting"
                            slider-color="grayBg"
                            slider-size="7"
                            :class="{ tab_product_service_hide: isHide, tab_product_service_show: !isHide}
                            ">
                            <span class="hideAbs">
                                <v-icon size="16" class="arr_icon" @click="hideTabs" v-if="!isHide">
                                    mdi-chevron-left-circle
                                </v-icon>
                                <v-icon size="16" class="arr_icon1" @click="hideTabs" v-if="isHide">
                                    mdi-chevron-right-circle
                                </v-icon>
                            </span>
                            <v-tab>
                                <span class="hidden-sm-and-up">
                                    <v-icon left>mdi-pen</v-icon>
                                </span>
                                <span class="hidden-sm-and-down text-capitalize">
                                    {{ $t('asset_ac') }}
                                </span>
                            </v-tab>
                            <v-tab>
                                <span class="hidden-sm-and-up">
                                    <v-icon left>mdi-pen</v-icon>
                                </span>
                                <span class="hidden-sm-and-down text-capitalize">
                                    {{ $t('credit_biz') }}
                                </span>
                            </v-tab>
                            <v-tab>
                                <span class="hidden-sm-and-up">
                                    <v-icon left>mdi-pen</v-icon>
                                </span>
                                <span class="hidden-sm-and-down text-capitalize">
                                    {{ $t('input_supply_biz') }}
                                </span>
                            </v-tab>
                            <v-tab>
                                <span class="hidden-sm-and-up">
                                    <v-icon left>mdi-pen</v-icon>
                                </span>
                                <span class="hidden-sm-and-down text-capitalize">
                                    {{ $t('marketing_biz') }}
                                </span>
                            </v-tab>
                            <v-tab>
                                <span class="hidden-sm-and-up">
                                    <v-icon left>mdi-pen</v-icon>
                                </span>
                                <span class="hidden-sm-and-down text-capitalize">
                                    {{ $t('joint_use_biz') }}
                                </span>
                            </v-tab>
                            <v-tab>
                                <span class="hidden-sm-and-up">
                                    <v-icon left>mdi-pen</v-icon>
                                </span>
                                <span class="hidden-sm-and-down text-capitalize">
                                    {{ $t('statement_of_profit_or_loss') }}
                                </span>
                            </v-tab>
                            <v-tab>
                                <span class="hidden-sm-and-up">
                                    <v-icon left>mdi-pen</v-icon>
                                </span>
                                <span class="hidden-sm-and-down text-capitalize">
                                    {{ $t('statement_of_financial_position') }}
                                </span>
                            </v-tab>
                            <v-tab>
                                <span class="hidden-sm-and-up">
                                    <v-icon left>mdi-pen</v-icon>
                                </span>
                                <span class="hidden-sm-and-down text-capitalize">
                                    {{ $t('share_capital_analysis') }}
                                </span>
                            </v-tab>
                            <v-tab-item>
                                <v-row>
                                    <v-col sm="12" cols="12" class="pl-6 pt-0">
                                        <PropertyPlantEquipment/>
                                    </v-col>
                                </v-row>
                            </v-tab-item>
                            <v-tab-item>
                                <v-row>
                                    <v-col sm="12" cols="12" class="pl-6 pt-0">
                                        <SavingCreditBiz/>
                                    </v-col>
                                </v-row>
                            </v-tab-item>
                            <v-tab-item>
                                <v-row>
                                    <v-col sm="12" cols="12" class="pl-6 pt-0">
                                        <SupplyBiz/>
                                    </v-col>
                                </v-row>
                            </v-tab-item>
                            <v-tab-item>
                                <v-row>
                                    <v-col sm="12" cols="12" class="pl-6 pt-0">
                                        <MarketingBiz/>
                                    </v-col>
                                </v-row>
                            </v-tab-item>
                            <v-tab-item>
                                <v-row>
                                    <v-col sm="12" cols="12" class="pl-6 pt-0">
                                        <ServiceBiz/>
                                    </v-col>
                                </v-row>
                            </v-tab-item>
                            <v-tab-item>
                                <v-row>
                                    <v-col sm="12" cols="12" class="pl-6 pt-0">
                                        <StatementOfProfitOrLossBySegments/>
                                    </v-col>
                                </v-row>
                            </v-tab-item>
                            <v-tab-item>
                                <v-row>
                                    <v-col sm="12" cols="12" class="pl-6 pt-0">
                                        <StatementOfFinancialPositionBySegments/>
                                    </v-col>
                                </v-row>
                            </v-tab-item>
                            <v-tab-item>
                                <v-row>
                                    <v-col sm="12" cols="12" class="pl-6 pt-0">
                                        <DividendAllocation/>
                                    </v-col>
                                </v-row>
                            </v-tab-item>
                        </v-tabs>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
export default {
    name: 'Sales',
    data: () => ({
        isHide: false
    }),
    props: {},
    methods: {
        clickMe(data) {
            // alert(data.link)
            this.$router.push(`${data.link}`);
            //this.$event.target.classList.toggle(active)
            //eslint-disable-next-line no-console
            console.log(data.link)
            //eslint-disable-next-line no-console
            //console.log(data)
        },
        hideTabs(){
            this.isHide = !this.isHide;
        },
    },
    components: {
        PropertyPlantEquipment: () => import('./reports/PropertyPlantEquipment'),
        SavingCreditBiz: () => import('./reports/SavingCreditBiz'),
        SupplyBiz: () => import('./reports/SupplyBiz'),
        MarketingBiz: () => import('./reports/MarketingBiz'),
        ServiceBiz: () => import('./reports/ServiceBiz'),
        StatementOfProfitOrLossBySegments: () => import('./reports/StatementOfProfitOrLossBySegments'),
        StatementOfFinancialPositionBySegments: () => import('./reports/StatementOfFinancialPositionBySegments'),
        DividendAllocation: () => import('./reports/DividendAllocation'),

    },
};
</script>
<style scoped>
.v-tab {
    justify-content: left;
    font-size: 16px;
}

.v-tab--active {
    background-color: rgb(255, 255, 255);
}

.tab_setting .v-tab--active {
    font-weight: 700;
    color: #000;
}

.v-tab--active {
    background-color: #ffffff !important;
    border-bottom: 4px solid #92d050;
    border-left: none;
}
.tab_product_service_show.theme--light .v-slide-group__content{
    width: 140px !important;
}

p {
    color: rgba(0, 0, 0, 0.87);
}
.tab_product_service_show.theme--light .v-slide-group__content .v-tab .text-capitalize {
    text-align: left !important;
    white-space: normal;
}
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
.menuable__content__active{
  left: 448px !important;
}

.dropdown_transactions.v-btn {
  background-color: #2CA01C !important;
  height: 40px !important;
  width: auto !important;
  border-radius: 0 !important;
  padding: 0px 5px 0px 10px !important;
  color: #fff !important;
  right: 0 !important;
  position: absolute;
  top: 0 !important;
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
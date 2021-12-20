<template>
    <v-row>
        <v-col sm="12" cols="12" class="pt-0">
            <v-card outlined dense color="white" class=" no_border" elevation="0">
                <v-row>
                    <v-col sm="12" cols="12" class=" pt-0">
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
                                    {{ $t('general_setting') }}
                                </span>
                            </v-tab>
                            <v-tab>
                                <span class="hidden-sm-and-up">
                                    <v-icon left>mdi-pen</v-icon>
                                </span>
                                <span class="hidden-sm-and-down text-capitalize">
                                    {{ $t('customer_directory') }}
                                </span>
                            </v-tab>
                            <v-tab>
                                <span class="hidden-sm-and-up">
                                    <v-icon left>mdi-pen</v-icon>
                                </span>
                                <span class="hidden-sm-and-down text-capitalize">
                                    {{ $t('supplier_directory') }}
                                </span>
                            </v-tab>
                            <v-tab>
                                <span class="hidden-sm-and-up">
                                    <v-icon left>mdi-pen</v-icon>
                                </span>
                                <span class="hidden-sm-and-down text-capitalize">
                                    {{ $t('member_setting') }}
                                </span>
                            </v-tab>
                            
                            <v-tab>
                                <span class="hidden-sm-and-up">
                                    <v-icon left>mdi-pen</v-icon>
                                </span>
                                <span class="hidden-sm-and-down text-capitalize">
                                    {{ $t('saving_credit_business') }}
                                </span>
                            </v-tab>

                            <v-tab>
                                <span class="hidden-sm-and-up">
                                    <v-icon left>mdi-pen</v-icon>
                                </span>
                                <span class="hidden-sm-and-down text-capitalize">
                                    {{ $t('supply_business') }}
                                </span>
                            </v-tab>
                            <v-tab>
                                <span class="hidden-sm-and-up">
                                    <v-icon left>mdi-pen</v-icon>
                                </span>
                                <span class="hidden-sm-and-down text-capitalize">
                                    {{ $t('marketing_business') }}
                                </span>
                            </v-tab>

                            <v-tab>
                                <span class="hidden-sm-and-up">
                                    <v-icon left>mdi-pen</v-icon>
                                </span>
                                <span class="hidden-sm-and-down text-capitalize">
                                    {{ $t('service_business') }}
                                </span>
                            </v-tab>
                            <v-tab>
                                <span class="hidden-sm-and-up">
                                    <v-icon left>mdi-pen</v-icon>
                                </span>
                                <span class="hidden-sm-and-down text-capitalize">
                                    {{ $t('user_management') }}
                                </span>
                            </v-tab>
                            <v-tab-item>
                                <v-row>
                                    <v-col sm="12" cols="12" class=" pt-0">
                                        <GeneralSettingTab/>
                                    </v-col>
                                 </v-row>
                            </v-tab-item>
                            <v-tab-item>
                                <v-row>
                                    <v-col sm="12" cols="12" class=" pt-0 pl-6">
                                        <CustomerDirectory/>
                                    </v-col>
                                 </v-row>
                            </v-tab-item>
                            <v-tab-item>
                                <v-row>
                                    <v-col sm="12" cols="12" class=" pt-0 pl-6">
                                        <SupplierDirectory/>
                                    </v-col>
                                 </v-row>
                            </v-tab-item>
                             <v-tab-item>
                                <v-row>
                                    <v-col sm="12" cols="12" class=" pt-0">
                                        <MemberSavingTab/>
                                    </v-col>
                                 </v-row>
                            </v-tab-item>
                            
                            <v-tab-item>
                                <v-row>
                                    <v-col sm="12" cols="12" class="pl-6 pt-0">
                                        <CreditBizTab/>
                                    </v-col>
                                </v-row>
                            </v-tab-item>

                            <v-tab-item>
                                <v-row>
                                    <v-col sm="12" cols="12" class="pl-6 pt-0">
                                        <SupplySetting/>
                                    </v-col>
                                </v-row>
                            </v-tab-item>
                            <v-tab-item>
                                <v-row>
                                    <v-col sm="12" cols="12" class="pl-6 pt-0">
                                        <MarketingSetting/>
                                    </v-col>
                                </v-row>
                            </v-tab-item>
                            <v-tab-item>
                                <v-row>
                                    <v-col sm="12" cols="12" class="pl-6 pt-0">
                                        <ServiceSetting/>
                                    </v-col>
                                </v-row>
                            </v-tab-item>
                            <v-tab-item>
                                <v-row>
                                    <v-col sm="12" cols="12" class=" pt-0 pl-6">
                                        <UserPin/>
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
        CreditBizTab: () => import('./CreditBizTab'),
        SupplySetting: () => import('./SupplySetting'),
        MarketingSetting: () => import('./MarketingSetting'),
        ServiceSetting: () => import('./ServiceSetting'),
        GeneralSettingTab: () => import('./GeneralSettingTab'),
        MemberSavingTab: () => import('./MemberSavingTab'),
        UserPin: () => import('./general/UserPin'),
        CustomerDirectory: () => import('../customers/CustomerDirectory'),
        SupplierDirectory: () => import('../suppliers/SupplierDirectory')


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
.v-tab span{
    text-transform: none !important;
}
</style>
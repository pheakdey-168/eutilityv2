<template>
        <v-container>
            <v-row>
                <v-col sm="12" cols="12">
                    <v-card outlined dense color="white" class="pa-4 no_border" elevation="0">
                        <v-row>
                            <v-col sm="12" cols="12" class="tab_wrapper py-0">
                                
                                <v-tabs
                                    vertical
                                    class="tab_setting  tab_center pt-0"
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
                                    <!-- Dropdown New-->
                                        <v-menu
                                                nudge-bottom="4"
                                                bottom
                                                origin="bottom top"
                                                transition="scroll-y-reverse-transition">
                                            <template v-slot:activator="{ on }" >
                                                <span class="hidden-sm-and-up">
                                                    <div class="dropdown_transactions">
                                                        <v-icon v-on="on" left>mdi-attachment</v-icon>
                                                        <v-icon size="" class="ma-1">expand_more</v-icon>
                                                    </div>
                                                </span>
                                                <span class="hidden-sm-and-down">
                                                    <v-btn icon v-on="on" class="dropdown_transactions">
                                                        <v-icon size="17" class="ma-1">mdi mdi-plus</v-icon>
                                                            {{$t('new')}}
                                                        <v-icon size="" class="ma-1">expand_more</v-icon>
                                                    </v-btn>
                                                </span>
                                            </template>

                                            <v-list >
                                                <v-list-item link route to="member">
                                                    <v-list-item-title>{{$t('add_member')}}</v-list-item-title>
                                                </v-list-item>
                                                <v-list-item link route to="share">
                                                    <v-list-item-title>{{$t('issue_share')}}</v-list-item-title>
                                                </v-list-item>
                                                <v-list-item link route to="share_withdrawal">
                                                    <v-list-item-title>{{$t('withdraw_share')}}</v-list-item-title>
                                                </v-list-item>
                                                <v-list-item link route to="dividend">
                                                    <v-list-item-title>{{$t('declare_dividend')}}</v-list-item-title>
                                                </v-list-item>
                                                <v-list-item link route to="withdraw_dividend">
                                                    <v-list-item-title>{{$t('withdraw_dividend')}}</v-list-item-title>
                                                </v-list-item>
                                            </v-list>
                                        </v-menu>
                                        
                                    <v-tab class="mt-2">
                                        <span class="hidden-sm-and-up">
                                            <v-icon left>mdi-pen</v-icon>
                                        </span>
                                        <span class="hidden-sm-and-down text-capitalize">
                                            {{ $t('members_center') }}
                                        </span>
                                    </v-tab>
                                    <v-tab>
                                        <span class="hidden-sm-and-up">
                                            <v-icon left>mdi-pen</v-icon>
                                        </span>
                                        <span class="hidden-sm-and-down text-capitalize">
                                            {{ $t('member_list') }}
                                        </span>
                                    </v-tab>
                                    <v-tab>
                                        <span class="hidden-sm-and-up">
                                            <v-icon left>mdi-pen</v-icon>
                                        </span>
                                        <span class="hidden-sm-and-down text-capitalize">
                                            {{ $t('member_shares') }}
                                        </span>
                                    </v-tab>
                                    <v-tab>
                                        <span class="hidden-sm-and-up">
                                            <v-icon left>mdi-pen</v-icon>
                                        </span>
                                        <span class="hidden-sm-and-down text-capitalize">
                                            {{ $t('list_of_share') }}
                                        </span>
                                    </v-tab>
                                    <v-tab>
                                        <span class="hidden-sm-and-up">
                                            <v-icon left>mdi-pen</v-icon>
                                        </span>
                                        <span class="hidden-sm-and-down text-capitalize">
                                            {{ $t('members_shares') }}
                                        </span>
                                    </v-tab>
                                    <v-tab-item>
                                        <v-row>
                                            <v-col sm="12" cols="12" class="pl-5 py-0">
                                                <MembersCenter/>
                                            </v-col>
                                        </v-row>
                                    </v-tab-item>
                                    <v-tab-item>
                                        <v-row>
                                            <v-col sm="12" cols="12" class="pl-5 py-0">
                                                <MemberList/>
                                            </v-col>
                                        </v-row>
                                    </v-tab-item>
                                    <v-tab-item>
                                        <v-row>
                                            <v-col sm="12" cols="12" class="pl-5 py-0">
                                                <MemberShare/>
                                            </v-col>
                                        </v-row>
                                    </v-tab-item>
                                    <v-tab-item>
                                        <v-row>
                                            <v-col sm="12" cols="12" class="pl-5 py-0">
                                                <ListOfShare/>
                                            </v-col>
                                        </v-row>
                                    </v-tab-item>
                                    <v-tab-item>
                                        <v-row>
                                            <v-col sm="12" cols="12" class="pl-5 py-0">
                                                <MembersSharesTab/>
                                            </v-col>
                                        </v-row>
                                    </v-tab-item>
                                    
                                </v-tabs>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
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
        MembersCenter: () => import('./MembersCenter'),
        MemberList: () => import('../reports/MemberList'),
        MemberShare:() => import('../reports/MemberShare'),
        ListOfShare: () => import('../reports/ListOfShare'),
        MembersSharesTab: () => import('../MembersSharesTab'),


    },
};
</script>
<style scoped>
    .v-tabs-bar {
        padding-top: 0px !important;
    }
    .v-menu__content .v-list .v-list-item{
		min-height: 35px !important;
	}
	.tab_wrapper{
		position: relative;
		display: inherit;
	}
	.v-tab{
		min-width: 30px;
		font-size: 20px;
		text-transform: capitalize;
	}
	.v-icon--left {
		margin-right: 0px;
	}
	.theme--light.v-tabs > .v-tabs-bar{
		border-bottom: 1px solid #ddd !important;
	}
	
	.v-tab--active{
		background-color: #E5EFFA;
		color: #000;
	}
	.theme--light.v-tabs >>> .v-tabs-bar{
		border-bottom: 1px solid #ddd !important;
	}
	.v-card__text{
		padding: 0 !important;
	}
    .v-tab{
        -webkit-box-pack: left;
        -ms-flex-pack: left;
        justify-content: left;
    }
    .tab_product_service_hide .dropdown_transactions{
        display: none;
    }
    .tab_product_service_hide :hover  .dropdown_transactions{
        display: block  !important;
    }
    .v-tab span{
        text-transform: none !important;
    }
    
</style>
<template>
    <v-app>
        <v-container>
            <v-row>
                <v-col sm="12" cols="12">
                    <v-card color="white" class="pa-4 no_border" elevation="0">
                        <v-row>
                             <v-col sm="12" cols="12" class="tab_wrapper py-0">
                                <v-tabs v-model="active_in_tabs">
                                    <v-row>
                                        <v-col
                                            sm="10"
                                            cols="10"
                                            class="py-0 pr-0"
                                            style="display: inherit;"
                                        >
                                            <v-tab :key="0">
                                                <span class="hidden-sm-and-up">
                                                  <v-icon left>mdi-pen</v-icon>
                                                </span>
                                                <span class="hidden-sm-and-down">
                                                  {{ $t("members_center") }}
                                                </span>
                                            </v-tab>
                                            <v-tab :key="1">
                                                <span class="hidden-sm-and-up">
                                                  <v-icon left>mdi-pen</v-icon>
                                                </span>
                                                <span class="hidden-sm-and-down">
                                                  {{ $t("reports") }}
                                                </span>
                                            </v-tab>
                                            
                                        </v-col>
                                        <v-col sm="2" cols="2" class="">
                                            <v-menu
                                                nudge-bottom="4"
                                                nudge-left="40"
                                                bottom
                                                offset-y
                                                origin="bottom top"
                                                transition="scroll-y-reverse-transition"
                                            >
                                                <template v-slot:activator="{ on }">
                                                <span class="hidden-sm-and-up">
                                                    <div class="dropdown_transactions ml-6">
                                                    <v-icon v-on="on" left>mdi-plus</v-icon>
                                                    </div>
                                                </span>
                                                <span class="hidden-sm-and-down">
                                                    <v-btn
                                                    icon
                                                    v-on="on"
                                                    class="dropdown_transactions"
                                                    style="right: 0;"
                                                    >
                                                      <v-icon size="17" class="ma-1">mdi mdi-plus</v-icon>
                                                      {{ $t("new") }}
                                                      <v-icon size="" class="ma-1">expand_more</v-icon>
                                                    </v-btn>
                                                  </span>
                                                </template>
                                                
                                                <v-list width="200px" class="pa-3">
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
                                                        <v-list-item-title>{{$t('earning_allocation')}}</v-list-item-title>
                                                    </v-list-item>
                                                    <v-list-item link route to="withdraw_dividend">
                                                        <!-- <v-list-item-title>{{$t('withdraw_dividend')}}</v-list-item-title> -->
                                                        <v-list-item-title>{{$t('dividend_payment')}}</v-list-item-title>
                                                    </v-list-item>
                                                </v-list>
                                            </v-menu>
                                        </v-col>
                                    </v-row>
                                    
                                   
                                    
                                    <v-tab-item>
                                        <v-card flat>
                                            <v-card-text class="">
                                                <MembersCenter/>
                                            </v-card-text>
                                        </v-card>
                                    </v-tab-item>
                                    <v-tab-item>
                                        <v-card flat>
                                            <v-card-text class="">
                                                <Reports/>
                                            </v-card-text>
                                        </v-card>
                                    </v-tab-item>
                                </v-tabs>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<script>
import { data } from "@/observable/store"
export default {
    name: "Customers",
    components: {
        MembersCenter: () => import("./MembersCenter"),
        Reports: () => import("./Reports"),
    },
    data: () => ({
        // active_tab: data.customer_tab.main
        active_in_tabs :  data.customer_tab_main,
    }),
    computed:{
        active_tab(){
            return data.customer_tab_main
        } 
    },
    watch:{
        active_tab(){
            window.console.log("is change", this.active_tab)
            this.active_in_tabs = this.active_tab
        },
        active_in_tabs(){
            data.customer_tab_main = this.active_in_tabs
        }
    },
    methods: {
        clickMe(data) {
            this.$route.push(data.link);
        },
    },
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
    font-size: 20px;
    text-transform: capitalize;
}

.v-icon--left {
    margin-right: 0px;
}

.theme--light.v-tabs > .v-tabs-bar {
    border-bottom: 1px solid #ddd !important;
}

/* .menuable__content__active {
    left: 1300px !important;
} */

.v-tab--active {
    background-color: #e5effa;
    color: #000;
}

.theme--light.v-tabs >>> .v-tabs-bar {
    border-bottom: 1px solid #ddd !important;
}

.v-card__text {
    padding: 0 !important;
}
</style>

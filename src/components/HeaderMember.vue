<template>
    <div class="">
        <div
            class="sidebar"
            v-on:mouseover="onMouseOver"
            v-on:mouseleave="onMouseLeave"
        >
            <v-navigation-drawer
                class=""
                v-model="drawer"
                :mini-variant="miniVariant"
                :expand-on-hover="handOver"
                :mini-variant-width="40"
                :app="isApp"
                :fixed="isAbsolute"
                color=""
            >
                <v-list dense class="pa-0">
          <span class="hidden-sm-and-down">
            <a v-if="isAccountLogo" href="/" class="main_logo  d-flex pl-6 py-3">
              <div class="mb-0">
                <img
                    src="../assets/images/banhji-logo-r.png"
                    height="42"
                    alt="BanhJi Logo"
                />
                <p class="sub_type">{{ planName }}</p>
              </div>
            </a>
            <a v-if="!isAccountLogo" href="/" class="">
              <h1 class="mb-0">
                <img
                    class="small_img fade-in"
                    src="../assets/images/banhji_icon.png"
                    height="40"
                    alt="BanhJi Logo"
                />
                
              </h1>
            </a>
            <span
                v-bind:class="{
                angle_action_small: miniVariant,
                angle_action: !miniVariant,
              }"
            >
              <v-icon
                size="16"
                class="arr_icon"
                @click="hideSidebar"
                v-if="!miniVariant"
                >mdi-chevron-left-circle</v-icon
              >
              <v-icon
                size="16"
                class="arr_icon"
                @click="hideSidebar"
                v-if="miniVariant"
                >mdi-chevron-right-circle</v-icon
              >
            </span>
          </span>
                    <div class="hidden-sm-and-up search_phone">
                        <v-text-field
                            style="margin-right: 10%; background-color: #fff;	"
                            cols="6"
                            flat
                            solo-inverted
                            hide-details
                            prepend-inner-icon="search"
                            label="Search"
                            class="custom_search_phone my-3"
                        />
                    </div>
                    
                    <div class="block_menu">
                        <template v-for="item in items">
                            <v-row v-if="item.heading" :key="item.heading" align="center">
                                <v-col cols="6">
                                    <v-subheader v-if="item.heading">{{
                                            item.heading
                                        }}
                                    </v-subheader>
                                </v-col>
                            </v-row>
                            <v-list-group
                                v-else-if="item.children"
                                :key="item.id"
                                v-model="item.path"
                            >
                                <template v-slot:activator>
                                    <v-list-item-content>
                                        <v-list-item-title>{{ item.text }}</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                            </v-list-group>
                            <v-list-item
                                v-else
                                router
                                :id="'id' + item.id"
                                :to="item.path ? lang + item.path : ''"
                                :class="item.class + ' ' + item.activeClass"
                                :style="{ 'background-color': backHoverColor }"
                                :key="item.id"
                                @click.native="clickMe(item)"
                            >
                                <v-list-item-content>
                                    <v-list-item-title>{{ $t(item.menuTex) }}</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </template>
                    </div>
                </v-list>
                <template v-slot:append>
          <div
            class="pl-6 link_buttom"
            v-bind:class="{ hide_item_samll: miniVariant }"
          >
                <!-- <v-list-item-title>
                <router-link
                    class="pb-1"
                    @click.native="clickMenu(3)"
                    :to="lang + '/credit_biz/attachment'"
                    :class="activeClass3"
                >
                    {{ $t("attachments") }}
                </router-link>
                </v-list-item-title>
                <v-list-item-title>
                <a target="_blank" href="https://banhji.com/resources/">{{
                    $t("support_learning_hub")
                }}</a>
                </v-list-item-title> -->
            <div class="px-4 py-2 pb-0">
                <img
                    class="img-1"
                    src="../assets/images/made_in_cambodia.png"
                    height="auto"
                    width="80%"
                />
            </div>
            <div class="px-4 py-2">
                <v-divider/>
                <p class="mb-0 font_16 mt-3 pl-2">{{$t('banhji_footer')}}</p>
                <p class="line_14 font_10 mb-3 pl-2">{{$t('banhji_term_footer')}}</p>

            </div>
          </div>
                </template>
            </v-navigation-drawer>
        </div>
        
        <v-app-bar
            app
            class="no_border"
            color="grayBg"
            v-bind:class="{ sidebar_small: miniVariant }"
        >
            <div class="hidden-lg-and-up">
                <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
                <v-spacer/>
            </div>
            
            <h1 v-if="this.$route.meta.logo" class="ml-2 hidden-sm-and-down">
                <img style="height: 50px;" :src="'/images/' + this.$route.meta.logo"/>
            </h1>
            
            <h1 v-else class="ml-2 hidden-sm-and-down">
                {{ $t(this.$route.meta.mainMenu) }}
            </h1>
            <v-spacer/>
            
            <li class="my_dropdown" style="display: initial !important;">
                <a href="#" class="pr-2 font_16 d-flex flex-column">
                <span class="fontLight font_10 line_12">
                    {{ $t("language") }}
                </span>
                    <span class="text-bold font_14 line_12">
                    {{ $t("lang") }}
                </span>
                </a>
                <ul class="dropdown_nav">
                    <li @click="switchLocale('kh')">ខ្មែរ</li>
                    <li @click="switchLocale('en')">English</li>
                </ul>
            </li>
            <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                    <img class="mx-1" v-if="isOnline" style="width:25px ; height:25px" v-on="on"  v-bind="attrs" src="@/assets/images/online.png" />
                    <img class="mx-1" v-else style="width:25px ; height:25px" v-on="on"  v-bind="attrs" src="@/assets/images/offline.png" />
                </template>
                <span>{{ isOnline ? $t('online') : $t('offline') }}</span>
            </v-tooltip>
            <v-btn icon link route :to="lang + '/search'">
                <!-- <v-icon >search</v-icon> -->
                <i class="b-search" style="font-size: 18px;"/>
            </v-btn>
            
            <div class="hidden-sm-and-down header_icon">
                <v-menu
                    nudge-bottom="12"
                    bottom
                    offset-y
                    origin="bottom top"
                    transition="scale-transition"
                >
                    <template v-slot:activator="{ on }">
                        <v-btn icon v-on="on">
                            <i class="b-transation" style="font-size: 18px;"/>
                        </v-btn>
                    </template>
                    
                    <v-list class="header-menu history">
                        <v-list-item
                            v-for="(item, i) in historyPages"
                            :key="i"
                            class="history_link"
                        >
                            <v-list-item-title @click="onHistoryClick(item)">{{
                                    item.name
                                }}
                            </v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
                
                <v-btn icon @click="toggle">
                    <i
                        style="font-size: 18px;"
                        :class="[fullscreen ? 'b-mini' : 'b-full']"
                    />
                </v-btn>
                <v-btn icon @click="logOut">
                    <v-icon class="mr-0" color="black">mdi-logout</v-icon>
                </v-btn>
            </div>
            <v-offline
                hidden
                @detected-condition="amIOnline">
            </v-offline>
        </v-app-bar>
    </div>
</template>

<script>
import router from "@/router";
const store = require("../institute.js");

const instituteHandler = require("@/scripts/instituteHandler");
const otherHandler = require("@/scripts/otherHandler");
import {Trans} from "@/plugins/Translation";
import {i18n} from "../i18n";
import VOffline from "@/components/VOffline";

export default {
    data: () => ({
        institutes: [],
        isOnline: false,
        drawer: null,
        miniVariant: false,
        handOver: false,
        isApp: true,
        isAbsolute: false,
        isAccountLogo: true,
        backHoverColor: "",
        activeClass1: "",
        activeClass2: "",
        activeClass3: "",
        items: [
            {
                id: 1,
                class: "",
                activeClass: "active",
                name: "Overview",
                menuTex: "overview",
                path: "/members",
            },
            
            
            {
                id: 2,
                class: "",
                activeClass: "",
                name: "members_center",
                menuTex: "member",
                path: "/members/member_center",
            },
            {
                id: 3,
                class: "",
                activeClass: "",
                name: "Saving",
                menuTex: "saving",
                path: "/members/savings",
            },
            {
                id: 4,
                class: "",
                activeClass: "",
                name: "Financing",
                menuTex: "financing",
                path: "/members/finances",
            },
            {
                id: 5,
                class: "",
                activeClass: "",
                name: "vendors",
                menuTex: "payable_purchase_expense",
                path: "/members/vendors",
            },
            {class: "ma-3 v-divider"},
            {
                id: 8,
                class: "text-green",
                activeClass: "",
                name: "cooperative",
                menuTex: "cooperative_financial_platform",
                path: "/en",
            },
           
           
        ],
        previous_active_id: 1,
        fullscreen: false,
        pages: [],
        mInstitute: {},
        isLoaded: false,
        planName: ''
    }),
    props: {
        source: String,
    },
    methods: {
        amIOnline(e) {
            const iconOffline = require("@/assets/images/outline_wifi_off_black_48dp.png")
            const iconOnline = require("@/assets/images/outline_wifi_white_48dp.png")
            if (!e) {
                this.isLoaded = true
            } else {
                this.isOnline = true
            }
            if (this.isLoaded) {
                if (e) {
                    this.isOnline = true
                    this.$snotify.success('You are connected', '', {icon: iconOnline})
                } else {
                    this.isOnline = false
                    this.$snotify.simple('You are offline!', '', {icon: iconOffline})
                }
            }
        },
        // History
        onHistoryClick(page) {
            if (page.name) {
                this.$router.push({name: page.name});
            }
            this.items.forEach((element) => {
                element.activeClass = "";
            });
        },
        clickMe(data) {
            // if (data.id == 1) {
            //     this.$router.push(`${i18n.locale}`);
            // }
            // eslint-disable-next-line no-console
            this.items.forEach((element) => {
                element.activeClass = "";
            });
            this.activeClass1 = "";
            this.activeClass2 = "";
            this.activeClass3 = "";
            this.items.find((item) => item.id === data.id).activeClass = "active"; //set active class to new li
        },
        clickMenu(val) {
            this.items.forEach((element) => {
                element.activeClass = "";
            });
            this.activeClass1 = "";
            this.activeClass2 = "";
            this.activeClass3 = "";
            switch (val) {
                case 1:
                    this.activeClass1 = "active";
                    break;
                case 2:
                    this.activeClass2 = "active";
                    break;
                default:
                    this.activeClass3 = "active";
            }
        },
        toggle() {
            this.$fullscreen.toggle(document.getElementsByTagName("body")[0], {
                wrap: false,
                callback: this.fullscreenChange,
            });
        },
        fullscreenChange(fullscreen) {
            this.fullscreen = fullscreen;
        },
        switchLocale(locale) {
            if (this.$i18n.locale !== locale) {
                const to = this.$router.resolve({params: {locale}});
                return Trans.changeLocale(locale).then(() => {
                    this.$router.push(to.location);
                });
            }
        },
        logOut() {
            document.cookie =
                "banhji-token=" +
                ";domain=.banhji.com;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT";
            window.location = "https://connect.banhji.com/en/signin/";
        },
        hideSidebar() {
            this.miniVariant = !this.miniVariant;
            this.miniVariant ? (this.handOver = true) : (this.handOver = false);
            if (this.miniVariant) {
                this.isAbsolute = true;
                this.isAccountLogo = true;
                this.isApp = false;
            } else {
                this.isAbsolute = false;
                this.isAccountLogo = false;
                this.isApp = true;
            }
            this.isAccountLogo = true;
        },
        onMouseOver() {
            if (this.miniVariant) {
                this.isAccountLogo = true;
                this.backHoverColor = "";
            }
        },
        onMouseLeave: function () {
            if (this.miniVariant) {
                this.isAccountLogo = false;
                this.backHoverColor = "#FFFFFF !important";
            }
        },
        setActiveSideNav() {
            let pathURL = window.location.pathname;
            //eslint-disable-next-line no-console
            if (pathURL == "/") {
                pathURL = "/en";
            }
            this.items.forEach((element) => {
                element.activeClass = "";
                let path = element.path;
                if (path == "/en") {
                    path = "";
                }
                if ("/" + i18n.locale + path == pathURL) {
                    element.activeClass = "active";
                }
                //eslint-disable-next-line no-console
                // console.log(pathURL);
                if (pathURL == "/en/subscriptions") {
                    this.activeClass1 = "active";
                } else if (pathURL == "/en/settings") {
                    this.activeClass2 = "active";
                } else if (pathURL == "/en/attachment") {
                    this.activeClass3 = "active";
                }
            });
        },
        miniSideInFunction() {
            if (this.$route.meta.miniSideBar == true) {
                this.miniVariant = true;
                this.handOver = true;
                this.isAbsolute = true;
                this.isAccountLogo = false;
                this.isApp = false;
            }
        },
    
        getCookie(cname) {
            var name = cname + "=";
            var ca = document.cookie.split(";");
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) === " ") c = c.substring(1);
                if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
            }
            return "";
        },
        async getCookieData() {
            var cookie = this.getCookie("banhji-token");
            if (cookie !== "") {
                let data = store.default.state.cookies;
                this.mInstitute = {
                    id: data.instituteId,
                    name: data.email,
                    email: data.email,
                    user: data.user,
                    plan: data.plan,
                    creator: data.creator,
                    accessToken: data.accessToken,
                    refreshToken: data.refreshToken,
                };
                if (this.mInstitute.plan == 1) {
                    this.planName = 'Standard'
                } else if (this.mInstitute.plan == 2) {
                    this.planName = 'Premium'
                } else if (this.mInstitute.plan == 3) {
                    this.planName = 'Advanced'
                }
                // window.console.log(this.planName, 'plan name')
            }
            store.default.commit('setUser', this.mInstitute)
            // window.console.log(this.mInstitute, "avatar");
        },
        writeToCookie() {
            // window.console.log(this.mInstitute, 'writeCookie');
            const cookie = {
                accessToken:
                    this.mInstitute.accessToken ||
                    "eyJraWQiOiIzT3hCSStYOWZCYzFOYTc3YW9qVnFIdlwvSWxXREV6NFJMYUluUmE5anNyQT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI1OWNkMTY4ZS1mNzBmLTQ4ODctYWE5Ny1kMWMwYWZiNDE0ZDkiLCJldmVudF9pZCI6IjA3ZmZiOTEyLWJiZTgtNDg3ZS1hODk5LWQ5MDM4NjcyNjBkYSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2MDc5MzU0NDMsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5hcC1zb3V0aGVhc3QtMS5hbWF6b25hd3MuY29tXC9hcC1zb3V0aGVhc3QtMV9nc2F0MmxiakwiLCJleHAiOjE2MDc5MzkwNDMsImlhdCI6MTYwNzkzNTQ0MywianRpIjoiNTc5NzE4ZDQtYmM0Zi00YzNhLThmMTItNmRjZGQyZmYxNDczIiwiY2xpZW50X2lkIjoiM3ZhOTNkMjVxbzZrcHYzNHJmMWwwNDNqZ3IiLCJ1c2VybmFtZSI6ImJhbmhqaTU1NUBnbWFpbC5jb20ifQ.Z-g9DNbRn5AX32xFWHmkt8iXe7FNly1azaOXTpORL4i7X_EDLybiYtbYsR3MWXbTNcFfKABPwOXYk541SJZPgnck8PWvHanyKIVvrlzaVy9JEo_E35jOO72Rjt0MgB2eG1u2k70R2cywQmKfsffp_5yk1RKaesZq0yLucUJDrSHnRv8Jm-U-S-buHs_fAxL_Vt6l3o2DcKtKRb-eUOHjTLs8WnHvtPvraXC7dY6PmJuA4K4v2RMfrSuv5wx2EvomqlOEtCgvbK8jDtu4zvHRTY-2TcnfK2dXwxZRkduF26YbezejBZpejsoVFBOi617NGH8b_2DikvSyCBBCjmh3qg",
                refreshToken:
                    this.mInstitute.refreshToken ||
                    "eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.dsantoqyFlkftIr9z_7P5uc2fjlc0w_R4wt1My1fT70grVmvW0crc_aqHcm-Vc3gpjgndX2Xxn3lTx7nqpVp59Lzeab2JIKE520LBhePWuz5y3LW5WMQhAcZteXNf6JATvDHrmRXs3R0e4m-vSZhlvLCMH5EIYB0bwsFMBdSVNrNNLLVzMuuzDCXywWlrLU1MIHJuEG9Z5c-fca1xB-1fwyI8wpGV6OVnfNSo4OfOeQ-O9ufKmKjym24yxE40i_8UrOEca_12Y5XrQGov30wkou6stixLDFWu05BncG2nfgCEjNERlJC97LPtyI__tLGL2kYuWgJKghebKkuq9ds_A.wvSOFOu7pMLZFghf.4DLhcyHLwJqf3fcyq8A3KmSQL8UAd_ADPZxBuPnnSDaRVEWqDTRq_bJDPFjWBf4uJkI6ye45XJ8AkdZQFutP-x_nUT2Qw0NbLjGFW3nUh2GVd8yP2JIyQJ2h2_onLvUPpLp-E0crIEdbVXZRpQM7y7aOP4rOVPPVBCiAxapMNX9_5utgzKpfWGrS8D6t7dvq4pHieXeZbomkoY7h_eLflehQ_RLcaK3i7Dnvxjn6_UiHmXx0X9gplFJx_rrIlveIrha94E6fBQ9eCwT0WHROrAQIbyW24D_6ytSAuKVq-383svntFUeBuggDRujVdR8uQ9HIbsftDvDvnKZchQ1yFiToTC-NPCfizaw6nuJ5LQAw0TVtY3RSeYfm6jAX77ymsuYi557UZNWCJs_0WRKBaqKnvKx6m-YwFtft5dPmW1rPi6ARJ20z6JocYLWjfKYBL3AITgzt2gY8POsgzBOhWZ9c2UcM7X8eY5EMtAQyhZ3iLHQ_21cnNAH_PNBmn4mZGuT0VePpeopmX3e4J1-BmAFq5LvqJW4KTIiFRdrcTbnLWT8JrR-SGiOMOLS_WUivc3wQZn20xm2JlrJZDemT4IGdHLmrxARsvlSwKaQ94Rywly8WjIaj-wzqA5_MURryW1xHUpwwO-lvZ1dTK9Wh80AY_LSL19fcPi1pXz_NCSKOniSgoT3qvaL1zLcxFKr5D_lI8LkI4wyC7tzRbvbkY6t8-L269Y7BVO7SXMIDu6nT1XyuUElFMnnfuDr_iCWPjDjbEA2f5hl6V1m3BFEkroHQp97RnJUnualVpnQ1QsuBvRFZnvEI0OuPUpMNMic6gnuxNV_ILlxhH7JspafqbeAN5PYauLsI6A70b4mZWf0XGZu0UeV93QZZn_9156yytgU3-3-mcDR4dV2L0bnICz1lCVsqw9EE6MUJhHneNNqDn9pWykD3kSxbtS-0jTTyOVJaGjmwP6K80hH3S6C6cEnkPr83Or-FBkmB61_2RHjyB6o5QkebyPv2L5z8eF14r15UZiFEI6HyyEeZBWpEgYREvkVmjsLg2koHcieQ_AmUmwy9rF8oW5qM1LO-NPHIqnR1uwSvu2ZPBDBxigjgZ3m8q8lirVwSgHmY4OVEb1MWBa5uHCFKYKlEZCdeU_DKl3eb52Nnou7nKyBphgarI7LZ5-ufQPCxzeablED4rAnzTEoov3HQ1vHjS_nF71aZ4tNAR98vFpbhH1sBJolvf65omWa15ezCEsbyhCrvKmcZuGJHXMSXkxcbZOJWivV6sLLNQDZq6FF8AOKMDXTHFVJDYO94eB_F9GAEW4q9evuZaQ.fN1JXyIfuzoK0yAG4om3LQ",
                expiresIn: 1607939043,
                email: this.mInstitute.email,
                plan: this.mInstitute.plan,
                instituteId: this.mInstitute.id,
                creator: this.mInstitute.creator,
                user: this.mInstitute.user,
            };

            // document.cookie =
            //     "banhji-token=" +
            //     JSON.stringify(cookie) +
            //     ";domain=.localhost;path=/;expires=Fri, 31 Dec 9999 12:00:00 GMT;";
            let value = JSON.stringify(cookie);
            let expires = "";
            let name = "banhji-token";
            document.cookie = name + "=" + value + expires + "; path=/";
        },
        onChanged() {
            // this.writeToCookie();
            //reload
            this.$router.go(this.$router.currentRoute);
            // this.$router.push({
            //     name: 'Suppliers', params: {
            //         data: data
            //     }
            // })
            // window.console.log(this.mInstitute)
        },
        async loadInstitutes() {
            // window.console.log(this.mInstitute.creator);
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    instituteHandler.getCompany(this.mInstitute.creator).then(async res => {
                        res.forEach((i) => {
                            this.institutes.push({
                                id: i.id,
                                banhjiId: i.banhjiId,
                                name: i.name,
                                email: this.mInstitute.email,
                                user: this.mInstitute.user,
                                creator: this.mInstitute.creator,
                                plan: this.mInstitute.plan
                            });
                            // window.console.log(i.banhjiId, 'id institute')
                            if (i.banhjiId === this.mInstitute.id) {
                                this.mInstitute = i
                                this.writeToCookie()
                            }
                        });

                    });
                }, 300);
            });
        },
        async loadInstitute() {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    otherHandler.institute().then((res) => {
                        // window.console.log(res, "--");
                        this.institutes = res;
                    });
                }, 300);
            });
        },
        toggleDarkTheme() {
            this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
        },
    },
    components: {
        VOffline
    },
    computed: {
        avatarLetter() {
            return store.default.state.avatarLetter;
        },
        // History Page
        historyPages: {
            set(historyPages) {
                store.commit("setHistoryPage", historyPages);
            },
            get() {
                return store.default.state.historyPages;
            },
        },
        supportedLocales() {
            return Trans.supportedLocales;
        },
        currentRouteName() {
            return this.$route.name;
        },
        lang() {
            return "/" + i18n.locale;
        },
    },
    mounted: async function () {
        this.setActiveSideNav();
        // await this.loadInstitute();
        await this.getCookieData();
        await this.loadInstitutes();
    },
    async created() {
        window.addEventListener('keydown', async function(event) {
            if (event.keyCode === 73 && event.ctrlKey === true && event.shiftKey === false && event.altKey === false && event.metaKey === false) {
                await router.push("/" + i18n.locale + "/invoice")
            }
        })
    },
    watch: {
        $route: "miniSideInFunction",
    },
};
</script>
<style scoped>
    .b-search:before {
    content: "\e906";
    color: #474747 !important;
    } 
    .beta{
        font-size: 18px;
        text-transform: uppercase;
    }
    .overview{
      background-color: #ffffff !important;
    }
    .sub_type{
    margin-top: -13px;
    margin-left: 60px;
    }

</style>


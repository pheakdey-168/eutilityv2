<template>
    <v-container fluid style="" class="pos-header mb-10" >
        <v-app-bar
            fixed
            app
            class="no_border  header-app"
            color="grayBg"
            v-bind:class="{ sidebar_small: miniVariant }">
            <span class="">
                <a href="\">
                <img
                    class="mt-3"
                    src="../assets/images/banhji-logo-r.png"
                    height="60"
                />
                </a>
                <v-spacer/>
            </span>
            <h3 class="ml-2 ml-4 py-4 pl-4" style="font-size: 18px;border-left: 1px solid gainsboro;">{{$t('agriculture_cooperative_s_financial_management_software')}}</h3> 
            <h1 v-if="this.$route.meta.logo" class="ml-2 hidden-sm-and-down">
                <img style="height: 50px;" :src="'/images/' + this.$route.meta.logo"/>
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
            
            <div class="hidden-sm-and-down header_icon">
                
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
    </v-container>
</template>

<script>
    const store = require("../institute.js");
    import {Trans} from "@/plugins/Translation";
    import {i18n} from "../i18n";
    import VOffline from "@/components/VOffline";
    import {  data } from '@/observable/store'

    export default {
        data: () => ({
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
                    app: 'cooperative',
                    path: "/en",
                },
                {
                    id: 21,
                    class: "",
                    activeClass: "",
                    name: "Members",
                    app: 'cooperative',
                    menuTex: "Members",
                    path: "/members",
                },
                {
                    id: 2,
                    class: "",
                    activeClass: "",
                    name: "Customers",
                    app: 'cooperative',
                    menuTex: "customers",
                    path: "/customers",
                },
                {
                    id: 3,
                    class: "",
                    activeClass: "",
                    name: "vendors",
                    app: 'pos',
                    menuTex: "vendors",
                    path: "/vendors",
                },
                //   {
                //     id: 4,
                //     class: "",
                //     activeClass: "",
                //     name: "Product/Services",
                //     menuTex: "products_services",
                //     path: "/products_services",
                //   },
                {
                    id: 4,
                    class: "",
                    activeClass: "",
                    app: 'pos',
                    name: "Products",
                    menuTex: "products",
                    path: "/products",
                },
                {
                    id: 5,
                    class: "",
                    activeClass: "",
                    name: "Services/ Projects",
                    menuTex: "services_projects",
                    app: 'pos',
                    path: "/services_projects",
                },
                {
                    id: 6,
                    class: "",
                    activeClass: "",
                    name: "Payroll",
                    app: 'cooperative',
                    menuTex: "payroll",
                    path: "/payroll",
                },
                {
                    id: 7,
                    class: "",
                    activeClass: "",
                    name: "Working Capital",
                    app: 'cooperative',
                    menuTex: "working_capital",
                    path: "/working_capital",
                },
                {
                    id: 20,
                    class: "",
                    activeClass: "",
                    name: "Accounting",
                    app: 'cooperative',
                    menuTex: "accounting",
                    path: "/accounting",
                },
                {class: "ma-3 v-divider"},
                
                {
                    id: 9,
                    class: "text-green",
                    activeClass: "",
                    name: "Banking",
                    menuTex: "banking_menu",
                    app: 'cooperative',
                    path: "/banking",
                },
                {
                    id: 10,
                    class: "text-green",
                    activeClass: "",
                    name: "Finances",
                    app: 'cooperative',
                    menuTex: "finances.",
                    path: "/finances",
                },
                {
                    id: 11,
                    class: "text-green",
                    activeClass: "",
                    name: "Compliance",
                    app: 'cooperative',
                    menuTex: "compliance",
                    path: "/compliance",
                },
            ],
            previous_active_id: 1,
            fullscreen: false,
            pages: [],
            mInstitute: {},
            isLoaded: false,
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
                if (data.id == 1) {
                    this.$router.push(`${i18n.locale}`);
                }
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
        },
        components: {
            VOffline
        },
        computed: {
            appType(){
                return data.app
            },
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
        mounted() {
            this.setActiveSideNav();
        },
        watch: {
            $route: "miniSideInFunction",
        },
    };
</script>
<style scoped>
    .header-app{
    height: 145px !important;
    padding: 75px 0 0 0 !important;
    transform: translateY(0px);
    position: fixed;
    width: 1135px;
    margin-right: auto;
    margin-left: auto;
    }
    .header-app .v-toolbar__content{
        padding: 0px !important;
    }

    @media (min-width: 1904px){
        .header-app {
            width: 1450px !important;
        }
    }
</style>


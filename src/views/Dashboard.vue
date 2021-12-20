<template>  
    <v-container style="">
        <v-row>
            <LoadingMe
                :isLoading="showLoading"
                :fullPage="false"
                type="loading"
                :myLoading="true"/>
            <v-col sm="4" cols="12" class="" style="padding:12px 0;">
                <v-dialog v-model="pinActivate" max-width="350px">
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <template>
                            <!-- <v-container> -->
                            <div id="pin" class="m-auto my-4">
                                <v-text-field
                                    class="mt-4"
                                    v-model="pin"
                                    placeholder=""
                                    :type="'password'"
                                    :rules="[v => !!v || $t('pin_is_required') ]"
                                />
                                <h2 v-if="incorrect">{{$t("wrong_pin")}}</h2>
                                <div class="numbers">
                                    <div @click="pinClick(1)" class="number">1</div>
                                    <div @click="pinClick(2)" class="number">2</div>
                                    <div @click="pinClick(3)" class="number">3</div>
                                    <div @click="pinClick(4)" class="number">4</div>
                                    <div @click="pinClick(5)" class="number">5</div>
                                    <div @click="pinClick(6)" class="number">6</div>
                                    <div @click="pinClick(7)" class="number">7</div>
                                    <div @click="pinClick(8)" class="number">8</div>
                                    <div @click="pinClick(9)" class="number">9</div>
                                    <div @click="pinClick('clear')" class="number" style="">{{$t("ac")}}</div>
                                    <div @click="pinClick(0)" class="number">0</div>
                                    <div @click="searchPin" class="number" style="background-color: rgb(154 27 46);color: #ffff;">{{$t("go")}}</div>
                                    <div class="cancelPin" @click="pinActivate = false">{{$t("cancel")}}</div>
                                </div>
                            </div>
                            <!-- </v-container> -->
                        </template>
                    </v-form>
                </v-dialog>
                <v-col sm="" cols="12" class="pb-2">
                    <v-card
                        class="mx-auto grey-custom"
                        max-width="465"
                        outlined
                        @click="goMember"
                    >
                        <v-list-item three-line>
                            <v-list-item-content>
                                <v-row>
                                    <v-col sm="4" cols="4" class="pk-1">
                                        <img
                                            class="img-1"
                                            src="../assets/images/coo_member.png"
                                            width="70%"
                                        />
                                    </v-col>
                                    <v-col sm="8" cols="8" class="pk-1">
                                            <v-list-item-title class=" mb-1  headline-left">{{$t('share_saving')}}</v-list-item-title>
                                    </v-col>
                                </v-row>
                            </v-list-item-content>
                        </v-list-item>
                    </v-card>
                </v-col> 
                <v-col sm="" cols="12" class="py-2">
                    <v-card
                        class="mx-auto grey-custom"
                        max-width="465"
                        outlined
                        @click="goStatistics"
                    >
                        <v-list-item three-line>
                            <v-list-item-content>
                                <v-row>
                                    <v-col sm="4" cols="4" class="pk-1">
                                        <img
                                            class="img-1"
                                            src="../assets/images/coo_membership.png"
                                            width="70%"
                                        />
                                    </v-col>
                                    <v-col sm="8" cols="8" class="pk-1">
                                        <v-list-item-title class=" mb-1  headline-left">{{$t('statistics_reports')}}</v-list-item-title>
                                    </v-col>
                                </v-row>
                            </v-list-item-content>
                        </v-list-item>
                    </v-card>
                </v-col> 
                <v-col sm="" cols="12" class="py-2">
                    <v-card
                        class="mx-auto grey-custom"
                        max-width="465"
                        outlined
                        @click="goToAccounting"
                    >
                        <v-list-item three-line>
                            <v-list-item-content>
                                <v-row>
                                    <v-col sm="4" cols="4" class="pk-1">
                                        <img
                                            class="img-1"
                                            src="../assets/images/coo_compliance.png"
                                            width="70%"
                                        />
                                    </v-col>
                                    <v-col sm="8" cols="8" class="pk-1">
                                            <v-list-item-title class=" mb-1  headline-left">{{$t('accounting_budgeting')}}</v-list-item-title>
                                    </v-col>
                                </v-row>
                            </v-list-item-content>
                        </v-list-item>
                    </v-card>
                </v-col> 
                <v-col sm="" cols="12" class="py-2">
                    <v-card
                        class="mx-auto grey-custom"
                        max-width="465"
                        outlined
                        :to="lang + '/main_settings'"
                    >
                        <v-list-item three-line>
                            <v-list-item-content>
                                <v-row>
                                    <v-col sm="4" cols="4" class="pk-1">
                                        <img
                                            class="img-1"
                                            src="../assets/images/coo__user.png"
                                            width="70%"
                                        />
                                    </v-col>
                                    <v-col sm="8" cols="8" class="pk-1">
                                            <v-list-item-title class=" mb-1  headline-left">{{$t('settings')}}</v-list-item-title>
                                    </v-col>
                                </v-row>
                            </v-list-item-content>
                        </v-list-item>
                    </v-card>
                </v-col> 
                <v-col sm="" cols="12" class="pk-2 py-0">
                    <p class="mb-0 font_13 pl-2">{{$t('banhji_footer')}}</p>
                    <v-row>
                        <v-col sm="5" cols="12" class="py-0 pr-0">
                            <img
                            class="img-1"
                            src="../assets/images/made_in_cambodia.png"
                            height="auto"
                            width="100%"
                        />
                        </v-col>
                        <v-col sm="7" cols="12" class="py-0">
                            <p class="line_14 font_10 mb-3 pl-2">{{$t('banhji_term_footer')}}</p>
                        </v-col>
                    </v-row>
                    
                </v-col>
            </v-col>
            <v-col sm="8" cols="12" class="">
                <v-row>
                    <v-col sm="6" cols="12" class="">
                        <v-card
                            class="mx-auto"
                            max-width="465"
                            outlined
                            @click="goCredit"
                        >
                            <v-list-item three-line>
                                <v-list-item-content class="pk-3">
                                    <v-list-item-title class="headline mb-1 primary--text">
                                        {{$t('saving_credit')}}
                                    </v-list-item-title>
                                    <div class="overline mb-4 business">
                                    {{$t('business')}}
                                    </div>
                                    <v-row>
                                        <v-col sm="5" cols="5" class="">
                                            <img
                                                class="img-1"
                                                src="../assets/images/coo_loan.png"
                                                width="80%"
                                            />
                                        </v-col>
                                        <v-col sm="7" cols="7" class="pl-0">
                                            <v-list-item-subtitle>{{$t('saving_credit_description')}}</v-list-item-subtitle>
                                        </v-col>
                                    </v-row>
                                </v-list-item-content>
                            </v-list-item>
                        </v-card>
                    </v-col> 
                    <v-col sm="6" cols="12" class="">
                            <v-card
                                class="mx-auto"
                                max-width="465"
                                outlined
                                @click="goInput" 
                                
                            >
                                <v-list-item three-line>
                                    <v-list-item-content class="pk-3">
                                        <v-list-item-title class="headline mb-1 primary--text">
                                        {{$t('input_supply')}}
                                        </v-list-item-title>
                                        <div class="overline mb-4 business">
                                        {{$t('business')}}
                                        </div>
                                        <v-row>
                                            <v-col sm="5" cols="5" class="">
                                                <img
                                                    class="img-1"
                                                    src="../assets/images/coo_market_biz.png"
                                                    width="80%"
                                                />
                                            </v-col>
                                            <v-col sm="7" cols="7" class="pl-0">
                                                <v-list-item-subtitle>{{$t('input_supply_description')}}</v-list-item-subtitle>
                                            </v-col>
                                        </v-row>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-card>
                    </v-col> 
                    <v-col sm="6" cols="12" class="">
                        <v-card
                            class="mx-auto"
                            max-width="465"
                            outlined
                            @click="goMarketing" 

                        >
                            <v-list-item three-line>
                                <v-list-item-content class="pk-3">
                                    <v-list-item-title class="headline mb-1 primary--text">
                                        {{$t('marketing')}}
                                        </v-list-item-title>
                                        <div class="overline mb-4 business">
                                        {{$t('business')}}
                                        </div>
                                        <v-row>
                                            <v-col sm="5" cols="5" class="">
                                                <img
                                                    class="img-1"
                                                    src="@/assets/images/coo_joint_use.png"
                                                    width="80%"
                                                />
                                            </v-col>
                                            <v-col sm="7" cols="7" class="pl-0">
                                                <v-list-item-subtitle>{{$t('marketing_description')}}</v-list-item-subtitle>
                                            </v-col>
                                        </v-row>
                                </v-list-item-content>
                            </v-list-item>
                        </v-card>
                    </v-col> 
                    <v-col sm="6" cols="12" class="">
                        <v-card
                            class="mx-auto"
                            max-width="465"
                            outlined
                            @click="goJointUser" 
                        >
                            <v-list-item three-line>
                                <v-list-item-content class="pk-3">
                                        <v-list-item-title class="headline mb-1 primary--text">
                                        {{$t('service')}}
                                        </v-list-item-title>
                                        <div class="overline mb-4 business">
                                        {{$t('business')}}
                                        </div>
                                        <v-row>
                                            <v-col sm="5" cols="5" class="">
                                                <img
                                                    class="img-1"
                                                    src="../assets/images/coo_supply.png"
                                                    width="80%"
                                                />
                                            </v-col>
                                            <v-col sm="7" cols="7" class="pl-0">
                                                <v-list-item-subtitle>{{$t('joint_use_description')}}</v-list-item-subtitle>
                                            </v-col>
                                        </v-row>
                                </v-list-item-content>
                            </v-list-item>
                        </v-card>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>                               
    </v-container>

</template>

<script>
    import {dataStore} from "../observable/store";

    const loanHandler = require("@/scripts/loanHandler")
    import {i18n} from "../i18n";
    import {  data } from '@/observable/store'
    const jwt = require('jsonwebtoken')
    export default {
        data: ()=> ({
            valid: true,
            activeClass3: "",
            activeClass2: "",
            token: '',
            pinActivate: false,
            pin: '',
            func: 1,
            showLoading: false,
            incorrect: false,
        }),
        components: {
            LoadingMe: () => import(`@/components/Loading`),
        },
        computed:{
            lang() {
                return "/" + i18n.locale;
            },
        },
        methods:{
            async linkToBanhji() {
                await this.setCookie(
                    "banhji-token",
                    data.cookie,
                    9999,
                    process.env.VUE_APP_DOMAIN_PLATFORM
                );
                // window.console.log(data.cookie,"loken")
                window.open(process.env.VUE_APP_LINK_TO_PLATFORM, "_blank");
                //     window.open("http://localhost:8080", "_blank");

            },
            async linkAccBusiness(type) {
                let token = jwt.sign({businessType:type}, process.env.VUE_APP_JWT_SESCRET, {
                    expiresIn: 86400
                });
                await this.setCookie( 
                    "accbiz-token",
                    token,
                    9999,
                    process.env.VUE_APP_DOMAIN_PLATFORM
                );
                window.open(process.env.VUE_APP_LINK_ACC_BUSINESS_PLATFORM, "_blank");
            },
            async setCookie(cname, cvalue, exdays, domain) {
                const d = new Date();
                d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
                const expires = "expires=" + d.toUTCString();
                document.cookie =
                    cname + "=" + cvalue + ";" + expires + ";domain=" + domain + ";path=/";
            },
            goTo(app, link){
                data.app = app
                this.$router.push({ path: '/'+this.lang+link});
                localStorage.setItem('app_type', app)
                this.$router.push('/en'+link);
            },
            goCredit() {
                this.func = 3
                this.showPin()
            },
            async goC(group, pinname){
                let token = jwt.sign({pinname: pinname, businessType: 'Credit'}, process.env.VUE_APP_JWT_SESCRET, {
                    expiresIn: 86400
                });
                dataStore.pin =  {group:group, pinname: pinname}
                dataStore.businessType = 'Credit'
                await this.setCookie(
                    "accgroup-token",
                    token,
                    9999,
                    process.env.VUE_APP_DOMAIN_PLATFORM
                );
                window.console.log(token)
                let routeData = this.$router.resolve({name: 'credit_biz'});
                window.open(routeData.href, '_blank');
            },
            goInput(){
                this.func = 4
                this.showPin()
            },
            async goI() {
                this.linkAccBusiness('Supply')
            },
            goMarketing(){
                this.func = 5
                this.showPin()
            },
            goM(){
                // let routeData = this.$router.resolve({name: 'marketing'});
                // window.open(routeData.href, '_blank');
                this.linkAccBusiness('Marketing')
            },
            goToAccounting() {
                this.func = 2
                this.showPin()
            },
            goA(){
                this.linkToBanhji()
            },
            goStatistics() {
                this.func = 1
                this.showPin()
            },
            goJointUser(){
                this.func = 6
                this.showPin()
            },
            goMember(){
                // let routeData = this.$router.resolve({name: 'members'});
                // window.open(routeData.href, '_blank');
                this.func = 7
                this.showPin()
            },
            goJ(){
               this.linkAccBusiness('Service')
            },
            async goMS(group, pinname){
                let token = jwt.sign({pinname: pinname}, process.env.VUE_APP_JWT_SESCRET, {
                    expiresIn: 86400
                });
                dataStore.pin =  {group:group, pinname: pinname}
                await this.setCookie(
                    "accgroup-token",
                    token,
                    9999,
                    process.env.VUE_APP_DOMAIN_PLATFORM
                );
                window.console.log(token)
                let routeData = this.$router.resolve({name: 'members'});
                window.open(routeData.href, '_blank');
            },
            showPin(){
                this.pinActivate = true
            },
            goS(){
                let routeData = this.$router.resolve({name: 'statistics'});
                window.open(routeData.href, '_blank');
            },
            pinClick(num){
                this.incorrect = false
                if(num == 'clear'){
                    this.pin = ''
                }else{
                    this.pin = this.pin + num.toString()
                }
            },
            searchPin(){
                if (!this.$refs.form.validate()) {
                this.$refs.form.validate();
                return;
                }
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        this.showLoading = true
                        loanHandler.userPinSearchGet(this.pin, this.func).then(res => {
                            this.showLoading = false
                            window.console.log('userpin',res.data.data)
                            if(res.data.data[0].hasPin == true){
                                this.pinActivate = false
                                this.pin = ''
                                switch(this.func) {
                                    case 1:
                                        this.goS()
                                        break;
                                    case 2:
                                        this.goA()
                                        break;
                                    case 3:
                                        this.goC(res.data.data[0].group, res.data.data[0].pinName)
                                        break;
                                    case 4:
                                        this.goI()
                                        break;
                                    case 5:
                                        this.goM()
                                        break;
                                    case 6:
                                        this.goJ()
                                        break;
                                    case 7:
                                        this.goMS(res.data.data[0].group, res.data.data[0].pinName)
                                        break;
                                    default:
                                        break;
                                }
                            }else{
                                this.pin = ''
                                this.incorrect = true
                            }
                        })
                    }, 300);
                })
            },
        },
        mounted() {
        }
    }
</script>
<style scoped>
body {
    font-family: "Niradei-Regular";
}
.loading {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9;
}
.v-application .headline {
    font-size: 2rem !important;
    font-weight: 400;
    line-height: normal;
    letter-spacing: normal !important;
    font-family: 'Niradei-Black'!important;
    margin-bottom: 0 !IMPORTANT;
    text-transform: uppercase;
}
.icon-left{
    margin: 10px 10px 10px 0px !important;
}
.v-application .headline-left{
    font-family: 'Niradei-Heavy' !important;
    font-size: 1.4rem !important;
    white-space: inherit !important;
    letter-spacing: -1px;
    line-height: 35px !important;
}
.v-list-item__title, .v-list-item__subtitle {
    white-space: initial !important;
}
.business {
    font-size: 1.2rem !important;
    font-weight: 500;
    letter-spacing: normal !important;
    line-height: 2rem;
    text-transform: uppercase;
    font-family: 'Niradei-Medium' !important;
}
.v-application .mb-4 {
    margin-bottom: 5px !important;
}
.v-list-item__subtitle {
    overflow: initial !important;
    font-size: 1.2rem !important;
    -webkit-line-clamp: 5;
    font-family: 'Niradei-Medium';
    padding-top: 10px;
}
.v-application p {
    margin-bottom: 5px;
}
.pk-1{
    padding: 0px 8px;
    justify-content: center;
    display: flex;
}
.pk-2{
    font-size: 14px;
    padding: 0 12px;
}
.pk-2 span{
    font-size: 12px;
}
.pk-3{
    padding: 10px 0 !important;
}
.v-sheet.v-card{
    border:none;
}
.grey-custom{
    background-color: #e4e6e7;
}
.v-list-item .v-list-item__title, .v-list-item .v-list-item__subtitle {
    line-height: normal;
}
@media (min-width: 1904px){
.container {
    max-width: 1400px;
    }
}
@media (max-width: 576px) {
}
body {
      height: 95vh;
      background-color: #181c26 !important;
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -webkit-align-items: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-box-pack: center;
      -webkit-justify-content: center;
      -ms-flex-pack: center;
      justify-content: center;
      font-family: Open Sans;
    }

    body.wrong {
      -webkit-animation: bg-red 1s ease-in;
      animation: bg-red 1s ease-in;
    }

    body.correct {
      -webkit-animation: bg-green 1s ease-in;
      animation: bg-green 1s ease-in;
    }

    #inspiration {
      position: fixed;
      right: 1em;
      bottom: 1em;
    }

    #inspiration a {
      display: inline-block;
      text-decoration: none;
      font-weight: bold;
      color: white;
      -webkit-transition: all 1s ease;
      transition: all 1s ease;
    }

    #inspiration a:hover { color: #212121; }

    #inspiration p {
      margin: 0;
      padding-left: .4em;
      display: inline-block;
      color: rgba(255, 255, 255, 0.6);
    }
    #pin {
        background-color: #ffffff !important;
        width: 90%;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -webkit-align-items: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -webkit-flex-direction: column;
        -ms-flex-direction: column;
        flex-direction: column;
        /* padding: 1em; */
        border-radius: .3em;
        /* box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.3); */
        margin: auto;
        color: rgb(155 27 46);;
        }

    .dots {
      width: 50%;
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-justify-content: space-around;
      -ms-flex-pack: distribute;
      justify-content: space-around;
      padding: 1em;
      padding-top: 3em;
    }

    .dot {
      position: relative;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 0.8em;
      width: 0.8em;
      height: 0.8em;
      -webkit-transform: scale3d(0.7, 0.7, 0.7);
      transform: scale3d(0.7, 0.7, 0.7);
    }

    .dot.active {
      -webkit-animation: growDot .5s ease;
      animation: growDot .5s ease;
      -webkit-animation-fill-mode: forwards;
      animation-fill-mode: forwards;
    }

    .dot.wrong {
      -webkit-animation: wrong .9s ease;
      animation: wrong .9s ease;
    }

    .dot.correct {
      -webkit-animation: correct .9s ease;
      animation: correct .9s ease;
    }

    .cancelPin {
      width: 25%;
      margin-left: 10%;
      margin-top: 10%;
    }

    #pin p { font-size: 1.2em; }

    .numbers {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-flex-flow: row wrap;
      -ms-flex-flow: row wrap;
      flex-flow: row wrap;
      -webkit-box-align: center;
      -webkit-align-items: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-justify-content: space-around;
      -ms-flex-pack: distribute;
      justify-content: space-around;
      -webkit-align-content: flex-end;
      -ms-flex-line-pack: end;
      align-content: flex-end;
      margin: 1em 0;
    }

    .number {
      position: relative;
      width: 2.5em;
      height: 2.5em;
      margin: 0.5em;
      border-radius: 2.5em;
      border: 2px solid rgb(154 27 46);
      text-align: center;
      line-height: 2.5em;
      font-weight: 400;
      font-size: 1.8em;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      -webkit-transition: all .5s ease;
      transition: all .5s ease;
      cursor: pointer;
    }

    .number:hover { color: rgba(243, 134, 134, 0.5); }

    .number:hover:before { border: 2px solid rgba(255, 255, 255, 0.5); }

    .number:before {
      content: "";
      position: absolute;
      left: -2px;
      width: 2.5em;
      height: 2.5em;
      border: 2px solid rgba(255, 255, 255, 0.1);
      border-radius: 2.5em;
      -webkit-transition: all .5s ease;
      transition: all .5s ease;
    }
    .number.grow:before {
        -webkit-animation: grow .6s ease;
        animation: grow .6s ease;
        }
    @-webkit-keyframes 
    growDot {  100% {
    background: white;
    -webkit-transform: scale3d(0.9, 0.9, 0.9);
    transform: scale3d(0.9, 0.9, 0.9);
    }
    }
    @keyframes 
    growDot {  100% {
    background: white;
    -webkit-transform: scale3d(0.9, 0.9, 0.9);
    transform: scale3d(0.9, 0.9, 0.9);
    }
    }
    @-webkit-keyframes 
    grow {  50% {
    -webkit-transform: scale3d(1.5, 1.5, 1.5);
    transform: scale3d(1.5, 1.5, 1.5);
    }
    100% {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
    }
    }
    @keyframes 
    grow {  50% {
    -webkit-transform: scale3d(1.5, 1.5, 1.5);
    transform: scale3d(1.5, 1.5, 1.5);
    }
    100% {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
    }
    }
    @-webkit-keyframes 
    wrong {  20% {
    background: crimson;
    }
    40% {
    -webkit-transform: translate(-15px, 0);
    transform: translate(-15px, 0);
    }
    60% {
    -webkit-transform: translate(10px, 0);
    transform: translate(10px, 0);
    }
    80% {
    -webkit-transform: translate(-5px, 0);
    transform: translate(-5px, 0);
    }
    }
    @keyframes 
    wrong {  20% {
    background: crimson;
    }
    40% {
    -webkit-transform: translate(-15px, 0);
    transform: translate(-15px, 0);
    }
    60% {
    -webkit-transform: translate(10px, 0);
    transform: translate(10px, 0);
    }
    80% {
    -webkit-transform: translate(-5px, 0);
    transform: translate(-5px, 0);
    }
    }
    @-webkit-keyframes 
    correct {  20% {
    background: limegreen;
    }
    40% {
    -webkit-transform: translate(0, -15px);
    transform: translate(0, -15px);
    }
    60% {
    -webkit-transform: translate(0, 10px);
    transform: translate(0, 10px);
    }
    80% {
    -webkit-transform: translate(0, -5px);
    transform: translate(0, -5px);
    }
    }
    @keyframes 
    correct {  20% {
    background: limegreen;
    }
    40% {
    -webkit-transform: translate(0, -15px);
    transform: translate(0, -15px);
    }
    60% {
    -webkit-transform: translate(0, 10px);
    transform: translate(0, 10px);
    }
    80% {
    -webkit-transform: translate(0, -5px);
    transform: translate(0, -5px);
    }
    }
    @-webkit-keyframes 
    bg-red {  50% {
    background: crimson;
    }
    }
    @keyframes 
    bg-red {  50% {
    background: crimson;
    }
    }
    @-webkit-keyframes 
    bg-green {  50% {
    background: limegreen;
    }
    }
    @keyframes 
    bg-green {  50% {
    background: limegreen;
    }
    }
    #pin >.v-input input {
        text-align: center !important;
        font-size: 35px !important;
    }
    
</style>

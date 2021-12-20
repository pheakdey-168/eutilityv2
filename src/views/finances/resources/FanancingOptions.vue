<template>
    <v-row >
        <v-col sm="12" cols="12" class="pt-0">
            <h2 class="mb-0 font_20">{{ $t("business_debt_finacing_options") }}</h2>
            <p class="mb-2">{{$t('business_debt_finacing_options_desc')}}</p>
            <v-row class="">
                <!-- <v-col sm="6" cols="12" v-for="resource in resources" :key="resource.id">
                    <v-card @click="ShowResources(resource)" elevation="0" color="grayBg" class="pa-3">
                        <v-row>
                            <v-col sm="3" cols="12" class="py-0 pr-0">
                                <img class="res_img" :src="resource.image"/>
                            </v-col>
                            <v-col sm="9" cols="12" class="py-0">
                                <h3>{{resource.title}}</h3>
                                <p class="mb-0 line_14">{{resource.feature}}</p>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col> -->
                <v-col sm="6" cols="12">
                    <v-card  elevation="0" color="grayBg" @click="ShowResources('Short-term business loan')" class="pa-3 pointer">
                        <v-row>
                            <v-col sm="2" cols="12" class="py-0 pr-0">
                                <img class="res_img" src="@/assets/images/wallet.png"/>
                            </v-col>
                            <v-col sm="10" cols="12" class="py-0">
                                <h3>Short-Term Loan</h3>
                                <p class="mb-0 line_14">This is the most common way to get business financing.</p>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
                <v-col sm="6" cols="12">
                    <v-card  elevation="0" color="grayBg" @click="ShowResources('Term Loan')" class="pa-3 pointer">
                        <v-row>
                            <v-col sm="2" cols="12" class="py-0 pr-0">
                                <img class="res_img" src="@/assets/images/terms.png"/>
                            </v-col>
                            <v-col sm="10" cols="12" class="py-0">
                                <h3>Term Loan</h3>
                                <p class="mb-0 line_14">Access a line of credit that you can use, pay off and reuse.</p>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
                <v-col sm="6" cols="12">
                    <v-card  elevation="0" color="grayBg" @click="ShowResources('Business Credit Card')" class="pa-3 pointer">
                        <v-row>
                            <v-col sm="2" cols="12" class="py-0 pr-0">
                                <img class="res_img" src="@/assets/images/credit-card.png"/>
                            </v-col>
                            <v-col sm="10" cols="12" class="py-0">
                                <h3>Business Credit Card </h3>
                                <p class="mb-0 line_14">Access credit limit that you can use, pay off and reuse.</p>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
                <v-col sm="6" cols="12">
                    <v-card  elevation="0" color="grayBg" @click="ShowResources('Line of credit')" class="pa-3 pointer">
                        <v-row>
                            <v-col sm="2" cols="12" class="py-0 pr-0">
                                <img class="res_img" src="@/assets/images/clipboard.png"/>
                            </v-col>
                            <v-col sm="10" cols="12" class="py-0">
                                <h3>Line of credit</h3>
                                <p class="mb-0 line_14">Access a line of credit that you can use, pay off and reuse.</p>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
                <v-col sm="6" cols="12">
                    <v-card  elevation="0" color="grayBg" @click="ShowResources('Invoice financing')" class="pa-3 pointer">
                        <v-row>
                            <v-col sm="2" cols="12" class="py-0 pr-0">
                                <img class="res_img" src="@/assets/images/invoice.png"/>
                            </v-col>
                            <v-col sm="10" cols="12" class="py-0">
                                <h3>Invoice financing</h3>
                                <p class="mb-0 line_14">Get immediate cash for your invoices.</p>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
                <v-col sm="6" cols="12">
                    <v-card  elevation="0" color="grayBg" @click="ShowResources('Vendors Financing')" class="pa-3 pointer">
                        <v-row>
                            <v-col sm="2" cols="12" class="py-0 pr-0">
                                <img class="res_img" src="@/assets/images/invoice2.png"/>
                            </v-col>
                            <v-col sm="10" cols="12" class="py-0">
                                <h3>Vendors financing</h3>
                                <p class="mb-0 line_14">Access a line of credit from vendor for your purchase</p>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
                <v-col sm="6" cols="12">
                    <v-card  elevation="0" color="grayBg" @click="ShowResources('Equipment financing')" class="pa-3 pointer">
                        <v-row>
                            <v-col sm="2" cols="12" class="py-0 pr-0">
                                <img class="res_img" src="@/assets/images/machine.png"/>
                            </v-col>
                            <v-col sm="10" cols="12" class="py-0">
                                <h3>Equipment financing</h3>
                                <p class="mb-0 line_14">Finance the purchase of your equipment</p>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
                <v-col sm="6" cols="12">
                    <v-card  elevation="0" color="grayBg" @click="ShowResources('Auto loans')" class="pa-3 pointer">
                        <v-row>
                            <v-col sm="2" cols="12" class="py-0 pr-0">
                                <img class="res_img" src="@/assets/images/car-loan.png"/>
                            </v-col>
                            <v-col sm="10" cols="12" class="py-0">
                                <h3>Auto loans</h3>
                                <p class="mb-0 line_14">Finance the purchase of your motor vehicles</p>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>
<script>
    import { ShowResource} from '@/observable/store'
    import { getResource } from '@/scripts/resources/resourceHandle'
    export default {
        data: () => ({
            // Search transaction dates
            start_date: "",
            end_date: "",
            dateSorters: ["Today", "This Week", "This Month", "This Year"],
            account: [],
            files: [],
            resources: [],
            attachments: [],

            dialogm3: false,
            // LoadingMe
            isLoaded: false,
        
        }),
        computed:{
          
        },
        methods:{
            ShowResources(key){
                ShowResource(key)
            },
            Resrouce(){
                getResource().then((res) => {
                    window.console.log("data result",res)
                    if(res.status=="SUCCESS"){
                        this.resources = res.data.Items
                    }
                })
            }
        },
        mounted(){
            this.Resrouce()
        }
    };
</script>

<style scoped>
    .function_footer {
        padding: 15px;
        display: inline-block;
    }

    p {
        color: rgba(0, 0, 0, 0.87);
    }

    .actionBtn {
        height: 47.2px !important;
    }

    .text_tip {
        font-size: 9px;
        line-height: 10px;
    }
    .res_img{
        margin: auto;
        display: block;
        width:100%;
    }
    @media (max-width: 576px) {
    }
</style>

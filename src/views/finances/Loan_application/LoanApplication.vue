<template>
    <v-app>
        <v-container>
            <v-row>
                <v-col cols="12" sm="12">
                    <v-card
                        outlined
                        dense
                        class="pa-4 no_border rounded-sm"
                        color="white">
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-card outlined dense class="no_border">
                                <h2 class="mb-0">{{ $t('loan_application') }}</h2>
                                <v-icon
                                    style="cursor: pointer; color: #333; font-size: 40px;"
                                    class="float-right"
                                >close
                                </v-icon>

                            </v-card>

                            <v-row>
                                <v-col sm="12" cols="12">
                                    <div class="function_content">
                                        <v-form ref="form" v-model="valid" lazy-validation>
                                            <div >
                                                <v-row>
                                                    <v-col sm="4" class="py-0">
                                                        <label>{{ $t('for_the_month_of') }}</label>
                                                        <v-menu
                                                            v-model="menu"
                                                            class="mt-1"
                                                            :close-on-content-click="false"
                                                            max-width="290">
                                                            <template v-slot:activator="{ on,attrs }">
                                                                <v-text-field class="disable_alert my-0 mt-1"
                                                                              readonly
                                                                              outlined
                                                                              append-icon="event"
                                                                              v-on="on"
                                                                              v-bind="attrs"
                                                                              @click:append="menu = true"
                                                                              required/>
                                                            </template>
                                                            <v-date-picker
                                                                :type="'month'"
                                                                @change="menu = false"
                                                                no-title
                                                            />
                                                        </v-menu>
                                                    </v-col>
                                                    <v-col sm="4" class="py-0">
                                                        <label>{{$t('financial_institution')}}</label>
                                                        <v-select class="mt-1" outlined />
                                                    </v-col>
                                                </v-row>
                                                <v-row>
                                                    <v-col sm="2" class="align-center justify-center d-flex py-0">
                                                        <div>
                                                            <v-card @click="ClickSteps(1)" width="44" height="44"
                                                                    outlined dense :color="activeColor1"
                                                                    class="pointer  m_auto no_border align-center justify-center d-flex rounded-circle ">
                                                                <h3 class="mt-2 white--text" style="font-size: 24px">
                                                                    1</h3>
                                                            </v-card>
                                                            <p class="text-uppercase mt-2">{{ $t('your_info') }}</p>
                                                        </div>
                                                    </v-col>
                                                    <v-col sm="2" class="align-center justify-center d-flex py-0">
                                                        <div>
                                                            <v-card @click="ClickSteps(2)" width="44" height="44"
                                                                    outlined dense :color="activeColor2"
                                                                    class="pointer m_auto no_border align-center justify-center d-flex rounded-circle ">
                                                                <h3 class="mt-2 white--text" style="font-size: 24px">
                                                                    2</h3>
                                                            </v-card>
                                                            <p class="text-uppercase mt-2">{{ $t('loan') }}</p>
                                                        </div>
                                                    </v-col>
                                                    <v-col sm="2" class="align-center justify-center d-flex py-0">
                                                        <div>
                                                            <v-card @click="ClickSteps(3)" width="44" height="44"
                                                                    outlined dense :color="activeColor3"
                                                                    class="pointer m_auto  no_border align-center justify-center d-flex rounded-circle ">
                                                                <h3 class="mt-2 white--text" style="font-size: 24px">
                                                                    3</h3>
                                                            </v-card>
                                                            <p class="text-uppercase mt-2">{{ $t('consent') }}</p>
                                                        </div>
                                                    </v-col>
                                              
                                                </v-row>
                                                <v-divider/>
                                                <!-- Body function to input -->
                                                <div v-if="steps===1">
                                                    <YourInfo/>
                                                </div>
                                                <!-- Steps 2 Adjustemnt -->
                                                <div v-else-if="steps===2">
                                                    <Loan/>
                                                </div>
                                                <!-- Steps there -->
                                                <div v-else-if="steps===3">
                                                    <Consent/>
                                                </div>
                                                
                                            </div>
                                        </v-form>
                                    </div>
                                </v-col>
                            </v-row>
                            <div class="function_footer px-4">
                                <!-- Warning Message -->
                                <v-btn class="float-left  btn_cancel">{{ $t('cancel') }}</v-btn>
                                <v-btn class="float-right btn_save_close" @click="nextStpes">
                                    {{ $t(save_next) }}
                                </v-btn>
                                <v-btn v-if="steps !== 1" 
                                       class="float-right mx-3 capitalize white--text" color="primary">
                                    {{ $t('edit') }}
                                </v-btn>
                                <v-btn v-else  class="float-right mx-3 capitalize white--text"
                                       color="primary">{{ $t('save_draft') }}
                                </v-btn>
                            </div>
                        </v-form>
                    </v-card>
                </v-col>
            </v-row>
            <LoadingMe
                :isLoading="showLoading"
                :fullPage="true"
                :myLoading="true"
            />
        </v-container>
    </v-app>
</template>

<script>
import LoadingMe from '@/components/Loading'
export default {
    name: "LoaApplication",
    components: {
        'LoadingMe': LoadingMe,
        // 'month-picker': () => import('@/components/custom_templates/MonthPicker'),
        YourInfo: () => import('./YourInfo'),
        Loan: () => import('./Loan'),
        Consent: () => import('./Consent'),
      
    },
    data: () => ({
        menu: false,
        templates: [],
        month: '',
        showLoading: false,
        valid: '',
        bill_date: "",
        journal_date: '',
        steps: 1,
        reachTopStep: 0,
        check: false,
        save_next: 'save_next',
        activeColor1: "primary",
        activeColor2: "greyText",
        activeColor3: "greyText",
        activeColor4: "greyText",
        isFinal: false,
        // greyText
   
    }),
    methods: {
 
        nextStpes() {
            // if(this.steps !== 3){
            //     if(this.steps  === 1){
            //         this.steps  = 0
            //     }else if(this.steps  === 2){
            //         this.steps  = 1
            //     }else if(this.steps  === 3){
            //         this.steps  = 2
            //     }
            // }
            if (this.steps == 4) {
                this.save_next = "confirm_close"
                return
            } else {
                this.save_next = "save_next"
            }
            this.steps = this.steps + 1
            if (this.reachTopStep <= this.steps) {
                this.reachTopStep = this.steps
            }
            this.stepsCondition(this.steps)
        },
        async ClickSteps(step) {
            if (this.steps === step) {
                return
            }
            if (step > this.reachTopStep) {
                return
            }
            if (step !== 4) {
                this.save_next = "confirm_next"
            } else {
                this.save_next = "confirm_close"
            }
            this.steps = step
            this.stepsCondition(this.steps)
        },
        stepsCondition(val) {
            switch (val) {
                case 1:
                    this.activeColor1 = "primary"
                    this.activeColor2 = "greyText"
                    this.activeColor3 = "greyText"
                    this.activeColor4 = "greyText"
                    break
                case 2:
                    this.activeColor1 = "greyText"
                    this.activeColor2 = "primary"
                    this.activeColor3 = "greyText"
                    this.activeColor4 = "greyText"
                    break
                case 3:
                    this.activeColor1 = "greyText"
                    this.activeColor2 = "greyText"
                    this.activeColor3 = "primary"
                    this.activeColor4 = "greyText"
                    break
                default:
                    this.activeColor1 = "greyText"
                    this.activeColor2 = "greyText"
                    this.activeColor3 = "greyText"
                    this.activeColor4 = "primary"
                    this.isFinal = true
                    this.save_next = "confirm_close"
            }
        },
    },
    async mounted() {
    },
}

</script>

<style scoped>
.function_content {
    padding: 0 12px 12px;
    border-bottom: 0;
    background-color: #fff !important;
}

.m_auto {
    margin: auto;
}

@media (min-width: 1264px) {
    .container {
        /* max-width: 1185px; */
        max-width: 1080px !important;
    }
}

.grayBg {
    background-color: #F8F8F9;
}

@media (max-width: 576px) {
    .mb-6 {
        margin-bottom: 0 !important;
    }
}

.border_grey {
    border: 1px solid #d6d7d8;
}

.attachment_table {
    width: 100%;
}

.my_checkbox input[type=checkbox] + label {
    display: grid;
    grid-template-columns: 20% 80%;
    margin: 0.2em 0px;
    cursor: pointer;
    line-height: 16px;
    padding: 0.2em;
}
</style>

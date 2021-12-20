<template>
    <v-row>
        <v-col>
            <v-row>
                <v-col sm="3" class="align-center justify-center d-flex  py-0">
                    <div style="width: 100%">
                        <v-card @click="ClickSteps(1)" width="44" height="44"
                                outlined dense :color="activeColor1"
                                class="pointer  m_auto no_border align-center justify-center d-flex rounded-circle ">
                            <h3 class="mt-2 white--text" style="font-size: 24px">
                                1</h3>
                        </v-card>
                        <p :class="steps == 1 ? 'active': '' " class="capitalize text-center mt-1 mb-0 py-3 font_18">{{ $t('financing_objectives') }}</p>
                    </div>
                </v-col>
                <v-col sm="3" class="align-center justify-center d-flex py-0 ">
                    <div style="width: 100%">
                        <v-card @click="ClickSteps(2)" width="44" height="44"
                                outlined dense :color="activeColor2"
                                class="pointer m_auto no_border align-center justify-center d-flex rounded-circle ">
                            <h3 class="mt-2 white--text" style="font-size: 24px">
                                2</h3>
                        </v-card>
                        <p :class="steps == 2 ? 'active': '' " class="capitalize mt-1 mb-0 py-3 font_18 text-center">{{ $t('finacing_capacity') }}</p>
                    </div>
                </v-col>
                <v-col sm="3" class="align-center justify-center d-flex py-0">
                    <div style="width: 100%">
                        <v-card @click="ClickSteps(3)" width="44" height="44"
                                outlined dense :color="activeColor3"
                                class="pointer m_auto  no_border align-center justify-center d-flex rounded-circle ">
                            <h3 class="mt-2 white--text" style="font-size: 24px">
                                3</h3>
                        </v-card>
                        <p :class="steps == 3 ? 'active': '' " class="capitalize mt-1 mb-0 py-3 font_18 text-center">{{ $t('financing_options') }}</p>
                    </div>
                </v-col>
            </v-row>

            <div v-show="steps===1" class="px-3"  style="backgound: #fff">
                <StepOne @next="nextStpes"/>
            </div>
            <!-- Steps 2 Adjustemnt -->
            <div v-show="steps===2" class="px-3"   style="backgound: #fff">
                <StepTwo @next="nextStpes"/>
            </div>
            <!-- Steps there -->
            <div v-show="steps===3" class="px-3"   style="backgound: #fff">
                <StepThree @next="nextStpes"/>
            </div>
        </v-col>
    </v-row>
</template>

<script>
// import LoadingMe from '@/components/Loading'
export default {
    name: "TaxReturn",
    components: {
        StepOne: ()=> import('./StepOne'),
        StepTwo: ()=> import('./StepTwo'),
        StepThree: ()=> import('./StepThree'),
    },
    data: () => ({
        menu: false,
        templates: [],
        month: '',
        showLoading: false,
        steps: 1,
        reachTopStep: 0,
        check: false,
        save_next: 'save_next',
        activeColor1: "primary",
        activeColor2: "grey",
        activeColor3: "grey",
        activeColor4: "grey",
        isFinal: false,
 
    }),
    computed: {
   
    },
    watch: {
    },
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
            if (this.steps == 3) {
                this.save_next = "confirm_close"
                return
            } else {
                this.save_next = "confirm_next"
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
            if (step !== 3) {
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
                    this.activeColor2 = "grey"
                    this.activeColor3 = "grey"
                    this.activeColor4 = "grey"
                    break
                case 2:
                    this.activeColor1 = "grey"
                    this.activeColor2 = "primary"
                    this.activeColor3 = "grey"
                    this.activeColor4 = "grey"
                    break
                case 3:
                    this.activeColor1 = "grey"
                    this.activeColor2 = "grey"
                    this.activeColor3 = "primary"
                    this.activeColor4 = "grey"
                    break
                default:
                    this.activeColor1 = "grey"
                    this.activeColor2 = "grey"
                    this.activeColor3 = "grey"
                    this.activeColor4 = "primary"
                    this.isFinal = true
                    this.save_next = "confirm_close"
            }
        },
        numberFormat(value) {
            // window.console.log(this.saleFormContent.decimal,'nimol')
            if (value >= 0) {
                return value.toLocaleString()
            } else {
                return value
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
.active{
    font-weight: bold;
    font-family: 'Niradei-Bold' !important;
    background: #F8F8F9;
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

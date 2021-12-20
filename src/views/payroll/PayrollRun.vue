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
                                <h2 class="mb-0">{{$t('payroll_run')}}</h2>
                                <v-icon
									onclick="window.history.go(-1); return false;"
									style="cursor: pointer; color: #333; font-size: 40px;"
									class="float-right"
                                >close
                                </v-icon>
                            </v-card>
                            <v-row>
                                <v-col sm="12" cols="12">
                                    <div class="function_content">
                                        <v-form ref="form" v-model="valid" lazy-validation>
                                            <v-row>
                                                <v-col sm="2" class="align-center justify-center d-flex ">
                                                    <div>
                                                        <v-card @click="ClickSteps(1)" width="44" height="44" outlined dense :color="activeColor1" class="pointer no_border align-center justify-center d-flex rounded-circle ">
                                                            <h3 class="mt-2 white--text" style="font-size: 24px">1</h3>
                                                        </v-card>
                                                        <p class="text-uppercase mt-2">{{$t('input')}}</p>
                                                    </div>
                                                </v-col>
                                                 <v-col sm="2" class="align-center justify-center d-flex ">
                                                    <div>
                                                        <v-card @click="ClickSteps(2)" width="44" height="44" outlined dense :color="activeColor2" class="pointer ml-8 no_border align-center justify-center d-flex rounded-circle ">
                                                            <h3 class="mt-2 white--text" style="font-size: 24px">2</h3>
                                                        </v-card>
                                                        <p class="text-uppercase text-center mt-2">{{$t('adjustments')}}</p>
                                                    </div>
                                                </v-col>
                                                 <v-col sm="2" class="align-center justify-center d-flex ">
                                                    <div>
                                                        <v-card @click="ClickSteps(3)" width="44" height="44" outlined dense :color="activeColor3" class="pointer ml-1 no_border align-center justify-center d-flex rounded-circle ">
                                                            <h3 class="mt-2 white--text" style="font-size: 24px">3</h3>
                                                        </v-card>
                                                        <p class="text-uppercase mt-2">{{$t('review')}}</p>
                                                    </div>
                                                </v-col>
                                                 <v-col sm="2" class="align-center justify-center d-flex ">
                                                    <div>
                                                        <v-card @click="ClickSteps(4)" width="44" height="44" outlined dense :color="activeColor4" class="pointer ml-2 no_border align-center justify-center d-flex rounded-circle ">
                                                            <h3 class="mt-2 white--text" style="font-size: 24px">4</h3>
                                                        </v-card>
                                                        <p class="text-uppercase mt-2">{{$t('finalize')}}</p>
                                                    </div>
                                                </v-col>
                                            </v-row> 
                                            <v-divider/>
                                            <!-- Body function to input -->
                                            <div v-show="steps==1">
                                                 <Input ref="modal" @headline="refresh" :loadPayrolls="loadPayrolls"/>
                                            </div>
                                            <!-- Steps 2 Adjustemnt -->
                                            <div v-show="steps==2">
                                                <Adjustment ref="adjust" @headline="refresh" :loadPayrolls="loadPayrolls"/>
                                            </div>
                                            <!-- Steps there -->
                                            <div v-show="steps==3">
                                                <Review ref="review" @headline="refresh" :loadPayrolls="loadPayrolls"/>
                                            </div>
                                            <!-- Steps four -->
                                            <div v-show="steps==4">
                                                <Finalize ref="finalize" @headline="refresh" :loadPayrolls="loadPayrolls"/>
                                            </div>
                                        </v-form>
                                    </div>
                                </v-col>
                            </v-row>
                            <div class="function_footer">
								<!-- Warning Message -->
                                <v-btn class="float-left  btn_cancel">{{$t('cancel')}}</v-btn>
                                <v-btn class="float-right btn_save_close" @click="nextStpes(),saveSpets()" >{{$t(save_next)}}</v-btn>
                                <v-btn class="float-right mx-3 white--text" color="third">{{$t('save_draft')}}</v-btn>

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
    // import kendo from '@progress/kendo-ui'
    import LoadingMe from '@/components/Loading'
    import Input from '@/views/payroll/payroll_run/Input'
    import Adjustment from '@/views/payroll/payroll_run/Adjustment'
    import Review from '@/views/payroll/payroll_run/Review'
    import Finalize from '@/views/payroll/payroll_run/Finalize'
	const payrollHandler = require("@/scripts/payrollHandler")
    export default {
        name: "AddProduct",
        components:{
            'LoadingMe': LoadingMe,
            Input,
            Adjustment,
            Review,
            Finalize
		},
        data: () => ({
            templates:[

            ],
            showLoading:false,
            valid: '',
            bill_date: "",
            journal_date: '',
            steps: 0,
            reachTopStep: 0,
            check: false,
            save_next: 'save_next',
            activeColor1: "third",
            activeColor2: "greyText",
            activeColor3: "greyText",
            activeColor4: "greyText",
            isFinal : false,
            // greyText
            check1: false,
            check2: false,
            check3: false,
            payroll_id: '',
            loadPayrolls: [],
        }),
        methods:{
            refresh(data){
                if(data === 201){
                    this.loadPayrollList()
                }
            },
            saveSpets(){
                if(this.steps !== this.payrollList.step){
                    if(this.steps === 1){
                        this.$refs.modal.saveNext()
                    }else if(this.steps === 2){
                        this.$refs.adjust.saveAdjust()
                    }else if(this.steps === 3){
                        this.$refs.review.saveReview()
                    }else if(this.steps === 4){
                         this.$refs.finalize.saveFinalize()
                    }
                }
            },
            nextStpes(){
                if(this.steps !== this.payrollList.step){
                    if(this.steps  === 1){
                        this.steps  = 0
                    }else if(this.steps  === 2){
                        this.steps  = 1
                    }else if(this.steps  === 3){
                        this.steps  = 2
                    }else{
                         this.steps  = this.payrollList.step
                    }
                } 
                if(this.steps == 4){
                    return
                }
                this.steps = this.steps+1
                if(this.reachTopStep <= this.steps){
                    this.reachTopStep = this.steps
                }
                this.stepsCondition(this.steps)
            },
            ClickSteps(step){
                if(this.steps == step){
                    return
                }
                if(step > this.reachTopStep){
                    return
                }
                if(step != 4){
                    this.save_next =  "confirm_next"
                }else{
                    this.save_next = "confirm_close"
                }
                this.steps = step
                this.stepsCondition(this.steps)
            },
            stepsCondition(val){
                switch(val){
                    case 1: 
                        this.activeColor1= "third"
                        this.activeColor2= "greyText"
                        this.activeColor3= "greyText"
                        this.activeColor4= "greyText"
                        break
                    case 2: 
                        this.activeColor1= "greyText"
                        this.activeColor2= "third"
                        this.activeColor3= "greyText"
                        this.activeColor4= "greyText"
                        break
                    case 3: 
                        this.activeColor1= "greyText"
                        this.activeColor2= "greyText"
                        this.activeColor3= "third"
                        this.activeColor4= "greyText"
                        break
                    default: 
                        this.activeColor1= "greyText"
                        this.activeColor2= "greyText"
                        this.activeColor3= "greyText"
                        this.activeColor4= "third"
                        this.isFinal = true
                        this.save_next = "confirm_close"
                  }
            },
            loadPayrollList(){
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        payrollHandler.getPayroll(this.$route.params.id).then(res => {
                            this.showLoading = true;
                            if(res.data.statusCode === 200){
                                this.showLoading = false;
                                const result = res.data.data[0]
                                this.payrollList = result               
                                this.loadPayrolls = result.payrollList
                                this.nextStpes()
                            }
                        })
                    }, 300);
                })
            },
        },
        mounted(){
            this.loadPayrollList()
        },
    }

</script>

<style scoped>
    .function_content {
        padding: 0 25px 25px;
        background-color: #fff !important;
    }

    @media (min-width: 1264px) {
        .container {
            /* max-width: 1185px; */
            max-width: 1080px !important;
        }
    }
    .grayBg{
        background-color: #f3f8ff;
    }
    @media (max-width: 576px) {
        ..mb-6 {
            margin-bottom: 0 !important;
        }
    }
 
    .border_grey{
         border: 1px solid #d6d7d8;
    }
    .attachment_table{
        width:100%;
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
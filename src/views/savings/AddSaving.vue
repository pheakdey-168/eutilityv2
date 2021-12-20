<template>
    <v-app>
        <v-container>
            <v-row>
                <v-col cols="12" sm="12">
                    <v-card outlined dense class="pa-4 no_border rounded-sm" color="white">
                        <v-row>
                            <v-col class="bigSide py-0" sm="12" cols="12" style="transition: .3s ease-in;"
                                   :class="{'hide_big_bar_class':isHideBar}">
                                <v-form ref="form" v-model="valid" lazy-validation>
                                    <div class="function_header">
                                        <h2>{{$t('add_saving_account')}}</h2>
                                        <v-icon
                                            onclick="window.history.go(-1); return false;"
                                            style="cursor: pointer; color: #333; font-size: 40px;"
                                            class="float-right"
                                        >close
                                        </v-icon>
                                    </div>
                                    <div class="">
                                        <!-- Form -->
                                        <v-form
                                            ref="form"
                                            v-model="valid"
                                            lazy-validation>
                                            <v-col sm="12" col="12">
                                                <v-row>
                                                    <v-col sm="6" cols="12" class="pb-0 pl-0">
                                                        <label class="label mb-0">{{
                                                                $t('registered_date')
                                                            }}</label>
                                                        <app-datepicker
                                                            class="mt-1"
                                                            :initialDate="saving.issuedDate"
                                                            @emitDate="saving.issuedDate = $event"/>
                                                        

                                                        <v-radio-group
                                                            height=""
                                                            v-model="selectMember"
                                                            @change="selectMemberChange" row
                                                            class="mt-1 mb-0 check-box">
                                                            <v-radio
                                                                color="red"
                                                                :label="$t('member')"
                                                                value="isMember">
                                                            </v-radio>
                                                            <v-radio
                                                                color="red"
                                                                :label="$t('customer')"
                                                                value="isCustomer">
                                                            </v-radio>
                                                        </v-radio-group>
                                                        <div
                                                                class="kendo_dropdown_custom  mt-1 pb-2">
                                                            <v-autocomplete
                                                                v-model="saving.member"
                                                                :items="memberData"
                                                                item-text="numberName"
                                                                return-object
                                                                outlined
                                                            ></v-autocomplete>
                                                        </div>

                                                        <label v-show="isLimit" class="label mb-0">{{$t('number_of_month')}}</label>
                                                        <v-text-field
                                                            class="mt-1"
                                                            v-model="saving.numberOfMonth"
                                                            outlined
                                                            v-show="isLimit"
                                                        />
                                                        <label class="label  mb-0">{{$t('saving_products')}}</label>
                                                        <v-select
                                                            class="mt-1"
                                                            :items="savingProducts"
                                                            placeholder="select"
                                                            item-text="name"
                                                            tage="select"
                                                            v-on:change="savingProductChange"
                                                            v-model="saving.savingProduct"
                                                            return-object
                                                            outlined/>
                                                        <label class="label mb-0">{{$t('saving_account_num')}}</label>
                                                        <v-text-field
                                                            class="mt-1"
                                                            v-model="saving.number"
                                                            outlined
                                                            disabled
                                                            :rules="[v => !!v || 'Number is required']"
                                                        />
                                                        
                                                        
                                                    </v-col>
                                                    <v-col sm="6" cols="12" class="pb-0 function_content pa-3">
                                                        <v-card class="pa-3 no-boxshadow d-flex justify-space-between align-center"
                                                                min-height="50px" color="primary">
                                                            <h3 style="font-size: 18px" class="text-white text-uppercase">
                                                            {{ $t('saving_type') }}:</h3>
                                                            <h3 class="text-bold float-right text-white" style="font-size: 22px">
                                                            {{ saving.savingType ? saving.savingType.name : ''}}</h3>
                                                            
                                                        </v-card>
                                                        <v-simple-table>
                                                            <template v-slot:default>
                                                                <tbody>
                                                                    <tr>
                                                                        <td class="text-left pr-0">{{
                                                                            $t('interest_rate')
                                                                        }}
                                                                        </td>
                                                                        <td class="text-center">:</td>
                                                                        <td class="text-right">
                                                                            {{ saving.savingInterest ? saving.savingInterest.name : ''}}
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td class="text-left pr-0">{{ $t('day_year') }}</td>
                                                                        <td class="text-center">:</td>
                                                                        <td class="text-right">
                                                                        {{ saving.daysInYear ? saving.daysInYear.name : ''}}
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td class="text-left pr-0">{{
                                                                            $t('currency')
                                                                        }}
                                                                        </td>
                                                                        <td class="text-center">:</td>
                                                                        <td class="text-right">
                                                                            {{ saving.currency ? saving.currency.code : ''}}
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td class="text-left pr-0">{{
                                                                            $t('rate')
                                                                        }}
                                                                        </td>
                                                                        <td class="text-center">:</td>
                                                                        <td class="text-right">
                                                                            {{ rate }}
                                                                        </td>
                                                                    </tr>

                                                                </tbody>
                                                            </template>
                                                        </v-simple-table>
                                                    </v-col>
                                                </v-row>
                                            </v-col>
                                        </v-form>
                                    </div>
                                    <div class="function_footer">
                                        <v-alert type="warning"
                                                 v-model="alert"
                                                 dismissible>
                                            <span v-html="errorMessage"/>
                                        </v-alert>
                                        <v-btn outlined color="#494846" class="float-left text-capitalize"
                                               @click="cancel">{{ $t('cancel') }}
                                        </v-btn>
                                        <v-btn color="secondary" class="float-right white--text text-capitalize"
                                               @click="saveClose">
                                            {{ $t('save_close') }}
                                        </v-btn>
                                        <v-btn color="primary"
                                               class="float-right  white--text text-capitalize mr-3 "
                                               @click="saveNew">
                                            {{ $t('save_new') }}
                                        </v-btn>
                                    </div>
                                </v-form>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>
            <LoadingMe
                :isLoading="showLoading"
                :fullPage="true"
                :myLoading="true"
                :alertMessage="loadingAlert"
                :color="loadingColorAlert"
                :alertText="loadingTextAlert"/>
        </v-container>
    </v-app>
</template>

<script>
import DatePickerComponent from '@/components/custom_templates/DatePickerComponent'
// import {uuid} from 'vue-uuid'
// import {DropDownList} from '@progress/kendo-vue-dropdowns'
import SavingAccountModel from '@/scripts/model/SavingAccount'

const memberHandler = require("@/scripts/memberHandler")
const customerHandler = require("@/scripts/customerHandler")
const loanHandler = require("@/scripts/loanHandler")

// const $ = require("jquery")
const textField = 'name'
const keyField = 'id'
const customerItem = {[textField]: 'Select Customer...', [keyField]: null}
const memberItem = {[textField]: 'Select Member...', [keyField]: null}
const emptyItem = {[textField]: 'loading ...'}
const currencyHandler = require("@/scripts/currency/handler/currencyHandler")

const pageSize = 10
const loadingData = [];
while (loadingData.length < pageSize) {
    loadingData.push({...emptyItem})
}
const store = require("@/institute.js")
const {cookies} = store.default.state
import {dataStore} from '@/observable/store'

// journal
import {UserModel} from "@/scripts/model/AppModels"
export default {
    name: "AddSavingAccount",
    props: ['id'],
    components: {
        LoadingMe: () => import(`@/components/Loading`),
        'app-datepicker': DatePickerComponent,
        // 'dropdownlist': DropDownList
    },
    data: () => ({
        isHideBar: false,
        showLoading: false,
        loadingAlert: false,
        loadingColorAlert: '',
        loadingTextAlert: '',
        dialogM2: false,
        alert: false,
        addressType: ['Billing', 'Delivery', 'Contact'],
        deliveryMethod: [],
        genderItem: customerHandler.gender(),
        valid: true,
        skip: 0,
        tempSkip: null,
        total: 0,
        filter: '',
        textField: 'name',
        dataItemKey: 'id',
        baseCurrencyCode: '',
        rate: '',
        ////
        selectMember: 'isMember',
        isMember: true,
        isCustom: false,
        saving: new SavingAccountModel({}),
        saveOption: '',
        //customer
        cusBaseUrl: customerHandler.search(),
        customerList: [],
        customerItem: customerItem,
        customerfilter: '',
        //member
        memBaseUrl: memberHandler.search(),
        memberList: [],
        memberItem: memberItem,
        memberfilter: '',
        memberData: [],
        //
        savingProducts: [],
        dayInYears: [
            {id: 365, name: 365},
            {id: 366, name: 366}
        ],
        savingTypes: [
            {id: 1, name: "បញ្ញើសន្សំធម្មតា"},
            {id: 2, name: "បញ្ញើសន្សំមានការកំណត់"}
        ],
        isSaveNew: false,
        isLimit: false,
        pin: dataStore.pin
    }),
    methods: {
        errorMessage() {
        },
        async loadSavingProduct() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    loanHandler.savingGet().then(res => {
                        this.savingProducts = res.data.data
                        // window.console.log(res, 'member type')
                        if (this.savingProducts.length > 0) {
                            this.saving.savingProduct = this.savingProducts[0]
                            this.savingProductChange()
                        }
                    })
                }, 300);
            })
        },
        savingProductChange() {
            let s = this.saving.savingProduct
            if(s.hasOwnProperty('savingType')){
                this.saving.savingType = s.savingType
                this.isLimit = false
                if(this.saving.savingType.id === 2){
                    this.isLimit = true
                }
            }
            if(s.hasOwnProperty('savingInterest')){
                this.saving.savingInterest = s.savingInterest
            }
            if(s.hasOwnProperty('daysInYear')){
                this.saving.daysInYear = s.daysInYear
            }
            if(s.hasOwnProperty('currency')){
                this.saving.currency = s.currency
                this.loadTransactionRate()
            }
            if(s.hasOwnProperty('savingInterest')){
                this.saving.interestRate = s.savingInterest
            }
            this.getLastNumber()
        },
        async loadTransactionRate() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    const date = new Date(this.saving.issuedDate).toISOString().substr(0, 10)
                    let code = this.saving.currency.code
                    if (code !== undefined || code !== '') {
                        this.showLoading = true
                        currencyHandler.getLastExchangeRateByDate(date, code).then(res => {
                            if (res.data.statusCode === 200) {
                                this.showLoading = false
                                const response = res.data.data[0]
                                this.rate = response.rate
                            }
                        })
                    }
                }, 300)
            })
        },
        async getLastNumber() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    let data = {
                        module: 'prod',
                        pk: 'ac-sav-',
                        productId: this.saving.savingProduct.id,
                        lastSk: '-ac-sav'
                    }
                    memberHandler.getLastNumber(data).then(res => {
                        window.console.log(res.data.data, 'last number')
                        this.saving.lastNumber = res.data.data.lastNumber
                        this.generateNumber()
                    }).catch(e => {
                        this.$snotify.error('Something went wrong')
                        this.errors.push(e)
                    })
                }, 300);
            })
        },
        generateNumber(){
            window.console.log(this.saving.savingType.id, 'saving type')
            let newNum = ''
            let abbr = this.saving.savingProduct.abbr+'-SAC'
            let lnum = this.zeroPad(this.saving.lastNumber, 6)
            window.console.log(abbr, lnum, 'number')
            newNum = abbr+lnum
            this.saving.abbr = abbr
            this.saving.number = newNum
        },
        zeroPad(num, places) {
            return String(num).padStart(places, '0')
        },
        //customer
        onCustomerChange(event) {
            const value = event.value
            if (value && value[textField] === emptyItem[textField]) {
                return;
            }
            this.saving.customer = value
        },
        onCustomerFilterChange(event) {
            const filter = event.filter.value
            this.customerRequestData(0, filter, this.cusBaseUrl)
            this.customerfilter = filter
        },
        customerRequestData(skip, filter, baseUrl) {
            // window.console.log(baseUrl, 'requ')
            const url = baseUrl +
                `?filter=${filter}`
            this.requestStarted = true;
            fetch(url)
                .then((response) => {
                    return response.json()
                })
                .then(this.customerAfterFetch)
        },
        customerAfterFetch(json) {
            this.customerList = json.data
        },
        //member
        // selectMemberChange(){
        //     if(this.selectMember == 'isMember'){
        //         this.saving.customer = {}
        //     }else{
        //         this.saving.member = {}
        //     }
        // },
        //member
        selectMemberChange() {
            if (this.selectMember == 'isMember') {
                this.saving.isMember = 1
                this.memberData = this.memberList
            } else {
                this.saving.isMember = 2
                this.memberData = this.customerList
            }
            this.saving.member = {}
        },
        onMemberChange(event) {
            const value = event.value
            if (value && value[textField] === emptyItem[textField]) {
                return;
            }
            this.saving.member = value
        },
        onMemberFilterChange(event) {
            const filter = event.filter.value
            this.memberRequestData(0, filter, this.memBaseUrl)
            this.memberfilter = filter
        },
        memberRequestData(skip, filter, baseUrl) {
            // window.console.log(baseUrl, 'requ')
            const url = baseUrl +
                `?filter=${filter}`
            this.requestStarted = true;
            fetch(url)
                .then((response) => {
                    return response.json()
                })
                .then(this.memberAfterFetch)
        },
        memberAfterFetch(json) {
            this.memberList = json.data
        },
        //function
        cancel() {
            window.history.go(-1)
        },
        addEmpty(){
            this.saving = new SavingAccountModel({})
            this.saving.savingProduct = this.savingProducts[0]
            this.getLastNumber()
            this.savingProductChange()
            this.saving.member = {}
            this.selectMember = 'isMember'
        },
        saveNew() {
            this.isSaveNew = true
            this.saveOption = 'saveNew'
            this.save()
        },
        saveClose() {
            this.isSaveNew = false
            this.saveOption = 'saveClose'
            this.save()
        },
        async save() {
            if (!this.$refs.form.validate()) {
                this.$refs.form.validate()
                return
            }
            this.saving.isMember = 1
            if(this.selectMember != 'isMember'){
                this.saving.isMember = 2
            }
            if(Object.keys(this.saving.member).length == 0){
                this.$snotify.error('Please select a member or customer')
                return
            }
            this.showLoading = true
            this.saving.userPin = this.pin
            this.saving.saveOption = this.saveOption
            this.saving.user = new UserModel(cookies.user)
            this.saving.abbrNumber = this.saving.abbr.toString()+this.saving.number
            if(!this.isLimit){
                this.saving.numberOfMonth = 0
            }
            memberHandler.createSavingAccount(new SavingAccountModel(this.saving)).then(response => {
                this.showLoading = false
                if (response.data.statusCode === 201) {
                    this.$snotify.success('Successfully')
                    if(this.isSaveNew == true){
                        this.addEmpty()
                    }else{
                        window.history.go(-1);
                    }
                }
            }).catch(e => {
                this.$snotify.error('Something went wrong')
                this.errors.push(e)
            })
        },
        async loadLessMember() {
            new Promise(resolve => {
                resolve('resolved');
                setTimeout(() => {
                    this.showLoading = true
                    memberHandler.loadLessMember().then(res => {
                        this.showLoading = false
                        this.memberList = res.data.data
                        this.memberData = this.memberList
                    })
                }, 500)
            })
        },
        async loadLessCustomer() {
            new Promise(resolve => {
                resolve('resolved');
                setTimeout(() => {
                    this.showLoading = true
                    memberHandler.loadLessCustomer().then(res => {
                        this.showLoading = false
                        this.customerList = res.data.data
                    })
                }, 500)
            })
        },
    },
    watch: {
        id() {
            // this.product = this.selectedProduct
            // window.console.log(this.id, 'watch')
            // if (this.id !== undefined) {
            //   this.loadSingleCustomer()
            // }
        }
    },
    mounted: async function () {
        await this.loadSavingProduct()
    },
    created: async function () {
        await this.loadLessMember()
        await this.loadLessCustomer()
    },
    computed: {},
    destroyed() {
    },
};
</script>

<style scoped>
.k-dropdown {
    width: 100%;
    margin-top: 4px;
}


.function_content .label {
    margin-bottom: 10px;
    display: inline-block;
}


.color_green {
    color: #03b154;
}

@media (min-width: 1264px) {
    .container {
        /* max-width: 1250px; */
        max-width: 1080px;
    }
}

@media (max-width: 576px) {
    .pt-6.col-sm-5.col-12 {
        padding-top: 0 !important;
    }

    .code_text {
        width: 100%;
    }

    .phone_no_pt {
        padding-top: 0 !important;
    }

    .select_template,
    .save_option {
        margin-bottom: 10px;
    }
}


.exchange-table.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
    font-family: 'Krasar-Bold', serif;
    color: #000 !important;
    border-top: 1px solid #000 !important;
    border-bottom: 1px solid #000 !important;
    font-size: 15px !important;
}

.exchange-table.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > td {
    color: #000 !important;
    padding: 5px !important;
    border-bottom: 1px solid #000 !important;
}

.exchange-table.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:last-child td {
    border-bottom: 1px solid #000 !important;
}

.v-slide-group__content {
    background-color: #F8F8F9 !important;
}

.v-tab--active {
    background-color: #ffffff !important;
    border-left: none;
}

.function_content {
    padding: 0;
    background-color: #F8F8F9;
}
.check-box .v-input__slot {
    margin-bottom: 0px!important;}

</style>

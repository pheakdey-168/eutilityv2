<template>
    <v-app>
        <v-container>
            <v-row>
                <v-col cols="12" sm="12">
                    <v-card
                        outlined
                        dense
                        class="pa-4 no_border rounded-sm"
                        color="white"
                    >
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-card outlined dense class="no_border">
                                <h2 class="mb-0">{{ $t("employee") }}</h2>
                                <v-icon
                                    onclick="window.history.go(-1); return false;"
                                    style="cursor: pointer; color: #333; font-size: 40px;"
                                    class="float-right"
                                >close
                                </v-icon>
                            </v-card>

                            <v-card outlined dense class="px-3 no_border" color="grayBg" height="253px">
                                <v-row>
                                    <v-col sm="4" cols="12" class="pb-0">
                                        <label class="label">{{ $t('employee_id') }}</label>
                                        <v-text-field class="mt-1"
                                                      outlined
                                                      tage="Employee Id"
                                                      v-model="employee.employeeId"
                                                      :placeholder="$t('employee_id')"
                                                      required/>

                                        <label class="label">{{ $t('first_name') }}</label>
                                        <v-text-field class="mt-1"
                                                      :placeholder="$t('first_name')"
                                                      v-model="employee.firstName"
                                                      outlined
                                                      tage="First Name"
                                                      required/>

                                        <label class="label">{{ $t('last_name') }}</label>
                                        <v-text-field class="mt-1"
                                                      :placeholder="$t('last_name')"
                                                      v-model="employee.lastName"
                                                      tage="Last Name"
                                                      outlined
                                                      required/>
                                    </v-col>
                                    <v-col sm="4" cols="12" class="pb-0">
                                        <label class="label">{{ $t('first_name_locale') }}</label>
                                        <v-text-field class="mt-1"
                                                      :placeholder="$t('first_name')"
                                                      v-model="employee.firstNameLocale"
                                                      outlined
                                                      tage="First Name English"
                                                      required/>

                                        <label class="label">{{ $t('last_name_locale') }}</label>
                                        <v-text-field class="mt-1"
                                                      :placeholder="$t('last_name')"
                                                      v-model="employee.lastNameLocale"
                                                      outlined
                                                      tage="Last Name English"
                                                      required/>

                                        <label class="label">{{ $t('date_of_birth') }}</label>
                                        <app-datepicker
                                            :initialDate="employee.dob"
                                            @emitDate="registeredDate = $event"/>
                                    </v-col>
                                    <v-col sm="4" cols="12">
                                        <label class="label">{{ $t('gender') }}</label>
                                        <v-select
                                            :items="genderItem"
                                            item-text="name"
                                            class="mt-1"
                                            item-value="name"
                                            tage="Gender"
                                            v-model="employee.gender"
                                            placeholder="Male"
                                            outlined>
                                        </v-select>

                                        <label class="label">{{ $t('type_of_employee') }}</label>
                                        <v-select  class="mt-1"
                                            :items="employeeType"
                                            item-value="id"
                                            item-text="name"
                                            return-object
                                            tage="Employee Type"
                                            v-model="employee.employeeType"
                                            placeholder="Full-time"
                                            outlined>
                                        </v-select>
                                        <v-row class="my_checkbox">
                                            <v-col sm="12" cols="12" class="py-0">
                                                <label class="label  mb-0">{{ $t('identity') }}</label>
                                                <v-row>
                                                    <v-col sm="6" cols="6" class="pb-0 pt-1 pr-1">
                                                        <v-select
                                                            :items="identityType"
                                                            tage="Gender"
                                                            v-model="employee.identityType"
                                                            placeholder="Male"
                                                            outlined>
                                                        </v-select>
                                                    </v-col>
                                                    <v-col sm="6" cols="12" class="pb-0 pt-1 pl-1">
                                                        <v-text-field
                                                            :placeholder="$t('identification_no')"
                                                            v-model="employee.identityId"
                                                            outlined
                                                            required/>
                                                    </v-col>
                                                </v-row>
                                            </v-col>

                                        </v-row>
                                    </v-col>
                                </v-row>
                            </v-card>

                            <v-card outlined dense color="white pl-3">
                                <v-row>
                                    <v-col sm="4" cols="12" class="pb-0 pr-1 my_checkbox">
                                        <v-row class=" border_grey mr-2">
                                            <v-col sm="12" class="my_box_min_heihgt pb-0">
                                                <h2 class="mb-2 font_20 ">
                                                    {{ $t("contact_information") }}
                                                </h2>
                                                <v-row>
                                                    <v-col sm="12" cols="12" class="py-0">
                                                        <label class="label">{{ $t('address') }}</label>
                                                        <v-text-field class="mt-1"
                                                                      outlined
                                                                      v-model="employee.address"
                                                                      required/>

                                                        <label class="label">{{ $t('phone_number') }}</label>
                                                        <v-text-field class="mt-1"
                                                                      v-model="employee.phone"
                                                                      outlined
                                                                      required/>

                                                        <label class="label">{{ $t('email') }}</label>
                                                        <v-text-field class="mt-1"
                                                                      outlined
                                                                      v-model="employee.email"
                                                                      required/>
                                                    </v-col>
                                                </v-row>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                    <v-col sm="4" cols="12" class="px-2 my_checkbox">
                                        <v-row class=" border_grey mr-2">
                                            <v-col sm="12" class="my_box_min_heihgt  pb-0">
                                                <h2 class="mb-0 font_20">{{ $t("default_account") }}</h2>
                                                <v-row>
                                                    <v-col sm="12" cols="12" class="pt-1">
                                                    </v-col>
                                                    <v-col sm="12" cols="12" class="pt-0">
                                                        <label class="label">{{ $t('salary_account') }}</label>
                                                        <v-select class="mt-1"
                                                            v-model="mAccSalary"
                                                            :items="accSalaries"
                                                            item-value="id"
                                                            :item-text="item =>`${item.number} - ${item.name}`"
                                                            return-object
                                                            placeholder="Account Salary"
                                                            tage="Account Salary"
                                                            outlined>
                                                        </v-select>

                                                        <label
                                                            class="label">{{
                                                                $t('salary_advance_account')
                                                            }}</label>
                                                        <v-select class="mt-1"
                                                            v-model="mAccAdvanceSalary"
                                                            :items="accAdvanceSalaries"
                                                            item-value="id"
                                                            :item-text="item =>`${item.number} - ${item.name}`"
                                                            return-object
                                                            placeholder="Account Advance Salary"
                                                            tage="Account Advance Salary"
                                                            outlined>
                                                        </v-select>

                                                        <label
                                                            class="label">{{
                                                                $t('payroll_liabilities')
                                                            }}</label>
                                                        <v-select class="mt-1"
                                                            v-model="mAccPayroll"
                                                            :items="accPayroll"
                                                            item-value="id"
                                                            :item-text="item =>`${item.number} - ${item.name}`"
                                                            return-object
                                                            placeholder="Account Payroll Liabilities"
                                                            tage="Account Payroll Liabilities"
                                                            outlined>
                                                        </v-select>

                                                    </v-col>
                                                </v-row>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                    <v-col sm="4" cols="12" class="pl-1">
                                        <v-row class=" border_grey mr-0">
                                            <v-col sm="12" class="my_box_min_heihgt  pb-0">
                                                <h2 class="mb-2 font_20">
                                                    {{ $t("employee_image") }}
                                                </h2>
                                                <v-row>
                                                    <v-col sm="12" cols="12" class="py-0">
                                                        <p class="color_grey font_14">
                                                            {{ $t("these_image_of_the_employee") }}
                                                        </p>
                                                    </v-col>
                                                    <v-col sm="12" cols="12" class="py-0">
                                                        <v-img
                                                            width="100px"
                                                            height="150px"
                                                            :src="src"/>
                                                        <label>
                                                            <input
                                                                type="file"
                                                                name="image"
                                                                id="image"
                                                                :rules="fileSizeRules"
                                                                accept=".png, .jpg, .jpeg"
                                                                ref="fileupload"
                                                                @change="onFileChange"/>
                                                        </label>
                                                    </v-col>
                                                </v-row>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                </v-row>
                                <!-- column 2 -->
                                <v-row class="border_grey mr-0 mb-3">
                                    <v-col sm="12" cols="12" class="pb-0">
                                        <h2 class="mb-2 font_20 float-left">
                                            {{ $t("payroll_information") }}
                                        </h2>
                                        <p class="mb-0 float-left ml-10 color_grey mt-2">
                                            {{ $t("payroll_information_desc") }}</p>
                                    </v-col>
                                    <v-col sm="4" cols="12" class="pb-0">
                                        <label class="label">{{ $t('country') }}</label>
                                        <v-select class="mt-1"
                                            :items="countries"
                                            item-text="country"
                                            item-value="abbreviation"
                                            return-object
                                            tage="Nationality"
                                            v-model="employee.country"
                                            placeholder="Cambodian"
                                            outlined>
                                        </v-select>

                                        <label class="label">{{ $t('nationality') }}</label>
                                        <v-select class="mt-1"
                                            :items="nationality"
                                            item-text="nameEn"
                                            item-value="alpha3Code"
                                            return-object
                                            tage="Nationality"
                                            v-model="employee.nationality"
                                            placeholder="Cambodian"
                                            outlined>
                                        </v-select>

                                        <label class="label">{{ $t('nature_employee') }}</label>
                                        <v-select class="mt-1"
                                            :items="natureEmployee"
                                            item-text="nameEn"
                                            item-value="alpha3Code"
                                            return-object
                                            tage="NatureEmployee"
                                            v-model="employee.natureEmployee"
                                            placeholder="Nature Employee"
                                            outlined>
                                        </v-select>
                                    </v-col>
                                    <v-col sm="4" cols="12" class="pb-0">
                                        <label class="label">{{ $t('marital_status') }}</label>
                                        <v-select class="mt-1"
                                            :items="maritalStatus"
                                            item-text="name"
                                            item-value="id"
                                            return-object
                                            tage="MaritalStatus"
                                            v-model="employee.maritalStatus"
                                            placeholder="Cambodian"
                                            outlined>
                                        </v-select>

                                        <label class="label">{{ $t('no_of_children') }}</label>
                                        <v-text-field class="mt-1"
                                            outlined
                                            v-model="employee.noOfChildren"
                                            required/>
                                        <label class="label">{{ $t('payment_method') }}</label>
                                        <v-select class="mt-1"
                                            :items="paymentMethod"
                                            item-text="nameEn"
                                            tage="PaymentMethod"
                                            v-model="employee.paymentMethod"
                                            placeholder="Payment Method"
                                            outlined>
                                        </v-select>
                                    </v-col>
                                    <v-col sm="4" cols="12" class="pb-0">
                                        <label class="label">{{ $t('bank_name') }}</label>
                                        <v-select class="mt-1"
                                            :items="banks"
                                            item-text="name"
                                            item-value="id"
                                            return-object
                                            tage="bank name"
                                            v-model="employee.bank"
                                            placeholder="name"
                                            outlined>
                                        </v-select>
                                        <label class="label">{{ $t('bank_account') }}</label>
                                        <v-text-field class="mt-1"
                                            outlined
                                            v-model="employee.bankAccount"
                                            required/>
                                        <label class="label">{{ $t('payment_period') }}</label>
                                        <v-select class="mt-1"
                                            :items="paymentPeriod"
                                            item-text="name"
                                            item-value="id"
                                            return-object
                                            tage="PaymentPeriod"
                                            v-model="employee.paymentPeriod"
                                            placeholder="Monthly"
                                            outlined>
                                        </v-select>
                                    </v-col>
                                </v-row>
                            </v-card>
                            <v-divider/>
                            <v-card outlined dense class="no_border function_footer">
                                <v-btn
                                    color="black"
                                    class="text-capitalize rounded-pill white--text float-left">{{ $t("cancel") }}
                                </v-btn>
                                <v-btn class="float-right text-capitalize rounded-pill white--text" color="green" @click="onSaveClose">
                                    {{ $t('save_close') }}
                                </v-btn>

                                <v-btn class="float-right text-capitalize rounded-pill white--text mr-3" color="third">
                                    {{ $t('save_new') }}
                                </v-btn>
                            </v-card>
                        </v-form>
                    </v-card>
                </v-col>
            </v-row>
            <LoadingMe :isLoading="showLoading" :fullPage="true" :myLoading="true"/>
        </v-container>
    </v-app>
</template>

<script>

import DatePickerComponent from '@/components/custom_templates/DatePickerComponent'

const accountHandler = require("@/scripts/accountHandler")
const employeeHandler = require("@/scripts/employeeHandler")
const otherHandler = require("@/scripts/otherHandler")
import EmployeeModel from '@/scripts/model/Employee'

const employeeModel = new EmployeeModel({})

export default {
    name: "AddEmployee",
    props: ['id'],
    components: {
        LoadingMe: () => import(`@/components/Loading`),
        'app-datepicker': DatePickerComponent,
    },
    data: () => ({
        isEdit: false,
        genderItem: otherHandler.gender(),
        maritalStatus: otherHandler.maritalStatus(),
        paymentPeriod: otherHandler.paymentPeriod(),
        employeeType: otherHandler.employeeType(),
        banks: otherHandler.bank(),
        nationality: [],
        countries: [],
        identityType: ['ID Card', 'Passport', 'TID'],
        natureEmployee:[
            'Resident',
            'No-Resident Salary'
        ],
        employee: employeeModel,
        mAccSalary: {},
        accSalaries: [],
        mAccAdvanceSalary: {},
        accAdvanceSalaries: [],
        // LoadingMe
        showLoading: false,
        loadingAlert: false,
        loadingColorAlert: '',
        loadingTextAlert: '',
        src: '',
        imgFile: '',
        bill_date: '',
        alert: false,
        deposite: 1000,
        fileSizeRules: [
            files => !files || !files.some(file => file.size > 1024 * 1024) || 'Image size should be less than 1 MB!'
        ],
        files: [],
        // Form validation
        valid: true,
        journal_types: [],
        suppliers_item: [],
        paymentMethod: [
            'Cash Payment',
            'Bank Payment'
        ],
        expense: [
            'Equal',
            'weighted'
        ],
        registeredDate: new Date().toISOString().substr(0, 10),
        col_expand: 9,
        col_hide: 3,
        isHideBar: false,
        mAccPayroll: {},
        accPayroll: []
    }),
    methods: {
        close(data) {
            if (this.$route.params.query !== undefined) {
                window.history.go(-1)
            } else {
                this.$router.push({
                    name: 'Payroll', params: {
                        data: data
                    }
                })
            }
        },
        onFileChange(e) {
            // const file = e.target.files[0];
            let input = e.target
            // Ensure that you have a file before attempting to read it
            if (input.files && input.files[0]) {
                if (input.files[0].size > 1024 * 1024) {
                    e.preventDefault();
                    alert('File too big (> 1MB)');
                    this.src = ''
                    this.imgFile = ''
                    this.$refs.fileupload.value = null;
                } else {
                    // create a new FileReader to read this image and convert to base64 format
                    let reader = new FileReader()
                    // Define a callback function to run, when FileReader finishes its job
                    reader.onloadend = (e) => {
                        // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
                        // Read image as base64 and set to imageData
                        this.imgFile = e.target.result
                    }
                    // Start the reader job - read file as a data url (base64 format)
                    reader.readAsBinaryString(input.files[0])
                    // this.url = input.files[0]
                    this.src = URL.createObjectURL(e.target.files[0])
                }
            }
        },
        async loadCountry() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    this.showLoading = true
                    otherHandler.country().then(res => {
                        this.showLoading = false
                        this.countries = res
                        if (this.countries.length > 0) {
                            this.employee.country = this.countries[0]
                            this.employee.maritalStatus = this.maritalStatus[0]
                            this.employee.paymentPeriod = this.paymentPeriod[0]
                            this.employee.employeeType = this.employeeType[0]
                            this.employee.identityType = this.identityType[0]
                            this.employee.gender = this.genderItem[0]
                        }
                    }).catch()
                    {
                        this.showLoading = false
                    }
                }, 300);
            })
        },
        async loadNationality() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    otherHandler.nationality().then(res => {
                        this.showLoading = false
                        this.nationality = res
                        if (this.nationality.length > 0) {
                            this.employee.nationality = this.nationality[0]
                        }
                    })
                }, 300);
            })
        },
        async loadAccount() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    accountHandler.getAll().then(res => {
                        this.showLoading = false
                        //Receivable Account
                        this.accAdvanceSalaries = res.filter(m => m.account_type.number === 6).map(item => {
                            return {
                                id: item.uuid,
                                uuid: item.uuid,
                                name: item.name,
                                local_name: item.local_name,
                                number: item.number,
                                is_taxable: item.is_taxable,
                                banhjiAccCode: item.banhjiAccCode,
                                group_code: item.group_code,
                                parent_account: item.parent_account,
                                type_code: item.type_code,
                                account_type: item.account_type
                            }
                        })
                        if (this.accAdvanceSalaries.length > 0) {
                            this.mAccAdvanceSalary = this.accAdvanceSalaries[0]
                        }
                        this.accSalaries = res.filter(m => m.account_type.number === 34).map(item => {
                            return {
                                id: item.uuid,
                                uuid: item.uuid,
                                name: item.name,
                                local_name: item.local_name,
                                number: item.number,
                                is_taxable: item.is_taxable,
                                banhjiAccCode: item.banhjiAccCode,
                                group_code: item.group_code,
                                parent_account: item.parent_account,
                                type_code: item.type_code,
                                account_type: item.account_type
                            }
                        })
                        if (this.accSalaries.length > 0) {
                            this.mAccSalary = this.accSalaries[0]
                        }

                        this.accPayroll = res.filter(m => m.account_type.number === 22).map(item => {
                            return {
                                id: item.uuid,
                                uuid: item.uuid,
                                name: item.name,
                                local_name: item.local_name,
                                number: item.number,
                                is_taxable: item.is_taxable,
                                banhjiAccCode: item.banhjiAccCode,
                                group_code: item.group_code,
                                parent_account: item.parent_account,
                                type_code: item.type_code,
                                account_type: item.account_type
                            }
                        })
                        if (this.accPayroll.length > 0) {
                            this.mAccPayroll = this.accPayroll[0]
                        }
                    })
                }, 300);
            })
        },
        async onSaveClose() {
            if (!this.$refs.form.validate()) {
                this.$refs.form.validate()
                return
            }
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    let data = {
                        "id": this.employee.id ? this.employee.id : '',
                        "employeeId": this.employee.employeeId,
                        "firstName": this.employee.firstName,
                        "firstNameLocale": this.employee.firstNameLocale,
                        "lastName": this.employee.lastName,
                        "lastNameLocale": this.employee.lastNameLocale,
                        "employeeType": this.employee.employeeType,
                        "gender": this.employee.gender,
                        "dob": this.employee.dob,
                        "identityId": this.employee.identityId,
                        "identityType": this.employee.identityType,
                        "address": this.employee.address,
                        "phone": this.employee.phone,
                        "email": this.employee.email,
                        "salaryAcc": this.mAccSalary,
                        "salaryAdvanceAcc": this.mAccAdvanceSalary,
                        "payrollLiabilitie": this.mAccPayroll,
                        "country": this.employee.country,
                        "nationality": this.employee.nationality,
                        "image": this.employee.image,
                        "file": this.imgFile,
                        "attachFile": {},
                        "maritalStatus": this.employee.maritalStatus,
                        "noOfChildren": this.employee.noOfChildren,
                        "bank": this.employee.bank,
                        "bankAccount": this.employee.bankAccount,
                        "paymentPeriod": this.employee.paymentPeriod,
                        "natureEmployee": this.employee.natureEmployee,
                        "paymentMethod":  this.employee.paymentMethod,
                    }
                    employeeHandler.create(data).then(response => {
                        if (response.data.statusCode === 201) {
                            this.close(response.data.data)
                            // this.$refs.form.reset()
                            this.$snotify.success('Successfully')
                        }
                    }).catch(e => {
                        this.$snotify.error('Something went wrong')
                        this.errors.push(e)
                    })
                }, 300);
            })
        },
        async initData() {
            if (this.$route.params.id !== undefined) {
                await this.loadSingleEmployee()
            }
        },
        async loadSingleEmployee() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    this.showLoading = true
                    employeeHandler.get(this.$route.params.id).then(res => {
                        if (res.data.statusCode === 200) {
                            this.showLoading = false
                            this.employee = res.data.data[0]
                            this.mAccAdvanceSalary = this.employee.salaryAdvanceAcc
                            this.mAccSalary = this.employee.salaryAcc
                            this.mAccPayroll = this.employee.payrollLiabilitie
                            const hasImg = this.employee.hasOwnProperty('image')
                            this.src = ''
                            let imgUrl = ''
                            if (hasImg) {
                                if (this.employee.image.hasOwnProperty('default')) {
                                    imgUrl = this.employee.image.default.thumb
                                    this.src = 'https://s3-ap-southeast-1.amazonaws.com/images.banhji/' + imgUrl
                                }
                            }
                        }
                    })
                }, 300);
            })
        },
    },
    mounted: async function () {
        await this.loadCountry()
        await this.loadNationality()
        await this.loadAccount()
        await this.initData()
    },
    watch: {
        id() {
            if (this.id !== undefined) {
                this.loadSingleEmployee()
            } else {
                this.employee = {}
            }
        }
    },
};
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

.grayBg {
    background-color: #f3f8ff;
}

@media (max-width: 576px) {
    ..mb-6 {
        margin-bottom: 0 !important;
    }
}

.section2 {
    border: 1px solid #d6d7d8;
}

.border_grey {
    border: 1px solid #d6d7d8;
}

.attachment_table {
    width: 100%;
}

.greyDark {
    background-color: #f2f2f2;
}

.upload_btn {
    width: 54%;
    margin: auto;
    padding: 10px 6px;
    text-align: center;
    color: #ffff;
    border-radius: 22px;
    background: #92d050;
}

.my_box_min_heihgt {
    height: 295px;
}

.width_100 {
    width: 100px;
}
</style>

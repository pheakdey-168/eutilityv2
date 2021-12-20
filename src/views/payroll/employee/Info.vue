<template>
    <v-row class="px-1">
        <v-col sm="12" cols="12">
            <v-row>
                <v-col sm="3" cols="12" class="py-0">
                    <v-card elevation="1">
                        <v-img style="margin: auto;display: block;"
                               :src="imgURL"/>
                    </v-card>
                </v-col>
                <v-col sm="9" cols="12" class="py-0">
                    <v-simple-table>
                        <template v-slot:default>
                            <tbody>
                            <tr>
                                <td class="text-uppercase">{{ $t('name') }}</td>
                                <td class="">{{ employee.firstName }} {{ employee.lastName }}</td>
                            </tr>
                            <tr>
                                <td class="text-uppercase">{{ $t('id') }}</td>
                                <td class="">{{ employee.employeeId }}</td>
                            </tr>
                            <tr>
                                <td class="text-uppercase">{{ $t('current_position') }}</td>
                                <td class="">{{employeeInfo.position.name}}</td >
                            </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </v-col>
            </v-row>
        </v-col>

        <v-col sm="12" cols="12" class="py-0">
            <v-row>
                <v-col sm="6" cols="12" class="py-0">
                    <h3 class="mt-2 black--text">{{ $t('key_information') }}</h3>
                </v-col>
                <v-col sm="6" cols="12" class="py-0">
                    <router-link
                        :to="{path: routerTo, query: { type: 'edit'} }">
                        <v-btn width="100" color="third" :disabled="btnEnabled"
                               class="rounded-pill white--text float-right text-capitalize">
                            {{ $t('edit') }}
                        </v-btn>
                    </router-link>
                </v-col>
            </v-row>
        </v-col>
        <v-col sm="12" cols="12" class="pb-0">
            <v-simple-table>
                <template v-slot:default>
                    <tbody>
                    <tr>
                        <td class="text-uppercase">{{ $t('gross_pay') }}</td>
                        <td style="text-align: right;" class="">{{formatAmount(employeeInfo.grossSalary)}}</td>
                    </tr>
                    <tr>
                        <td class="text-uppercase">{{ $t('net_salary') }}</td>
                        <td style="text-align: right;" class="">{{formatAmount(employeeInfo.netSalary)}}</td>
                    </tr>
                    <tr>
                        <td class="text-uppercase">{{ $t('deduction') }}</td>
                        <td style="text-align: right;" class="">{{formatAmount(employeeInfo.deduction)}}</td>
                    </tr>
                    <tr>
                        <td class="text-uppercase">{{ $t('bonus_benefit') }}</td>
                        <td style="text-align: right;" class="">{{formatAmount(employeeInfo.totalBenefit)}}</td>
                    </tr>
                    <tr>
                        <td class="text-uppercase">{{ $t('last_used') }}</td>
                        <td class=""/>
                    </tr>
                    <tr>
                        <td class="text-uppercase">{{ $t('outstanding_advance') }}</td>
                        <td class=""/>
                    </tr>
                    <tr>
                        <td class="text-uppercase">{{ $t('type_of_employment_contract') }}</td>
                        <td class="">{{employeeInfo.natureContract.name}}</td>
                    </tr>
                    <tr>
                        <td class="text-uppercase">{{ $t('department') }}</td>
                        <td class="">{{employeeInfo.department.name}}</td>
                    </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </v-col>
    </v-row>
</template>
<script>
import kendo from '@progress/kendo-ui'
const employeeHandler = require("@/scripts/employeeHandler")
export default {
    name: "EmployeeInfo",
    props: {
        employee: {}
    },
    data() {
        return {
            pic: "amret.png",
            url: 'https://s3-ap-southeast-1.amazonaws.com/images.banhji/',
            employeeInfo: {
                grossSalary: 0,
                netSalary: 0,
                deduction: 0,
                totalBenefit: 0,
                position: {
                    name: ''
                },
                natureContract:{
                    name: ''
                },
                department:{
                    name: ''
                }
            }
        }
    },
    methods: {
        formatAmount(val){
            return kendo.toString(val,'n2')
        },
        goEdit(){
        },
        onUpdate() {
            this.$emit('onUpdate', this.employee ? this.employee : {})
        },
        callback() {
            if (this.$route.params !== null && this.$route.params.hasOwnProperty('data')) {
                this.$emit('onUpdate', this.$route.params.data)
                this.loadEmployeeInfo()
            }
        },
        async loadEmployeeInfo(){
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.employees = []
                    employeeHandler.getEmployeeInfo(this.employee.id).then(res => {
                        this.showLoading = true
                        if (res.statusCode === 200) {
                            this.showLoading = false
                            let result = res.data[0]
                            this.employeeInfo = result
                        }
                    }).catch()
                    {
                        this.showLoading = false
                    }
                }, 300)
            })
        }
    },
    computed: {
        routerTo() {
            return 'employee' + `/${this.employee ? this.employee.id : ''}`
        },
        imgURL() {
            if (this.employee) {
                if (this.employee.image) {
                    let img = this.employee.image
                    let imgDefault = img.default
                    if (imgDefault) {
                        return this.url + imgDefault.thumb
                    } else {
                        return ''
                    }
                } else {
                    return ''
                }
            } else {
                return ''
            }

        },
        btnEnabled() {
            if (this.employee) {
                return !this.employee.id
            } else {
                return false
            }
        }
    },
    watch: {
         employee() {
            if (this.employee !== undefined) {
                this.loadEmployeeInfo()
            }
        },
        '$route': 'callback'
    },
}
</script>
<style scoped>
.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
    background-color: transparent !important;
}

.theme--light.v-data-table {
    background-color: transparent !important;
    border-top: thin solid #000;
    border-bottom: thin solid #000;
    border-radius: 0 !important;
}

.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > td:not(.v-data-table__mobile-row),
.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > th:not(.v-data-table__mobile-row) {
    border-bottom: thin solid #000;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
    height: 32px !important;
}
</style>
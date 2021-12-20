<template>
    <v-row class="">
        <v-col sm="12" cols="12" class="pt-0">
            <h2 class="mb-0 font_20">{{ $t('tax_setting') }}</h2>
            <v-dialog v-model="dialogM2" max-width="700px">
                <template v-slot:activator="{ on }">
                    <v-btn color="third" class="rounded-pill text-capitalize white--text float-right" v-on="on"
                           @click="onNewClick">
                        {{ $t('create_new') }}
                    </v-btn>
                </template>
                <v-card>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <div>
                            <v-card-title>{{ $t('tax_setting') }}</v-card-title>
                            <v-icon class="btn_close pa-2" @click="dialogM2 = false">close</v-icon>
                        </div>
                        <v-divider/>
                        <v-card-text :class="{'setCardHeight': setCardHeight,'setCardHeightOther': !setCardHeight}"
                                    style=" background-color: #EDF1F5; color: #333;">
                            <div v-if="natureSelected == 'Resident_Salary'">
                                <v-row>
                                    <v-col class="pb-0" sm="4" cosl="12">
                                        <label>{{ $t('nature') }}</label>
                                        <v-select class="mt-1"
                                            outlined
                                            :items="nature"
                                            item-value="id"
                                            item-text="name"
                                            v-model="natureSelected"
                                            tage="unitOfMeasureSelector"
                                            @change="ChangeNature"
                                            :rules="[v => !!v || $t('field_is_required')]"
                                            clearable/>
                                    </v-col>
                                    <v-col class="pb-0" sm="4" cosl="12">
                                        <label>{{ $t('name') }}</label>
                                        <v-text-field
                                            class="mt-1"
                                            tage="Name"
                                            v-model="taxPayroll.name"
                                            :rules="[v => !!v || $t('field_is_required')]"
                                            outlined/>
                                    </v-col>
                                    <v-col class="pb-0" sm="4" cosl="12">
                                        <label>{{ $t('effective_date') }}</label>
                                        <app-datepicker
                                            :initialDate="effectiveDate"
                                            @emitDate="effectiveDate = $event"/>
                                    </v-col>
                                    <v-col sm="12" cols="12" class="pt-2">
                                        <kendo-datasource ref="dataSource"
                                                        :data="taxList"/>
                                        <kendo-grid id="grid" class="grid-function"
                                            :data-source-ref="'dataSource'"
                                            :sortable="false"
                                            :filterable="false"
                                            :navigatable="true"
                                            :editable="true"
                                            :scrollable-virtual="true">
                                            <kendo-grid-column
                                                :title="$t('no.')"
                                                :template="rowNumberTmpl"
                                                :width="60"
                                                :column-menu="false"
                                                :headerAttributes="{ style: 'background-color: #EDF1F5;', class: 'text-center'	}"
                                                :attributes="{style: 'text-align: center'}"/>
                                            <kendo-grid-column
                                                :field="'from'"
                                                title="FROM"
                                                :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                            <kendo-grid-column
                                                :field="'to'"
                                                title="TO"
                                                :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                            <kendo-grid-column
                                                :field="'taxRate'"
                                                title="Tax Rate"
                                                :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                            <kendo-grid-column
                                                :field="'amount'"
                                                title="Amount"
                                                :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                            <kendo-grid-column
                                                :command="{ iconClass: 'k-icon k-i-trash', text: 'Delete', click: removeRow, class: 'btn-plus' }"
                                                :title="$t('action')"
                                                :headerAttributes="{style: 'text-align: left; background-color: #EDF1F5'}"/>
                                        </kendo-grid>
                                        <v-btn color="greenText"
                                            class="float-left rounded-0 white--text mt-3"
                                            @click="addRow">
                                            <v-icon size="" class="ma-1">mdi mdi-plus</v-icon>
                                        </v-btn>
                                    </v-col>
                                    <v-col sm="12">
                                        <v-row>
                                            <v-col sm="4" class="pt-0 pl-0">
                                                <label>{{ $t('currency') }}</label>
                                                <v-select
                                                    class=" my-2"
                                                    :items="currencyList"
                                                    item-value="id"
                                                    item-text="name"
                                                    v-model="currencySelected"
                                                    outlined
                                                    return-object
                                                    tage="currencySelector"
                                                    :rules="[v => !!v || $t('field_is_required')]"
                                                    clearable/>
                                            </v-col>
                                            <v-col sm="4" class="pt-0 pl-0">
                                                <label>{{ $t('account') }}</label>
                                                <dropdownlist 
                                                    :data-items='accountList'
                                                    :text-field="'name'"
                                                    v-model="accountSelected"
                                                    return-object
                                                ></dropdownlist>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                </v-row>
                            </div>
                            <div v-else-if="natureSelected == 'Dependency'">
                                <v-row>
                                    <v-col sm="4" cosl="12">
                                        <label>{{ $t('nature') }}</label>
                                        <v-select
                                            class=" my-2"
                                            outlined
                                            :items="nature"
                                            item-value="id"
                                            item-text="name"
                                            v-model="natureSelected"
                                            @change="ChangeNature"
                                            :rules="[v => !!v || $t('field_is_required')]"
                                            tage="unitOfMeasureSelector"
                                        />
                                    </v-col>
                                    <v-col sm="4" cosl="12">
                                        <label>{{ $t('name') }}</label>
                                        <v-text-field
                                            class=" my-2"
                                            tage="Name"
                                            v-model="taxPayroll.name"
                                            :rules="[v => !!v || $t('field_is_required')]"
                                            outlined/>
                                    </v-col>
                                    <v-col sm="4" cosl="12">
                                        <label>{{ $t('effective_date') }}</label>
                                        <app-datepicker
                                            :initialDate="effectiveDate"
                                            @emitDate="effectiveDate = $event"/>
                                        <!-- <v-text-field class=" my-2" tage='Effective Date' outlined clearable /> -->
                                    </v-col>
                                    <v-col sm="4" cosl="12">
                                        <label>{{ $t('rate') }}</label>
                                        <v-text-field
                                            class=" my-2"
                                            tage="Rate"
                                            v-model="taxPayroll.rate"
                                            :rules="[v => !!v || $t('field_is_required')]"
                                            outlined/>
                                    </v-col>
                                    <v-col sm="4" cosl="12">
                                        <label>{{ $t('currency') }}</label>
                                        <v-select
                                            class=" my-2"
                                            :items="currencyList"
                                            item-value="id"
                                            item-text="name"
                                            v-model="currencySelected"
                                            outlined
                                            return-object
                                            tage="currencySelector"
                                            :rules="[v => !!v || $t('field_is_required')]"
                                        />
                                    </v-col>
                                    <v-col sm="4" class="pt-0 pl-0">
                                                <label>{{ $t('account') }}</label>
                                                <dropdownlist 
                                                    :data-items='accountList'
                                                    :text-field="'name'"
                                                    v-model="accountSelected"
                                                    return-object
                                                ></dropdownlist>
                                            </v-col>
                                </v-row>
                            </div>
                            <div v-else-if="natureSelected == 'No_resident_Salary'">
                                <v-row>
                                    <v-col sm="4" cosl="12">
                                        <label>{{ $t('nature') }}</label>
                                        <v-select
                                            class=" my-2"
                                            outlined
                                            :items="nature"
                                            item-value="id"
                                            item-text="name"
                                            v-model="natureSelected"
                                            @change="ChangeNature"
                                            tage="Nature"
                                            :rules="[v => !!v || $t('field_is_required')]"
                                        />
                                    </v-col>
                                    <v-col sm="4" cosl="12">
                                        <label>{{ $t('name') }}</label>
                                        <v-text-field
                                            class=" my-2"
                                            Tage="Name"
                                            v-model="taxPayroll.name"
                                            :rules="[v => !!v || $t('field_is_required')]"
                                            outlined/>
                                    </v-col>
                                    <v-col sm="4" cosl="12">
                                        <label>{{ $t('effective_date') }}</label>
                                        <app-datepicker
                                            :initialDate="effectiveDate"
                                            @emitDate="effectiveDate = $event"/>
                                    </v-col>
                                    <v-col sm="4" cosl="12">
                                        <label>{{ $t('rate') }}</label>
                                        <v-text-field
                                            class=" my-2"
                                            tage="Rate"
                                            v-model="taxPayroll.rate"
                                            :rules="[v => !!v || $t('field_is_required')]"
                                            outlined/>
                                    </v-col>
                                    <v-col sm="4" cosl="12">
                                        <label>{{ $t('currency') }}</label>
                                        <v-select
                                            class=" my-2"
                                            :items="currencyList"
                                            item-value="id"
                                            item-text="name"
                                            v-model="currencySelected"
                                            @change="ChangeNature"
                                            outlined
                                            return-object
                                            tage="currencySelector"
                                            :rules="[v => !!v || $t('field_is_required')]"
                                        />
                                    </v-col>
                                    <v-col sm="4" class="pt-0 pl-0">
                                        <label>{{ $t('account') }}</label>
                                        <dropdownlist 
                                            :data-items='accountList'
                                            :text-field="'name'"
                                            v-model="accountSelected"
                                            return-object
                                        ></dropdownlist>
                                    </v-col>
                                </v-row>
                            </div>
                            <div v-else>
                                <v-row>
                                    <v-col sm="4" cosl="12">
                                        <label>{{ $t('nature') }}</label>
                                        <v-select
                                            class=" my-2"
                                            outlined
                                            :items="nature"
                                            item-value="id"
                                            item-text="name"
                                            v-model="natureSelected"
                                            tage="Nature"
                                            :rules="[v => !!v || $t('field_is_required')]"
                                        />
                                    </v-col>
                                    <v-col sm="4" cosl="12">
                                        <label>{{ $t('name') }}</label>
                                        <v-text-field
                                            class=" my-2"
                                            v-model="taxPayroll.name"
                                            :rules="[v => !!v || $t('field_is_required')]"
                                            outlined/>
                                    </v-col>
                                    <v-col sm="4" cosl="12">
                                        <label>{{ $t('effective_date') }}</label>
                                        <app-datepicker
                                            :initialDate="effectiveDate"
                                            @emitDate="effectiveDate = $event"/>
                                    </v-col>
                                    <v-col sm="4" cosl="12">
                                        <label>{{ $t('rate') }}</label>
                                        <v-text-field
                                            class=" my-2"
                                            tage="Rat"
                                            v-model="taxPayroll.rate"
                                            :rules="[v => !!v || $t('field_is_required')]"
                                            outlined/>
                                    </v-col>
                                    <v-col sm="4" cosl="12">
                                        <label>{{ $t('currency') }}</label>
                                        <v-select
                                            class=" my-2"
                                            :items="currencyList"
                                            item-value="id"
                                            item-text="name"
                                            v-model="currencySelected"
                                            outlined
                                            return-object
                                            tage="currencySelector"
                                            :rules="[v => !!v || $t('field_is_required')]"
                                        />
                                    </v-col>
                                    <v-col sm="4" class="pt-0 pl-0">
                                        <label>{{ $t('account') }}</label>
                                        <dropdownlist 
                                            :data-items='accountBenefitList'
                                            :text-field="'name'"
                                            v-model="accountSelected"
                                            return-object
                                        ></dropdownlist>
                                    </v-col>
                                </v-row>
                            </div>
                        </v-card-text>
                        <v-divider/>
                        <v-card-actions class="py-2 px-3">
                            <v-row>
                                <v-col sm="6" cols="6" class="py-0 text-left">
                                    <v-btn small color="black" outlined
                                        class=" text-capitalize rounded-pill black--text float-left"
                                        @click="dialogM2 = false">{{ $t('cancel') }}
                                    </v-btn>
                                </v-col>
                                <v-col sm="6" cols="6" class="py-0 text-right">
                                    <v-btn small color="secondary" class="px-3 rounded-pill white--text text-capitalize"
                                        @click.native="onSaveClose()">{{ $t('save_close') }}
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-card-actions>
                    </v-form>
                </v-card>
            </v-dialog>
            <p class="mb-0">{{ $t('tax_settings_desc') }} </p>
        </v-col>

        <v-col sm="12" cols="12" class="py-0">
            <template>
                <v-simple-table class="attachment_table">
                    <template v-slot:default>
                        <thead>
                        <tr>
                            <th class="text-uppercase">{{ $t('name') }}</th>
                            <th class="text-uppercase">{{ $t('nature') }}</th>
                            <th class="text-uppercase">{{ $t('effective_date') }}</th>
                            <th style="width: 50px;"/>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="paytax in payrollTax" v-bind:key="paytax.id">
                            <td class="text-bold">{{ paytax.name }}</td>
                            <td class="text-bold">{{ paytax.nature }}</td>
                            <td class="">{{ paytax.effectiveDate }}</td>
                            <td>
                                <v-btn class="btn_edit_setting"   @click="onEditClick(paytax)">
                                    <v-icon class="white--text" size="12">fa fa-pen</v-icon>
                                    <span class="capitalize ml-1 white--text font_14">{{$t('edit')}}</span>
                                </v-btn>
                            </td>
                        </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </template>
        </v-col>
    </v-row>
</template>

<script>
import DatePickerComponent from '@/components/custom_templates/DatePickerComponent'
import TaxPayroll from '@/scripts/model/TaxPayroll'
import { DropDownList } from '@progress/kendo-vue-dropdowns';
const taxModel = new TaxPayroll({})
const currencyHandler = require("@/scripts/currency/handler/currencyHandler")  
const payrollHandler = require("@/scripts/payrollHandler")
const accountHandler = require("@/scripts/accountHandler");
const $ = require("jquery")

export default {
    components: {
        'app-datepicker': DatePickerComponent,
        'dropdownlist': DropDownList
    },
    data: () => ({
        dialogM2: false,
        compeletLoading: true,
        isFullpage: false,
        natureSelected: 'Resident_Salary',
        currencySelected: '',
        accountSelected: '',
        textStatus: 'Success',
        color: '#3DA72E',
        natureOption: 1,
        setCardHeight: true,
        timeout: 6000,
        valid: true,
        currencyList: [],
        nature: [
            {id: 'Resident_Salary', name: 'Resident Salary'},
            {id: 'Dependency', name: 'Dependency'},
            {id: 'No_resident_Salary', name: 'No-resident Salary'},
            {id: 'Fringe_Benefit', name: 'Fringe Benefit'}
        ],
        tax_rate: [],
        taxList: [],
        taxPayroll: taxModel,
        payrollTax: [],
        accountList: [],
        accountBenefitList: [],
        effectiveDate: '',
    }),
    props: {},
    computed: {},
    watch: {
    },
    created() {
    },
    methods: {
        ChangeNature() {
            if (this.natureSelected === 'Resident_Salary') {
                this.setCardHeight = true
            } else {
                this.setCardHeight = false
            }
        },
        async loadCurrency() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    currencyHandler.getAll().then(res => {
                        this.currencyList = res
                    })
                }, 300)
            })
        },
        async loadTax() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    payrollHandler.getTax().then(res => {
                        this.payrollTax = res.data.data
                    })
                }, 300);
            })
        },
        async onSaveClose() {
           if (!this.$refs.form.validate()) {
                this.$refs.form.validate()
                return
            }
            if (this.natureSelected === "Resident_Salary") {
                let ds = this.$refs.dataSource.kendoWidget()
                this.tax_rate = ds.data();
            } else {
                this.tax_rate = this.taxPayroll.rate;
            }
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    let data = {
                        "id":               this.taxPayroll.id ? this.taxPayroll.id : '',
                        "name":             this.taxPayroll.name,
                        "nature":           this.natureSelected,
                        "currency":         this.currencySelected,
                        "rate":             this.tax_rate,
                        "effectiveDate":    this.effectiveDate,
                        "account":          this.accountSelected,
                    }
                    payrollHandler.createTax(data).then(response => {
                        if (response.data.statusCode === 201) {
                            const res = response.data
                            const index = this.payrollTax.findIndex(item => {
                                return (res.id === item.id)
                            })
                            if (this.taxPayroll.length === 0) {
                                this.loadTax()
                            } else {
                                if (index < 0) {
                                    this.payrollTax.push(res.data)
                                } else {
                                    this.payrollTax.splice(index, 1, res.data)
                                }
                            }
                            this.$snotify.success('Success')
                            this.clear()
                            this.close()
                        }
                    }).catch(e => {
                        this.$snotify.error('Something went wrong')
                        this.errors.push(e)
                    })
                }, 300);
            })
        },
        async onEditClick(value) {
            if (value.name) {
                this.natureSelected = value.nature
                this.taxList = value.rate
                this.effectiveDate = value.effectiveDate
                this.currencySelected = value.currency
                this.accountSelected = value.account
                this.taxPayroll = value
                this.dialogM2 = true
            }
        },
        onNewClick() {
            this.clear()
            this.taxList.push({

            })
        },
        close() {
            this.dialogM2 = false
        },
        clear() {
            this.natureSelected = 'Resident_Salary'
            this.currencySelected = ''
            this.effectiveDate = ''
            this.taxPayroll = {}
            this.taxList = []
            this.accountSelected = ''
        },
        addRow() {
            let ds = this.$refs.dataSource.kendoWidget(),
                total = ds.total();
            ds.insert(total, {
                taxList: {}
            })
        },
        removeRow(e) {
            e.preventDefault();
            const grid = $("#grid").data("kendoGrid"),
                dataSource = grid.dataSource,
                dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
            if (dataSource.total() > 1) {
                dataSource.remove(dataItem);
            }
        },
        rowNumberTmpl(dataItem) {
            var ds = this.$refs.dataSource.kendoWidget(),
                index = ds.indexOf(dataItem);
            return index + 1;
        },
        loadAccount(){
            let number = 21
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    accountHandler.getByAccountType(number)
                    .then(res => {
                        if(res){
                            this.accountList = res.data
                            this.showLoading = false
                        }
                    })
                }, 300);
            })
        },
        loadAccountBenefit(){
            let number = 34
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    accountHandler.getByAccountType(number)
                    .then(res => {
                        if(res){
                            this.accountBenefitList = res.data
                            this.showLoading = false
                        }
                    })
                }, 300);
            })
        },
    },
    mounted: async function () {
        this.loadTax()
        this.loadCurrency()
        this.loadAccount()
        this.loadAccountBenefit()
    }
};
</script>
<style scoped>
.my_table {
    width: 100%;
    border-collapse: collapse;
}

.my_table td {
    border: 1px solid #000;
    border-collapse: collapse;
    padding: 8px;
}

.my_table th {
    border: 1px solid #000;
    border-collapse: collapse;
}

.function_footer {
    padding: 15px;
    display: inline-block;
}

.theme--light.v-data-table {
    background-color: none !important;
}

.setCardHeight {
    min-height: 480px;
}

.setCardHeightOther {
    height: 280px !important;
}
.card_header{
    position: fixed;
    width: 49.8%;
    background: #fff;
    z-index: 100;
}

@media (max-width: 676px) {
    .card_header{
        position: fixed;
        width: 88%;
        background: #fff;
        z-index: 100;
    }

}
@media (max-width: 1026px) {
    .card_header{
        position: fixed;
        width: 68%;
        background: #fff;
        z-index: 100;
    }
}
</style>
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
                                        <h2>{{ $t('earning_allocation') }}</h2>
                                        <v-icon
                                            onclick="window.history.go(-1); return false;"
                                            style="cursor: pointer; color: #333; font-size: 40px;"
                                            class="float-right"
                                        >close
                                        </v-icon>
                                    </div>
                                    <v-card outlined dense class="" color="white">
                                        <!-- Form -->
                                        <v-form
                                            ref="form"
                                            v-model="valid"
                                            lazy-validation>
                                            <v-col sm="12" col="12" class="py-0">
                                                <v-row>
                                                    <v-col sm="12" cols="12" class="">
                                                        <v-row>
                                                            <v-col sm="3" cols="12" class="pb-0 pl-0">
                                                                <label class="label mb-0">{{ $t('date') }}</label>
                                                                <app-datepicker
                                                                    class="mt-1"
                                                                    :initialDate="d.issuedDate"
                                                                    @emitDate="d.issuedDate = $event"/>
                                                            </v-col>
                                                            <v-col sm="3" cols="12" class="pb-0 pl-0">
                                                                <label class="label mb-0">{{ $t('month_of_from') }}</label>
                                                                <app-monthof-picker
                                                                    :initMonthOf="d.monthFrom"
                                                                    @onChanged="monthChange"
                                                                    @emitMonthOf="d.monthFrom = $event"/>
                                                            </v-col>
                                                            <v-col sm="3" cols="12" class="pb-0 pl-0">
                                                                <label class="label mb-0">{{ $t('month_of_to') }}</label>
                                                                <app-monthof-picker
                                                                    :initMonthOf="d.monthTo"
                                                                    @onChanged="monthChange"
                                                                    @emitMonthOf="d.monthTo = $event"/>
                                                            </v-col>
                                                            <v-col sm="1" cols="1" class=" pl-0">
                                                                <v-btn color="primary white--text mt-6" @click="search" style="min-width:100%;padding: 0 10px;border-radius: 4px !important;">
                                                                    <i
                                                                        class="b-search"
                                                                        style="font-size: 18px; color:#fff !important;"
                                                                    />
                                                                </v-btn>
                                                            </v-col>
                                                        </v-row>
                                                    </v-col>
                                                </v-row>
                                                <v-row class="pa-4" style="border: 2px solid #dae0e8;">
                                                    <v-col sm="6" cols="12" class="">
                                                        <label class="label mb-0">{{ $t('number') }}</label>
                                                        <v-text-field
                                                            class="mt-1"
                                                            v-model="d.number"
                                                            outlined
                                                            disabled
                                                            :rules="[v => !!v || 'Number is required']"
                                                        />
                                                        <v-row class="pl-3">
                                                            <v-col sm="12" cols="10" class="py-0 pl-0">
                                                                <label class="label mb-0">{{
                                                                        $t('basis_of_allocation')
                                                                    }}</label>
                                                                <div class="kendo_dropdown_custom mt-1">
                                                                    <vue-numeric
                                                                        style="width: 100%;font-size: 18px;background-color: #ffff;border-radius: 4px;text-align: right;border: 1px solid #ddd !important; padding: 9px !important; margin-bottom: 15px;"
                                                                        class="mt-1 mr-2 mt-0 text-bold pa-4"
                                                                        currency=""
                                                                        separator=","
                                                                        v-bind:minus="false"
                                                                        v-bind:precision="inputDec"
                                                                        v-model="d.basisAllocation"
                                                                        @change="basisChange"
                                                                        :rules="[v => !!v || 'Basis allocation is required']"
                                                                        outlined
                                                                    ></vue-numeric>
                                                                </div>
                                                            </v-col>
                                                        </v-row>
                                                        <label class="label mb-0">{{ $t('earn_account') }}</label>
                                                        <v-select
                                                            class="mt-1"
                                                            :items="profitEarningAcc"
                                                            :placeholder="$t('select')"
                                                            :item-text="item => `${accountName=='name'?item.name:item.local_name}`"
                                                            tage=""
                                                            v-model="d.profitEarningAcccount"
                                                            :rules="[v => !!v || 'Earn account is required']"
                                                            return-object
                                                            outlined/>
                                                    </v-col>
                                                    <v-col sm="6" cols="12" class="function_content pa-3">
                                                        <v-card
                                                            class="pa-3 no-boxshadow d-flex justify-space-between align-center"
                                                            min-height="50px" color="primary">
                                                            <h3 style="font-size: 18px"
                                                                class="text-white text-uppercase">
                                                                {{ $t('basis_for_allocation') }}</h3>
                                                            <h3 class="text-bold float-right text-white"
                                                                style="font-size: 22px">
                                                                {{numberFormat(this.totalBalance)}}
                                                            </h3>
                                                        </v-card>
                                                        <v-simple-table>
                                                            <template v-slot:default>
                                                                <tbody>
                                                                    <tr>
                                                                        <td class="text-left pr-0">{{ $t('currency') }}</td>
                                                                        <td class="text-center">:</td>
                                                                        <td class="text-right">
                                                                            {{ (currencyCode) }}
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td class="text-left pr-0">{{
                                                                                $t('rate')
                                                                            }}
                                                                        </td>
                                                                        <td class="text-center">:</td>
                                                                        <td class="text-right">
                                                                            {{ (rate) }}
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </template>
                                                        </v-simple-table>
                                                    </v-col>
                                                </v-row>
                                            </v-col>
                                        </v-form>
                                        <!-- Grid -->

                                    </v-card>
                                    <!-- Grid -->
                                    <v-card outlined dense class="" color="white">
                                        <v-col sm="12" col="12" class="py-0">
                                            <v-row class="pa-4 my-2" style="border: 2px solid #dae0e8;">
                                                <v-col sm="12" cols="12" class="">
                                                    <h3 class="mb-0 text-uppercase color_grey mb-3">
                                                        {{ $t("profit_allocation") }}
                                                    </h3>
                                                    <kendo-datasource
                                                        :change="profitChanged"
                                                        :data="profitAllocationData"
                                                        ref="profitDS"/>
                                                    <kendo-grid
                                                        id="profitDS"
                                                        class="grid-function"
                                                        :data-source-ref="'profitDS'"
                                                        :sortable="false"
                                                        :filterable="false"
                                                        :column-menu="true"
                                                        :editable="true"
                                                        :noRecords="true"
                                                        :scrollable-virtual="true">
                                                        <kendo-grid-column
                                                            :command="{iconClass: 'k-icon k-i-trash', text: ' ', click: removeRow, className: 'btn-plus isEditable'}"
                                                            :title="''"
                                                            :width="63"
                                                            :headerAttributes="{style:'text-align: left; background-color: #EDF1F5'}"/>
                                                        <kendo-grid-column
                                                            :title="$t('no.')"
                                                            :width="55"
                                                            :template="rowNumberTmpl"
                                                            :column-menu="false"
                                                            :headerAttributes="{style: 'background-color: #EDF1F5;',class: 'text-products' }"
                                                            :attributes="{ style: 'text-align: products'}"
                                                        />
                                                        <kendo-grid-column
                                                            :field="'account'"
                                                            :title="$t('equity_account')"
                                                            :template="proAccTemplate"
                                                            :editor="proAccDropDownEditor"
                                                            :headerAttributes="{ style:'background-color: #EDF1F5'}"/>
                                                        <kendo-grid-column
                                                            :field="'allocation'"
                                                            :title="$t('allocation_')"
                                                            :headerAttributes="{ style:'background-color: #EDF1F5',}"/>
                                                        <kendo-grid-column
                                                            :field="'amount'"
                                                            :title="$t('amount')"
                                                            :template="'<span>#=kendo.toString(amount || 0, decimalFormat)#</span>'"
                                                            :editable="()=>{ return false}"
                                                            :headerAttributes="{ style:'text-align: right; background-color: #EDF1F5',}"
                                                            :attributes="{ style:'text-align: right', }"/>
                                                    </kendo-grid>
                                                    <v-btn color="primary" class="float-left btn_plus rounded-0 mr-2"
                                                        @click="addProRow">
                                                        <v-icon size="" class="ma-1">mdi mdi-plus</v-icon>
                                                    </v-btn>
                                                </v-col>
                                            </v-row>
                                            <v-row class="pa-4" style="border: 2px solid #dae0e8;">
                                                <v-col sm="12" cols="12" class="">
                                                    <h3 class="mb-0 text-uppercase color_grey mb-3">
                                                        {{ $t("dividend_declaration") }}
                                                    </h3>
                                                    <v-col sm="12" cols="12" class="pb-0 px-0">
                                                        <v-row>
                                                            <v-col sm="4" cols="12" class="py-0">
                                                                <label class="label mb-0">{{
                                                                        $t('dividend_payable')
                                                                    }}</label>
                                                                <v-select
                                                                    class="mt-1"
                                                                    :items="divPayableAccList"
                                                                    return-object
                                                                    :item-text="item => `${accountName=='name'?item.name:item.local_name}`"
                                                                    v-model="d.payableAccount"
                                                                    :rules="[(v) => !!v || 'Dividend payable is required',]"
                                                                    outlined
                                                                    required
                                                                />
                                                            </v-col>
                                                            <v-col sm="4" cols="12" class="py-0">
                                                                <label class="label mb-0">{{
                                                                        $t('dividend_declared')
                                                                    }}</label>
                                                                <v-select
                                                                    class="mt-1"
                                                                    :items="divDeclareAccList"
                                                                    return-object
                                                                    :item-text="item => `${accountName=='name'?item.name:item.local_name}`"
                                                                    v-model="d.declareAccount"
                                                                    :rules="[(v) => !!v || 'Declare account is required',]"
                                                                    outlined
                                                                    required
                                                                />
                                                            </v-col>
                                                            <v-col sm="4" cols="12" class="py-0">
                                                                <label class="label mb-0">{{ $t('percentage') }}</label>
                                                                <h3 class="text-bold"
                                                                    style="font-size: 22px">
                                                                    {{ dividendPercentage }}%
                                                                </h3>
                                                            </v-col>
                                                            <v-col sm="4" cols="12" class="py-0">
                                                                <label class="label mb-0">{{
                                                                        $t('share_product')
                                                                    }}</label>
                                                                <div class="kendo_dropdown_custom mt-1">
                                                                    <v-select
                                                                        class="mt-1"
                                                                        placeholder="Please Select..."
                                                                        item-text="name"
                                                                        item-value="id"
                                                                        tage=""
                                                                        :items="shareProducts"
                                                                        v-model="d.shareProduct"
                                                                        @change="priceChange"
                                                                        return-object
                                                                        outlined/>
                                                                </div>
                                                            </v-col>
                                                            <v-col sm="4" cols="12" class="pt-0">
                                                                <label class="label mb-0">{{
                                                                        $t('basis_for_declaration')
                                                                    }}</label>
                                                                <h3 class="mt-2">{{numberFormat(basisDeclaration)}}</h3>
                                                            </v-col>
                                                            <v-col sm="4" cols="12" class="pt-0">
                                                                <label class="label mb-0">{{
                                                                        $t('dividend_per_share')
                                                                    }}</label>
                                                                <h3 class="mt-2">{{numberFormat(divPerShare)}}</h3>
                                                            </v-col>
                                                        </v-row>

                                                    </v-col>
                                                    <kendo-datasource
                                                        :data="shareDataA"
                                                        ref="applyToLineDS"/>
                                                    <kendo-grid
                                                        id="applyToLineDS"
                                                        class="grid-function"
                                                        :data-source-ref="'applyToLineDS'"
                                                        :sortable="false"
                                                        :filterable="false"
                                                        :column-menu="false"
                                                        :editable="false"
                                                        :noRecords="true"
                                                        :scrollable-virtual="true">
                                                        <kendo-grid-column
                                                            :title="$t('no.')"
                                                            :width="55"
                                                            :template="rowNumberTmpla"
                                                            :column-menu="false"
                                                            :headerAttributes="{style: 'background-color: #EDF1F5;',class: 'text-products' }"
                                                            :attributes="{ style: 'text-align: products'}"
                                                        />
                                                        <kendo-grid-column
                                                            :field="'shareholder'"
                                                            :title="$t('shareholder')"
                                                            :editable="()=>{ return false}"
                                                            :headerAttributes="{ style:'background-color: #EDF1F5'}"/>
                                                        <kendo-grid-column
                                                            :field="'number'"
                                                            :title="$t('reference_no')"
                                                            :editable="()=>{ return false}"
                                                            :headerAttributes="{ style:'text-align: right; background-color: #EDF1F5',}"
                                                            :attributes="{ style:'text-align: left', }"/>
                                                        <kendo-grid-column
                                                            :field="'shareBalance'"
                                                            :title="$t('share_balance')"
                                                            :editable="()=>{ return false}"
                                                            :attributes="{ style:'text-align: right' }"
                                                            :headerAttributes="{ style:'text-align: right;background-color: #EDF1F5',}"/>
                                                        <kendo-grid-column
                                                            :field="'averageNoShare'"
                                                            :title="$t('average_no_share')"
                                                            :editable="()=>{ return false}"
                                                            :template="'<span>#= kendo.toString(averageNoShare, format)#</span>'"
                                                            :headerAttributes="{ style:'text-align: right; background-color: #EDF1F5',}"
                                                            :attributes="{ style:'text-align: right', }"/>
                                                        <kendo-grid-column
                                                            :field="'dividendAmount'"
                                                            :title="$t('dividend_amount')"
                                                            :editable="()=>{ return false}"
                                                            :template="'<span>#= kendo.toString(dividendAmount, format)#</span>'"
                                                            :headerAttributes="{ style:'text-align: right; background-color: #EDF1F5',}"
                                                            :attributes="{ style:'text-align: right', }"/>
                                                    </kendo-grid>
                                                </v-col>
                                            </v-row>
                                        </v-col>
                                    </v-card>
                                    <div class="function_footer">
                                        <v-alert type="warning"
                                                 v-model="alert"
                                                 dismissible>
                                            <span v-html="errorMessage"/>
                                        </v-alert>
                                        <v-btn outlined color="#494846" class="float-left text-capitalize"
                                               @click="cancel">{{ $t('cancel') }}
                                        </v-btn>

                                        <v-btn color="primary" class="float-right white--text text-capitalize"
                                               @click="saveClose">
                                            {{ $t('save_close') }}
                                        </v-btn>

                                    </div>
                                </v-form>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>
            <LoadingMe
                :isLoading="showLoadingAcc"
                :fullPage="true"
                :myLoading="true"/>
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
import kendo from "@progress/kendo-ui"
import {uuid} from "vue-uuid"

const $ = kendo.jQuery

import PricePerShareModel from "@/scripts/model/PricePerShare"
import Helper from "@/helper.js"
import ShareModel from '@/scripts/model/credit/Share'
import DatePickerComponent from '@/components/custom_templates/DatePickerComponent'

const memberHandler = require("@/scripts/memberHandler")
const loanHandler = require("@/scripts/loanHandler")
const accountHandler = require("@/scripts/accountHandler")
const currencyHandler = require("@/scripts/currency/handler/currencyHandler")
const store = require("@/institute.js")
const {cookies} = store.default.state
import {UserModel, JournalEntryModel, JournalModel} from "@/scripts/model/AppModels"
//
// const {journalHandler} = require("@/scripts/AppHandlers");
const {EntityType} = require("@/scripts/default_setup/Collections")

import DividendModel from '@/scripts/model/credit/Dividend'
const { incomeStatementHandler, prefixHandler, journalHandler } = require("@/scripts/AppHandlers");
const cookieJS = require("@/cookie.js");
const { instituteId } = cookieJS.getCookie();
const instituteHandler = require("@/scripts/instituteHandler")
import VueNumeric from 'vue-numeric'
// import exports from "../../helper";
const DividendType = require("@/scripts/default_setup/DividendType.js");
export default {
    name: "AddSavingDeposit",
    props: ['id'],
    components: {
        LoadingMe: () => import(`@/components/Loading`),
        "app-monthof-picker": () => import("@/components/kendo_templates/MonthOfPicker"),
        VueNumeric,
        'app-datepicker': DatePickerComponent,
    },
    data: () => ({
        d: new DividendModel({}),
        profitAllocationData: [],
        divPayableAccList: [],
        divDeclareAccList: [],
        shareProducts: [],
        shareData: [],
        dividendPercentage: 100,
        itemLines: [],
        isHideBar: false,
        showLoading: false,
        loadingAlert: false,
        loadingColorAlert: '',
        loadingTextAlert: '',
        dialogM2: false,
        showLoadingAcc: false,
        alert: false,
        valid: true,
        skip: 0,
        tempSkip: null,
        total: 0,
        filter: '',
        textField: 'name',
        dataItemKey: 'id',
        baseCurrencyCode: '',
        errors: [],
        yearQuery: new Date().getFullYear(),
        ////
        saveOption: '',
        //
        loggedUser: new UserModel(cookies.user),
        isSaveNew: false,
        balance: {},
        balances: [],
        currencyCode: '',
        rate: '',
        exchangeRate: {},
        segments: [],
        segment: {},
        currency: {},
        journalNumber: '',
        journalPrefix: '',
        journalTxnType: EntityType.JOURNAL,
        //data
        journalTypes: EntityType.JOURNAL_TYPES,
        totalSaleShare: 0,
        totalAmount: 0,
        remainingShare: 0,
        s: new ShareModel({}),
        cashAccounts: [],
        lines: [],
        pricePerShares: [],
        memberList: [],
        line: {},
        oldShare: 0,
        maxShareAmount: 0,
        shareType: '',
        capitalAccount: {},
        lastNumber: 1,
        decimals: [],
        format: 'n2',
        accountName: 'name',
        accountShares: [],
        columnBy: "1",
        totalBalance: 0,
        inputDec: 2,
        proAccList: [],
        proAccName: "name",
        shareDataA: [],
        basisDeclaration: 0,
        divPerShare: 0,
        journal: {},
        journalEntries: [],
        memDivLastNum: 1,
        profitEarningAcc: [],
    }),
    methods: {
        async loadPrice() {
            this.shareProducts = []
            loanHandler.pricePerShareGet().then(res => {
                let data = res.data.data
                let self = this
                if (data.length > 0) {
                    $.each(data, function (i, v) {
                        // if (parseFloat(v.shareAmount) - parseFloat(v.saleShare) > 0) {
                            self.shareProducts.push(v)
                        // }
                    })
                } else {
                    this.$snotify.error('Please add share in setting')
                    this.cancel()
                }
            })
        },
        async getJournalNumber() {
            window.console.log(this.journalTxnType, this.s.issuedDate, 'journal number')
            let num = await this.generateAccountingNumber(this.journalTxnType, this.s.issuedDate)
            this.journalNumber = num.number
            this.journalPrefix = num.prefix_format
            this.s.number = num.number
        },
        async generateAccountingNumber (prefixType, transactionDate) {
            // Prefix
            const prefixes = await prefixHandler.getAll();
            let pf = prefixes.find(value => value.type.toLowerCase() === prefixType.toLowerCase());
            // Prefix Format "JE-yymm-00000"
            let shortPrefix = pf.abbr + pf.prefixSeparator + pf.structure + pf.numberSeparator,
                fullPrefix = shortPrefix + '0'.repeat(pf.format);
            // Last Number
            const lastNumbers = await prefixHandler.lastNumber(fullPrefix, transactionDate, shortPrefix);
            return this.applyPrefixNumber(lastNumbers.data.last_number, prefixType, transactionDate);
        },
        async applyPrefixNumber (lastNumber, prefixType, transactionDate){
            let num = {
                number: '',
                last_number: lastNumber,
                prefix_format: '',
                prefix: {}
            };
            // Prefix
            const prefixes = await prefixHandler.getAll();
            let pf = prefixes.find(value => value.type.toLowerCase() === prefixType.toLowerCase());
            num.prefix = pf
            if (pf) {
                // Prefix Format "JE-yymm-00000"
                num.prefix_format = pf.abbr + pf.prefixSeparator + pf.structure + pf.numberSeparator + '0'.repeat(pf.format);
                // Structure
                let structure = '', txnDate = new Date(transactionDate);
                switch (pf.structure.toLowerCase()) {
                    case 'yyyy':
                        structure = txnDate.getFullYear().toString();
                        break;
                    case 'yy':
                        structure = txnDate.getFullYear().toString().substr(2);
                        break;
                    case 'yyyymm':
                        structure = txnDate.getFullYear().toString() + (txnDate.getMonth() + 1).toString().padStart(2, '0');
                        break;
                    case 'yymm':
                        structure = txnDate.getFullYear().toString().substr(2) + (txnDate.getMonth() + 1).toString().padStart(2, '0');
                        break;
                    default:// None structure
                        break;
                }
                // Last Number
                let number = num.last_number;
                // Starting Number
                if (number === 0) {
                    number = pf.number;
                } else {
                    // Sequencing Number (Reset Number)
                    pf.sequcencing = 'prefix';// will change later
                    switch (pf.sequcencing.toLowerCase()) {
                        case 'month':// Month
                            number = 1;
                            break;
                        case 'year':// Year
                            number = 1;
                            break;
                        default:// Prefix
                            number++;
                            break;
                    }
                }
                num.number = pf.abbr + pf.prefixSeparator + structure + pf.numberSeparator + number.toString().padStart(pf.format, '0');
            }
            return num;
        },
        errorMessage() {
        },
        loadAccount() {
            this.showLoadingAcc = true
            accountHandler.getAll().then(res => {
                this.showLoadingAcc = false
                //Receivable Account
                this.proAccList = res.filter(m => m.account_type.number == 30 || m.account_type.number == 31).map(itm => {
                    return {
                        id: itm.uuid,
                        name: itm.name,
                        local_name: itm.local_name,
                        number: itm.number,
                        is_taxable: itm.is_taxable,
                        banhjiAccCode: itm.banhjiAccCode,
                        group_code: itm.group_code,
                        parent_account: itm.parent_account,
                        type_code: itm.type_code,
                        uuid: itm.uuid,
                        accountName: this.accountName
                    }
                })
                this.divPayableAccList = res.filter(m => m.account_type.number == 19).map(itm => {
                    return {
                        id: itm.uuid,
                        name: itm.name,
                        local_name: itm.local_name,
                        number: itm.number,
                        is_taxable: itm.is_taxable,
                        banhjiAccCode: itm.banhjiAccCode,
                        group_code: itm.group_code,
                        parent_account: itm.parent_account,
                        type_code: itm.type_code,
                        uuid: itm.uuid
                    }
                })
                if(this.divPayableAccList.length > 0){
                    this.d.payableAccount = this.divPayableAccList[0]
                }
                this.divDeclareAccList = res.filter(m => m.account_type.number == 29).map(itm => {
                    return {
                        id: itm.uuid,
                        name: itm.name,
                        local_name: itm.local_name,
                        number: itm.number,
                        is_taxable: itm.is_taxable,
                        banhjiAccCode: itm.banhjiAccCode,
                        group_code: itm.group_code,
                        parent_account: itm.parent_account,
                        type_code: itm.type_code,
                        uuid: itm.uuid
                    }
                })
                this.profitEarningAcc = res.filter(m => m.account_type.number == 31).map(itm => {
                    return {
                        id: itm.uuid,
                        name: itm.name,
                        local_name: itm.local_name,
                        number: itm.number,
                        is_taxable: itm.is_taxable,
                        banhjiAccCode: itm.banhjiAccCode,
                        group_code: itm.group_code,
                        parent_account: itm.parent_account,
                        type_code: itm.type_code,
                        uuid: itm.uuid
                    }
                })
                if(this.profitEarningAcc.length > 0){
                    this.d.profitEarningAccont = this.profitEarningAcc[0]
                }
                if(this.divDeclareAccList.length > 0){
                    this.d.declareAccount = this.divDeclareAccList[0]
                }
            })
        },
        async loadTransactionRate() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    const date = new Date().toISOString().substr(0, 10)
                    let code = this.currencyCode
                    if (code !== undefined || code !== '') {
                        this.showLoading = true
                        currencyHandler.getLastExchangeRateByDate(date, code).then(res => {
                            if (res.data.statusCode === 200) {
                                this.showLoading = false
                                const response = res.data.data[0]
                                this.showLoading = false
                                if (Object.keys(response).length > 0) {
                                    this.exchangeRate = response
                                    this.rate = response.rate
                                    this.d.exchangeRate = response
                                } else {
                                    this.$snotify.error('Please set exchange rate on currency setting')
                                    this.cancel()
                                }
                            }
                        })
                    }
                }, 300)
            })
        },
        //function
        cancel() {
            window.history.go(-1)
        },
        removeEmptyLine() {
            const grid = $("#profitDS").data("kendoGrid"),
                dataSource = grid.dataSource
            dataSource.data().forEach(m => {
                if (m.account.id == undefined) {
                    dataSource.remove(m)
                }
            })
        },
        async addEmpty() {
            this.d = new DividendModel({})
            let f = new Date()
            f.setMonth(0)
            f.setDate(1)
            this.d.monthFrom = f
            await this.loadPrice()
            await this.loadDecimal()
            this.addProRow()
            this.addProRow()
            await this.loadAccountName()
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
            this.removeEmptyLine()
            const grid = $("#profitDS").data("kendoGrid"),
                dataSource = grid.dataSource
            this.d.profitAllocation = dataSource.data()
            this.d.shareData = this.shareDataA
            this.d.dividendPerShare = this.divPerShare
            this.addJournal()
            this.journal = new JournalModel({
                description: '',
                transaction_type: DividendType.EARNINGALLOCATION,
                journal_type: DividendType.EARNINGALLOCATION,
            });
            this.journal.created_by = this.loggedUser
            this.journal.journal_date = Helper.toISODate(this.d.issuedDate)
            this.journal.journal_entries = this.journalEntries
            this.journal.currency_code = this.currency.code
            this.journal.prefix_format = this.journalPrefix
            this.journal.segment_uuid = this.segment.id
            this.journal.number = this.d.number
            this.d.journal = JSON.stringify(this.journal)
            this.d.segment = this.segment
            let self = this
            this.showLoading = true
            journalHandler.save(new JournalModel(this.journal))
            .then(function (response) {
                self.d.journalId = response ? response.data.uuid : ''
                memberHandler.createDividend(new DividendModel(self.d)).then(response => {
                    self.showLoading = false
                    if (response.data.statusCode === 201) {
                        self.$snotify.success('Successfully')
                        window.history.go(-1)
                    }
                }).catch(e => {
                    self.$snotify.error('Something went wrong')
                    self.errors.push(e)
                    self.showLoading = false
                    window.console.log(e, 'error')
                })
            })
            .catch(function (error) {
                Helper.alertErrorMsg(error);
            })
            .finally(() => {
                self.showLoading = false;
            });
        },
        addJournal() {
            let entries = [];
            // Profit Account on Dr
            let profitDS = this.$refs.profitDS.kendoWidget();
            let totalProfit = 0
            profitDS.data().forEach(element => {
                if (element.amount != 0) {
                    element.currency = this.currency;
                    element.exchange_rate = parseFloat(this.exchangeRate.rate); // Will change later
                    element.exchanged_amount = element.amount * parseFloat(this.exchangeRate.rate);
                    let d = new JournalEntryModel({
                        account: element.account,
                        description: '',
                        amount: element.amount * -1,
                        currency: this.currency,
                        exchange_rate: parseFloat(this.exchangeRate.rate), // Will change later
                        exchanged_amount: parseFloat(element.amount) * parseFloat(this.exchangeRate.rate),
                    });
                    entries.push(d);
                    totalProfit += parseFloat(element.amount)
                }
            });
            if(totalProfit > 0){
                let d = new JournalEntryModel({
                    account: this.d.profitEarningAccont,
                    description: '',
                    amount: totalProfit,
                    currency: this.currency,
                    exchange_rate: parseFloat(this.exchangeRate.rate), // Will change later
                    exchanged_amount: parseFloat(this.basisDeclaration) * parseFloat(this.exchangeRate.rate),
                });
                entries.push(d);
            }
            let d = new JournalEntryModel({
                account: this.d.payableAccount,
                description: '',
                amount: parseFloat(this.basisDeclaration),
                currency: this.currency,
                exchange_rate: parseFloat(this.exchangeRate.rate), // Will change later
                exchanged_amount: parseFloat(this.basisDeclaration) * parseFloat(this.exchangeRate.rate),
            });
            entries.push(d);
            // Cr
            let loanEntry = new JournalEntryModel({
                account: this.d.declareAccount,
                description: '',
                amount: parseFloat(this.basisDeclaration) * -1,
                currency: this.currency,
                exchange_rate: parseFloat(this.exchangeRate.rate), // Will change later
                exchanged_amount: parseFloat(this.basisDeclaration) * parseFloat(this.exchangeRate.rate),
            });
            entries.push(loanEntry);
            this.journalEntries = entries;
        },
        async updatePrice(s) {
            let r = parseFloat(s.pricePerShare.saleShare) + s.totalShare
            let d = s.pricePerShare
            d.saleShare = r
            loanHandler.pricePerShareCreate(new PricePerShareModel(d)).then(response => {
                window.console.log(response, 'update price share')
            }).catch(e => {
                this.$snotify.error('Something went wrong')
                this.errors.push(e)
                window.console.log(e)
            })
        },
        dataSourceChanged(e) {
            if (e.field) {
                let dataRow = e.items[0]
                let total = 0
                switch (e.field) {
                    case "shareAmount":
                        total = parseFloat(dataRow.shareAmount) * parseFloat(dataRow.sharePrice)
                        dataRow.set('amount', total)
                        break
                    default:
                        break
                }
                if (e.field) {
                    this.changes()
                }
            }
        },
        changes() {
            let totalAmount = 0
            let totalShare = 0
            let ds = this.$refs.shareList.kendoWidget()
            ds.data().forEach(v => {
                totalAmount += parseFloat(v.amount)
                totalShare += parseFloat(v.shareAmount)
            })
            window.console.log(totalAmount, totalShare, 'cal')
            this.s.totalAmount = totalAmount
            this.s.totalShare = totalShare
            this.s.remainingShare = this.oldShare - totalShare
        },
        rowNumberTmpl(dataItem) {
            let ds = this.$refs.profitDS.kendoWidget(),
                index = ds.indexOf(dataItem);
            return index + 1;
        },
        addRow() {
            if (this.s.pricePerShare.hasOwnProperty('id')) {
                let ds = this.$refs.shareList.kendoWidget(),
                    total = ds.total()
                let type = ''
                if (this.s.pricePerShare.typeOfShare) {
                    type = this.s.pricePerShare.typeOfShare.name
                }
                let p = 0
                if (this.s.pricePerShare.hasOwnProperty('pricePerShare')) {
                    p = parseFloat(this.s.pricePerShare.pricePerShare)
                }
                let newNum = ''
                let abbr = this.s.pricePerShare.abbr
                let lnum = this.zeroPad(this.lastNumber, 6)
                newNum = abbr + '-' + lnum
                ds.insert(total, {
                    id: 'ac-lstsh-' + uuid.v1(),
                    member: {},
                    typeOfShare: type,
                    shareAmount: 0,
                    sharePrice: p,
                    amount: 0,
                    lastNumber: this.lastNumber,
                    number: newNum,
                    locale: this.currencyCode,
                    format: this.format
                })
                this.lastNumber += 1
            }
        },
        removeRow(e) {
            e.preventDefault();
            const grid = $("#profitDS").data("kendoGrid"),
                dataSource = grid.dataSource,
                dataItem = grid.dataItem($(e.currentTarget).closest("tr"));

            if (dataSource.total() > 1) {
                dataSource.remove(dataItem)
            }
        },
        clear() {
            this.saleDeposit = {}
            this.depositLine = []
        },
        memberTemplate(dataItem) {
            const acc = dataItem.member
            if (acc) {
                return `<span>${acc.numberName ? acc.numberName : ``}</span>`
            } else {
                return ``
            }
        },
        memberDropDownEditor(container, options) {
            $('<input name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDropDownList({
                    autoBind: true,
                    autoWidth: true,
                    height: 400,
                    filter: "startswith",
                    dataTextField: "numberName",
                    dataValueField: "id",
                    template: "<span>#= numberName#</span>",
                    optionLabel: "--Select--",
                    dataSource: new kendo.data.DataSource({
                        data: this.memberList
                    })
                })
        },
        generateNumber(){
            let newNum = ''
            let abbr = 'DIV'
            let lnum = this.zeroPad(this.d.lastNumber, 6)
            newNum = abbr+lnum
            this.d.abbr = abbr
            this.d.number = newNum
        },
        async getLastNumber() {
            let data = {
                pk: 'ac-div-',
                module: 'func',
                lastSk: ''
            }
            memberHandler.getLastNumber(data).then(res => {
                this.lastNumber = res.data.data.lastNumber
                this.d.lastNumber = res.data.data.lastNumber
                this.generateNumber()
            }).catch(e => {
                this.$snotify.error('Something went wrong')
                this.errors.push(e)
            })
            let d = {
                pk: 'ac-memdiv-',
                module: 'func',
                lastSk: ''
            }
            memberHandler.getLastNumber(d).then(res => {
                this.memDivLastNum = res.data.data.lastNumber
            }).catch(e => {
                this.$snotify.error('Something went wrong')
                this.errors.push(e)
            })
        },
        numberFormat(value) {
            if (this.currencyCode) {
                let dec = this.decimals.filter((obj) => {
                    return obj.currency.code == this.currencyCode
                })
                let fo = 0
                if (dec.length > 0) {
                    fo = dec[0].decimal
                }
                this.inputDec = parseInt(fo)
                this.format = 'n' + fo
                return kendo.toString(value, 'n' + fo)
            }
        },
        async loadDecimal() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    loanHandler.decimalGet().then(res => {
                        this.decimals = res.data.data
                    })
                }, 300);
            })
        },
        async loadAccountName() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.segments = []
                    loanHandler.accountNameGet().then(res => {
                        this.showLoading = true
                        if (res.data.statusCode === 200) {
                            this.showLoading = false
                            if (res.data.data.length > 0) {
                                this.accountName = res.data.data[0].name
                            }
                        }
                        this.loadAccount()
                    }).catch()
                    {
                        this.showLoading = false
                    }
                }, 300)
            })
        },
        monthChange() {
            let f = new Date(this.d.monthFrom + '-01')
            let t = new Date(this.d.monthTo + '-01')
            if(f > t){
                this.$snotify.error('Month to must bigger then month from')
                this.d.monthTo = new Date().toISOString().substr(0, 10)
                this.d.monthFrom = new Date().toISOString().substr(0, 10)
            }
        },
        search(){
            let f = new Date(this.d.monthFrom + '-01')
            let t = new Date(this.d.monthTo + '-31')
            this.showLoading = true;
            if(isNaN(f.getTime())){
                f = new Date(this.d.monthFrom)
                f.setDate(1)
            }
            if(isNaN(t.getTime())){
                t = new Date(this.d.monthTo)
                t.setDate(31)
            }
            let sdate = kendo.toString(f, "yyyy-MM-dd") + "T00:00:00.000Z";
            let edate = kendo.toString(t, "yyyy-MM-dd") + "T23:59:59.999Z";
            incomeStatementHandler
                .getIncomeStatement({
                    params: {
                        start_date: sdate,
                        end_date: edate,
                        group_by: this.columnBy,
                    },
                })
                .then((res) => {
                    if (res.data) {
                        let balance = 0
                        res.data.forEach((value) => {
                            if(value.name == 'Profit For The Period'){
                                balance = value.balance
                            }
                        });
                        window.console.log(balance)
                        if(balance <= 0){
                            this.$snotify.error('No profit to allocation')
                        }else{
                            this.totalBalance = balance
                        }
                    }
                })
                .finally(() => {
                    this.showLoading = false;
                });
        },
        async loadInstituteInfo() {
            new Promise(resolve => {
                setTimeout(() => {
                    instituteHandler.getOneCompany(instituteId).then(res => {
                        this.currencyCode = res.baseCurrency.code
                        this.currency = res.baseCurrency
                        window.console.log(res.baseCurrency)
                        this.loadTransactionRate()
                    })
                    resolve('resolved');
                }, 200);
            });
        },
        basisChange() {
            if(parseFloat(this.d.basisAllocation) > parseFloat(this.totalBalance)){
                this.$snotify.error('Basis allocation is invalid')
                this.d.basisAllocation = 0
                this.basisDeclaration = 0
            }else{
                this.basisDeclaration = parseFloat(this.d.basisAllocation)
            }
        },
        async profitChanged(e) {
            if (e.field) {
                let dataRow = e.items[0]
                let ds = this.$refs.profitDS.kendoWidget()
                let t = 0
                let valid = true
                let all = 0
                if(e.field == "allocation") {
                    if (dataRow.allocation > 100) {
                        valid = false
                    }
                    $.each(ds.data(), function (i, v) {
                        t += parseFloat(v.allocation)
                    })
                    if (t > 100) {
                        valid = false
                    }
                    if(this.d.basisAllocation <= 0){
                        valid = false
                    }
                    if(!valid){
                        all = 0
                        dataRow.set('allocation', 0)
                    }else{
                        all = (parseFloat(dataRow.allocation) * parseFloat(this.d.basisAllocation)) / 100
                    }

                    dataRow.set('amount', all)
                    this.dividendPercentage = 100 - t
                    this.basisDeclaration = (this.dividendPercentage * parseFloat(this.d.basisAllocation)) / 100
                }
            }
        },
        proAccTemplate(dataItem) {
            const acc = dataItem.account
            if (Object.keys(acc).length > 0) {
                return `<span>${acc.number ? acc.number : ``} - ${ acc.accountName ? this.accountName == 'name' ? acc.name : acc.local_name : ``}</span>`
            } else {
                return ``
            }
        },
        proAccDropDownEditor(container, options) {
            $('<input name="' + options.field + '"/>')
                .appendTo(container)
                .kendoDropDownList({
                    autoBind: true,
                    autoWidth: true,
                    height: 400,
                    filter: "startswith",
                    dataTextField: "name", //this.proAccName,
                    dataValueField: "id",
                    template: "<span>#= number# - #= accountName == 'name' ? name : local_name#</span>",
                    optionLabel: "--Select--",
                    dataSource: new kendo.data.DataSource({
                        data: this.proAccList
                    })
                })
        },
        addProRow(){
            let ds = this.$refs.profitDS.kendoWidget(),
                total = ds.total()
            ds.insert(total, {
                id: 'ac-div-profitacc-' + uuid.v1(),
                account: {},
                allocation: 0,
                amount: 0,
                decimalFormat: this.format
            })
        },
        priceChange(){
            if(this.d.shareProduct) {
                this.showLoading = true
                memberHandler.shareByProductGet(this.d.shareProduct.id).then(res => {
                    let data = res.data.data
                    this.showLoading = false
                    if(data.length > 0){
                        let d = []
                        this.shareData = []
                        let self = this
                        $.each(data, function (i,v){
                            d.push({
                                memberId: v.memberId,
                                member: v.member,
                                shareholder: v.member.numberName,
                                shareBalance: parseInt(v.balance),
                                averageNoShare: 0,
                                dividendAmount: 0,
                                format: self.format,
                                lastNumber: self.memDivLastNum + i,
                                number: 'MDIV-' + self.zeroPad(self.memDivLastNum + i, 6)
                            })
                        })
                        this.shareData = d
                        this.loadAVGShare()
                    }
                })
            }
        },
        zeroPad(num, places) {
            return String(num).padStart(places, "0");
        },
        loadAVGShare(){
            this.showLoading = true
            let f = new Date(this.d.monthFrom + '-01')
            let t = new Date(this.d.monthTo + '-31')
            this.showLoading = true;
            if(isNaN(f.getTime())){
                f = new Date(this.d.monthFrom)
                f.setDate(1)
            }
            if(isNaN(t.getTime())){
                t = new Date(this.d.monthTo)
                t.setDate(31)
            }
            let sdate = kendo.toString(f, "yyyy-MM-dd")
            let edate = kendo.toString(t, "yyyy-MM-dd")
            let data = {
                startDate: sdate,
                endDate: edate,
                productId: this.d.shareProduct.id
            }
            memberHandler.calculateAVGShare(data).then(res => {
                this.showLoading = false
                let d = res.data.data
                let $startdate= new Date(f)
                let $enddate = new Date(t)
                let $months = $enddate.getMonth() - $startdate.getMonth() + (12 * ($enddate.getFullYear() - $startdate.getFullYear()));
                let self = this
                $.each(self.shareData, function (j,k){
                    let membalance = 0
                    let z = 1
                    let q = 0
                    let abalance = 0
                    for(let i = 0; i <= $months; i++){
                        let sdd = new Date(sdate).setDate(1)
                        if(q == 0 && i == 0){
                            let ss = kendo.toString(new Date(sdd), "yyyy-MM-dd")
                            let samt = 0
                            $.each(d.share, function (a,b){
                                if(b.typeId == k.memberId && b.month == ss){
                                    samt += parseInt(b.amount)
                                }
                            })
                            let wamt = 0
                            $.each(d.withdraw, function (a,b){
                                if(b.typeId == k.memberId && b.month == ss){
                                    wamt += parseInt(b.amount)
                                }
                            })
                            membalance += samt - wamt
                            abalance = samt - wamt
                        }else{
                            let n = new Date(sdd).getMonth() + z
                            let dateSrt = new Date(sdd).setMonth(n)
                            dateSrt = new Date(dateSrt)
                            dateSrt.setDate(1)
                            dateSrt = kendo.toString(dateSrt, "yyyy-MM-dd")
                            let samt = 0
                            $.each(d.share, function (a,b){
                                if(b.typeId == k.memberId && b.month == dateSrt){
                                    samt += parseInt(b.amount)
                                }
                            })
                            let wamt = 0
                            $.each(d.withdraw, function (a,b){
                                if(b.typeId == k.memberId && b.month == dateSrt){
                                    wamt += parseInt(b.amount)
                                }
                            })
                            if(q == 0){
                                membalance += samt - wamt
                                abalance = samt - wamt
                            }else if(q == 1) {
                                membalance += (abalance + samt) - wamt
                                abalance = (abalance + samt) - wamt
                            }
                            window.console.log(dateSrt, samt, wamt)
                            z++
                        }
                        if(membalance > 0){
                            q = 1
                        }
                        window.console.log(membalance, i)
                    }

                    k.averageNoShare = parseFloat((membalance / $months).toFixed(self.inputDec))
                    window.console.log(membalance,$months, 'bbb')
                })
                // this.shareDataA = this.shareData
                this.calDivPerShare()
            })
        },
        calDivPerShare(){
            let t = 0
            let self = this
            $.each(this.shareData, function (i,v){
                t += v.averageNoShare
            })
            let divpershare = this.basisDeclaration / t
            $.each(this.shareData, function (i,v){
                v.dividendAmount = parseFloat((v.averageNoShare * divpershare).toFixed(self.inputDec))
            })
            this.divPerShare = divpershare
            this.shareDataA = this.shareData
        },
        rowNumberTmpla(dataItem) {
            let ds = this.$refs.applyToLineDS.kendoWidget(),
                index = ds.indexOf(dataItem);
            return index + 1;
        },
        async loadSegment() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.segment = {}
                    loanHandler.businessSettingGet().then(res => {
                        this.showLoading = true
                        if (res.data.statusCode === 200) {
                            this.showLoading = false
                            let s = res.data.data.filter((obj) => {
                                return obj.type == "Member"
                            })
                            if (s.length > 0) {
                                this.segment = s[0].segment
                            } else {
                                this.$snotify.error('Please select segment on setting page')
                                this.cancel()
                            }
                        }
                    }).catch()
                    {
                        this.showLoading = false
                    }
                }, 300)
            })
        },
    },
    watch: {
    },
    mounted: async function () {
        await this.getJournalNumber()
        await this.loadSegment()
        this.getLastNumber()
        this.addEmpty()
    },
    created: async function () {
        await this.loadInstituteInfo()
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

.v-input--radio-group--row {
    margin-top: 0px !important;
    padding: 0px;
}

.v-input__control {
    height: 25px !important;
}
</style>

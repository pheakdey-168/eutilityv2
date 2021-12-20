<template>
    <v-app>
        <v-container>
            <v-row>
                <v-col sm="12" cols="12" class="pr-5">
                    <div class="wrapper-content">
                        <v-row>
                            <v-col sm="4" cols="12">
                                <v-card outlined dense class="block-green">
                                    <p style="font-size: 20px;" class="col-sm-6 float-left text-left mb-0 pa-0">
                                        {{ $t('base_currency') }}</p>
                                    <p style="font-size: 20px;" v-if="baseCurrency!=null"
                                       class="col-sm-6 float-left text-right mb-0 pa-0 font-bold">
                                        {{ baseCurrency }}
                                    </p>
                                </v-card>
                            </v-col>
                            <v-col sm="4" cols="12">
                                <v-card outlined dense class="block-green">
                                    <p style="font-size: 20px;" class="col-sm-6 float-left text-left mb-0 pa-0">
                                        {{ $t('reporting_currency') }}</p>
                                    <p style="font-size: 20px;" v-if="reportingCurrency!=null"
                                       class="col-sm-6 float-left text-right mb-0 pa-0 font-bold">{{ reportingCurrency
                                        }}</p>
                                </v-card>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col sm="4" cols="12">
                                <v-card outlined dense class="block-green">
                                    <p style="font-size: 20px;" class="col-sm-6 float-left text-left mb-0 pa-0">
                                        {{ $t('latest_rate_used') }}</p>
                                    <p style="font-size: 20px;"
                                       class="col-sm-6 float-left text-right mb-0 pa-0 font-bold">0.00</p>
                                </v-card>
                            </v-col>
                            <v-col sm="4" cols="12">
                                <v-card outlined dense class="block-green funct_click" link route
                                        to="functional_currency">
                                    <i class="fa fa-caret-right" aria-hidden="true"></i>
                                    <p style="font-size: 20px;" class="col-sm-6 float-left text-left mb-0 pa-0">
                                        {{ $t('functional_currency') }}</p>
                                    <p style="font-size: 20px;" v-if="totalFuncCurrencies!=null"
                                       class="col-sm-6 float-left text-right mb-0 pa-0 font-bold">{{ totalFuncCurrencies
                                        }}</p>
                                </v-card>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col sm="12" cols="12" class="tab_wrapper py-0">
                                <v-tabs>
                                    <v-tab>
										<span class="hidden-sm-and-up">
											<v-icon left>mdi-pen</v-icon>
										</span>
                                        <span class="hidden-sm-and-down text-capitalize">
											{{ $t('transaction_exchange_rate') }}
										</span>
                                    </v-tab>
                                    <v-tab>
										<span class="hidden-sm-and-up">
											<v-icon left>mdi-pen</v-icon>
										</span>
                                        <span class="hidden-sm-and-down text-capitalize">
											{{ $t('reporting_exchange_rate') }}
										</span>
                                    </v-tab>
                                    <v-tab>
										<span class="hidden-sm-and-up">
											<v-icon left>mdi-pen</v-icon>
										</span>
                                        <span class="hidden-sm-and-down text-capitalize">
											{{ $t('tax_exchange_rate') }}
										</span>
                                    </v-tab>

                                    <v-tab-item>
                                        <v-card flat>
                                            <v-card-text class="">
                                                <!--                        <h2>Transaction Exchange Rate</h2>-->
                                                <v-row>
                                                    <v-col sm="12" cols="12" class="py-0">
                                                        <template>
                                                            <v-dialog v-model="dialog" max-width="500px">
                                                                <template v-slot:activator="{ on, attrs }">
                                                                    <v-btn class="btn_create_new" v-bind="attrs"
                                                                           @click="btnTXNNew"
                                                                           v-on="on">
                                                                        <v-icon size="15" class="ma-1 mr-2">mdi mdi-plus
                                                                        </v-icon>
                                                                        {{ $t('new') }}
                                                                    </v-btn>
                                                                </template>

                                                                <v-card>
                                                                    <v-card-title>{{ $t('transaction_exchange_rate') }}
                                                                    </v-card-title>
                                                                    <v-icon class="btn_close" @click="dialog = false">
                                                                        close
                                                                    </v-icon>
                                                                    <v-divider/>
                                                                    <v-card-text
                                                                            style="height: 360px; background-color: #EDF1F5; color: #333;">
                                                                        <v-row>
                                                                            <v-col sm="12" cols="12" class="">
                                                                                <label class="label">{{
                                                                                    $t('effective_rate_date') }}</label>
                                                                                <v-menu
                                                                                        v-model="menuJDateTxn"
                                                                                        :close-on-content-click="false"
                                                                                        max-width="290">
                                                                                    <template
                                                                                            v-slot:activator="{ on, attrs }">
                                                                                        <v-text-field
                                                                                                class=" mb-3"
                                                                                                v-model="txnDate"
                                                                                                readonly
                                                                                                outlined
                                                                                                append-icon="event"
                                                                                                v-on="on"
                                                                                                v-bind="attrs"
                                                                                                @click:clear="txnDate = undefined"
                                                                                                @click:append="menuJDateTxn = true"
                                                                                                :rules="[v => !!v || 'Journal Date is required']"
                                                                                                required/>
                                                                                    </template>
                                                                                    <v-date-picker
                                                                                            v-model="txnDate"
                                                                                            @change="menuJDateTxn = false"
                                                                                            no-title/>
                                                                                </v-menu>

                                                                                <label class="label">{{ $t('currency')
                                                                                    }}</label>
                                                                                <p class="text_tip">{{
                                                                                    $t('pls_select_currency') }}</p>
                                                                                <v-select class=""
                                                                                          v-model="txnCurrency"
                                                                                          :items="functionalCurrencies"
                                                                                          item-value="code"
                                                                                          return-object
                                                                                          :item-text="item =>`${item.code} - ${item.name}`"
                                                                                          outlined/>
                                                                            </v-col>

                                                                            <v-col sm="6" cols="12" class="">
                                                                                <label class="label">{{$t('rate')}}</label>
                                                                                <v-text-field ref="field"
                                                                                              v-model="txnRate"
                                                                                              tage="Rte"
                                                                                              class=" col-sm-6"
                                                                                              @keypress="onlyNumeric($event,'txn')"
                                                                                              outlined/>
                                                                            </v-col>
                                                                            <v-col sm="6" cols="12" class="">
                                                                                <label class="label">{{ $t('source')
                                                                                    }}</label>
                                                                                <v-text-field
                                                                                        v-model="txnSource"
                                                                                        class=" col-sm-6"
                                                                                        tage="Source"
                                                                                        outlined
                                                                                        placeholder=""/>
                                                                            </v-col>
                                                                            <v-col sm="12" cols="12" class="">
                                                                                <p>{{ $t('note_exc_rate') }}</p>
                                                                            </v-col>
                                                                        </v-row>
                                                                    </v-card-text>
                                                                    <v-divider/>
                                                                    <v-card-actions class="function_footer">
                                                                        <v-btn class="btn_cancel float-left"
                                                                               @click="dialog = false">{{ $t('cancel')
                                                                            }}
                                                                        </v-btn>
                                                                        <v-btn class="btn_save_close float-right"
                                                                               @click="onSaveCloseTXN('txn')">
                                                                            {{ $t('save_close') }}
                                                                        </v-btn>
                                                                    </v-card-actions>

                                                                </v-card>
                                                            </v-dialog>
                                                        </template>
                                                    </v-col>
                                                </v-row>

                                                <v-row>
                                                    <v-col sm="12" cols="12">
                                                        <template>
                                                            <v-simple-table class="exchange-table" height="300px">
                                                                <template v-slot:default>
                                                                    <thead>
                                                                    <tr>
                                                                        <th class="text-uppercase">{{ $t('date') }}</th>
                                                                        <th class="text-right text-uppercase">{{
                                                                            $t('code') }}
                                                                        </th>
                                                                        <th class="text-uppercase">{{ $t('currency')
                                                                            }}
                                                                        </th>
                                                                        <th class="text-center text-uppercase">{{
                                                                            $t('symbol') }}
                                                                        </th>
                                                                        <th class="text-center text-uppercase">{{
                                                                            $t('rate') }}
                                                                        </th>
                                                                        <th class="text-center text-uppercase">{{
                                                                            $t('sources') }}
                                                                        </th>
                                                                        <th class="text-center text-uppercase">{{
                                                                            $t('method') }}
                                                                        </th>
                                                                        <th class="text-center text-uppercase" hidden>
                                                                            For Year
                                                                        </th>
                                                                        <th class="text-center text-uppercase">{{
                                                                            $t('action') }}
                                                                        </th>
                                                                    </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                    <tr v-for="item in transactionEx"
                                                                        v-bind:key="item.id">
                                                                        <td class="text-center">{{ item.recordDate }}
                                                                        </td>
                                                                        <td class="text-right">{{ item.code }}</td>
                                                                        <td>{{ item.name }}</td>
                                                                        <td class="text-center">{{ item.code + "/" +
                                                                            baseCurrency }}
                                                                        </td>
                                                                        <td class="text-center">{{ item.rate }}</td>
                                                                        <td class="text-center">{{ item.source }}</td>
                                                                        <td class="text-center">{{ item.method }}</td>
                                                                        <td class="text-center" hidden>{{ item.forYear
                                                                            }}
                                                                        </td>
                                                                        <td>
                                                                            <v-btn width="100%" color="green"
                                                                                   class="rounded-0"
                                                                                   @click="onRowClickTXN(item)">
                                                                                <span class="text-capitalize text-bold text-white">{{ $t('edit') }}</span>
                                                                            </v-btn>
                                                                        </td>
                                                                    </tr>
                                                                    </tbody>
                                                                </template>
                                                            </v-simple-table>
                                                        </template>
                                                    </v-col>
                                                </v-row>
                                            </v-card-text>
                                        </v-card>
                                    </v-tab-item>
                                    <v-tab-item>
                                        <v-card flat>
                                            <v-card-text class="">
                                                <!--                        <h2>Reporting Exchange Rate</h2>-->
                                                <v-row>
                                                    <v-col sm="12" cols="12" class="py-0">
                                                        <template>
                                                            <v-dialog v-model="dialog1" max-width="500px">
                                                                <template v-slot:activator="{ on, attrs }">
                                                                    <v-btn class="btn_create_new" v-bind="attrs"
                                                                           @click="btnRPTNew"
                                                                           v-on="on">
                                                                        <v-icon size="15" class="ma-1 mr-2">mdi mdi-plus
                                                                        </v-icon>
                                                                        {{ $t('new') }}
                                                                    </v-btn>
                                                                </template>

                                                                <v-card>
                                                                    <v-card-title>{{ $t('reporting_exchange_rate') }}
                                                                    </v-card-title>
                                                                    <v-icon class="btn_close" @click="dialog1 = false">
                                                                        close
                                                                    </v-icon>
                                                                    <v-divider/>
                                                                    <v-card-text
                                                                            style="height: 380px; background-color: #EDF1F5; color: #333;">
                                                                        <v-row>
                                                                            <v-col sm="6" cols="12" class="">
                                                                                <label class="label">{{
                                                                                    $t('record_date') }}</label>
                                                                                <v-menu
                                                                                        v-model="menuJDate"
                                                                                        :close-on-content-click="false"
                                                                                        max-width="290">
                                                                                    <template
                                                                                            v-slot:activator="{ on ,attrs}">
                                                                                        <v-text-field
                                                                                                class=" mb-2"
                                                                                                v-model="rptDate"
                                                                                                readonly
                                                                                                tage="Record Date"
                                                                                                outlined
                                                                                                append-icon="event"
                                                                                                v-on="on"
                                                                                                v-bind="attrs"
                                                                                                @click:clear="rptDate = undefined"
                                                                                                @click:append="menuJDate = true"
                                                                                                :rules="[v => !!v || 'Reporting Date is required']"
                                                                                                required/>
                                                                                    </template>
                                                                                    <v-date-picker
                                                                                            v-model="rptDate"
                                                                                            @change="menuJDate = false"
                                                                                            no-title/>
                                                                                </v-menu>
                                                                            </v-col>
                                                                            <v-col sm="6" cols="12" class="">
                                                                                <label class="label">For Year</label>
                                                                                <v-text-field
                                                                                        class=" mb-2"
                                                                                        v-model="rptForYear"
                                                                                        outlined
                                                                                        type="number"
                                                                                        tage="For you"
                                                                                        min="1990"
                                                                                        max="3000"
                                                                                        maxLength="4"
                                                                                        oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                                                                                        @keypress="onlyNumber"
                                                                                        :rules="[numberRule]"
                                                                                        required/>

                                                                            </v-col>
                                                                            <v-col sm="12" cols="12">
                                                                                <label class="label">{{ $t('currency')
                                                                                    }}</label>
                                                                                <p class="text_tip">{{
                                                                                    $t('pls_sl_curreny_record') }}</p>
                                                                                <v-select class=""
                                                                                          id=""
                                                                                          v-model="rptCurrency"
                                                                                          :items="rptCurrencies"
                                                                                          item-value="code"
                                                                                          return-object
                                                                                          :item-text="item =>`${item.code} - ${item.name}`"
                                                                                          outlined/>
                                                                            </v-col>

                                                                            <v-col sm="6" cols="12" class="pt-0">
                                                                                <label class="label">{{ $t('rate')
                                                                                    }}</label>
                                                                                <v-text-field ref="field"
                                                                                              v-model="rptRate"
                                                                                              tage="Rate"
                                                                                              class=" col-sm-6"
                                                                                              @keypress="onlyNumeric($event,'rpt')"
                                                                                              outlined/>
                                                                            </v-col>
                                                                            <v-col sm="6" cols="12" class="pt-0">
                                                                                <label class="label">{{ $t('source')
                                                                                    }}</label>
                                                                                <v-text-field
                                                                                        class=" col-sm-6"
                                                                                        outlined
                                                                                        tage="Source"
                                                                                        v-model="rptSource"
                                                                                        placeholder=""/>
                                                                            </v-col>

                                                                            <v-col sm="12" cols="12" class="">
                                                                                <label class="label">{{
                                                                                    $t('for_report_period') }}</label>
                                                                                <v-row>
                                                                                    <v-col sm="6" cols="12">
                                                                                        <v-select class=""
                                                                                                  v-model="accountingPeriodType"
                                                                                                  :items="accountingPeriodTypes"
                                                                                                  @change="loadAccountingPeriods"
                                                                                                  outlined/>
                                                                                    </v-col>
                                                                                    <v-col sm="6" cols="12">
                                                                                        <v-select class=""
                                                                                                  v-model="accPeriodModel"
                                                                                                  :items="accountingPeriodData"
                                                                                                  item-value="id"
                                                                                                  :item-text="item =>`${item.sk} - [${item.name}]`"
                                                                                                  return-object
                                                                                                  outlined/>
                                                                                    </v-col>
                                                                                </v-row>
                                                                            </v-col>
                                                                        </v-row>
                                                                    </v-card-text>
                                                                    <v-divider/>
                                                                    <v-card-actions class="function_footer">
                                                                        <v-btn class="btn_cancel float-left"
                                                                               @click="dialog1 = false">{{ $t('cancel')
                                                                            }}
                                                                        </v-btn>
                                                                        <v-btn class="btn_save_close float-right"
                                                                               @click="onSaveCloseRPT('rpt')"
                                                                               :disabled='isDisabled'> {{
                                                                            $t('save_close') }}
                                                                        </v-btn>
                                                                    </v-card-actions>
                                                                </v-card>
                                                            </v-dialog>
                                                        </template>
                                                    </v-col>
                                                </v-row>
                                                <v-row>
                                                    <v-col sm="12" cols="12">
                                                        <template>
                                                            <v-simple-table class="exchange-table" height="300px">
                                                                <template v-slot:default>
                                                                    <thead>
                                                                    <tr>
                                                                        <th class="text-uppercase">{{ $t('date') }}</th>
                                                                        <th class="text-right text-uppercase">{{
                                                                            $t('code') }}
                                                                        </th>
                                                                        <th class="text-uppercase">{{ $t('currency')
                                                                            }}
                                                                        </th>
                                                                        <th class="text-center text-uppercase">{{
                                                                            $t('reporting_period') }}
                                                                        </th>
                                                                        <th class="text-center text-uppercase">{{
                                                                            $t('rate') }}
                                                                        </th>
                                                                        <th class="text-center text-uppercase">{{
                                                                            $t('sources') }}
                                                                        </th>
                                                                        <th class="text-center text-uppercase">{{
                                                                            $t('sources') }}
                                                                        </th>
                                                                        <th class="text-center text-uppercase">{{
                                                                            $t('action') }}
                                                                        </th>
                                                                    </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                    <tr v-for="item in reportingEx"
                                                                        v-bind:key="item.id">
                                                                        <td class="text-center">{{ item.recordDate }}
                                                                        </td>
                                                                        <td class="text-right">{{ item.code }}</td>
                                                                        <td>{{ item.name }}</td>
                                                                        <td class="text-center">{{
                                                                            item.reportingPeriod.name }}
                                                                        </td>
                                                                        <td class="text-center">{{ item.rate }}</td>
                                                                        <td class="text-center">{{ item.source }}</td>
                                                                        <td class="text-center">{{ item.forYear }}</td>
                                                                        <td>
                                                                            <v-btn width="100%" color="green"
                                                                                   class="rounded-0"
                                                                                   @click="onRowClickRPT(item)">
                                                                                <span class="text-capitalize text-bold text-white">{{ $t('edit') }}</span>
                                                                            </v-btn>
                                                                        </td>
                                                                    </tr>
                                                                    </tbody>
                                                                </template>
                                                            </v-simple-table>
                                                        </template>
                                                    </v-col>
                                                </v-row>
                                            </v-card-text>
                                        </v-card>
                                    </v-tab-item>
                                    <v-tab-item>
                                        <v-card flat>
                                            <v-card-text class="">
                                                <!--                        <h2>Tax Exchange Rate</h2>-->
                                                <v-row>
                                                    <v-col sm="12" cols="12" class="py-0">
                                                        <template>
                                                            <v-dialog v-model="dialog3" max-width="500px">

                                                                <template v-slot:activator="{ on, attrs }">
                                                                    <!--                                    <div v-if="baseCurrency==='USD'">-->
                                                                    <v-btn class="btn_create_new" v-bind="attrs"
                                                                           @click="btnTAXNew"
                                                                           v-on="on">
                                                                        <v-icon size="15" class="ma-1 mr-2">mdi mdi-plus
                                                                        </v-icon>
                                                                        {{ $t('new') }}
                                                                    </v-btn>
                                                                    <!--                                    </div>-->
                                                                </template>

                                                                <v-card>
                                                                    <v-card-title>{{ $t('tax_exchange_rate') }}
                                                                    </v-card-title>
                                                                    <v-icon class="btn_close"
                                                                            @click="dialog3 = false">
                                                                        close
                                                                    </v-icon>
                                                                    <v-divider/>
                                                                    <v-card-text
                                                                            style="height: 290px; background-color: #EDF1F5; color: #333;">
                                                                        <v-row>
                                                                            <v-col sm="12" cols="12" class="" hidden>
                                                                                <label class="label">Currency</label>
                                                                                <p class="text_tip">{{
                                                                                    $t('pls_select_currency') }}</p>
                                                                                <v-select class=""
                                                                                          v-model="taxCurrency"
                                                                                          :items="functionalCurrencies"
                                                                                          item-value="code"
                                                                                          return-object
                                                                                          :item-text="item =>`${item.code} - ${item.name}`"
                                                                                          outlined/>
                                                                            </v-col>
                                                                            <v-col sm="12" cols="12" class="">
                                                                                <label class="label">{{
                                                                                    $t('record_date') }}</label>
                                                                                <v-menu
                                                                                        v-model="menuJDateTax_"
                                                                                        :close-on-content-click="false"
                                                                                        max-width="290">
                                                                                    <template
                                                                                            v-slot:activator="{ on ,attrs}">
                                                                                        <v-text-field
                                                                                                class=""
                                                                                                v-model="taxDate"
                                                                                                readonly
                                                                                                outlined
                                                                                                tage="Record Date"
                                                                                                append-icon="event"
                                                                                                v-on="on"
                                                                                                v-bind="attrs"
                                                                                                @click:clear="taxDate = undefined"
                                                                                                @click:append="menuJDateTax_ = true"
                                                                                                :rules="[v => !!v || 'Journal Date is required']"
                                                                                                required/>
                                                                                    </template>
                                                                                    <v-date-picker
                                                                                            v-model="taxDate"
                                                                                            @change="menuJDateTax_ = false"
                                                                                            no-title/>
                                                                                </v-menu>
                                                                            </v-col>
                                                                            <v-col sm="6" cols="12" class="">
                                                                                <label class="label">{{ $t('rate')
                                                                                    }}</label>
                                                                                <v-text-field ref="field"
                                                                                              v-model="taxRate"
                                                                                              tage="Rate"
                                                                                              class=" col-sm-6"
                                                                                              @keypress="onlyNumeric($event,'tax')"
                                                                                              outlined/>
                                                                            </v-col>
                                                                            <v-col sm="6" cols="12" class="">
                                                                                <label class="label">{{ $t('source')
                                                                                    }}</label>
                                                                                <v-text-field
                                                                                        v-model="taxSource"
                                                                                        class=" col-sm-6"
                                                                                        tage="Source"
                                                                                        outlined
                                                                                        placeholder=""/>
                                                                            </v-col>

                                                                            <v-col sm="12" cols="12" class="">
                                                                                <label class="label">{{
                                                                                    $t('for_report_period') }}</label>
                                                                                <v-menu
                                                                                        v-model="menuJDateTax"
                                                                                        :close-on-content-click="false"
                                                                                        max-width="290">
                                                                                    <template
                                                                                            v-slot:activator="{ on ,attrs}">
                                                                                        <v-text-field
                                                                                                class=""
                                                                                                v-model="taxReportingPeriod"
                                                                                                tage="For Report Period"
                                                                                                readonly
                                                                                                outlined
                                                                                                append-icon="event"
                                                                                                v-on="on"
                                                                                                v-bind="attrs"
                                                                                                @click:clear="taxReportingPeriod = undefined"
                                                                                                @click:append="menuJDateTax = true"
                                                                                                :rules="[v => !!v || 'Journal Date is required']"
                                                                                                required/>
                                                                                    </template>
                                                                                    <v-date-picker
                                                                                            v-model="taxReportingPeriod"
                                                                                            @change="menuJDateTax = false"
                                                                                            no-title/>
                                                                                </v-menu>
                                                                            </v-col>
                                                                        </v-row>
                                                                    </v-card-text>
                                                                    <v-divider/>
                                                                    <v-card-actions class="function_footer">
                                                                        <v-btn class="btn_cancel float-left"
                                                                               @click="dialog3 = false">{{ $t('cancel')
                                                                            }}
                                                                        </v-btn>
                                                                        <v-btn class="btn_save_close float-right"
                                                                               @click="onSaveCloseTAX('tax')">
                                                                            {{ $t('save_close') }}
                                                                        </v-btn>
                                                                    </v-card-actions>

                                                                </v-card>
                                                            </v-dialog>
                                                        </template>
                                                    </v-col>
                                                </v-row>
                                                <v-row>
                                                    <v-col sm="12" cols="12">
                                                        <template>
                                                            <v-simple-table class="exchange-table" height="300px">
                                                                <template v-slot:default>
                                                                    <thead>
                                                                    <tr>
                                                                        <th class="text-uppercase">{{ $t('date') }}</th>
                                                                        <th class="text-right text-uppercase">{{
                                                                            $t('code') }}
                                                                        </th>
                                                                        <th class="text-uppercase">{{ $t('currency')
                                                                            }}
                                                                        </th>
                                                                        <th class="text-center text-uppercase">{{
                                                                            $t('reporting_period') }}
                                                                        </th>
                                                                        <th class="text-center text-uppercase">{{
                                                                            $t('rate') }}
                                                                        </th>
                                                                        <th class="text-center text-uppercase">{{
                                                                            $t('sources') }}
                                                                        </th>
                                                                        <th class="text-center text-uppercase">{{
                                                                            $t('action') }}
                                                                        </th>
                                                                    </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                    <tr v-for="item in taxEx" v-bind:key="item.id">
                                                                        <td class="text-center">{{ item.recordDate }}
                                                                        </td>
                                                                        <td class="text-right">{{ item.code }}</td>
                                                                        <td>{{ item.name }}</td>
                                                                        <td class="text-center">{{ item.reportingPeriod
                                                                            }}
                                                                        </td>
                                                                        <td class="text-center">{{ item.rate }}</td>
                                                                        <td class="text-center">{{ item.source }}</td>
                                                                        <td>
                                                                            <v-btn width="100%" color="green"
                                                                                   class="rounded-0"
                                                                                   @click="onRowClickTAX(item)">
                                                                                <span class="text-capitalize text-bold text-white">{{ $t('edit') }}</span>
                                                                            </v-btn>
                                                                        </td>
                                                                    </tr>
                                                                    </tbody>
                                                                </template>
                                                            </v-simple-table>
                                                        </template>
                                                    </v-col>
                                                </v-row>
                                            </v-card-text>
                                        </v-card>
                                    </v-tab-item>
                                </v-tabs>
                            </v-col>
                        </v-row>
                    </div>
                    <LoadingMe
                            :isLoading="completedLoading"
                            :fullPage="isFullPage"
                            :myLoading="true"/>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<script>
    const axios = require('axios')
    import LoadingMe from '@/components/Loading'
    import apiUrl from "../apiUrl"
    // import MoneyInput from "@/components/custom_templates/MoneyInput"

    const store = require("../institute.js")

    export default {
        name: "",
        components: {
            'LoadingMe': LoadingMe,
            // 'numberInput': VueNumeric
        },
        data: () => ({
            myDate: '',
            dialog: false,
            dialog1: false,
            dialog3: false,
            menuJDate: false,
            menuJDateForYear: false,
            menuJDateTax: false,
            menuJDateTax_: false,
            menuJDateTxn: false,
            completedLoading: true,
            isFullPage: false,
            isDisabled: false,
            rptDate: new Date().toISOString().substr(0, 10),
            txnDate: new Date().toISOString().substr(0, 10),
            taxDate: new Date().toISOString().substr(0, 10),
            rptForYear: new Date().toISOString().substr(0, 4),
            taxReportingPeriod: new Date().toISOString().substr(0, 10),
            accountingPeriodTypes: ['Monthly', 'Quarterly', 'Semi-Annually', 'Annually'],
            baseCurrency: '-',
            fiscalDate: '-',
            currency: '',
            numberRule: v => {
                if (!v.trim()) return true;
                if (!isNaN(parseFloat(v)) && v >= 1990 && v <= 3000) return true;
                return 'Number has to be between 1990 and 3000';
            },
            taxCurrency:
                {
                    "code": "KHR",
                    "createdAt": 1596425345371,
                    "method": "Manual",
                    "name": "Cambodian Riel",
                    "pk": "",
                    "rate": 4200.25,
                    "recordDate": "2020-08-03",
                    "reportingPeriod": "2020-09-01",
                    "sk": "",
                    "source": "CNBC",
                    "symbol": "KHR",
                    "symbolNative": "៛",
                    "updatedAt": 1596425345371
                },
            txnCurrency: '',
            rptRate: 1.00,
            txnRate: 1.00,
            taxRate: 1.00,
            accountingPeriodData: [],
            accountingPeriodType: '',
            reportingCurrency: '-',
            functionalCurrencies: [],
            rptCurrencies: [],
            rptCurrency: '',
            reportingEx: [],
            rptSource: '',
            txnSource: '',
            taxSource: '',
            taxSK: '',
            rptSK: '',
            txnSK: '',
            transactionEx: [],
            taxEx: [],
            accPeriodModel: [],
            totalFuncCurrencies: 0
        }),
        methods: {
            onlyNumber($event) {
                //console.log($event.keyCode); //keyCodes value
                let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
                if ((keyCode < 48 || keyCode > 57)) { // 46 is dot
                    $event.preventDefault();
                }
            },
            onlyNumeric($event, type) {
                // console.log($event.keyCode); //keyCodes value
                let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
                if (type === 'rpt') {
                    this.rptRate = this.rptRate.toString().replace(/[^0-9.]/g, '')
                    if ((keyCode !== 46 || this.rptRate.toString().indexOf('.') !== -1) && (keyCode < 48 || keyCode > 57)) {
                        $event.preventDefault()
                    }
                } else if (type === 'txn') {
                    this.txnRate = this.txnRate.toString().replace(/[^0-9.]/g, '')
                    if ((keyCode !== 46 || this.txnRate.toString().indexOf('.') !== -1) && (keyCode < 48 || keyCode > 57)) {
                        $event.preventDefault()
                    }
                } else if (type === 'tax') {
                    this.taxRate = this.taxRate.toString().replace(/[^0-9.]/g, '')
                    if ((keyCode !== 46 || this.taxRate.toString().indexOf('.') !== -1) && (keyCode < 48 || keyCode > 57)) {
                        $event.preventDefault()
                    }
                }

            },
            async loadDashboard() {
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved')
                        this.baseCurrency = store.default.state.institute.currency === undefined ? '-' : store.default.state.institute.currency
                        this.reportingCurrency = store.default.state.institute.reportCurrency === undefined ? '-' : store.default.state.institute.reportCurrency
                        this.completedLoading = false
                        this.fiscalDate = store.default.state.institute.fishScaleDate === undefined ? '-' : store.default.state.institute.fishScaleDate
                    }, 300)
                })
            },
            async loadAccountingPeriods() {
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved')
                        axios.get(apiUrl.accounting_period_by_type_get + this.accountingPeriodType)
                            .then(res => {
                                //eslint-disable-next-line no-console
                                // window.console.log(res.data.data.Items)
                                this.accountingPeriodData = res.data.data.Items.sort((a, b) => a.createdAt - b.createdAt)
                            })
                    }, 300)
                })
            },
            async loadFunctionalCurrencies() {
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved')
                        axios.get(apiUrl.xchange_get + 'fnc')
                            .then(res => {
                                this.functionalCurrencies = res.data.data
                                this.totalFuncCurrencies = res.data.data.length
                                this.rptCurrencies = this.functionalCurrencies.filter(
                                    item => item.code === this.reportingCurrency
                                )
                                this.rptCurrency = this.rptCurrencies[0]
                                this.completedLoading = false
                            })
                    }, 300)
                })
            },
            async onSaveCloseRPT(type) {
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved')
                        this.isDisabled = true
                        //eslint-disable-next-line no-console
                        let raw = this.accPeriodModel
                        // let currentDate = new Date()
                        let startDate = new Date(raw.startDate)
                        let endDate = new Date(raw.endDate)
                        let name = this.accPeriodModel.name
                        this.accPeriodModel.startDate = this.rptForYear + "-" + ('0' + (startDate.getMonth() + 1)).slice(-2) + "-" + ('0' + startDate.getDate()).slice(-2)
                        this.accPeriodModel.endDate = this.rptForYear + "-" + ('0' + (endDate.getMonth() + 1)).slice(-2) + "-" + ('0' + endDate.getDate()).slice(-2)

                        if (name.includes('/')) {
                            name = name.split('/')[0] + '/' + this.rptForYear
                            this.accPeriodModel.name = name
                        } else {
                            this.accPeriodModel.name = name + "/" + this.rptForYear
                        }
                        window.console.log(type, this.rptRate)
                        let strUrl = apiUrl.xchange_post
                        let method = 'post'
                        if (this.rptSK !== '') {
                            strUrl = apiUrl.xchange_post + "/update/" + this.rptSK
                            method = 'put'
                        }
                        axios({
                            method: method,
                            url: strUrl,
                            data: {
                                "type": type,
                                "code": this.rptCurrency.code,
                                "name": this.rptCurrency.name,
                                "symbol": this.rptCurrency.symbol,
                                "symbolNative": this.rptCurrency.symbolNative,
                                "rate": parseFloat(this.rptRate),
                                "method": "Manual",
                                "forYear": this.rptForYear,
                                "source": this.rptSource,
                                "recordDate": this.rptDate,
                                "reportingPeriod": this.accPeriodModel
                            }
                        }).then(response => {
                            // eslint-disable-next-line no-console
                            console.log(response)
                            this.dialog1 = false
                            this.isDisabled = false
                            this.completedLoading = false
                            this.accPeriodModel.name = name
                            this.loadData(type)
                            // this.loadAccountPrefixes()
                        }).catch(e => {
                            this.errors.push(e)
                        })
                    }, 200)
                })
            },
            async onSaveCloseTXN(type) {
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved')
                        this.isDisabled = true
                        //eslint-disable-next-line no-console
                        window.console.log(type, this.txnDate)
                        let strUrl = apiUrl.xchange_post
                        let method = 'post'
                        const forYear = new Date(this.txnDate)
                        if (this.txnSK !== '') {
                            strUrl = apiUrl.xchange_post + "/update/" + this.txnSK
                            method = 'put'
                        }
                        axios({
                            method: method,
                            url: strUrl, data: {
                                "type": type,
                                "code": this.txnCurrency.code,
                                "name": this.txnCurrency.name,
                                "symbol": this.txnCurrency.symbol,
                                "symbolNative": this.txnCurrency.symbolNative,
                                "rate": parseFloat(this.txnRate),
                                "method": "Manual",
                                "forYear": forYear.getFullYear(),
                                "source": this.txnSource,
                                "recordDate": this.txnDate, // effective date
                                "reportingPeriod": this.txnCurrency
                            }
                        }).then(response => {
                            // eslint-disable-next-line no-console
                            console.log(response)
                            this.dialog = false
                            this.isDisabled = false
                            this.completedLoading = false
                            this.loadData(type)
                        }).catch(e => {
                            this.errors.push(e)
                        })
                    }, 200)
                })
            },
            async onSaveCloseTAX(type) {
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved')
                        //eslint-disable-next-line no-console
                        this.isDisabled = true
                        window.console.log(type, this.taxCurrency)
                        let strUrl = apiUrl.xchange_post
                        let method = 'post'
                        const forYear = new Date(this.taxDate)
                        if (this.taxSK !== '') {
                            strUrl = apiUrl.xchange_post + "/update/" + this.taxSK
                            method = 'put'
                        }
                        axios({
                            method: method,
                            url: strUrl,
                            data: {
                                "type": type,
                                "code": this.taxCurrency.code,
                                "name": this.taxCurrency.name,
                                "symbol": this.taxCurrency.symbol,
                                "symbolNative": this.taxCurrency.symbolNative,
                                "rate": parseFloat(this.taxRate),
                                "method": "Manual",
                                "forYear": forYear.getFullYear(),
                                "source": this.taxSource,
                                "recordDate": this.taxDate, // effective date
                                "reportingPeriod": this.taxReportingPeriod
                            }
                        }).then(response => {
                            // eslint-disable-next-line no-console
                            console.log(response)
                            this.dialog3 = false
                            this.isDisabled = false
                            this.completedLoading = false
                            this.loadData(type)
                        }).catch(e => {
                            this.errors.push(e)
                        })
                        /*axios.post(strUrl, {
                          "type": type,
                          "code": this.taxCurrency.code,
                          "name": this.taxCurrency.name,
                          "symbol": this.taxCurrency.symbol,
                          "symbolNative": this.taxCurrency.symbol_native,
                          "rate": parseFloat(this.taxRate),
                          "method": "Manual",
                          "source": this.taxSource,
                          "recordDate": this.taxDate, // effective date
                          "reportingPeriod": this.taxReportingPeriod
                        }).then(response => {
                          // eslint-disable-next-line no-console
                          console.log(response)
                          this.dialog3 = false
                          this.isDisabled = false
                          this.completedLoading = false
                          this.loadData(type)
                        }).catch(e => {
                          this.errors.push(e)
                        })*/
                    }, 200)
                })
            },
            async loadData(type) {
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        axios.get(apiUrl.xchange_get + type)
                            .then(res => {
                                if (type === 'rpt') {
                                    this.reportingEx = res.data.data
                                } else if (type === 'txn') {
                                    this.transactionEx = res.data.data
                                } else if (type === 'tax') {
                                    this.taxEx = res.data.data
                                }
                                this.completedLoading = false
                            })
                    }, 300)
                })
            },
            async onRowClickTAX(row) {
                this.taxDate = row.recordDate
                this.taxReportingPeriod = row.reportingPeriod
                this.taxRate = row.rate
                this.taxSource = row.source
                this.taxSK = row.sk
                this.dialog3 = true
            },
            async onRowClickRPT(row) {
                window.console.log("Row click", row)
                this.rptDate = row.recordDate
                this.accountingPeriodType = row.reportingPeriod.type

                await this.loadAccountingPeriods()
                this.accPeriodModel = row.reportingPeriod
                this.rptRate = row.rate
                this.rptSource = row.source
                this.rptSK = row.sk
                this.rptForYear = row.forYear ? row.forYear : this.rptForYear
                let filter = this.rptCurrencies.filter(
                    m => m.code === row.code
                )
                if (filter) {
                    this.rptCurrency = filter[0]
                }
                this.dialog1 = true
            },
            async onRowClickTXN(row) {
                window.console.log("Row click", row)
                this.txnDate = row.recordDate
                this.accountingPeriodType = row.reportingPeriod.type

                this.txnRate = row.rate
                this.txnSource = row.source
                this.txnSK = row.sk
                let filter = this.functionalCurrencies.filter(
                    m => m.code === row.code
                )
                if (filter) {
                    this.txnCurrency = filter[0]
                }
                this.dialog = true
            },
            async btnRPTNew() {
                this.rptSK = ''
            },
            async btnTXNNew() {
                this.txnSK = ''
            },
            async btnTAXNew() {
                this.taxSK = ''
            }
        },
        mounted: async function () {
            await this.loadDashboard()
            await this.loadFunctionalCurrencies()
            await this.loadData('rpt')
            await this.loadData('txn')
            await this.loadData('tax')
        }
    }
</script>
<style scoped>
    .wrapper-content .block-green {
        background-color: #2CA01C;
        padding: 10px;
        min-height: 50px;
        justify-content: center;
        display: flex;
        align-items: center;
        /* border: none !important; */
        border-radius: 0 !important;
    }

    .wrapper-content .block-green p {
        color: #fff;
        text-transform: uppercase;
        font-family: "Krasar-Bold", serif !important;
    }

    .tab_wrapper {
        position: relative;
        display: inherit;
    }

    .dropdown_transactions.v-btn {
        background-color: #2CA01C !important;
        height: 40px !important;
        width: auto !important;
        border-radius: 0 !important;
        padding: 0 5px 0 10px !important;
        color: #fff !important;
        right: 0;
        position: absolute;
        top: 7px;
    }

    .theme--light.v-tabs >>> .v-tabs-bar {
        border-bottom: 1px solid #ddd !important;
    }

    .v-card__text {
        padding: 15px !important;
    }

    .v-card__actions .v-btn.v-btn {
        padding: 0 16px;
    }

    .exchange-table.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
        font-family: 'Krasar-Bold', serif;
        color: #000 !important;
        border-top: 1px solid #000 !important;
        border-bottom: 0 !important;
        font-size: 15px !important;
    }

    .exchange-table.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > td {
        color: #000 !important;
        padding: 5px !important;
    }

    .exchange-table.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > td:not(.v-data-table__mobile-row) {
        border-top: 1px solid #000 !important;
        border-bottom: 1px solid #000 !important;
    }

    .exchange-table.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
        height: 40px !important;
        border-bottom: 1px solid #000 !important;
    }

    .function_footer {
        padding: 15px;
        display: inline-block;
    }

    .funct_click {
        transition: box-shadow 200ms;
        border-left: 4px solid #21abf6 !important;
        position: relative;
    }


    .funct_click::before {
        content: "";
        posistion: absolute;
        width: 0;
        height: 0;
        margin-top: 13px;
        marin-left: -10px;
        border-top: 10px solid transparent;
        border-left: 20px solid #f33;
        border-bottom: 10px solid transparent;
        float: left;
    }

    .funct_click i {
        color: #21abf6;
        font-size: 30px;
        transition: 0.5s ease-in;
        position: absolute;
        left: 2px
    }

    .funct_click:hover i {
        position: absolute;
        left: 90%;

    }
</style>
	
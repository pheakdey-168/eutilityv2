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
                                        <h2>{{ $t('loan_agreement') }}</h2>
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
                                            <v-row class="px-6">
                                                <v-col>
                                                    <v-row>
                                                        <v-col  sm="4" cols="12" class="pb-0">
                                                            <v-radio-group disabled 
                                                                            height="0px"
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
                                                                    value="isCusomer">
                                                                </v-radio>
                                                            </v-radio-group>
                                                            <div v-if="selectMember == 'isMember'"
                                                                 class="kendo_dropdown_custom  mt-1 pb-2">
                                                                <dropdownlist
                                                                    disabled
                                                                    class="v-input__slot"
                                                                    :data-items="memberList"
                                                                    @change="onMemberChange"
                                                                    :value="loan.member"
                                                                    :data-item-key="dataItemKey"
                                                                    :text-field="textField"
                                                                    :default-item="memberItem"
                                                                    :filterable="true"
                                                                    @filterchange="onMemberFilterChange">
                                                                </dropdownlist>
                                                            </div>
                                                            <div v-else class="kendo_dropdown_custom mt-1 pb-2">
                                                                <dropdownlist
                                                                    disabled
                                                                    class="v-input__slot"
                                                                    :data-items="customerList"
                                                                    @change="onCustomerChange"
                                                                    :value="loan.customer"
                                                                    :data-item-key="dataItemKey"
                                                                    :text-field="textField"
                                                                    :default-item="customerItem"
                                                                    :filterable="true"
                                                                    @filterchange="onCustomerFilterChange">
                                                                </dropdownlist>
                                                            </div>

                                                            <v-simple-table class="mb-4">
                                                                <template v-slot:default disabled>
                                                                    <tbody>
                                                                    <tr>
                                                                        <td>{{ $t('name') }} :</td>
                                                                        <td>{{ member.name }}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>{{ $t('dob') }} :</td>
                                                                        <td>{{ member.dob }}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>{{ $t('sex') }} :</td>
                                                                        <td>{{ member.gender ? member.gender.name : '' }}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>{{ $t('identity_n') }} :</td>
                                                                        <td>{{ member.idNumber }}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>{{ $t('address') }} :</td>
                                                                        <td>
                                                                            <v-dialog v-model="showAddress" max-width="500px">
                                                                                <template v-slot:activator="{ on }">
                                                                                    <v-btn color="primary" rounded
                                                                                           class="btn_create_new float-right mb-4"
                                                                                           @click="viewAddress"
                                                                                           v-on="on">
                                                                                        {{ $t('view') }}
                                                                                    </v-btn>
                                                                                </template>
                                                                                <v-form>
                                                                                    <v-card>
                                                                                        <v-card-title>{{
                                                                                                $t('guarantor')
                                                                                            }}
                                                                                        </v-card-title>
                                                                                        <v-icon class="btn_close"
                                                                                                @click="showAddress = false">
                                                                                            close
                                                                                        </v-icon>
                                                                                        <v-divider/>
                                                                                        <v-card-text
                                                                                            style="min-height: 260px; background-color: #EDF1F5; color: #333;">
                                                                                            <v-row>
                                                                                                <v-col cols="12" sm="12"
                                                                                                       class="py-0">
                                                                                                    <table>
                                                                                                        <thead>
                                                                                                        <tr>
                                                                                                            <th class="text-uppercase">{{ $t('name') }}</th>
                                                                                                            <th class="text-uppercase">{{ $t('type') }}</th>
                                                                                                            <th class="text-uppercase">{{ $t('country') }}</th>
                                                                                                            <th class="text-uppercase">{{ $t('address_line_1') }}</th>
                                                                                                            <th class="text-uppercase">{{ $t('address_line_2') }}</th>
                                                                                                        </tr>
                                                                                                        </thead>
                                                                                                        <tbody>
                                                                                                        <tr v-for="d in member.addresses" v-bind:key="d.id">
                                                                                                            <td>{{ d.name }}</td>
                                                                                                            <td class="">{{ d.type }}</td>
                                                                                                            <td class="">{{ d.country ? d.country.country : ''}}</td>
                                                                                                            <td class="">{{ d.line1 }}</td>
                                                                                                            <td class="">{{ d.line2 }}</td>
                                                                                                        </tr>
                                                                                                        </tbody>
                                                                                                    </table>
                                                                                                </v-col>
                                                                                            </v-row>
                                                                                        </v-card-text>
                                                                                        <v-divider/>
                                                                                        <v-card-actions
                                                                                            class="function_footer pa-4">
                                                                                            <v-btn outlined color="#494846"
                                                                                                   class="float-left text-capitalize"
                                                                                                   @click="showAddress = false">{{
                                                                                                    $t('cancel')
                                                                                                }}
                                                                                            </v-btn>
                                                                                        </v-card-actions>
                                                                                    </v-card>
                                                                                </v-form>
                                                                            </v-dialog>
                                                                        </td>
                                                                    </tr>
                                                                    </tbody>
                                                                </template>
                                                            </v-simple-table>

                                                            <label
                                                                class="label  mb-0 mt-4">{{ $t('loan_product') }}</label>
                                                            <v-select
                                                                disabled
                                                                class="mt-1"
                                                                :items="loanProducts"
                                                                placeholder="select"
                                                                item-text="name"
                                                                tage="select"
                                                                @change="loanProductChange"
                                                                v-model="loan.loanProduct"
                                                                return-object
                                                                outlined/>
                                                            <label class="label mb-0">{{ $t('loan_num') }}</label>
                                                            <v-text-field
                                                                class="mt-1"
                                                                v-model="loan.number"
                                                                outlined
                                                                disabled
                                                                :rules="[v => !!v || 'Number is required']"
                                                            />
                                                        </v-col>
                                                        <v-col sm="8" cols="12" class="pb-0 function_content">
                                                            <v-row>
                                                                <v-col sm="12" cols="12" class="dp_flex py-0">
                                                                    <label
                                                                        class="label  mb-0 width_50 pt-4">{{ $t('ownership_type') }}</label>
                                                                    <v-select
                                                                        disabled
                                                                        class="mt-1"
                                                                        placeholder="select"
                                                                        item-text="name"
                                                                        item-value="name"
                                                                        :items="ownerShipTypes"
                                                                        v-model="loan.ownerShipType"
                                                                        tage="select"
                                                                        @change="ownerShipChange"
                                                                        return-object
                                                                        outlined/>
                                                                </v-col>
                                                                <v-col class="" sm="12" cols="12" :hidden="isOwnerShipS">
                                                                    <v-dialog v-model="showBorrower" max-width="500px">
                                                                        <template v-slot:activator="{ on }">
                                                                            <v-btn color="primary" rounded
                                                                                   class="btn_create_new float-right mb-4"
                                                                                   @click="addBorrower"
                                                                                   v-on="on">
                                                                                {{ $t('add_borrowers') }}
                                                                            </v-btn>
                                                                        </template>
                                                                        <v-form
                                                                            ref="form"
                                                                            v-model="valid"
                                                                            lazy-validation>
                                                                            <v-card>
                                                                                <v-card-title>{{
                                                                                        $t('borrowers')
                                                                                    }}
                                                                                </v-card-title>
                                                                                <v-icon class="btn_close"
                                                                                        @click="showBorrower = false">
                                                                                    close
                                                                                </v-icon>
                                                                                <v-divider/>
                                                                                <v-card-text
                                                                                    style="min-height: 260px; background-color: #EDF1F5; color: #333;">
                                                                                    <v-row>
                                                                                        <v-col cols="12" sm="12"
                                                                                               class="py-0">
                                                                                            <label
                                                                                                class="mb-0">{{
                                                                                                    $t('name')
                                                                                                }}</label>
                                                                                            <v-text-field
                                                                                                class="mt-1"
                                                                                                tage="name"
                                                                                                v-model="guarantor.name"
                                                                                                outlined
                                                                                            />
                                                                                            <label
                                                                                                class="label mb-0">{{
                                                                                                    $t('identity_n')
                                                                                                }}</label>
                                                                                            <v-text-field
                                                                                                class="mt-1"
                                                                                                tage="name"
                                                                                                v-model="guarantor.id"
                                                                                                outlined
                                                                                            />
                                                                                            <label
                                                                                                class="label mb-0">{{
                                                                                                    $t('phone')
                                                                                                }}</label>
                                                                                            <v-text-field
                                                                                                class="mt-1"
                                                                                                tage="phone"
                                                                                                v-model="guarantor.phone"
                                                                                                outlined
                                                                                            />
                                                                                        </v-col>
                                                                                    </v-row>
                                                                                </v-card-text>
                                                                                <v-divider/>
                                                                                <v-card-actions
                                                                                    class="function_footer pa-4">
                                                                                    <v-btn outlined color="#494846"
                                                                                           class="float-left text-capitalize"
                                                                                           @click="showGuarantor = false">{{
                                                                                            $t('cancel')
                                                                                        }}
                                                                                    </v-btn>
                                                                                    <v-btn
                                                                                        color="secondary"
                                                                                        @click="saveGuarantor"
                                                                                        class="white--text text-capitalize float-right mr-4 mb-2">
                                                                                        {{ $t('save_close') }}
                                                                                    </v-btn>
                                                                                </v-card-actions>
                                                                            </v-card>
                                                                        </v-form>
                                                                    </v-dialog>
                                                                    <template>
                                                                        <v-simple-table class="attachment_table">
                                                                            <template v-slot:default>
                                                                                <thead>
                                                                                <tr>
                                                                                    <th class="text-uppercase">
                                                                                        {{ $t('name') }}
                                                                                    </th>
                                                                                    <th class="text-uppercase">
                                                                                        {{ $t('identity_n') }}
                                                                                    </th>
                                                                                     <th class="text-uppercase">
                                                                                        {{ $t('phone') }}
                                                                                    </th>
                                                                                    <th style="width: 50px"/>
                                                                                </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                <tr v-for="d in guarantors"
                                                                                    v-bind:key="d.id">
                                                                                    <td>{{ d.name }}</td>
                                                                                    <td class="">{{ d.type }}</td>
                                                                                    <td class="">{{ d.type }}</td>
                                                                                    <td>
                                                                                        <v-btn class="btn_edit_setting"
                                                                                               @click="editGuarantor(d)">
                                                                                            <v-icon class="white--text"
                                                                                                    size="12">fa
                                                                                                fa-pen
                                                                                            </v-icon>
                                                                                            <span
                                                                                                class="capitalize ml-1 white--text font_14">{{
                                                                                                    $t('edit')
                                                                                                }}</span>
                                                                                        </v-btn>
                                                                                    </td>
                                                                                </tr>
                                                                                </tbody>
                                                                            </template>
                                                                        </v-simple-table>
                                                                    </template>
                                                                </v-col>
                                                                <v-col sm="12" cols="12" class="dp_flex py-0">
                                                                    <label
                                                                        class="label mb-0 width_50 pt-4">{{ $t('amount') }}</label>
                                                                    <v-text-field
                                                                        class="mt-1"
                                                                        v-model="loan.amount"
                                                                        @change="amountChange"
                                                                        placeholder=""
                                                                        outlined
                                                                        :rules="[v => !!v || 'Amount is required']"
                                                                    />
                                                                </v-col>
                                                                <v-col sm="12" cols="12" class="dp_flex py-0">
                                                                    <label
                                                                        class="label mb-0 width_50 pt-4">{{ $t('loan_term') }}</label>
                                                                    <v-text-field
                                                                        class="mt-1"
                                                                        v-model="loan.period"
                                                                        placeholder="ex2%"
                                                                        outlined
                                                                        :rules="[v => !!v || 'Period is required']"
                                                                    />
                                                                </v-col>

                                                                <v-col sm="12" cols="12" class="dp_flex py-0">
                                                                    <label
                                                                        class="label mb-0 width_50 pt-4">{{ $t('interest_rate') }}</label>
                                                                    <v-text-field
                                                                        class="mt-1"
                                                                        disabled
                                                                        v-model="loan.interestRatePerMonth"
                                                                        placeholder=""
                                                                        outlined
                                                                        :rules="[v => !!v || 'Name is required']"
                                                                    />
                                                                </v-col>

                                                                <v-col sm="12" cols="12" class="dp_flex py-0">

                                                                    <label class="label mb-0 width_50 pt-4">{{
                                                                            $t('purpose')
                                                                        }}</label>
                                                                    <v-select
                                                                        disabled
                                                                        :items="loanPurposes"
                                                                        class="mt-1"
                                                                        placeholder="select"
                                                                        item-text="name"
                                                                        tage="select"
                                                                        v-model="loan.purpose"
                                                                        return-object
                                                                        outlined/>
                                                                </v-col>

                                                                <v-col sm="12" cols="12" class="dp_flex py-0">

                                                                    <label class="label mb-0 width_50 pt-4">{{
                                                                            $t('loan_method')
                                                                        }}</label>
                                                                    <v-select
                                                                        class="mt-1"
                                                                        outlined
                                                                        return-object
                                                                        id=""
                                                                        :items="loanMethods"
                                                                        item-text="name"
                                                                        item-value="id"
                                                                        v-model="loan.loanMethod"
                                                                    />
                                                                </v-col>

                                                                <v-col class="" sm="12" cols="12">
                                                                    <v-dialog  v-model="showCola" max-width="500px">
                                                                        <template v-slot:activator="{ on }">
                                                                            <v-btn disabled color="primary" rounded
                                                                                   class="btn_create_new float-right mb-4"
                                                                                   @click="addCola"
                                                                                   v-on="on">
                                                                                {{ $t('collateral') }}
                                                                            </v-btn>
                                                                        </template>
                                                                        <v-form
                                                                            ref="form"
                                                                            v-model="valid"
                                                                            lazy-validation>
                                                                            <v-card>
                                                                                <v-card-title>{{
                                                                                        $t('collateral')
                                                                                    }}
                                                                                </v-card-title>
                                                                                <v-icon class="btn_close"
                                                                                        @click="showCola = false">
                                                                                    close
                                                                                </v-icon>
                                                                                <v-divider/>
                                                                                <v-card-text
                                                                                    style="min-height: 260px; background-color: #EDF1F5; color: #333;">
                                                                                    <v-row>
                                                                                        <v-col cols="12" sm="12"
                                                                                               class="py-0">
                                                                                            <label
                                                                                                class="mb-0">{{
                                                                                                    $t('name')
                                                                                                }}</label>
                                                                                            <v-text-field
                                                                                                class="mt-1"
                                                                                                tage="name"
                                                                                                v-model="cola.name"
                                                                                                outlined
                                                                                            />
                                                                                            <label
                                                                                                class="label mb-0">{{
                                                                                                    $t('type')
                                                                                                }}</label>
                                                                                            <v-text-field
                                                                                                class="mt-1"
                                                                                                tage="name"
                                                                                                v-model="cola.type"
                                                                                                outlined
                                                                                            />
                                                                                        </v-col>
                                                                                    </v-row>
                                                                                </v-card-text>
                                                                                <v-divider/>
                                                                                <v-card-actions
                                                                                    class="function_footer pa-4">
                                                                                    <v-btn outlined color="#494846"
                                                                                           class="float-left text-capitalize"
                                                                                           @click="showCola = false">{{
                                                                                            $t('cancel')
                                                                                        }}
                                                                                    </v-btn>
                                                                                    <v-btn
                                                                                        color="secondary"
                                                                                        @click="saveCola"
                                                                                        class="white--text text-capitalize float-right mr-4 mb-2">
                                                                                        {{ $t('save_close') }}
                                                                                    </v-btn>
                                                                                </v-card-actions>
                                                                            </v-card>
                                                                        </v-form>
                                                                    </v-dialog>
                                                                    <template>
                                                                        <v-simple-table class="attachment_table">
                                                                            <template v-slot:default>
                                                                                <thead>
                                                                                <tr>
                                                                                    <th class="text-uppercase">
                                                                                        {{ $t('name') }}
                                                                                    </th>
                                                                                    <th class="text-uppercase">
                                                                                        {{ $t('type') }}
                                                                                    </th>
                                                                                    <th style="width: 50px"/>
                                                                                </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                <tr v-for="d in colas"
                                                                                    v-bind:key="d.id">
                                                                                    <td>{{ d.name }}</td>
                                                                                    <td class="">{{ d.type }}</td>
                                                                                    <td>
                                                                                        <v-btn class="btn_edit_setting"
                                                                                               @click="editCola(d)">
                                                                                            <v-icon class="white--text"
                                                                                                    size="12">fa
                                                                                                fa-pen
                                                                                            </v-icon>
                                                                                            <span
                                                                                                class="capitalize ml-1 white--text font_14">{{
                                                                                                    $t('edit')
                                                                                                }}</span>
                                                                                        </v-btn>
                                                                                    </td>
                                                                                </tr>
                                                                                </tbody>
                                                                            </template>
                                                                        </v-simple-table>
                                                                    </template>
                                                                </v-col>

                                                                <v-col class="" sm="12" cols="12">
                                                                    <v-dialog  v-model="showGuarantor" max-width="500px">
                                                                        <template v-slot:activator="{ on }">
                                                                            <v-btn disabled color="primary" rounded
                                                                                   class="btn_create_new float-right mb-4"
                                                                                   @click="addGuarantor"
                                                                                   v-on="on">
                                                                                {{ $t('guarantor') }}
                                                                            </v-btn>
                                                                        </template>
                                                                        <v-form
                                                                            ref="form"
                                                                            v-model="valid"
                                                                            lazy-validation>
                                                                            <v-card>
                                                                                <v-card-title>{{
                                                                                        $t('guarantor')
                                                                                    }}
                                                                                </v-card-title>
                                                                                <v-icon class="btn_close"
                                                                                        @click="showGuarantor = false">
                                                                                    close
                                                                                </v-icon>
                                                                                <v-divider/>
                                                                                <v-card-text
                                                                                    style="min-height: 260px; background-color: #EDF1F5; color: #333;">
                                                                                    <v-row>
                                                                                        <v-col cols="12" sm="12"
                                                                                               class="py-0">
                                                                                            <label
                                                                                                class="mb-0">{{
                                                                                                    $t('name')
                                                                                                }}</label>
                                                                                            <v-text-field
                                                                                                class="mt-1"
                                                                                                tage="name"
                                                                                                v-model="guarantor.name"
                                                                                                outlined
                                                                                            />
                                                                                            <label
                                                                                                class="label mb-0">{{
                                                                                                    $t('type')
                                                                                                }}</label>
                                                                                            <v-text-field
                                                                                                class="mt-1"
                                                                                                tage="name"
                                                                                                v-model="guarantor.type"
                                                                                                outlined
                                                                                            />
                                                                                        </v-col>
                                                                                    </v-row>
                                                                                </v-card-text>
                                                                                <v-divider/>
                                                                                <v-card-actions
                                                                                    class="function_footer pa-4">
                                                                                    <v-btn outlined color="#494846"
                                                                                           class="float-left text-capitalize"
                                                                                           @click="showGuarantor = false">{{
                                                                                            $t('cancel')
                                                                                        }}
                                                                                    </v-btn>
                                                                                    <v-btn
                                                                                        color="secondary"
                                                                                        @click="saveGuarantor"
                                                                                        class="white--text text-capitalize float-right mr-4 mb-2">
                                                                                        {{ $t('save_close') }}
                                                                                    </v-btn>
                                                                                </v-card-actions>
                                                                            </v-card>
                                                                        </v-form>
                                                                    </v-dialog>
                                                                    <template>
                                                                        <v-simple-table class="attachment_table">
                                                                            <template v-slot:default>
                                                                                <thead>
                                                                                <tr>
                                                                                    <th class="text-uppercase">
                                                                                        {{ $t('name') }}
                                                                                    </th>
                                                                                    <th class="text-uppercase">
                                                                                        {{ $t('type') }}
                                                                                    </th>
                                                                                    <th style="width: 50px"/>
                                                                                </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                <tr v-for="d in guarantors"
                                                                                    v-bind:key="d.id">
                                                                                    <td>{{ d.name }}</td>
                                                                                    <td class="">{{ d.type }}</td>
                                                                                    <td>
                                                                                        <v-btn class="btn_edit_setting"
                                                                                               @click="editGuarantor(d)">
                                                                                            <v-icon class="white--text"
                                                                                                    size="12">fa
                                                                                                fa-pen
                                                                                            </v-icon>
                                                                                            <span
                                                                                                class="capitalize ml-1 white--text font_14">{{
                                                                                                    $t('edit')
                                                                                                }}</span>
                                                                                        </v-btn>
                                                                                    </td>
                                                                                </tr>
                                                                                </tbody>
                                                                            </template>
                                                                        </v-simple-table>
                                                                    </template>
                                                                </v-col>
                                                            </v-row>
                                                        </v-col>
                                                    </v-row>
                                                </v-col>
                                            </v-row>
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
                                            {{ $t('disapprove') }}
                                        </v-btn>
                                        <v-btn color="primary"
                                               class="float-right  white--text text-capitalize mr-3 "
                                               @click="saveNew">
                                            {{ $t('approve') }}
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

// import {uuid} from 'vue-uuid'
import {DropDownList} from '@progress/kendo-vue-dropdowns'
import LoanModel from '@/scripts/model/Loan'
import {uuid} from "vue-uuid";

const memberHandler = require("@/scripts/memberHandler")
const customerHandler = require("@/scripts/customerHandler")
const loanHandler = require("@/scripts/loanHandler")

// const $ = require("jquery")
const textField = 'name'
const keyField = 'id'
const customerItem = {[textField]: 'Select Customer...', [keyField]: null}
const memberItem = {[textField]: 'Select Member...', [keyField]: null}
const emptyItem = {[textField]: 'loading ...'}

const pageSize = 10
const loadingData = [];
while (loadingData.length < pageSize) {
    loadingData.push({...emptyItem})
}

export default {
    name: "SavingWithdraw",
    props: ['id'],
    components: {
        LoadingMe: () => import(`@/components/Loading`),
        'dropdownlist': DropDownList
    },
    data: () => ({
        addresses: [],
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
        currencyCode: '',
        rate: '',
        errors: [],
        ////
        deposits: [],
        amountCanWithdraw: 0,
        selectMember: 'isMember',
        isMember: true,
        isCustom: false,
        loan: new LoanModel({}),
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
        //
        savingAccountList: [],
        cashAccounts: [],
        loanProducts: [],
        dayInYears: [
            {id: "diy-eafb935c-9849-11eb-a8b3-0242ac130003", name: 365},
            {id: "diy-eafb95c8-9849-11eb-a8b3-0242ac130003", name: 366}
        ],
        savingTypes: [
            {id: "savingt-7a9096ce-9b75-11eb-a8b3-0242ac130003", name: "បញ្ញើសន្សំធម្មតា"},
            {id: "savingt-7a9098f4-9b75-11eb-a8b3-0242ac130003", name: "បញ្ញើសន្សំមានការកំណត់"}
        ],
        isSaveNew: false,
        loanLevels: [
            {id: "loanl-7d55f972-99d5-11eb-a8b3-0242ac130003", name: "ប្រាក់កម្ចីខ្នាតតូច (500,000 - 4,000,000)"},
            {id: "loanl-7d55fba2-99d5-11eb-a8b3-0242ac130003", name: "ប្រាក់កម្ចីខ្នាតមធ្យម (4,000,100 - 40,000,000)"},
            {id: "loanl-7d55fcf6-99d5-11eb-a8b3-0242ac130003", name: "ប្រាក់កម្ចីខ្នាតធំ (40,000,100 - 400,000,000)"}
        ],
        loanAccounts: [],
        interestAccounts: [],
        loanMethods: [
            {id: "lpm-57bb825e-984a-11eb-a8b3-0242ac130003", name: "ការបង់ការប្រាក់រាល់ខែនិងបង់ប្រាក់ដើមផ្តាច់ចុងគ្រា"},
            {id: "lpm-57bb84ac-984a-11eb-a8b3-0242ac130003", name: "ការបង់ប្រាក់ដើមតាមរដូវកាល 3ខែម្តង"},
            {id: "lpm-57bb85a6-984a-11eb-a8b3-0242ac130003", name: "ការបង់ប្រាក់ដើមតាមរដូវកាល 6ខែម្តង"},
            {id: "lpm-57bb884e-984a-11eb-a8b3-0242ac130003", name: "ការបង់រំលោះប្រាក់ដើមស្មើរគ្នាជារៀងរាល់ខែ"},
            {id: "lpm-57bb8920-984a-11eb-a8b3-0242ac130003", name: "ការបង់រំលោះស្មើរគ្នារៀងរាល់ខែ"}
        ],
        loanPurposes: [],
        purpose: '',
        member: {},
        ownerShipTypes: [
            {name: 'Single'},
            {name: 'Group'}
        ],
        isOwnerShipS: true,
        showGuarantor: false,
        showBorrower: false,
        gName: '',
        gType: '',
        guarantors: [],
        guarantor: {},
        isEdit: false,
        colas: [],
        cola: {},
        showCola: false,
        showAddress: false,
    }),
    methods: {
        editCola(e){
            this.isEdit = true
            this.cola = e
            this.showCola = true
        },
        saveCola(){
            if(this.cola.name && this.cola.type){
                if(this.isEdit === false) {
                    this.cola.id = uuid.v1()
                    this.colas.push({
                        id: this.cola.id,
                        name: this.cola.name,
                        type: this.cola.type
                    })
                }
                this.showCola = false
            }
        },
        addCola(){
            this.isEdit = false
            this.cola = {}
            this.showCola = true
        },
        editGuarantor(e){
            this.isEdit = true
            this.guarantor = e
            this.showGuarantor = true
        },
        saveGuarantor(){
            if(this.guarantor.name && this.guarantor.type){
                if(this.isEdit === false) {
                    this.guarantor.id = uuid.v1()
                    this.guarantors.push({
                        id: this.guarantor.id,
                        name: this.guarantor.name,
                        type: this.guarantor.type
                    })
                }
                this.showGuarantor = false
            }
        },
        addGuarantor(){
            this.isEdit = false
            this.guarantor = {}
            this.showGuarantor = true
        },
        addBorrower(){
            this.isEdit = false
            this.borrower = {}
            this.showBorrower = true
        },
        ownerShipChange(){
            this.isOwnerShipS = true
            window.console.log(this.loan.ownerShipType)
            if(this.loan.ownerShipType.name === 'Group'){
                this.isOwnerShipS = false
            }else{
                this.guarantors = []
            }
        },
        viewAddress(){
            this.showAddress = true
        },
        onNewAddressClick() {
            this.editAddress = false
            this.address = {}
        },
        errorMessage() {
        },
        async loadSavingProduct() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    loanHandler.productGet().then(res => {
                        this.loanProducts = res.data.data
                        window.console.log(res.data.data, 'loanprodcut')
                        if (this.loanProducts.length > 0) {
                            this.loan.loanProduct = this.loanProducts[0]
                            this.loanProductChange()
                        }
                    })
                }, 300);
            })
        },
        loanProductChange() {
            if (this.loan.loanProduct) {
                window.console.log(this.loan.loanProduct, 'loan')
                let l = this.loan.loanProduct
                this.loan.interestRatePerMonth = l.interestRatePerMonth
                this.loan.loanLevel = l.loanLevel
                this.loan.dueOneMonth = l.dueOneMonth
                this.loan.dueTwoMonth = l.dueTwoMonth
                this.loan.dueThreeMonth = l.dueThreeMonth
                this.loan.loanMethod = l.loanMethod
                this.getLastNumber()
            } else {
                this.$snotify.error('Something went wrong')
                this.loan.loanProduct = this.loanProducts[0]
                this.loanProductChange()
            }
        },
        async getLastNumber() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    let data = {
                        pk: 'ac-loan-',
                        productId: this.loan.loanProduct.id,
                        module: 'prod'
                    }
                    memberHandler.getLastNumber(data).then(res => {
                        window.console.log(res.data.data, 'last number')
                        this.loan.lastNumber = res.data.data.lastNumber
                        this.generateNumber()
                    }).catch(e => {
                        this.$snotify.error('Something went wrong')
                        this.errors.push(e)
                        // window.console.log(e)
                    })
                }, 300);
            })
        },
        generateNumber() {
            let newNum = ''
            let abbr = this.loan.loanProduct.abbr
            let lnum = this.zeroPad(this.loan.lastNumber, 6)
            newNum = abbr + '-' + lnum
            this.loan.abbr = abbr
            this.loan.number = newNum
        },
        zeroPad(num, places) {
            return String(num).padStart(places, '0')
        },
        amountChange() {
            if (this.loan.amount < 0) {
                this.$snotify.error('Something went wrong')
                this.loan.amount = 0
            }
        },
        //customer
        onCustomerChange(event) {
            const value = event.value
            if (value && value[textField] === emptyItem[textField]) {
                return;
            }
            this.loan.customer = value
            this.member = value
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
        selectMemberChange() {
            if (this.selectMember == 'isMember') {
                this.loan.customer = {}
            } else {
                this.loan.member = {}
            }
            this.loan.savingAccount = {}
        },
        onMemberChange(event) {
            const value = event.value
            if (value && value[textField] === emptyItem[textField]) {
                return;
            }
            this.loan.member = value
            this.member = value
            window.console.log(this.member, 'member change')
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
        async loadLoanPurpose() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    loanHandler.purposeGet().then(res => {
                        this.loanPurposes = res.data.data
                    })
                }, 300);
            })
        },
        cancel() {
        },
        addEmpty() {
            this.loan = new LoanModel({})
            this.loan.customer = {}
            this.loan.member = {}
            this.selectMember = 'isMember'
            this.loan.loanProduct = this.loanProducts[0]
            this.loanProductChange()
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
            if (this.selectMember == 'isMember') {
                if (!this.loan.member) {
                    return
                }
            } else {
                if (!this.loan.customer) {
                    return
                }
            }
            this.showLoading = true
            this.loan.saveOption = this.saveOption
            this.loan.status = 1
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    memberHandler.createLoan(new LoanModel(this.loan)).then(response => {
                        this.showLoading = false
                        if (response.data.statusCode === 201) {
                            this.$snotify.success('Successfully')
                            if (this.isSaveNew == true) {
                                this.addEmpty()
                            } else {
                                window.history.go(-1);
                            }
                        }
                    }).catch(e => {
                        this.$snotify.error('Something went wrong')
                        this.errors.push(e)
                    })
                }, 300);
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
        this.customerRequestData(0, this.customerfilter, this.cusBaseUrl)
        this.memberRequestData(0, this.memberfilter, this.memBaseUrl)
        this.loadSavingProduct()
        await this.loadLoanPurpose()
    },
    created: async function () {
    },
    computed: {},
    destroyed() {
    },
};
</script>

<style scoped>
.label2 {
    margin-top: 10px;
}

.input-flex {
    width: 30%;
    display: inline-flex;
    float: right;
}

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
    padding: 30px 40px;
    background-color: #F8F8F9;
}

.dp_flex {
    display: flex;
}
</style>

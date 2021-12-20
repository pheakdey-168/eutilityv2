<template>
    <v-app>
        <v-container>
            <v-row>
                <v-col cols="12" sm="12">
                    <v-card outlined dense class="pa-4 no_border rounded-sm" color="white">
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
                                    <v-row class="px-4">
                                        <v-col sm="6" cols="12" class="pb-0 pl-0">
                                            <v-radio-group
                                                :disabled="isEdit"
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
                                            <div class="kendo_dropdown_custom  mt-1">
                                                <v-select
                                                    class="mt-1"
                                                    :disabled="isEdit"
                                                    v-model="loan.member"
                                                    :items="memberData"
                                                    item-text="numberName"
                                                    @change="checkMemberLoanProduction"
                                                    placeholder="Select"
                                                    return-object
                                                    outlined
                                                    :rules="[v => !!v || 'Member is required']"
                                                />
<!--                                                <v-autocomplete-->
<!--                                                    :disabled="isEdit"-->
<!--                                                    v-model="loan.member"-->
<!--                                                    :items="memberData"-->
<!--                                                    item-text="numberName"-->
<!--                                                    @change="checkMemberLoanProduction"-->
<!--                                                    return-object-->
<!--                                                    outlined-->
<!--                                                    :rules="[v => !!v || 'Member is required']"-->
<!--                                                ></v-autocomplete>-->
                                            </div>
                                            <v-simple-table class="mb-4">
                                                <template v-slot:default>
                                                    <tbody>
                                                    <tr>
                                                        <td>{{ $t('name') }}</td>
                                                        <td>:</td>
                                                        <td>{{ loan.member.name }}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>{{ $t('spouse_name') }}</td>
                                                        <td>:</td>
                                                        <td>{{ loan.member.spouseName }}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>{{ $t('dob') }}</td>
                                                        <td>:</td>
                                                        <td>{{ loan.member.dob }}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>{{ $t('gender') }}</td>
                                                        <td>:</td>
                                                        <td>{{ genderName(loan.member.gender) }}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>{{ $t('identity_n') }}</td>
                                                        <td>:</td>
                                                        <td>{{ loan.member.idNumber }}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>{{ $t('address') }}</td>
                                                        <td>:</td>
                                                        <td>
                                                            <v-dialog v-model="showAddress"
                                                                        max-width="600px">
                                                                <template v-slot:activator="{ on }">
                                                                    <v-btn color="primary mt-2" rounded
                                                                            class="btn_create_new float-right mb-4"
                                                                            @click="viewAddress"
                                                                            v-on="on">
                                                                        {{ $t('view') }}
                                                                    </v-btn>
                                                                </template>
                                                                <v-form>
                                                                    <v-card>
                                                                        <v-card-title>{{
                                                                                $t('address')
                                                                            }}
                                                                        </v-card-title>
                                                                        <v-icon class="btn_close"
                                                                                @click="showAddress = false">
                                                                            close
                                                                        </v-icon>
                                                                        <v-divider/>
                                                                        <v-card-text style="min-height: 260px; background-color: #EDF1F5; color: #333;">
                                                                            <table class="table">
                                                                                <thead>
                                                                                    <tr>
                                                                                        <th class="text-left text-uppercase">
                                                                                            {{
                                                                                                $t('name')
                                                                                            }}
                                                                                        </th>
                                                                                        <th class="text-left text-uppercase">
                                                                                            {{
                                                                                                $t('type')
                                                                                            }}
                                                                                        </th>
                                                                                        <th class="text-left text-uppercase">
                                                                                            {{
                                                                                                $t('country')
                                                                                            }}
                                                                                        </th>
                                                                                        <th class="text-left text-uppercase">
                                                                                            {{
                                                                                                $t('address_line_1')
                                                                                            }}
                                                                                        </th>
                                                                                        <th class="text-left text-uppercase">
                                                                                            {{
                                                                                                $t('address_line_2')
                                                                                            }}
                                                                                        </th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                    <tr v-for="d in loan.member.addresses"
                                                                                        v-bind:key="d.id">
                                                                                        <td>{{
                                                                                                d.name
                                                                                            }}
                                                                                        </td>
                                                                                        <td class="">
                                                                                            {{
                                                                                                d.type
                                                                                            }}
                                                                                        </td>
                                                                                        <td class="">
                                                                                            {{ d.country ? d.country.country : '' }}
                                                                                        </td>
                                                                                        <td class="">
                                                                                            {{
                                                                                                d.line1
                                                                                            }}
                                                                                        </td>
                                                                                        <td class="">
                                                                                            {{
                                                                                                d.line2
                                                                                            }}
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </v-card-text>
                                                                        <v-divider/>
                                                                        <v-card-actions
                                                                            class="function_footer pa-4">
                                                                            <v-btn outlined
                                                                                    color="#494846"
                                                                                    class="float-left text-capitalize"
                                                                                    @click="showAddress = false">
                                                                                {{
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
                                                class="label  mb-0 mt-4">{{
                                                    $t('loan_product')
                                                }}</label>
                                            <v-select
                                                class="mt-1"
                                                :disabled="isEdit"
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
                                        <v-col sm="6" cols="12" class="pb-0 function_content pa-3">
                                            <v-card class="pa-3 no-boxshadow d-flex justify-space-between align-center"
                                                    min-height="50px" color="primary">
                                                <h3 style="font-size: 18px" class="text-white text-uppercase">
                                                {{ $t('amount') }}:</h3>
                                                <vue-numeric
                                                    style="width: 70%;font-size: 18px;background-color: #ffff;border-radius: 2px;"
                                                    class="mr-2 mt-0 text-bold pa-4"
                                                    currency=""
                                                    separator=","
                                                    v-bind:minus="false"
                                                    v-bind:precision="inputDec"
                                                    :disabled="isReview"
                                                    v-model="loan.amount"
                                                    @change="amountChange"
                                                    :rules="[v => !!v || 'Amount is required']"
                                                    outlined
                                                >
                                                </vue-numeric>
                                            
                                            </v-card>
                                            <v-simple-table>
                                                <template v-slot:default>
                                                    <tbody>
                                                        <tr>
                                                            <td class="text-left pr-0">{{
                                                                $t('ownership_type')
                                                            }}
                                                            </td>
                                                            <td class="text-center">:</td>
                                                            <td class=" text-right pt-2">
                                                            <v-select
                                                                
                                                                class="mt-1"
                                                                :placeholder="$t('select')"
                                                                item-text="name"
                                                                item-value="id"
                                                                :disabled="isReview"
                                                                :items="ownerShipTypes"
                                                                v-model="loan.ownerShipType"
                                                                tage="select"
                                                                @change="ownerShipChange"
                                                                outlined/>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="text-left pr-0">{{
                                                                $t('loan_term')
                                                            }}
                                                            </td>
                                                            <td class="text-center">:</td>
                                                            <td class="text-right pt-2">
                                                            <v-text-field
                                                                    
                                                                    class="mt-1"
                                                                    :disabled="isReview"
                                                                    v-model="loan.period"
                                                                    placeholder="ex2%"
                                                                    outlined
                                                                    :rules="[v => !!v || 'Period is required']"
                                                                />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="text-left pr-0">{{
                                                                $t('interest_rate')
                                                            }}
                                                            </td>
                                                            <td class="text-center">:</td>
                                                            <td class="text-right pt-2">
                                                            <v-text-field
                                                                class="mt-1"
                                                                disabled
                                                                v-model="loan.interestRatePerMonth.name"
                                                                placeholder=""
                                                                outlined
                                                            />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="text-left pr-0">{{
                                                                $t('purpose')
                                                            }}
                                                            </td>
                                                            <td class="text-center">:</td>
                                                            <td class="text-right pt-2">
                                                                <v-select
                                                                    
                                                                    class="mt-1"
                                                                    :items="loanPurposes"
                                                                    :disabled="isReview"
                                                                    :placeholder="$t('select')"
                                                                    item-text="name"
                                                                    tage="select"
                                                                    v-model="loan.purpose"
                                                                    return-object
                                                                    outlined/>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="text-left pr-0">{{
                                                                $t('loan_method')
                                                            }}
                                                            </td>
                                                            <td class="text-center">:</td>
                                                            <td class="text-right pt-2">
                                                                <v-select
                                                                    style="width: 265px;"
                                                                    class="mt-1"
                                                                    outlined
                                                                    return-object
                                                                    id=""
                                                                    :disabled="isReview"
                                                                    :items="loanMethods"
                                                                    item-text="name"
                                                                    item-value="id"
                                                                    v-model="loan.loanMethod"
                                                                />
                                                            </td>
                                                        </tr>

                                                    </tbody>
                                                </template>
                                                
                                            </v-simple-table>   
                                        </v-col>
                                        <v-col sm="12" cols="12" class="pa-0">
                                            <v-card  outlined dense class=" my-4 rounded-0">
                                                <v-col class="" sm="12" cols="12" v-show="!isOwnerShipS">
                                                    <h2>{{ $t('borrowers') }}</h2>
                                                        <v-dialog v-model="showBorrower" max-width="500px">
                                                            <template v-slot:activator="{ on }" :hidden="isReview">
                                                                <v-btn color="primary"
                                                                        v-on="on"
                                                                        v-show="!isReview"
                                                                        class="float-right rounded-0 white--text mt-3"
                                                                        @click="addBorrower">
                                                                    <v-icon size="" class="ma-1">mdi-plus</v-icon>
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
                                                                                    v-model="borrower.name"
                                                                                    outlined
                                                                                />
                                                                                <label
                                                                                    class="label mb-0">{{
                                                                                        $t('identity_n')
                                                                                    }}</label>
                                                                                <v-text-field
                                                                                    class="mt-1"
                                                                                    tage="name"
                                                                                    v-model="borrower.idNumber"
                                                                                    outlined
                                                                                />
                                                                                <label
                                                                                    class="label mb-0">{{
                                                                                        $t('phone')
                                                                                    }}</label>
                                                                                <v-text-field
                                                                                    class="mt-1"
                                                                                    tage="phone"
                                                                                    v-model="borrower.phoneNumber"
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
                                                                                @click="showBorrower = false">
                                                                            {{
                                                                                $t('cancel')
                                                                            }}
                                                                        </v-btn>
                                                                        <v-btn
                                                                            color="secondary"
                                                                            @click="saveBorrower"
                                                                            class="white--text text-capitalize float-right mr-4 mb-2">
                                                                            {{ $t('save_close') }}
                                                                        </v-btn>
                                                                    </v-card-actions>
                                                                </v-card>
                                                            </v-form>
                                                            
                                                        </v-dialog>
                                                        <template>
                                                            <v-simple-table class="attachment_table mt-4">
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
                                                                        <th v-show="!isReview" class="text-uppercase" style="width: 50px">
                                                                            {{ $t('action') }}
                                                                        </th>
                                                                    </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                    <tr v-for="d in borrowers"
                                                                        v-bind:key="d.id">
                                                                        <td>{{ d.name }}</td>
                                                                        <td class="">{{ d.idNumber }}</td>
                                                                        <td class="">{{ d.phoneNumber }}</td>
                                                                        <td v-show="!isReview">
                                                                            <v-btn class="btn_edit_setting"
                                                                                    @click="editBorrower(d)">
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
                                            </v-card>
                                        </v-col>
                                        
                                    </v-row>
                                    <v-col sm="12" cols="12" class="pt-0">
                                        <v-card outlined dense class="px-3 my-4 rounded-0">
                                            <v-row>
                                                
                                                <v-col class="" sm="6" cols="12">
                                                    <h2>{{ $t('collateral') }}</h2>
                                                        <v-dialog v-model="showCola" max-width="500px">
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
                                                            <template v-slot:activator="{ on }" :hidden="isReview">
                                                                <v-btn color="primary"
                                                                        v-on="on"
                                                                        v-show="!isReview"
                                                                        class="float-right rounded-0 white--text mt-3"
                                                                        @click="addCola">
                                                                    <v-icon size="" class="ma-1">mdi-plus</v-icon>
                                                                </v-btn>
                                                            </template>
                                                            
                                                        </v-dialog>
                                                    <v-card outlined dense class="pa-3 my-4 rounded-0">
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
                                                                        <th v-show="!isReview" class="text-uppercase" style="width: 50px">
                                                                            {{ $t('action') }}
                                                                        </th>
                                                                    </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                    <tr v-for="d in collaterals"
                                                                        v-bind:key="d.id">
                                                                        <td>{{ d.name }}</td>
                                                                        <td class="">{{ d.type }}</td>
                                                                        <td v-show="!isReview">
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
                                                    </v-card>
                                                
                                                </v-col>
                                                <v-col class="" sm="6" cols="12">
                                                    <h2>{{ $t('guarantor') }}</h2>
                                                    <v-dialog v-model="showGuarantor" max-width="500px">
                                                        
                                                        <template v-slot:activator="{ on }" :hidden="isReview">
                                                                <v-btn color="primary"
                                                                        v-on="on"
                                                                        v-show="!isReview"
                                                                        class="float-right rounded-0 white--text mt-3"
                                                                        @click="addGuarantor">
                                                                    <v-icon size="" class="ma-1">mdi-plus</v-icon>
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
                                                                        @click="showGuarantor = false">
                                                                        {{
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
                                                    <v-card outlined dense class="pa-3 my-4 rounded-0">
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
                                                                        <th v-show="!isReview" class="text-uppercase" style="width: 50px">
                                                                            {{ $t('action') }}
                                                                        </th>
                                                                    </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                    <tr v-for="d in guarantors"
                                                                        v-bind:key="d.id">
                                                                        <td>{{ d.name }}</td>
                                                                        <td class="">{{ d.type }}</td>
                                                                        <td v-show="!isReview">
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
                                                    </v-card>
                                                </v-col>
                                            </v-row>
                                        </v-card>
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
                                <v-btn :hidden="isReview" color="secondary" class="float-right white--text text-capitalize"
                                        @click="saveClose">
                                    {{ $t('save_close') }}
                                </v-btn>
                                <v-btn :hidden="isReview" color="primary"
                                        class="float-right  white--text text-capitalize mr-3 "
                                        @click="saveNew">
                                    {{ $t('save_new') }}
                                </v-btn>
                                
                                <v-btn :hidden="!isReview" color="primary" class="float-right white--text text-capitalize"
                                        @click="rejectLoan">
                                    {{ $t('disapprove') }}
                                </v-btn>
                                <v-btn :hidden="!isReview" color="secondary"
                                        class="float-right  white--text text-capitalize mr-3 "
                                        @click="approvLoan">
                                    {{ $t('approve') }}
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
                :alertMessage="loadingAlert"
                :color="loadingColorAlert"
                :alertText="loadingTextAlert"/>
        </v-container>
    </v-app>
</template>

<script>

// import {uuid} from 'vue-uuid'
import { i18n } from '@/i18n';
import {dataStore} from '@/observable/store'
// import {DropDownList} from '@progress/kendo-vue-dropdowns'
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
const currencyHandler = require("@/scripts/currency/handler/currencyHandler")
const pageSize = 10
const loadingData = [];
while (loadingData.length < pageSize) {
    loadingData.push({...emptyItem})
}
import VueNumeric from 'vue-numeric'
export default {
    name: "AddLoan",
    props: ['id'],
    components: {
        LoadingMe: () => import(`@/components/Loading`),
        VueNumeric
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
            {id: "lpm-57bb8920-984a-11eb-a8b3-0242ac130003", name: "ការបង់រំលោះស្មើរគ្នារៀងរាល់ខែ"},
            {id: "lpm-2e381d5a-3612-11ec-8d3d-0242ac130003", name: "ការបង់ការប្រាក់នឹងប្រាក់ដើមផ្តាច់ចុងគ្រា"}
        ],
        loanPurposes: [],
        purpose: '',
        member: {},
        memberData: [],
        isOwnerShipS: true,
        showGuarantor: false,
        showBorrower: false,
        gName: '',
        gType: '',
        guarantors: [],
        guarantor: {},
        borrowers: [],
        borrower: {},
        isEdit: false,
        collaterals: [],
        cola: {},
        showCola: false,
        showAddress: false,
        isReview: false,
        pin: dataStore.pin,
        exchangeRate: {},
        memberHasLoan: false,
        inputDec: 0,
        decimals: []
    }),
    methods: {
        genderName(value){
            return i18n.t(value)
        },
        editCola(e) {
            this.isEdit = true
            this.cola = e
            this.showCola = true
        },
        saveCola() {
            if (this.cola.name && this.cola.type) {
                if (this.isEdit === false) {
                    this.cola.id = uuid.v1()
                    this.collaterals.push({
                        id: this.cola.id,
                        name: this.cola.name,
                        type: this.cola.type
                    })
                }
                this.showCola = false
            }
        },
        addCola() {
            this.isEdit = false
            this.cola = {}
            this.showCola = true
        },
        editGuarantor(e) {
            this.isEdit = true
            this.guarantor = e
            this.showGuarantor = true
        },
        saveGuarantor() {
            if (this.guarantor.name && this.guarantor.type) {
                if (this.isEdit === false) {
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
        addGuarantor() {
            this.isEdit = false
            this.guarantor = {}
            this.showGuarantor = true
        },
        addBorrower() {
            this.isEdit = false
            this.borrower = {}
            this.showBorrower = true
        },
        saveBorrower() {
            if (this.borrower.name) {
                if (this.isEdit === false) {
                    this.borrower.id = uuid.v1()
                    this.borrowers.push({
                        id: this.borrower.id,
                        name: this.borrower.name,
                        idNumber: this.borrower.idNumber,
                        phoneNumber: this.borrower.phoneNumber
                    })
                }
                this.showBorrower = false
            }
        },
        editBorrower(e) {
            this.isEdit = true
            this.borrower = e
            this.showBorrower = true
        },
        ownerShipChange() {
            this.isOwnerShipS = true
            if (this.loan.ownerShipType === 2) {
                this.isOwnerShipS = false
            } else {
                this.guarantors = []
            }
        },
        viewAddress() {
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
                        // window.console.log(res.data.data, 'loanprodcut')
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
                // window.console.log(this.loan.loanProduct, 'loan')
                let l = this.loan.loanProduct
                this.loan.interestRatePerMonth = l.interestRatePerMonth
                this.loan.loanLevel = l.loanLevel
                this.loan.dueOneMonth = l.dueOneMonth
                this.loan.dueTwoMonth = l.dueTwoMonth
                this.loan.dueThreeMonth = l.dueThreeMonth
                this.loan.loanMethod = l.loanMethod
                this.loan.amount = l.minimumAmount
                this.getLastNumber()
                this.currencyCode = l.currency.code
                //add
                let dec = this.decimals.filter((obj) => {
                    return obj.currency.code == this.currencyCode
                })
                window.console.log(dec, 'dec')
                if (dec.length > 0) {
                    this.inputDec = parseInt(dec[0].decimal)
                    // window.console.log(this.inputDec, 'input')
                }
                this.loadTransactionRate()
                this.checkMemberLoanProduction()
            } else {
                this.$snotify.error('Something went wrong')
                this.loan.loanProduct = this.loanProducts[0]
                this.loanProductChange()
            }
        },
        checkMemberLoanProduction(){
          if(Object.keys(this.loan.loanProduct).length > 0 && Object.keys(this.loan.member).length > 0){
              window.console.log(this.loan.loanProduct.id, this.loan.member.id)
              this.showLoading = true
              this.memberHasLoan = false
              memberHandler.getLoanByMemberId(this.loan.member.id).then(res => {
                  this.showLoading = false
                  window.console.log(res.data.data, 'check loan and member')
                  let loanList = res.data.data.filter((obj) => {
                      // return loan status padding, approve, disburse
                      return obj.status == 2 || obj.status == 3 || obj.status == 1
                  })
                  if(loanList.length > 0){
                      let pro = loanList.filter((obj) => {
                          return obj.loanProduct.id == this.loan.loanProduct.id
                      })
                      if(pro.length > 0) {
                          this.memberHasLoan = true
                          this.$snotify.error (i18n.t('member_or_customer_already_has_loan_on_this_product'))
                      }
                  }
              })
          }
        },
        async getLastNumber() {
            if (this.$route.params.id == undefined) {
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        let data = {
                            pk: 'ac-loan-',
                            productId: this.loan.loanProduct.id,
                            module: 'prod',
                            lastSk: '-ac-loan'
                        }
                        memberHandler.getLastNumber(data).then(res => {
                            // window.console.log(res.data.data, 'last number')
                            this.loan.lastNumber = res.data.data.lastNumber
                            this.generateNumber()
                        }).catch(e => {
                            this.$snotify.error('Something went wrong')
                            this.errors.push(e)
                            // window.console.log(e)
                        })
                    }, 300);
                })
            }
        },
        generateNumber() {
            if (this.$route.params.id == undefined) {
                let newNum = ''
                let abbr = this.loan.loanProduct.abbr
                let lnum = this.zeroPad(this.loan.lastNumber, 6)
                newNum = abbr + '-' + lnum
                this.loan.abbr = abbr
                this.loan.number = newNum
            }
        },
        zeroPad(num, places) {
            return String(num).padStart(places, '0')
        },
        amountChange() {
            if (this.loan.amount < 0) {
                this.$snotify.error(i18n.t('amount_is_invalid'))
                this.loan.amount = this.loan.loanProduct.minimumAmount
            }
            //check product
            if(this.loan.loanProduct.allowLimit == false){
                return
            }
            if(this.loan.amount < parseFloat(this.loan.loanProduct.minimumAmount) || this.loan.amount > parseFloat(this.loan.loanProduct.maximumAmount)){
                this.$snotify.error(i18n.t('amount_is_invalid'))
                this.loan.amount = this.loan.loanProduct.minimumAmount
            }
        },
        //customer
        onCustomerChange(event) {
            const value = event.value
            if (value && value[textField] === emptyItem[textField]) {
                return;
            }
            this.loan.customer = value
            // window.console.log(value, 'val')
            this.member = {
                id: value.id,
                name: value.name,
                gender: { name: value.contactAddress.gender },
                dob: value.contactAddress.dob,
                idNumber: value.contactAddress.idNumber,
                addresses: value.contactAddress.address
            }
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
                this.loan.isMember = 1
                this.memberData = this.memberList
            } else {
                this.loan.isMember = 2
                this.memberData = this.customerList
            }
            this.loan.member = {}
        },
        onMemberChange() {
            window.console.log(this.loan.member, 'member change')
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
            this.loan.isMember = 1
            this.memberData = this.memberList
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
            if(Object.keys(this.loan.member).length == 0){
                this.$snotify.error('Please select member or customer')
                return
            }
            if(this.memberHasLoan == true && this.isEdit == false) {
                this.$snotify.error('Member or customer already has loan on this product')
                return
            }
            if(Object.keys(this.loan.loanProduct).length == 0){
                this.$snotify.error('Please select a loan product')
                return
            }
            this.showLoading = true
            this.loan.saveOption = this.saveOption
            this.loan.status = 1
            this.loan.userPin = this.pin
            this.loan.isEdit = this.isEdit
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    this.loan.borrowers = this.borrowers
                    this.loan.collaterals = this.collaterals
                    this.loan.guarantors = this.guarantors
                    memberHandler.createLoan(new LoanModel(this.loan)).then(response => {
                        this.showLoading = false
                        if (response.data.statusCode === 201) {
                            this.$snotify.success('Successfully')
                            if (this.isSaveNew == true) {
                                this.addEmpty()
                            } else {
                                window.history.go(-1)
                            }
                        }
                    }).catch(e => {
                        this.$snotify.error('Something went wrong')
                        this.errors.push(e)
                    })
                }, 300);
            })
        },
        async loadSingleLoan() {
            this.isEdit = false
            this.isReview = false
            this.isOwnerShipS = true
            let id = this.$route.params.id
            let type = this.$route.query.type
            if (this.$route.params.id !== undefined) {
                new Promise(resolve => {
                    resolve('resolved');
                    setTimeout(() => {
                        this.showLoading = true
                        memberHandler.getOneLoan(id).then(res => {
                            this.showLoading = false
                            let data = res.data.data
                            if (data.length > 0) {
                                this.isEdit = true
                                if(type == 'approve') {
                                    this.isReview = true
                                }
                                this.loan = data[0]
                                if(Object.keys(data[0].member).length > 0){
                                    this.member = data[0].member
                                }else {
                                    this.selectMember = 'isCustomer'
                                    let value = data[0].customer
                                    this.member = {
                                        id: value.id,
                                        name: value.name,
                                        gender: {name: value.contactAddress.gender},
                                        dob: value.contactAddress.dob,
                                        idNumber: value.contactAddress.idNumber,
                                        addresses: value.contactAddress.address
                                    }
                                }
                                this.collaterals = data[0].collaterals
                                this.guarantors = data[0].guarantors
                                this.borrowers = data[0].borrowers
                                if(this.loan.ownerShipType == 2){
                                    this.isOwnerShipS = false
                                }
                            }
                        })
                    }, 500)
                })
            }
        },
        rejectLoan(){
            this.showLoading = true
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    // reject loan
                    this.loan.status = 4
                    memberHandler.createLoan(new LoanModel(this.loan)).then(response => {
                        this.showLoading = false
                        if (response.data.statusCode === 201) {
                            this.$snotify.success('Successfully')
                            window.history.go(-1)
                        }
                    }).catch(e => {
                        this.$snotify.error('Something went wrong')
                        this.errors.push(e)
                    })
                }, 300);
            })
        },
        approvLoan(){
            this.showLoading = true
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    // approv loan
                    this.loan.status = 2
                    memberHandler.createLoan(new LoanModel(this.loan)).then(response => {
                        this.showLoading = false
                        if (response.data.statusCode === 201) {
                            this.$snotify.success('Successfully')
                            window.history.go(-1)
                        }
                    }).catch(e => {
                        this.$snotify.error('Something went wrong')
                        this.errors.push(e)
                    })
                }, 300);
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
        async loadTransactionRate() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    const date = new Date(this.loan.issuedDate).toISOString().substr(0, 10)
                    let code = this.currencyCode
                    if (code !== undefined || code !== '') {
                        currencyHandler.getLastExchangeRateByDate(date, code).then(res => {
                            if (res.data.statusCode === 200) {
                                const response = res.data.data[0]
                                // window.console.log(response, 'currency rate')
                                if(Object.keys(response).length > 0){
                                    this.exchangeRate = response
                                    this.loan.exchangeRate = this.exchangeRate
                                    window.console.log(this.loan.exchangeRate, 'exchange rate')
                                    this.rate = response.rate
                                }else{
                                    this.$snotify.error('Please set exchange rate on currency setting')
                                    this.cancel()
                                }
                                this.showLoading = false
                            }
                        })
                    }
                }, 300)
            })
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
    },
    watch: {
        '$route': 'loadSingleLoan'
    },
    mounted: async function () {
        // this.customerRequestData(0, this.customerfilter, this.cusBaseUrl)
        // this.memberRequestData(0, this.memberfilter, this.memBaseUrl)
        this.loadSavingProduct()
        await this.loadLoanPurpose()
        await this.loadSingleLoan()
        await this.loadLessMember()
        await this.loadLessCustomer()
        await this.loadDecimal()
    },
    created: async function () {
    },
    computed: {
        ownerShipTypes(){
            return [
                {id: 1, name: i18n.t('single.')},
                {id: 2, name: i18n.t('group')}]
        }
    },
    destroyed() {
    },
};
</script>

<style scoped>
.table {
  width: 100%;
  max-width: 100%;
  background-color: #F8F8F9;
}
.table thead th {
    vertical-align: bottom;
    border-bottom: 2px solid #dee2e6;
}
.table td, .table th {
    padding: .75rem;
    vertical-align: top;
    border-top: 1px solid #dee2e6;
}
th {
    text-align: inherit;
}
table {
    border-collapse: collapse;
}
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
    background-color: #F8F8F9;
}

.dp_flex {
    display: flex;
}
.v-list-item .v-list-item__title, .v-list-item .v-list-item__subtitle {
    line-height: 1.9 !important;
}
</style>

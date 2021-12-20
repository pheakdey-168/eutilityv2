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
                                        <h2>{{$t('add_member')}}</h2>
                                        <v-icon
                                            onclick="window.history.go(-1); return false;"
                                            style="cursor: pointer; color: #333; font-size: 40px;"
                                            class="float-right"
                                        >close
                                        </v-icon>
                                    </div>
                                    <div class="function_content">
                                        <!-- Form -->
                                        <v-form
                                            ref="form"
                                            v-model="valid"
                                            lazy-validation>
                                            <v-row class="px-4">
                                                <v-col>
                                                    <v-row>
                                                        <v-col sm="6" cols="12" class="pb-0">
                                                            <label class="label mb-0">{{
                                                                    $t('registered_date')
                                                                }}</label>
                                                            <app-datepicker
                                                                :initialDate="member.registeredDate"
                                                                @emitDate="member.registeredDate = $event"/>
                                                            <label class="label mb-0">{{ $t('number') }}</label>
                                                            <v-row class="pt-1 pb-0">
                                                                <v-col sm="2" cols="3" class="py-0 pr-0">
                                                                    <div class="code_text text-uppercase">
                                                                        {{
                                                                            member.memberType ? member.memberType.abbr : ''
                                                                        }}
                                                                    </div>
                                                                </v-col>
                                                                <v-col sm="8" cols="8" class="py-0 pl-0 pr-1">
                                                                    <v-text-field
                                                                        class="custom-border "
                                                                        v-model="member.number"
                                                                        outlined
                                                                        :rules="[v => !!v || 'Number is required']"
                                                                        required
                                                                    />
                                                                </v-col>
                                                                <v-col sm="2" cols="2" class="py-0 pl-0">
                                                                    <v-icon
                                                                        color="black" size="30"
                                                                        class="border_qrcode float-right"
                                                                        @click="memberTypeChange">mdi-qrcode
                                                                    </v-icon>
                                                                </v-col>
                                                            </v-row>
                                                            <label class="label  mb-0">{{$t('member_type')}}</label>
                                                            <v-select
                                                                class="mt-1"
                                                                :items="memberTypes"
                                                                placeholder="Member Type"
                                                                item-text="name"
                                                                item-value="id"
                                                                v-on:change="memberTypeChange"
                                                                v-model="member.memberType"
                                                                return-object
                                                                outlined/>

                                                        </v-col>
                                                        <v-col sm="6" cols="12" class="pb-0">
                                                                
                                                            <v-row class="pb-0">
                                                                <v-col sm="6" cols="12"
                                                                       class="py-0 kendo_dropdown_custom">
                                                                    <label class="label mb-0">{{
                                                                            $t('first_name')
                                                                        }}</label>
                                                                    <v-text-field
                                                                        class="mt-1"
                                                                        v-model="member.firstName"
                                                                        @change="nameChange"
                                                                        outlined
                                                                        :rules="[v => !!v || 'Name is required']"
                                                                    />
                                                                </v-col>
                                                                <v-col sm="6" cols="12"
                                                                       class="py-0 kendo_dropdown_custom">
                                                                    <label class="label mb-0">{{
                                                                            $t('last_name')
                                                                        }}</label>
                                                                    <v-text-field
                                                                        class="mt-1"
                                                                        v-model="member.lastName"
                                                                        @change="nameChange"
                                                                        outlined
                                                                        :rules="[v => !!v || 'Name is required']"
                                                                        required
                                                                    />
                                                                </v-col>
                                                                <v-col sm="6" cols="12" class="py-0">
                                                                    <label class="label mb-0">{{
                                                                            $t('full_name')
                                                                        }}</label>
                                                                    <v-text-field
                                                                        class="mt-1"
                                                                        v-model="member.fullName"
                                                                        outlined
                                                                        disabled
                                                                        required
                                                                    />
                                                                </v-col>
                                                                <v-col sm="6" cols="12"
                                                                       class="py-0 kendo_dropdown_custom">
                                                                    <label class="label mb-0">{{
                                                                            $t('spouse_name')
                                                                        }}</label>
                                                                    <v-text-field
                                                                        class="mt-1"
                                                                        v-model="member.spouseName"
                                                                        outlined
                                                                        required
                                                                    />
                                                                </v-col>
                                                                <v-col sm="6" cols="12"
                                                                       class="py-0 kendo_dropdown_custom">
                                                                    <label class="label mb-0">{{
                                                                            $t('status')
                                                                        }}</label>
<!--                                                                    <v-select-->
<!--                                                                        class="mt-1"-->
<!--                                                                        :items="status"-->
<!--                                                                        item-text="name"-->
<!--                                                                        item-value="id"-->
<!--                                                                        v-model="member.status"-->
<!--                                                                        outlined>-->
<!--                                                                    </v-select>-->
                                                                    <v-select
                                                                        class="mt-1"
                                                                        :items="status"
                                                                        item-text="name"
                                                                        item-value="id"
                                                                        v-model="member.status"
                                                                        :placeholder="$t('select')"
                                                                        outlined>
                                                                    </v-select>
                                                                </v-col>
                                                                <v-col sm="6" cols="12" class="py-0">
                                                                    <label class="label  mb-0">{{ $t('group') }}</label>
                                                                    <div class="kendo_dropdown_custom pb-3 mt-1">
                                                                        <v-select
                                                                            class="mt-1"
                                                                            :items="groups"
                                                                            item-text="name"
                                                                            item-value="name"
                                                                            v-model="member.group"
                                                                            :rules="[v => !!v || 'Group is required']"
                                                                            return-object
                                                                            outlined>
                                                                        </v-select>
                                                                    </div>
                                                                </v-col>

                                                            </v-row>
                                                        </v-col>
                                                    </v-row>
                                                </v-col>
                                            </v-row>
                                            <div style="background-color: #ffffff; height: 16px; width:100%;"></div>
                                            <v-row class="px-4 my-4">
                                                <v-col>
                                                    <v-row>
                                                        <v-col sm="4" cols="12" class="pb-0">
                                                            <label class="label  mb-0">{{ $t('customer') }}</label>
                                                            <div class="kendo_dropdown_custom pb-3 mt-1">
                                                                <v-select
                                                                    class="mt-1"
                                                                    :items="customerList"
                                                                    item-text="name"
                                                                    item-value="id"
                                                                    v-model="member.customer"
                                                                    outlined>
                                                                </v-select>
<!--                                                                <dropdownlist-->
<!--                                                                    class="v-input__slot"-->
<!--                                                                    :data-items="customerList"-->
<!--                                                                    @change="onCustomerChange"-->
<!--                                                                    :value="member.customer"-->
<!--                                                                    :data-item-key="dataItemKey"-->
<!--                                                                    :text-field="textField"-->
<!--                                                                    :default-item="customerItem"-->
<!--                                                                    :filterable="true"-->
<!--                                                                    @filterchange="onCustomerFilterChange">-->
<!--                                                                </dropdownlist>-->
                                                            </div>
                                                        </v-col>
                                                        <v-col sm="4" cols="12" class="pb-0">
                                                            <label class="label  mb-0">{{ $t('vendor') }}</label>
                                                            <div class="kendo_dropdown_custom pb-3 mt-1">
<!--                                                                <dropdownlist-->
<!--                                                                    class="v-input__slot"-->
<!--                                                                    :data-items="supplierList"-->
<!--                                                                    @change="onVendorChange"-->
<!--                                                                    :value="member.vendor"-->
<!--                                                                    :data-item-key="dataItemKey"-->
<!--                                                                    :text-field="textField"-->
<!--                                                                    :default-item="vendorItem"-->
<!--                                                                    :filterable="true"-->
<!--                                                                    @filterchange="onVendorFilterChange">-->
<!--                                                                </dropdownlist>-->
                                                                <v-select
                                                                    class="mt-1"
                                                                    :items="supplierList"
                                                                    item-text="name"
                                                                    item-value="id"
                                                                    v-model="member.vendor"
                                                                    outlined>
                                                                </v-select>
                                                            </div>
                                                        </v-col>
                                                        <v-col sm="4" cols="12" class="pb-0">
                                                            <label class="label  mb-0">{{ $t('employee') }}</label>
                                                            <div class="kendo_dropdown_custom pb-3 mt-1">
<!--                                                                <dropdownlist-->
<!--                                                                    class="v-input__slot"-->
<!--                                                                    :data-items="employeeList"-->
<!--                                                                    @change="onEmployeeChange"-->
<!--                                                                    :value="member.employee"-->
<!--                                                                    :data-item-key="dataItemKey"-->
<!--                                                                    :text-field="textField"-->
<!--                                                                    :default-item="employeeItem"-->
<!--                                                                    :filterable="true"-->
<!--                                                                    @filterchange="onEmployeeFilterChange">-->
<!--                                                                </dropdownlist>-->
                                                                <v-select
                                                                    class="mt-1"
                                                                    :items="employeeList"
                                                                    item-text="name"
                                                                    item-value="id"
                                                                    v-model="member.employee"
                                                                    outlined>
                                                                </v-select>
                                                            </div>
                                                        </v-col>
                                                    </v-row>
                                                </v-col>
                                            </v-row>
                                            <div style="background-color: #ffffff; height: 16px; width:100%;"></div>

                                        </v-form>
                                        <!-- Grid -->
                                        <v-tabs slider-color="#ffffff"
                                                class="individual_tabs">
                                            <v-tab>
                                                <span class="hidden-sm-and-up">
                                                    <v-icon left>mdi-pen</v-icon>
                                                </span>
                                                <span class="hidden-sm-and-down text-capitalize">{{
                                                        $t('contact_address')
                                                    }}</span>
                                            </v-tab>
                                            <!-- <v-tab>
                                                <span class="hidden-sm-and-up">
                                                    <v-icon left>mdi-pen</v-icon>
                                                </span>
                                                <span class="hidden-sm-and-down  text-capitalize">{{
                                                        $t('payment_billing')
                                                    }}</span>
                                            </v-tab>
                                            <v-tab>
                                                <span class="hidden-sm-and-up  text-capitalize">
                                                    <v-icon left>mdi-pen</v-icon>
                                                </span>
                                                <span class="hidden-sm-and-down  text-capitalize">{{
                                                        $t('account_tax')
                                                    }}</span>
                                            </v-tab>
                                            <v-tab>
                                                <span class="hidden-sm-and-up">
                                                    <v-icon left>mdi-pen</v-icon>
                                                </span>
                                                <span class="hidden-sm-and-down  text-capitalize">{{
                                                        $t('note_on_invoice')
                                                    }}</span>
                                            </v-tab> -->
                                            <v-tab>
                                                <span class="hidden-sm-and-up">
                                                    <v-icon left>mdi-pen</v-icon>
                                                </span>
                                                <span class="hidden-sm-and-down  text-capitalize">{{
                                                        $t('property')
                                                    }}</span>
                                            </v-tab>
<!--                                            <v-tab>-->
<!--                                                <span class="hidden-sm-and-up">-->
<!--                                                    <v-icon left>mdi-pen</v-icon>-->
<!--                                                </span>-->
<!--                                                <span class="hidden-sm-and-down  text-capitalize">{{-->
<!--                                                        $t('image')-->
<!--                                                    }}</span>-->
<!--                                            </v-tab>-->

                                            <v-tab-item>
                                                <v-row>
                                                    <v-col class="py-0" sm="6" cols="12">
                                                        <v-row>
                                                            <v-col sm="6" cols="12" class="py-0 kendo_dropdown_custom">
                                                                <label class="label mb-0">{{ $t('gender') }}</label>
                                                                <v-select
                                                                    class="mt-1"
                                                                    :items="genders"
                                                                    item-text="name"
                                                                    item-value="id"
                                                                    v-model="member.gender"
                                                                    :placeholder="$t('select')"
                                                                    outlined>
                                                                </v-select>
                                                            </v-col>
                                                            <v-col sm="6" cols="12" class="py-0 kendo_dropdown_custom">
                                                                <label class="label mb-0">{{$t('family_status')}}</label>
                                                                <v-select
                                                                    class="mt-1"
                                                                    :items="familyStatus"
                                                                    item-text="name"
                                                                    item-value="id"
                                                                    v-model="member.familyStatus"
                                                                    :placeholder="$t('select')"
                                                                    outlined>
                                                                </v-select>
                                                            </v-col>
                                                            <v-col sm="6" cols="12" class="py-0 kendo_dropdown_custom">
                                                                <label class="mb-0">{{$t('number_of_families')}}</label>
                                                                <v-text-field
                                                                    class="mt-1"
                                                                    tage="Num of Family"
                                                                    type="number"
                                                                    v-model="member.familyMember"
                                                                    outlined
                                                                />
                                                            </v-col>
                                                            <v-col sm="6" cols="12" class="py-0 kendo_dropdown_custom">
                                                                <label class="mb-0">{{ $t('phone_number') }}</label>
                                                                <v-text-field
                                                                    class="mt-1"
                                                                    tage="Phone Number"
                                                                    v-model="member.phoneNumber"
                                                                    outlined
                                                                />
                                                            </v-col>
                                                            <v-col sm="6" cols="12" class="py-0 kendo_dropdown_custom">
                                                                <label class="mb-0">{{$t('id_card_number')}}</label>
                                                                <v-text-field
                                                                    class="mt-1"
                                                                    tage="Phone Number"
                                                                    type="number"
                                                                    v-model="member.idNumber"
                                                                    outlined
                                                                />
                                                            </v-col>
                                                            <v-col sm="6" cols="12" class="py-0 kendo_dropdown_custom">
                                                                <label class="mb-0">{{ $t('dob') }}</label>
                                                                <app-datepicker
                                                                    :initialDate="member.dob"
                                                                    @emitDate="member.dob = $event"/>
                                                            </v-col>
<!--                                                            <v-col sm="6" cols="12" class="py-0 kendo_dropdown_custom">-->
<!--                                                                <label class="mb-0">{{ $t('member_fee') }}</label>-->
<!--                                                                <v-select-->
<!--                                                                    class="mt-1"-->
<!--                                                                    v-model="member.memberFee"-->
<!--                                                                    :items="memberFees"-->
<!--                                                                    :disabled="lockMemberFee"-->
<!--                                                                    item-value="id"-->
<!--                                                                    item-text="name"-->
<!--                                                                    return-object-->
<!--                                                                    placeholder="Member Fee"-->
<!--                                                                    @change="feeChange"-->
<!--                                                                    outlined-->
<!--                                                                />-->
<!--                                                            </v-col>-->
                                                            <v-col sm="6" cols="12" class="py-0 kendo_dropdown_custom" v-show="isMemberFee">
                                                                <label class="mb-0">{{ $t('cash_account') }}</label>
                                                                <v-select
                                                                    class="mt-1"
                                                                    v-model="member.cashAccount"
                                                                    :items="cashAccounts"
                                                                    item-value="id"
                                                                    :item-text="item =>`${item.number} - ${item.name}`"
                                                                    return-object
                                                                    outlined>
                                                                </v-select>
                                                            </v-col>
                                                        </v-row>
                                                    </v-col>
                                                    <v-col class="py-0" sm="6" cols="12">
                                                        <v-dialog v-model="dialogM2" max-width="500px">
                                                            <template v-slot:activator="{ on }">
                                                                <v-btn color="primary" rounded
                                                                       class="btn_create_new float-right mb-4 ml-2"
                                                                       @click="onNewAddressClick"
                                                                       v-on="on">
                                                                    {{ $t('add_new_address') }}
                                                                </v-btn>
                                                            </template>
                                                            <v-form
                                                                ref="form"
                                                                v-model="valid"
                                                                lazy-validation>
                                                                <v-card>
                                                                    <v-card-title>{{ $t('address') }}</v-card-title>
                                                                    <v-icon class="btn_close" @click="dialogM2 = false">
                                                                        close
                                                                    </v-icon>
                                                                    <v-divider/>
                                                                    <v-card-text
                                                                        style="min-height: 260px; background-color: #EDF1F5; color: #333;">
                                                                        <v-row>
                                                                            <v-col cols="12" sm="6" class="py-0">
                                                                                <label
                                                                                    class="mb-0">{{
                                                                                        $t('address_name')
                                                                                    }}</label>
                                                                                <v-text-field
                                                                                    class="mt-1"
                                                                                    tage="Address Name"
                                                                                    v-model="address.name"
                                                                                    outlined
                                                                                />
                                                                                <label
                                                                                    class="label mb-0">{{
                                                                                        $t('address_type')
                                                                                    }}</label>
                                                                                <v-select
                                                                                    class="mt-1"
                                                                                    :items="addressType"
                                                                                    tage="Address Type"
                                                                                    v-model="address.type"
                                                                                    outlined
                                                                                />
                                                                                <label
                                                                                    class="mb-0">{{
                                                                                        $t('address_line_2')
                                                                                    }}</label>
                                                                                <v-text-field
                                                                                    class="mt-1"
                                                                                    v-model="address.line2"
                                                                                    tage="Address Line 2"
                                                                                    outlined
                                                                                />
                                                                            </v-col>
                                                                            <v-col sm="6" cols="12" class="py-0">
                                                                                <label
                                                                                    class="mb-0">{{
                                                                                        $t('country')
                                                                                    }}</label>
                                                                                <v-select
                                                                                    class=" mt-1"
                                                                                    :items="countries"
                                                                                    tage="Address Country"
                                                                                    v-model="address.country"
                                                                                    item-value="abbreviation"
                                                                                    :item-text="item =>`${item.abbreviation} - ${item.country}`"
                                                                                    return-object
                                                                                    outlined
                                                                                />
                                                                                <label
                                                                                    class="mb-0">{{
                                                                                        $t('address_line_1')
                                                                                    }}</label>
                                                                                <v-text-field
                                                                                    class="mt-1"
                                                                                    v-model="address.line1"
                                                                                    tage="Address Line 1"
                                                                                    outlined
                                                                                />

                                                                            </v-col>
                                                                        </v-row>
                                                                    </v-card-text>
                                                                    <v-divider/>
                                                                    <v-card-actions class="function_footer pa-4">
                                                                        <v-btn outlined color="#494846" class="float-left text-capitalize"
                                                                               @click="dialogM2 = false">{{
                                                                                $t('cancel')
                                                                            }}
                                                                        </v-btn>
                                                                        <v-btn @click="onSaveCloseAddress"
                                                                               color="secondary"
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
                                                                        <th class="text-uppercase">{{ $t('name') }}</th>
                                                                        <th class="text-uppercase">{{ $t('type') }}</th>
                                                                        <th style="width: 50px"/>
                                                                    </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                    <tr v-for="d in addresses" v-bind:key="d.id">
                                                                        <td>{{ d.name }}</td>
                                                                        <td class="">{{ d.type }}</td>
                                                                        <td>
                                                                            <v-btn class="btn_edit_setting"
                                                                                   @click="goEditAddress(d)">
                                                                                <v-icon class="white--text" size="12">fa
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
                                            </v-tab-item>
                                            <v-tab-item>
                                                <v-row>
                                                    <v-col sm="6" cols="12"
                                                            class="py-0 kendo_dropdown_custom">
                                                        <v-row>
                                                            <v-col sm="6" cols="12" class="pb-0">
                                                                <label class="label mb-0">{{$t('land')}}</label>
                                                                <v-text-field
                                                                    class="mt-1"
                                                                    v-model="landName"
                                                                    outlined
                                                                    required
                                                                />
                                                            </v-col>
                                                            <v-col sm="3" cols="12" class="pb-0">
                                                                <label class="label mb-0">{{$t('size_')}}</label>
                                                                <v-text-field
                                                                    class="mt-1"
                                                                    v-model="landSize"
                                                                    type="number"
                                                                    outlined
                                                                    required
                                                                />
                                                            </v-col>
                                                            <v-col sm="3" cols="12" class="pt-9 pl-0 pb-0">
                                                                <v-btn color="primary" rounded class="btn_create_new "
                                                                    @click="addLand">
                                                                    {{ $t('add') }}
                                                                </v-btn>
                                                            </v-col>
                                                            
                                                        </v-row>
                                                        <v-simple-table class="pr-4">
                                                            <template v-slot:default>
                                                                <thead>
                                                                    <tr>
                                                                        <th class="text-left text-uppercase">
                                                                            {{$t('land')}}
                                                                        </th>
                                                                        <th class="text-left text-uppercase">
                                                                            {{$t('size_')}}
                                                                        </th>
                                                                        <th class="text-left text-uppercase">
                                                                            {{$t('action')}}
                                                                        </th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr v-for="pl in landList" v-bind:key="pl.id">
                                                                    <td class="text-bold">{{ pl.name }}</td>
                                                                    <td>{{ pl.size }}</td>
                                                                    <td>
                                                                        <v-btn class="btn_edit_setting"
                                                                               @click="removeLand(pl)">
                                                                            <v-icon class="white--text" size="12">fa
                                                                                fa-pen
                                                                            </v-icon>
                                                                            <span
                                                                                class="capitalize ml-1 white--text font_14">{{
                                                                                    $t('delete')
                                                                                }}</span>
                                                                        </v-btn>
                                                                    </td>
                                                                </tr>
                                                                </tbody>
                                                            </template>
                                                        </v-simple-table>
                                                    </v-col> 
                                                    <v-col sm="6" cols="12"
                                                            class="py-0 kendo_dropdown_custom">
                                                        <v-row>
                                                            <v-col sm="6" cols="12" class="pb-0">
                                                                <label class="label mb-0">{{$t('machinery')}}</label>
                                                                <v-text-field
                                                                    class="mt-1"
                                                                    outlined
                                                                    v-model="machinName"
                                                                    required
                                                                />
                                                            </v-col>
                                                            <v-col sm="3" cols="12" class="pb-0">
                                                                <label class="label mb-0">{{$t('qty')}}</label>
                                                                <v-text-field
                                                                    class="mt-1"
                                                                    outlined
                                                                    type="number"
                                                                    v-model="machinQty"
                                                                    required
                                                                />
                                                            </v-col>
                                                            <v-col sm="3" cols="12" class="pt-9 pl-0 pb-0">
                                                                <v-btn color="primary" rounded class="btn_create_new "
                                                                    @click="addMachin">
                                                                    {{ $t('add') }}
                                                                </v-btn>
                                                            </v-col>
                                                        </v-row>
                                                        <v-simple-table class="pr-4">
                                                            <template v-slot:default>
                                                            <thead>
                                                                <tr>
                                                                    <th class="text-left text-uppercase">
                                                                        {{$t('machinery')}}
                                                                    </th>
                                                                    <th class="text-left text-uppercase">
                                                                        {{$t('qty')}}
                                                                    </th>
                                                                    <th class="text-left text-uppercase">
                                                                        {{$t('action')}}
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                            <tr v-for="pl in machinList" v-bind:key="pl.id">
                                                                <td class="text-bold">{{ pl.name }}</td>
                                                                <td>{{ pl.qty }}</td>
                                                                <td>
                                                                    <v-btn class="btn_edit_setting"
                                                                           @click="removeMachin(pl)">
                                                                        <v-icon class="white--text" size="12">fa
                                                                            fa-pen
                                                                        </v-icon>
                                                                        <span
                                                                            class="capitalize ml-1 white--text font_14">{{
                                                                                $t('delete')
                                                                            }}</span>
                                                                    </v-btn>
                                                                </td>
                                                            </tr>
                                                            </tbody>
                                                            </template>
                                                        </v-simple-table>
                                                        
                                                    </v-col> 
                                                </v-row>
                                            </v-tab-item>
                                            <!-- item 2 -->
                                            <!-- <v-tab-item>
                                                <v-row>
                                                    <v-col class="py-0" sm="6" cols="12">
                                                        <p class="color_grey">The defaults of payment and billing will
                                                            be used when creating orders or invoice of this company </p>
                                                        <label class="mb-0">{{ $t('default_price_level') }}</label>
                                                        <v-select class="mt-1"
                                                                  v-model="member.priceLevel"
                                                                  :items="priceLevels"
                                                                  item-value="id"
                                                                  item-text="name"
                                                                  return-object
                                                                  placeholder="Price Level"
                                                                  tage="Default Price Level"
                                                                  outlined
                                                        />
                                                        <label class="mb-0">{{ $t('default_discount') }}</label>
                                                        <v-select class="mt-1"
                                                                  v-model="member.defaultDiscount"
                                                                  :items="discountItems"
                                                                  item-value="id"
                                                                  item-text="name"
                                                                  return-object
                                                                  tage="Default Discount"
                                                                  placeholder="0% discount"
                                                                  outlined
                                                        />
                                                    </v-col>
                                                    <v-col class="py-0" sm="6" cols="12">
                                                        <label class="mb-0">{{ $t('default_payment_term') }}</label>
                                                        <v-select class="mt-1"
                                                                  :items="paymentTerms"
                                                                  tage="Default Payment Term"
                                                                  placeholder="Payment Term"
                                                                  item-text="name"
                                                                  item-value="id"
                                                                  v-model="member.paymentTerm"
                                                                  return-object
                                                                  outlined/>
                                                        <label class="mb-0">{{ $t('default_payment_method') }}</label>
                                                        <v-select class="mt-1"
                                                                  :items="paymentMethods"
                                                                  tage="Default Payment Method"
                                                                  placeholder="Cash"
                                                                  :item-text="item =>`${item.code} - ${item.name}`"
                                                                  v-model="member.paymentMethod"
                                                                  return-object
                                                                  outlined/>
                                                    </v-col>
                                                </v-row>
                                            </v-tab-item>
                                            <v-tab-item>
                                                <v-row>
                                                    <v-col sm="12" class="py-0" cols="12">
                                                        <p class="mb-0 color_grey">
                                                            {{ $t('default_payment_bill_in_funct') }}</p>
                                                    </v-col>
                                                    <v-col sm="6" cols="12">
                                                        <label class="label mb-0">{{ $t('account_receivable') }}</label>
                                                        <v-select class="mt-1"
                                                                  v-model="member.accountReceivable"
                                                                  :items="accReceivables"
                                                                  item-value="id"
                                                                  :item-text="item =>`${item.number} - ${item.name}`"
                                                                  return-object
                                                                  placeholder="Account Receivable"
                                                                  tage="Account Receivable"
                                                                  outlined>
                                                        </v-select>

                                                        <label class="label mb-0">{{ $t('sale_deposit') }}</label>
                                                        <v-select class="mt-1"
                                                                  v-model="member.accountDeposit"
                                                                  :items="accDeposits"
                                                                  item-value="id"
                                                                  :item-text="item =>`${item.number} - ${item.name}`"
                                                                  return-object
                                                                  tage="Sale Deposit"
                                                                  placeholder="Sale Deposit Account"
                                                                  outlined>
                                                        </v-select>

                                                        <label
                                                            class="label mb-0">{{ $t('settlement_discount') }}</label>
                                                        <v-select class="mt-1"
                                                                  v-model="member.accountDiscount"
                                                                  :items="accDiscount"
                                                                  item-value="id"
                                                                  :item-text="item =>`${item.number} - ${item.name}`"
                                                                  return-object
                                                                  tage="Settlement Discount"
                                                                  placeholder="Receipt Settlement Discount"
                                                                  outlined="">
                                                        </v-select>
                                                    </v-col>
                                                    <v-col sm="6" cols="12">
                                                        <label class="label mb-0">{{ $t('default_tax') }}</label>
                                                        <v-select class="mt-1"
                                                                  v-model="member.defaultTax"
                                                                  :items="vat"
                                                                  item-value="id"
                                                                  item-text="defaultTax"
                                                                  return-object
                                                                  tage="Default Tax"
                                                                  placeholder="VAT (10%)"
                                                                  outlined>
                                                        </v-select>
                                                    </v-col>
                                                </v-row>

                                            </v-tab-item>
                                            <v-tab-item>
                                                <v-textarea class="mt-1"
                                                            v-model="member.noteOnInvoice"
                                                            outlined
                                                            clearable
                                                            rows="5"/>
                                            </v-tab-item> -->
                                            <v-tab-item>
                                                <v-col sm="12" class="">
                                                    <h2 class="mb-2 font_20 width_100">{{ $t("default_image") }}</h2>
                                                    <v-row>
                                                        <v-col sm="5" cols="12" lass="pt-2">
                                                            <p class="color_grey font_14">
                                                                {{ $t("add_funct_prod_variant_desc3") }}
                                                            </p>
                                                        </v-col>
                                                        <v-btn class="float-left  btn_cancel" @click="upload">
                                                            {{ $t('upload') }}
                                                        </v-btn>
                                                        <v-col sm="7" cols="12" class="py-0">
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
                                            </v-tab-item>
                                        </v-tabs>
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

                                        <v-btn color="primary" @click="saveNew" v-show="!isEdit"
                                               class="float-right  white--text text-capitalize mr-3 ">
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
import { i18n } from '@/i18n';
import DatePickerComponent from '@/components/custom_templates/DatePickerComponent'
import {uuid} from 'vue-uuid'
import MemberModel from '@/scripts/model/Member'
import {loanHandler} from "@/scripts/AppHandlers";
import {dataStore} from '@/observable/store'

const accountHandler = require("@/scripts/accountHandler")
const customerHandler = require("@/scripts/customerHandler")
const settingHandler = require("@/scripts/settingHandler")
const paymentOptionHandler = require("@/scripts/paymentOptionHandler")
const paymentTermHandler = require("@/scripts/paymentTermHandler")
const otherHandler = require("@/scripts/otherHandler")
const warehouseHandler = require("@/scripts/warehouseHandler")
const priceLevelHandler = require("@/scripts/priceLevelHandler")
const discountItemHandler = require("@/scripts/discountItemHandler")
const memberHandler = require("@/scripts/memberHandler")
const supplierHandler = require("@/scripts/supplierHandler")
const employeeHandler = require("@/scripts/employeeHandler")
// import {DropDownList} from '@progress/kendo-vue-dropdowns'

const store = require("@/institute.js")
const {instituteId} = store.default.state.cookies

const instituteHandler = require("@/scripts/instituteHandler")
const {cookies} = store.default.state
import {JournalModel, UserModel} from "@/scripts/model/AppModels"

const {journalHandler} = require("@/scripts/AppHandlers");
const {EntityType} = require("@/scripts/default_setup/Collections")
import Helper from "@/helper.js"
// import {dataStore} from "../../observable/store";

const settingsHandler = require("@/scripts/settingsHandler")
const currencyHandler = require("@/scripts/currency/handler/currencyHandler")

const textField = 'name'
const keyField = 'id'
// const defaultItem = {[textField]: 'Select customer...', [keyField]: null}
const vendorItem = {[textField]: 'Select Supplier...', [keyField]: null}
const customerItem = {[textField]: 'Select Customer...', [keyField]: null}
const employeeItem = {[textField]: 'Select Employee...', [keyField]: null}
const emptyItem = {[textField]: 'loading ...'}
const pageSize = 10

const loadingData = [];
while (loadingData.length < pageSize) {
    loadingData.push({...emptyItem})
}

export default {
    name: "IndividualMember",
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
        valid: true,
        member: new MemberModel({}),
        memberTypes: [],
        billByParent: [],
        contactAddress: [],
        paymentBilling: [],
        accountTax: [],
        defaultTaxOnShipping: [],
        mDefaultTaxOnShipping: {},
        tax: [],
        vat: [],
        mVat: {},
        countries: [],
        address: {
            id: '',
            name: '',
            type: '',
            country: {},
            line1: '',
            line2: ''
        },
        paymentOptions: [],
        paymentTerms: [],
        wareHouses: [],
        mPaymentMethod: {},
        mPaymentTerm: {},
        mWareHouse: {},
        accReceivable: [],
        mAccReceivable: {},
        accDeposit: [],
        mAccDeposit: {},
        accDiscount: [],
        mAccDiscount: {},
        priceLevel: [],
        mPriceLevel: {},
        discountItems: [],
        mDiscountItem: {},
        registeredDate: new Date().toISOString().substr(0, 10),
        imgFile: '',
        src: '',
        fileSizeRules: [
            files => !files || !files.some(file => file.size > 1024 * 1024) || 'Image size should be less than 1 MB!'
        ],
        newClick: false,
        popupSettings: {
            height: '250px'
        },
        // defaultItem: defaultItem,
        baseUrl: customerHandler.search(),
        init: {method: 'GET', accept: 'application/json', headers: []},
        pendingRequest: undefined,
        requestStarted: false,
        skip: 0,
        tempSkip: null,
        total: 0,
        filter: '',
        vendorfilter: '',
        textField: 'name',
        dataItemKey: 'id',
        baseCurrencyCode: '',
        //add
        addresses: [],
        provinces: [],
        districts: [],
        villages: [],
        communes: [],
        // familyStatus: [
        //     {name: "នៅលីវ"},
        //     {name: "រៀបការរួច"},
        //     {name: "មេមាយ"},
        //     {name: "ពោះមាយ"},
        //     {name: "មិនដឹង"}
        // ],
        priceLevels: [],
        paymentMethods: [],
        accReceivables: [],
        accDeposits: [],
        //vendor
        supBaseUrl: supplierHandler.search(),
        supplierList: [],
        vendorItem: vendorItem,
        //customer
        cusBaseUrl: customerHandler.search(),
        customerList: [],
        customerItem: customerItem,
        customerfilter: '',
        //employee
        empBaseUrl: employeeHandler.search(),
        employeeList: [],
        employeeItem: employeeItem,
        employeefilter: '',
        editAddress: false,
        memberFees: [],
        //journal
        journalNumber: '',
        journalPrefix: '',
        journalTxnType: EntityType.JOURNAL,
        segments: [],
        user: new UserModel(cookies.user),
        exchangeRate: {},
        rate: '',
        cashAccounts: [],
        isMemberFee: false,
        isEdit: false,
        groups: dataStore.pin.group,
        lockMemberFee: false,
        //land
        landName: '',
        landSize: '',
        landList: [],
        //machin
        machinName: '',
        machinQty: '',
        machinList: [],
        oldStatus: 1,
        oldGender: 1
    }),
    methods: {
        async loadGroup() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    loanHandler.groupMemberGet().then(res => {
                        this.groups = res.data.data
                        if(this.groups.length > 0){
                            this.member.group = this.groups[0]
                        }
                    })
                }, 300);
            })
        },
        nameChange() {
            this.member.fullName = this.member.firstName + ' ' + this.member.lastName
        },
        async feeChange() {
            this.isMemberFee = false
            if (this.member.memberFee) {
                if (parseFloat(this.member.memberFee.price) > 0) {
                    this.isMemberFee = true
                    this.member.cashAccount = this.cashAccounts[0]
                    await this.getJournalNumber()
                    window.console.log(this.member, 'member fee')
                    await this.loadTransactionRate(this.member.memberFee.currency.code)
                }
            }
        },
        async loadInstituteInfo() {
            new Promise(resolve => {
                setTimeout(() => {
                    instituteHandler.getOneCompany(instituteId).then(res => {
                        const company = res
                        if (company.hasOwnProperty('baseCurrency')) {
                            if (company.baseCurrency.hasOwnProperty('code')) {
                                this.baseCurrencyCode = company.baseCurrency.code
                            }
                        }
                    })
                    resolve('resolved');
                }, 200);
            });
        },
        upload() {
            let data = {
                file: this.imgFile
            }
            customerHandler.upload(data).then(res => {
                window.console.log(res, "upload")
            })
        },
        close(data) {
            if (this.$route.params.query !== undefined) {
                window.console.log(this.$route.params.query, 'id--')
                window.history.go(-1)
            } else {
                // window.console.log(data, 'id-cus--')
                this.$router.push({
                    name: 'Customers', params: {
                        data: data
                    }
                })
            }
        },
        onFilterChange(event) {
            const filter = event.filter.value;
            // this.resetCach();
            this.requestData(0, filter);
            // this.dataItems = loadingData;
            // this.skip = 0;
            this.filter = filter;
        },
        onNewAddressClick() {
            this.editAddress = false
            this.address = {}
            this.address.type = 'Contact'
            this.address.country = this.countries[35]
        },
        async loadSegment() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.segments = []
                    settingsHandler.getSeg().then(res => {
                        this.showLoading = true
                        if (res.data.statusCode === 200) {
                            this.showLoading = false
                            this.segments = res.data.data
                        }
                    }).catch()
                    {
                        this.showLoading = false
                    }
                }, 300)
            })
        },
        async loadCountry() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    otherHandler.country().then(res => {
                        this.showLoading = false
                        this.countries = res
                    })
                }, 300);
            })
        },
        onSaveCloseAddress() {
            window.console.log(this.address)
            if (this.editAddress === false) {
                this.address.id = uuid.v1()
                this.addresses.push({
                    id: this.address.id,
                    name: this.address.name,
                    type: this.address.type,
                    country: this.address.country,
                    line1: this.address.line1,
                    line2: this.address.line2
                })
            }
            this.dialogM2 = false
        },
        goEditAddress(e) {
            this.editAddress = true
            this.address = e
            this.dialogM2 = true
        },
        rowNumberTmpl(dataItem) {
            let ds = this.$refs.gridAddressDS.kendoWidget(),
                index = ds.indexOf(dataItem)
            return index + 1
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
        async loadPriceLevel() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    priceLevelHandler.get().then(res => {
                        this.priceLevels = res
                        this.member.priceLevel = res[0]
                    })
                }, 300)
            })
        },
        async loadMemberFee() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    loanHandler.memberFeeGet().then(res => {
                        this.memberFees = res.data.data
                    })
                }, 300);
            })
        },
        async loadTransactionRate(code) {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    const date = new Date(this.member.registeredDate).toISOString().substr(0, 10)
                    if (code !== undefined || code !== '') {
                        this.showLoading = true
                        currencyHandler.getLastExchangeRateByDate(date, code).then(res => {
                            if (res.data.statusCode === 200) {
                                this.showLoading = false
                                const response = res.data.data[0]
                                this.exchangeRate = response
                                this.rate = response.rate
                                this.showLoading = false
                                this.showLoading = false
                                window.console.log(this.exchangeRate, this.rate, 'currency rate')
                            }
                        })
                    }
                }, 300)
            })
        },
        async initData() {
            if (this.$route.params.id !== undefined) {
                this.isEdit = true
                await this.loadSingleMember()
            } else {
                this.isEdit = false
                this.clear()
            }
        },
        async getJournalNumber() {
            let num = await Helper.generateAccoutingNumber(this.journalTxnType, this.member.registeredDate)
            this.journalNumber = num.number
            this.journalPrefix = num.prefix_format
        },
        clear() {
            this.isEdit = false
            this.member = new MemberModel({})
            this.member.gender = 1
            this.member.familyStatus = 1
            this.member.status = 1
        },
        memberTypeChange() {
            if (this.member.hasOwnProperty('memberType')) {
                // window.console.log(this.member.memberType, 'member type');
                // this.member.paymentMethod = this.member.memberType.paymentMethod
                // this.member.paymentTerm = this.member.memberType.paymentTerm
                // this.member.defaultTax = this.member.memberType.defaultTax
                // this.member.accountDeposit = this.member.memberType.accountDeposit
                // this.member.accountDiscount = this.member.memberType.accountDiscount
                // this.member.accountReceivable = this.member.memberType.accountReceiveable
                this.member.abbr = this.member.memberType.abbr
                this.getLastNumber()
            }
        },
        async getLastNumber() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    if (this.$route.params.id == undefined) {
                        let data = {
                            module: 'func',
                            pk: 'ac-mem-',
                            lastSk: '-ac-mem'
                        }
                        window.console.log(data, 'memeber data')
                        memberHandler.getLastNumber(data).then(res => {
                            window.console.log(res.data.data, 'last number')
                            this.member.lastNumber = res.data.data.lastNumber
                            this.member.number = this.pad(res.data.data.lastNumber, 6)
                            window.console.log(this.member.lastNumber)
                        }).catch(e => {
                            // this.$snotify.error('Something went wrong')
                            // this.errors.push(e)
                            window.console.log(e)
                        })
                    }
                }, 300);
            })
        },
        pad(value, length) {
            return ('0'.repeat(length) + value).slice(-length)
        },
        removeRow() {
        },
        errorMessage() {
        },
        addRow() {
        },
        cancel() {
            window.history.go(-1)
        },
        async saveJournal(customer, rate, currency) {
            window.console.log(customer, 'customer journal')
            let self = this
            let obj = customer.data.data
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    // const seg = this.segments[this.segments.length - 1]
                    const amount = parseFloat(obj.memberFee.price)
                    let data = {
                        "number": this.journalNumber,
                        "description": "Saving Withdraw",
                        "journal_type": "general_journal",
                        "journal_date": new Date(obj.registeredDate),
                        "currency_code": obj.memberFee.currency.code,
                        "buinsess_unit_uuid": "",
                        "location_uuid": "",
                        "project_uuid": "",
                        "segment_uuid": "",//seg.id,
                        "journal_entries": [
                            {
                                "uuid": "",
                                "account": obj.memberFee.revenueAccount,
                                "description": 'Member Fee',
                                "primary_contact": obj,
                                "secondary_contacts": [],
                                "ref_number": '',
                                "amount": amount,
                                "discount": {},
                                "mark_up": 0,
                                "billable": 0,
                                "tax_code": "",
                                "payment_method": {},
                                "currency": currency,
                                "exchange_rate_uuid": "",
                                "exchange_rate": rate,
                                "exchanged_amount": parseFloat(amount) * parseFloat(rate),
                                "tax_amount": 0,
                                "exchanged_tax_amount": 0,
                                "is_reconciled": 0,
                                "is_settled": 0,
                                "class_1_uuid": "",
                                "class_2_uuid": "",
                                "class_3_uuid": "",
                                "class_4_uuid": "",
                                "class_5_uuid": "",
                                "payment_method_as": "",
                                "created_by": null,
                                "modified_by": null,
                                "created_date": null,
                                "modified_date": null
                            },
                            {
                                "uuid": "",
                                "account": obj.cashAccount,
                                "description": 'Member Fee',
                                "primary_contact": obj,
                                "secondary_contacts": [],
                                "ref_number": '',
                                "amount": (parseFloat(amount) * -1),
                                "discount": {},
                                "mark_up": 0,
                                "billable": 0,
                                "tax_code": "",
                                "payment_method": {},
                                "currency": currency,
                                "exchange_rate_uuid": "",
                                "exchange_rate": rate,
                                "exchanged_amount": ((parseFloat(amount) * -1) * parseFloat(rate)),
                                "tax_amount": 0,
                                "exchanged_tax_amount": 0,
                                "is_reconciled": 0,
                                "is_settled": 0,
                                "class_1_uuid": "",
                                "class_2_uuid": "",
                                "class_3_uuid": "",
                                "class_4_uuid": "",
                                "class_5_uuid": "",
                                "payment_method_as": "",
                                "created_by": null,
                                "modified_by": null,
                                "created_date": null,
                                "modified_date": null
                            }
                        ],
                        "transaction_type": "journal",
                        "is_draft": 0,
                        "is_reversed": 0,
                        "prefix_format": this.journalPrefix,
                        "created_by": this.user
                    }
                    journalHandler.save(new JournalModel(data))
                        .then(function (response) {
                            window.console.log(response)
                        })
                        .catch(function (error) {
                            window.console.log(error);
                        })
                        .finally(() => {
                            self.showLoading = false;
                        });
                }, 300);
            })
        },
        saveClose(){
            this.saveOption = 'saveClose'
            this.save()
        },
        saveNew(){
            this.saveOption = 'saveNew'
            this.save()
        },
        async save() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.member.addresses = this.addresses
                    this.member.abbrNumber = this.member.abbr.toString()+this.member.number
                    this.member.lands = this.landList
                    this.member.machineries = this.machinList
                    this.member.saveOption = this.saveOption
                    this.member.isEdit = this.isEdit
                    if(this.isEdit == true){
                        if(this.oldGender != this.member.gender){
                            this.member.genderChange = true
                        }
                        if(this.oldStatus != this.member.status){
                            this.member.statusChange = true
                        }
                    }
                    this.showLoading = true
                    memberHandler.create(new MemberModel(this.member)).then(response => {
                        this.showLoading = false
                        if (response.data.statusCode === 201) {
                            if (this.member.memberFee) {
                                if(this.lockMemberFee === false) {
                                    if (parseFloat(this.member.memberFee.price) > 0) {
                                        this.saveJournal(response, this.rate, this.exchangeRate)
                                    }
                                }
                            }
                            if (this.saveOption === 'saveNew') {
                                this.clear()
                            } else {
                                window.history.go(-1)
                            }
                            this.$refs.form.reset()
                            this.$snotify.success('Successfully')
                        }
                    }).catch(e => {
                        this.showLoading = false
                        this.$snotify.error('Something went wrong')
                        this.errors.push(e)
                    })
                }, 300)
            })
        },
        async loadMemberType() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    loanHandler.memberTypeGet().then(res => {
                        this.memberTypes = res.data.data
                        // window.console.log(res, 'member type')
                        if (this.memberTypes.length > 0) {
                            this.member.memberType = this.memberTypes[0]
                            this.memberTypeChange()
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
                        this.accReceivables = res.filter(m => m.account_type.number === 7).map(item => {
                            return {
                                id: item.uuid,
                                name: item.name,
                                local_name: item.local_name,
                                number: item.number,
                                is_taxable: item.is_taxable,
                                banhjiAccCode: item.banhjiAccCode,
                                group_code: item.group_code,
                                parent_account: item.parent_account,
                                type_code: item.type_code
                            }
                        })
                        if (this.accReceivable.length > 0) {
                            this.mAccReceivable = this.accReceivable[0]
                        }
                        //Deposit Account
                        this.accDeposits = res.filter(m => m.account_type.number === 20 || m.account_type.number === 28).map(item => {
                            return {
                                id: item.uuid,
                                name: item.name,
                                local_name: item.local_name,
                                number: item.number,
                                is_taxable: item.is_taxable,
                                banhjiAccCode: item.banhjiAccCode,
                                group_code: item.group_code,
                                parent_account: item.parent_account,
                                type_code: item.type_code
                            }
                        })
                        if (this.accDeposit.length > 0) {
                            this.mAccDeposit = this.accDeposit[0]
                        }
                        //Discount Account
                        this.accDiscount = res.filter(m => m.account_type.number === 38).map(item => {
                            return {
                                id: item.uuid,
                                name: item.name,
                                local_name: item.local_name,
                                number: item.number,
                                is_taxable: item.is_taxable,
                                banhjiAccCode: item.banhjiAccCode,
                                group_code: item.group_code,
                                parent_account: item.parent_account,
                                type_code: item.type_code
                            }
                        })
                        //member fee
                        this.cashAccounts = res.filter(m => m.account_type.number === 1).map(itm => {
                            return {
                                id: itm.uuid,
                                name: itm.name,
                                local_name: itm.local_name,
                                number: itm.number,
                                is_taxable: itm.is_taxable,
                                banhjiAccCode: itm.banhjiAccCode,
                                group_code: itm.group_code,
                                parent_account: itm.parent_account,
                                type_code: itm.type_code
                            }
                        })
                        if (this.accDiscount.length > 0) {
                            this.mAccDiscount = this.accDiscount[0]
                        }
                    })
                }, 300);
            })
        },
        async loadTax() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    settingHandler.get().then(res => {
                        this.showLoading = false
                        this.tax = res
                        let vAT = this.tax.filter(m => m.taxType.typeId === 1 && m.transactionType === 'Sale') // valuable tax
                        this.vat = vAT // valuable tax
                        if (this.vat.length > 0) {
                            this.mVat = this.vat[0]
                        }

                        // let vATs = this.tax.filter(m => m.abbr === 'ST') // Shipping Tax
                        // this.defaultTaxOnShipping = vATs[0]['subOf'] // valuable tax
                        // if (this.defaultTaxOnShipping.length > 0) {
                        //     this.mDefaultTaxOnShipping = this.defaultTaxOnShipping[0]
                        // }
                    })
                }, 300);
            })
        },
        async loadPaymentMethod() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    paymentOptionHandler.getAll().then(res => {
                        this.showLoading = false
                        this.paymentMethods = res
                        if (this.paymentMethods.length > 0) {
                            this.member.paymentMethod = this.paymentMethods[0]
                        }
                    })
                }, 300);
            })
        },
        async loadPaymentTerm() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    paymentTermHandler.getAll().then(res => {
                        this.showLoading = false
                        this.paymentTerms = res
                        if (this.paymentTerms.length > 0) {
                            this.mPaymentTerm = this.paymentTerms[0]
                        }
                    })
                }, 300);
            })
        },
        async loadSingleMember() {
            this.isEdit = true
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    this.showLoading = true
                    memberHandler.get(this.$route.params.id).then(res => {
                        if (res.data.statusCode === 200) {
                            this.showLoading = false
                            this.member = res.data.data[0]
                            if(this.member.memberFee){
                                this.lockMemberFee = true
                            }
                            this.landList = this.member.lands
                            this.machinList = this.member.machineries
                            this.addresses = this.member.addresses
                            this.oldStatus = this.member.status
                            this.oldGender = this.member.gender
                        }
                    })
                }, 300);
            })
        },
        async loadWareHouses() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    warehouseHandler.getWarehouseSettingAll().then(res => {
                        this.showLoading = false
                        this.wareHouses = res
                        if (this.wareHouses.length > 0) {
                            this.mWareHouse = this.wareHouses[0]
                        }
                    })
                }, 300);
            })
        },
        async loadDiscountItems() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    this.showLoading = true
                    discountItemHandler.list().then(res => {
                        if (res.data.statusCode === 200)
                            this.showLoading = false
                        this.discountItems = res.data.data
                    })
                }, 300)
            })
        },
        //supplier
        onVendorChange(event) {
            const value = event.value
            if (value && value[textField] === emptyItem[textField]) {
                return;
            }
            this.member.vendor = value
        },
        onVendorFilterChange(event) {
            const filter = event.filter.value
            this.vendorRequestData(0, filter, this.supBaseUrl)
            this.vendorfilter = filter
        },
        vendorRequestData(skip, filter, baseUrl) {
            // window.console.log(baseUrl, 'requ')
            const url = baseUrl +
                `?filter=${filter}`
            this.requestStarted = true;
            fetch(url)
                .then((response) => {
                    return response.json()
                })
                .then(this.vencdorAfterFetch)
        },
        vencdorAfterFetch(json) {
            this.supplierList = json.data
        },
        //customer
        onCustomerChange(event) {
            const value = event.value
            if (value && value[textField] === emptyItem[textField]) {
                return;
            }
            this.member.customer = value
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
        //employee
        onEmployeeChange(event) {
            const value = event.value
            if (value && value[textField] === emptyItem[textField]) {
                return;
            }
            this.member.employee = value
        },
        onEmployeeFilterChange(event) {
            const filter = event.filter.value
            this.employeeRequestData(0, filter, this.empBaseUrl)
            this.employeefilter = filter
        },
        employeeRequestData(skip, filter, baseUrl) {
            // window.console.log(baseUrl, 'requ')
            const url = baseUrl +
                `?filter=${filter}`
            this.requestStarted = true;
            fetch(url)
                .then((response) => {
                    return response.json()
                })
                .then(this.employeeAfterFetch)
        },
        employeeAfterFetch(json) {
            this.employeeList = json.data
        },
        //colatoral
        addLand(){
            if(this.landName && this.landSize){
                this.landList.push({
                    id: this.landList.length + 1,
                    name: this.landName,
                    size: this.landSize
                })
                this.landName = ''
                this.landSize = ''
            }else{
                this.$snotify.error('Something went wrong')
            }
        },
        removeLand(e){
            const index = this.landList.indexOf(e);
            this.landList.splice(index,1);
        },
        addMachin(){
            if(this.machinName && this.machinQty){
                this.machinList.push({
                    id: this.machinList.length + 1,
                    name: this.machinName,
                    qty: this.machinQty
                })
                this.machinName = ''
                this.machinQty = ''
            }else{
                this.$snotify.error('Something went wrong')
            }
        },
        removeMachin(e){
            const index = this.machinList.indexOf(e);
            this.machinList.splice(index,1);
        },
    },
    watch: {
        id() {
            // this.product = this.selectedProduct
            window.console.log(this.id, 'watch')
            if (this.id !== undefined) {
                this.loadSingleMember()
            }
        }
    },
    mounted: async function () {
        await this.loadInstituteInfo()
        await this.customerRequestData(0, this.customerfilter, this.cusBaseUrl)
        await this.vendorRequestData(0, this.vendorfilter, this.supBaseUrl)
        await this.employeeRequestData(0, this.employeefilter, this.empBaseUrl)
        await this.loadTax()
        await this.loadPaymentMethod()
        await this.loadPaymentTerm()
        await this.loadMemberType()
        await this.initData()
        await this.loadMemberFee()
        this.loadSegment()
        await this.loadGroup()
    },
    created: async function () {
        await this.loadAccount()
        await this.loadWareHouses()
        await this.loadPriceLevel()
        await this.loadDiscountItems()
        await this.loadCountry()
    },
    computed: {
        virtual: function () {
            return {
                pageSize: pageSize,
                // @ts-ignore
                skip: this.skip,
                // @ts-ignore
                total: this.total
            }
        },
        'creditLimit':
            {
                get() {
                    if (this.member.hasOwnProperty('paymentBilling')) {
                        if (this.member.paymentBilling.hasOwnProperty('creditLimit')) {
                            return this.member.paymentBilling.creditLimit
                        } else {
                            return 0
                        }
                    } else {
                        return 0
                    }
                }
                ,
                set(value) {
                    if (this.member.hasOwnProperty('paymentBilling')) {
                        if (this.member.paymentBilling.hasOwnProperty('creditLimit')) {
                            this.member.paymentBilling.creditLimit = value
                        }
                    }
                }
            },
        'gender':
            {
                get() {
                    if (this.member.hasOwnProperty('contactAddress')) {
                        if (this.member.contactAddress.hasOwnProperty('gender')) {
                            return this.member.contactAddress.gender
                        } else {
                            return ''
                        }
                    } else {
                        return ''
                    }
                },
                set(value) {
                    if (this.member.hasOwnProperty('contactAddress')) {
                        if (this.member.contactAddress.hasOwnProperty('gender')) {
                            this.member.contactAddress.gender = value
                        }
                    }
                }
            },
        'email':
            {
                get() {
                    if (this.member.hasOwnProperty('contactAddress')) {
                        if (this.member.contactAddress.hasOwnProperty('email')) {
                            return this.member.contactAddress.email
                        } else {
                            return ''
                        }
                    } else {
                        return ''
                    }
                },
                set(value) {
                    if (this.member.hasOwnProperty('contactAddress')) {
                        if (this.member.contactAddress.hasOwnProperty('email')) {
                            this.member.contactAddress.email = value
                        }
                    }
                }
            },
        'dob':
            {
                get() {
                    if (this.member.hasOwnProperty('contactAddress')) {
                        if (this.member.contactAddress.hasOwnProperty('dob')) {
                            return this.member.contactAddress.dob
                        } else {
                            return new Date().toISOString().substr(0, 10)
                        }
                    } else {
                        return new Date().toISOString().substr(0, 10)
                    }
                },
                set(value) {
                    if (this.member.hasOwnProperty('contactAddress')) {
                        if (this.member.contactAddress.hasOwnProperty('dob')) {
                            this.member.contactAddress.dob = value
                        }
                    }
                }
            },
        'latitude':
            {
                get() {
                    if (this.member.hasOwnProperty('contactAddress')) {
                        if (this.member.contactAddress.hasOwnProperty('latitude')) {
                            return this.member.contactAddress.latitude
                        } else {
                            return ''
                        }
                    } else {
                        return ''
                    }
                },
                set(value) {
                    if (this.member.hasOwnProperty('contactAddress')) {
                        if (this.member.contactAddress.hasOwnProperty('latitude')) {
                            this.member.contactAddress.latitude = value
                        }
                    }
                }
            },
        'longitude':
            {
                get() {
                    if (this.member.hasOwnProperty('contactAddress')) {
                        if (this.member.contactAddress.hasOwnProperty('longitude')) {
                            return this.member.contactAddress.longitude
                        } else {
                            return ''
                        }
                    } else {
                        return ''
                    }
                },
                set(value) {
                    if (this.member.hasOwnProperty('contactAddress')) {
                        if (this.member.contactAddress.hasOwnProperty('longitude')) {
                            this.member.contactAddress.longitude = value
                        }
                    }
                }
            },
        'phone':
            {
                get() {
                    if (this.member.hasOwnProperty('contactAddress')) {
                        if (this.member.contactAddress.hasOwnProperty('phoneNumber')) {
                            return this.member.contactAddress.phoneNumber
                        } else {
                            return ''
                        }
                    } else {
                        return ''
                    }
                },
                set(value) {
                    if (this.member.hasOwnProperty('contactAddress')) {
                        if (this.member.contactAddress.hasOwnProperty('phoneNumber')) {
                            this.member.contactAddress.phoneNumber = value
                        }
                    }
                }
            },
        
        familyStatus(){
            return [
                {id: 1, name: i18n.t('single')},
                {id: 2, name: i18n.t('married')},
                {id: 3, name: i18n.t('widow')},
                {id: 4, name: i18n.t('widower')},
                {id: 5, name: i18n.t('dont_know')}
            ]
        },
        genders(){
            return [
                {id: 1, name: i18n.t('male')},
                {id: 2, name: i18n.t('female')},
                // {id: 3, name: i18n.t('others')}
            ]
        },
        status() {
            return [
                {id: 1, name: i18n.t('active')},
                {id: 0, name: i18n.t('inactive')}
            ]
        }
    },
    destroyed() {
        // this.resetCach()
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
.v-list-item .v-list-item__title, .v-list-item .v-list-item__subtitle {
    line-height: 1.9 !important;
}
.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr:last-child > th {
    border-left: 0 !important;
    height: 40px !important;
    border-right: 0 !important;
    border-top: thin solid rgba(0, 0, 0, 0.12);
    border-bottom: 3px solid rgba(0, 0, 0, 0.12) !important;
    text-transform: uppercase;
    font-family: "Krasar-Bold", serif !important;
    font-size: 13px !important;
    vertical-align: middle;
    color: #000 !important;
}
</style>

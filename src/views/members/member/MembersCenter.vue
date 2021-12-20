<template>
    <v-row>
        <v-col class="py-0" sm="4" cols="12">
            <v-card outlined dense class="pa-3 no_border mb-3" height="180px" color="grayBg">
                <v-row>       
                    <v-col sm="10" cols="10" class="py-0">
                        <v-text-field
                        v-model="searchName"
                        outlined
                        :placeholder="$t('search')"
                        clearable/>
                    </v-col>
                    
                    <v-col sm="2" cols="2" class="py-0 pl-0">
                        <v-btn color="primary white--text" @click="onSearch()" style="min-width:100%;padding: 0 10px;border-radius: 4px !important;">
                            <i
                                class="b-search"
                                style="font-size: 18px; color:#fff !important;"
                            />
                        </v-btn>
                    </v-col>
                </v-row>
                <v-select
                    :items="memberTypes"
                    item-value="id"
                    item-text="name"
                    v-model="memberType"
                    :placeholder="$t('member_type')"
                    clearable
                    outlined/>
                <v-select
                    :items="memberGroups"
                    item-value="id"
                    item-text="name"
                    v-model="memberGroup"
                    :placeholder="$t('group')"
                    clearable
                    outlined/>
            </v-card>
            <v-card outlined dense class="pa-3 no_border hidden-sm-and-down" color="grayBg">

                <kendo-datasource
                    ref="gridCollectionDS"
                    :transport-read-url="memberCenterURL"
                    :groupable="false"
                    :schema-data="'data'"
                    :schema-total="'total'"
                    :page-size='100'
                    :server-paging="true"
                    :schema-model-id="'id'"
                    :aggregate="aggregateDefinition"
                />

                <kendo-grid
                    id="gridCustomer" class="grid-center"
                    :data-source-ref="'gridCollectionDS'"
                    :change="onChanged"
                    :selectable="true"
                    :persistSelection="true"
                    :noRecords="true"

                    :pageable="true"
                    :sortable="true"
                    :height="420"
                    :scrollable-virtual="true"
                >
                    <kendo-grid-column
                        :field="'numberName'"
                        :attributes="{class:'tb_name_td'}"
                        :title="'name'"
                        :group-header-template="'#=numberName#'"
                    />
                    <!-- <kendo-grid-column
                        :field="'numberName'"
                        :title="'&nbsp;'"
                        :template="'<span>#=numberName#</span>'"
                    /> -->
                </kendo-grid>
            </v-card>
        </v-col>
        <v-col class="py-0" sm="8" cols="12">
            <v-row>
                <v-col sm="12" cols="12" class="tab_txn_att pt-0 pl-0">
                    <v-tabs>
                        <v-tab>
                            <span class="hidden-sm-and-up">
                                <v-icon left>mdi-pen</v-icon>
                            </span>
                            <span class="hidden-sm-and-down  text-upercase">{{ $t('info') }}</span>
                        </v-tab>
                        <v-tab>
                              <span class="hidden-sm-and-up">
                                <v-icon left>mdi-pen</v-icon>
                              </span>
                            <span class="hidden-sm-and-down  text-upercase">{{ $t('transactions') }}</span>
                        </v-tab>
                        <v-tab>
                              <span class="hidden-sm-and-up">
                                <v-icon left>mdi-pen</v-icon>
                              </span>
                              <span class="hidden-sm-and-down text-upercase">{{ $t('attachments') }}</span>
                        </v-tab>
                        <v-tab-item>
                            <v-row>
                                <v-col sm="12" cols="12" class="pt-0 px-6">
                                    <v-row class="grayBg">
                                        <v-col sm="12" cols="12" class="">
                                            <v-card outlined color="white" class="pa-3">
                                                <Info :member="member"/>
                                            </v-card>
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>
                        </v-tab-item>
                        <!-- Transactions -->
                        <v-tab-item>
                            <v-row>
                                <v-col sm="12" cols="12" class="pt-0 px-6">
                                    <v-row class="grayBg">
                                        <v-col sm="12" cols="12" class="">
                                            <v-card outlined color="white" class="pa-3">
                                                <v-row class="">
                                                    <v-col sm="4" cols="12" class="py-0">
                                                        <v-select class="mt-1"
                                                                  :items="dateSorters"
                                                                  item-text="name"
                                                                  item-value="id"
                                                                  v-model="mDateSorter"
                                                                  @change="onSorterChanges"
                                                                  clearable
                                                                  outlined
                                                                  placeholder="ALL"
                                                        />
                                                    </v-col>

                                                    <v-col sm="3" cols="12" class="py-0">
                                                        <app-datepicker :initialDate="startDate"
                                                                        @emitDate="startDate = $event"/>
                                                    </v-col>

                                                    <v-col sm="3" cols="12" class="py-0">
                                                        <app-datepicker :initialDate="endDate"
                                                                        @emitDate="endDate = $event"/>
                                                    </v-col>

                                                    <v-col sm="1" cols="1" class="pt-1">
                                                        <v-btn color="primary white--text" @click="searchTransaction">
                                                            <v-icon size="18">b-search</v-icon>
                                                        </v-btn>
                                                    </v-col>
                                                </v-row>

                                                <v-row class="">
                                                    <v-col sm="12" cols="12" class="py-0">
                                                        <template>
                                                            <LoadingMe
                                                                :isLoading="showLoadingTxn"
                                                                :fullPage="false"
                                                                type="loading"
                                                                :myLoading="true"/>
                                                            <kendo-datasource ref="gridTransactionDS"
                                                                              :type="'JSON'"
                                                                              :server-paging="false"/>
                                                            <kendo-grid id="gridTransaction" class="grid-function"
                                                                        :data-source-ref="'gridTransactionDS'"
                                                                        :editable="false"
                                                                        :groupable="true"
                                                                        :column-menu="true"
                                                                        :noRecords="true"
                                                                        :sortable="true"
                                                                        :scrollable-virtual="true">
                                                                <kendo-grid-column
                                                                    :title="$t('no')"
                                                                    :template="rowNumberTmpl"
                                                                    :width="40"
                                                                    :column-menu="false"
                                                                    :headerAttributes="{ style: 'background-color: #EDF1F5;', class: 'text-center px-1'	}"
                                                                    :attributes="{style: 'text-align: center'}"/>
                                                                <kendo-grid-column
                                                                    :field="'issuedDate'"
                                                                    :title="$t('date')"
                                                                    :width="120"
                                                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                                                <kendo-grid-column
                                                                    :field="'number'"
                                                                    :attributes="{class:'tb_name_td'}"
                                                                    :title="$t('number')"
                                                                    :width="150"
                                                                    :template="'<span>#=number#</span>'"
                                                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                                                <kendo-grid-column
                                                                    :field="'transactionType'"
                                                                    :title="$t('type')"
                                                                    :width="120"
                                                                    :template="'<span>#=type#</span>'"
                                                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                                                <kendo-grid-column
                                                                    :field="'quantity'"
                                                                    :title="$t('quantity')"
                                                                    :width="90"
                                                                    :attributes="{style: 'text-align: right; '}"
                                                                    :template="'<span>#=kendo.toString(quantity, numberFormat) #</span>'"
                                                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                                                <kendo-grid-column
                                                                    :field="'amount'"
                                                                    :title="$t('amount')"
                                                                    :width="200"
                                                                    :attributes="{style: 'text-align: right; '}"
                                                                    :template="'<span>#=kendo.toString(quantity * price, numberFormat) #</span>'"
                                                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                                            </kendo-grid>
                                                        </template>
                                                    </v-col>
                                                </v-row>
                                            </v-card>
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>
                        </v-tab-item>
                        <!-- Attachment -->
                        <v-tab-item>
                            <v-row>
                                <v-col sm="12" cols="12" class="pt-0 px-6">
                                    <v-row class="grayBg" style="width: 104%;">
                                        <v-col sm="12" cols="12" class="">
                                            <v-card outlined color="white" class="pa-3">
                                                <v-row class="">
                                                    <v-col sm="12" cols="12" class="py-0">
                                                        <p class="mb-2">{{ $t('file_type') }} [PDF, JPG, JPEG, TIFF,
                                                            PNG, GIF] - 5MB</p>
                                                        <template>
                                                            <v-file-input
                                                                v-model="files"
                                                                @change="onFileChange"
                                                                accept="image/jpg, image/jpeg, application/pdf"
                                                                :placeholder="$t('attachments')"
                                                                single
                                                                prepend-icon="mdi-paperclip">
                                                                <template v-slot:selection="{ text }">
                                                                    <v-chip
                                                                        small
                                                                        label
                                                                        color="primary"
                                                                    >
                                                                        {{ text }}
                                                                    </v-chip>
                                                                </template>
                                                            </v-file-input>
                                                            <v-text-field
                                                                v-model="fileDesc"
                                                                outlined
                                                                :placeholder="$t('description')"
                                                                clearable/>
                                                        </template>
                                                        <v-btn color="primary" class="text-capitalize white--text mb-2" @click="uploadFile">
                                                            <!-- <v-icon size="15" class="mr-2">fa-check</v-icon> -->
                                                            {{ $t('upload') }}
                                                        </v-btn>
                                                        <template>
                                                            <LoadingMe
                                                                :isLoading="showLoadingAtch"
                                                                :fullPage="false"
                                                                type="loading"
                                                                :myLoading="true">
                                                            </LoadingMe>
                                                            <kendo-datasource ref="attachmentDS"
                                                                              :data="attachmentList"/>
                                                            <kendo-grid id="gridAttachment" class="grid-function"
                                                                        :data-source-ref="'attachmentDS'"
                                                                        :editable="false"
                                                                        :scrollable-virtual="true">
                                                                <kendo-grid-column
                                                                    :field="''"
                                                                    :title="$t('open')"
                                                                    :width="70"
                                                                    :template="fileUrl"
                                                                    :attributes="{style: 'text-align: center'}"
                                                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                                                <kendo-grid-column
                                                                    :field="'fileName'"
                                                                    :title="$t('file_name')"
                                                                    :width="250"
                                                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                                                <kendo-grid-column
                                                                    :field="'description'"
                                                                    :title="$t('description')"
                                                                    :width="250"
                                                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                                                <kendo-grid-column
                                                                    :field="'fileType'"
                                                                    :title="$t('file_type')"
                                                                    :width="150"
                                                                    :headerAttributes="{ style: 'background-color: #EDF1F5, color: green !important' }"/>
                                                                <kendo-grid-column
                                                                    :field="'size'"
                                                                    :title="$t('size')"
                                                                    :width="150"
                                                                    :template="byteToMB"
                                                                    :headerAttributes="{ style: 'background-color: #EDF1F5, color: green !important' }"/>
                                                                <kendo-grid-column
                                                                    :field="'createdAt'"
                                                                    :title="$t('date')"
                                                                    :width="120"
                                                                    :template="'<span>#= kendo.toString(new Date(createdAt), dateFormat)#</span>'"
                                                                    :headerAttributes="{ style: 'background-color: #EDF1F5, color: green !important' }"/>
                                                            </kendo-grid>
                                                        </template>
                                                    </v-col>
                                                </v-row>
                                            </v-card>
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>
                        </v-tab-item>
                    </v-tabs>
                </v-col>
            </v-row>
        </v-col>

    </v-row>

</template>

<script>
import { i18n } from '@/i18n';
import kendo from "@progress/kendo-ui"
import DatePickerComponent from '@/components/custom_templates/DatePickerComponent'

const $ = kendo.jQuery
const memberHandler = require("@/scripts/memberHandler")
import {loanHandler} from "@/scripts/AppHandlers"
import {dataStore} from '@/observable/store'
const billingHandler = require("@/scripts/invoice/handler/billingHandler")
const apiUrl = require('../../../apiUrl.js')
export default {
    name: "MemberCenter",
    components: {
        LoadingMe: () => import(`@/components/Loading`),
        'app-datepicker': DatePickerComponent,
        Info: () => import('./Info'),
    },
    data: () => ({
        showLoading: true,
        info: {},
        members: [],
        start_date: '',
        end_date: '',
        headers: [],
        forwarded: '',
        files: [],
        attachments: [],
        search: '',
        groupDefinition: {
            field: "type",
        },
        memberTypes: [],
        memberType: {},
        memberGroups: dataStore.pin.group,
        memberGroup: {},
        oldMember: [],
        searchName: '',
        member: {},
        journal_entries: [],
        startDate: kendo.toString(new Date(), 'yyyy-MM-dd'),
        endDate: kendo.toString(new Date(), 'yyyy-MM-dd'),
        // dateSorters: ['Today', 'This Week', 'This Month', 'This Year'],
        mDateSorter: 3,
        showLoadingTxn: false,
        //attachment
        showLoadingAtch: false,
        fileDesc: '',
        fileName: '',
        fileSize: '',
        fileType: '',
        imgFile: '',
        src: '',
        attachmentList: [],
        memberCenterURL: apiUrl.member.member_center_get,
        aggregateDefinition : [
            { field: "id", aggregate: "count"}
        ],
    }),
    methods: {
        async onChanged() {
            let grid = $("#gridCustomer").data("kendoGrid")
            let selectedItem = grid.dataItem(grid.select())
            this.member = selectedItem
            this.$emit('onUpdate', selectedItem)
            this.loadAttachment()
        },
        searchNameChange() {
            if (this.searchName) {
                let search = new RegExp(this.searchName, 'i')
                let newSaving = this.oldMember.filter(item => search.test(item.fullName))
                if (newSaving.length > 0) {
                    this.members = newSaving
                } else {
                    this.$snotify.error('No data found!')
                    this.members = this.oldMember
                }
            }
        },
        goEdit() {
        },
        async loadMemberCenter() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.members = []
                    memberHandler.center().then(res => {
                        this.showLoading = true
                        if (res.data.statusCode === 200) {
                            this.showLoading = false
                            res.data.data.sort(function (a, b) {
                                return b.lastNumber - a.lastNumber
                            })
                            let gAR = []
                            $.each(this.memberGroups, function (i,v){
                                gAR.push(v.id)
                            })
                            let data = []
                            $.each(res.data.data, function (i,v){
                                if($.inArray(v.groupId, gAR) != -1) {
                                    data.push(v)
                                }
                            })
                            this.members = res.data.data// data
                            // window.console.log(this.members, this.memberGroups, gAR)
                            this.oldMember = this.members //res.data.data
                        }
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
                    })
                }, 300);
            })
        },
        memberTypeChange() {
            if (this.memberType) {
                let data = this.oldMember.filter((obj) => {
                    return obj.memberType.id === this.memberType
                })
                // window.console.log(data, 'search data')
                if (data.length > 0) {
                    this.members = data
                } else {
                    this.$snotify.error('No data found')
                    this.members = this.oldMember
                }
            } else {
                this.members = this.oldMember
            }
        },
        async loadGroup() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    loanHandler.groupMemberGet().then(res => {
                        this.memberGroups = res.data.data
                    })
                }, 300);
            })
        },
        memberGroupChange() {
            if (this.memberGroup) {
                let data = this.oldMember.filter((obj) => {
                    return obj.group.id === this.memberGroup
                })
                if (data.length > 0) {
                    this.members = data
                } else {
                    this.$snotify.error('No data found')
                    this.members = this.oldMember
                }
            } else {
                this.members = this.oldMember
            }
        },
        searchTxn(){
            // window.console.log(this.start_date)
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
        //transaction tabe
        onSorterChanges(val) {
            let today = new Date()
            switch (val) {
                case 1:
                    this.startDate = kendo.toString(today, 'yyyy-MM-dd')
                    this.endDate = kendo.toString(today, 'yyyy-MM-dd')

                    break
                case 2:
                    var first = today.getDate() - today.getDay(),
                        last = first + 6

                    this.startDate = kendo.toString(new Date(today.setDate(first)), 'yyyy-MM-dd')
                    this.endDate = kendo.toString(new Date(today.setDate(last)), 'yyyy-MM-dd')

                    break
                case 3:
                    this.startDate = kendo.toString(new Date(today.getFullYear(), today.getMonth(), 1), 'yyyy-MM-dd')
                    this.endDate = kendo.toString(new Date(today.getFullYear(), today.getMonth(), 31), 'yyyy-MM-dd')

                    break
                case 4:
                    this.startDate = kendo.toString(new Date(today.getFullYear(), 0, 1), 'yyyy-MM-dd')
                    this.endDate = kendo.toString(new Date(today.getFullYear(), 11, 31), 'yyyy-MM-dd')

                    break
                default:
                    this.startDate = ""
                    this.endDate = ""
            }
        },
        async searchTransaction() {
            if(this.member.hasOwnProperty('id')) {
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        this.showLoadingTxn = true
                        const startDate = this.startDate
                        const endDate = this.endDate
                        let data = {
                            startDate: startDate,
                            endDate: endDate,
                            Id: this.member.id,
                            type: 'member'
                        }
                        this.transactions = []
                        memberHandler.centerTxnSearch(data).then(res => {
                            if (res.data.statusCode === 200) {
                                let data = res.data.data
                                if(data.length > 0){
                                    let ds = this.$refs.gridTransactionDS.kendoWidget()
                                    ds.data([])
                                    let self = this
                                    $.each(data, function(i,v){
                                        // window.console.log(self.member, 'member center')
                                        let locale = self.member.priceLevel.currency.code
                                        let dec = self.decimals.filter((obj) => {return obj.currency.code == locale})
                                        let fo = 0
                                        if(dec.length > 0){
                                            fo = dec[0].decimal
                                        }
                                        ds.add({
                                            amount: v.amount,
                                            price: v.price,
                                            quantity: v.quantity,
                                            number: v.number,
                                            issuedDate: v.issuedDate,
                                            type: i18n.t(v.type.toLowerCase()),
                                            locale: locale,
                                            numberFormat: 'n' + fo
                                        })
                                    })
                                }
                            }
                            this.showLoadingTxn = false
                        })
                    }, 300);
                })
            }
        },
        pageChangeHandler: function (event) {
            alert("change", event);
        },
        rowNumberTmpl(dataItem) {
            let ds = this.$refs.gridTransactionDS.kendoWidget(),
                index = ds.indexOf(dataItem)
            return index + 1
        },
        //attachment
        onFileChange(e) {
            if (e) {
                this.fileDesc = e.name
                this.fileName = e.name
                this.fileSize = e.size
                this.fileType = e.type
                let input = this.files
                // Ensure that you have a file before attempting to read it
                if (input) {
                    let reader = new FileReader()
                    // Define a callback function to run, when FileReader finishes its job
                    reader.onloadend = (e) => {
                        // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
                        // Read image as base64 and set to imageData
                        this.imgFile = e.target.result
                    }
                    // Start the reader job - read file as a data url (base64 format)
                    reader.readAsBinaryString(input)
                    this.src = URL.createObjectURL(input)
                }
            }
        },
        async uploadFile() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    if (this.imgFile) {
                        const id = this.member.id || ''
                        const name = this.member.number || ''
                        let data = {
                            file: this.imgFile,
                            info: {
                                name: this.fileName,
                                description: this.fileDesc,
                                size: this.fileSize,
                                type: this.fileType
                            },
                            type: 'AC Member',
                            id: id,
                            name: name
                        }
                        this.showLoading = true
                        billingHandler.attachment(data).then(res => {
                            if (res.data.statusCode === 201) {
                                this.showLoading = false
                                this.imgFile = null
                                this.src = ''
                                this.fileDesc = ''
                                this.fileName = ''
                                this.fileSize = 0
                                this.fileType = ''
                                this.$snotify.success('Success')
                                this.loadAttachment()
                                // this.txnList = JSON.parse(JSON.stringify(res.data.data))
                                // window.console.log('transactions', this.txnList)
                            }
                        })
                    } else {
                        this.showLoading = false
                        this.$snotify.error('Please browse to upload image')
                    }
                }, 10)
            })
        },
        async loadAttachment() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.showLoadingAtch = true
                    const strFilter = '?id=' + this.member.id
                    billingHandler.attachmentList(strFilter).then(res => {
                        if (res.data.statusCode === 200) {
                            this.showLoadingAtch = false
                            this.attachmentList = res.data.data
                        }
                    })
                }, 10)
            })
        },
        fileUrl(dataItem) {
            if (dataItem.fileUrl) {
                return `<a target="_blank" style="color:#ED1A3A !important" href="${dataItem.fileUrl}"><span>Open</span></a>`
            }
            return ``
        },
        transactionDate(dataItem) {
            const txnDate = dataItem.transactionDate
            const dateFormat = dataItem.dateFormat
            if (txnDate) {
                return kendo.toString(new Date(txnDate), dateFormat)
            }
            return ''
        },
        byteToMB(dataItem) {
            const FileSize = dataItem.size || 0 // in MiB
            const marker = 1024; // Change to 1000 if required
            const decimal = 3; // Change as required
            const kiloBytes = marker; // One Kilobyte is 1024 bytes
            const megaBytes = marker * marker; // One MB is 1024 KB
            const gigaBytes = marker * marker * marker; // One GB is 1024 MB
            // const teraBytes = marker * marker * marker * marker; // One TB is 1024 GB

            // return bytes if less than a KB
            if (FileSize < kiloBytes) {
                return FileSize + " Bytes";
            }
            // return KB if less than a MB
            else if (FileSize < megaBytes) {
                return ((FileSize / kiloBytes).toFixed(decimal) + " KB");
            }
            // return MB if less than a GB
            else if (FileSize < gigaBytes) {
                return ((FileSize / megaBytes).toFixed(decimal) + " MB");
            }
            // return GB if less than a TB
            else {
                return ((FileSize / gigaBytes).toFixed(decimal) + " GB");
            }

            /* var FileSize = file.files[0].size / 1024 / 1024; // in MiB
            if (FileSize > 2) {
                alert('File size exceeds 2 MiB');
               // $(file).val(''); //for clearing with Jquery
            } else {
                        alert('File size' + FileSize);
            } */
        },
        onSearch(){
            window.console.log(this.searchName)
            window.console.log(this.searchName)
        }
    },
    async mounted() {
        // this.loadMemberCenter()
        this.loadMemberType()
        // this.loadGroup()
        await this.loadDecimal()
    },
    computed: {
        dateSorters(){
            return [
                {id: 1, name: i18n.t('today')},
                {id: 2, name: i18n.t('this_week')},
                {id: 3, name: i18n.t('this_month')},
                {id: 4, name: i18n.t('this_year')}
            ]
        },
    },
    created() {
        this.onSorterChanges(3)
    },
    watch: {
        '$route': 'callback'
    },
};
</script>
<style scoped>
</style>
<template>
    <v-row>
        <v-col class="py-0" sm="4" cols="12">
            <v-card outlined dense class="pa-3 no_border mb-3" height="180px" color="grayBg">
                <v-text-field v-model="loanNumber"
                              @change="loanNumberChange"
                              outlined
                              :placeholder="$t('loan_number')"
                              append-icon="search"
                              clearable/>
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
                <div class="kendo_dropdown_custom  mt-1">
                    <v-select
                        class="mt-1"
                        v-model="member"
                        :items="memberData"
                        item-text="numberName"
                        placeholder="Select"
                        return-object
                        outlined
                        :rules="[v => !!v || 'Member is required']"
                    />
                </div>
            </v-card>
            <v-card outlined dense class="pa-3 no_border hidden-sm-and-down" color="grayBg">
                <LoadingMe
                    :isLoading="showLoading"
                    :fullPage="false"
                    type="loading"
                    :myLoading="true"/>
                <kendo-datasource ref="loans"
                                  :data="loans"
                                  :schema="schemaDefinition"
                />

                <kendo-grid id="gridCustomer" class="grid-center"
                            :change="onChanged"
                            :data-source-ref="'loans'"
                            :selectable="true"
                            :persistSelection="true"
                            :noRecords="true"
                            :scrollable="true"
                            :height="420"
                            :pageable-numeric="false"
                            :pageable-previous-next="false"
                            :pageable-messages-display="'Showing {2} data items'">
                    <kendo-grid-column
                        :field="'name'"
                        :title="'&nbsp;'"
                        :template="'<p><span>#=number#</span> - #= name#</p>'"
                    />
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
                          <span class="hidden-sm-and-down text-upercase">{{ $t('list_of_loan') }}</span>
                        </v-tab>
                        <v-tab>
                          <span class="hidden-sm-and-up">
                            <v-icon left>mdi-pen</v-icon>
                          </span>
                          <span class="hidden-sm-and-down text-upercase">{{ $t('loan_agreement') }}</span>
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
                                                <Info :loan="loan"/>
                                            </v-card>
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>
                        </v-tab-item>
                        <v-tab-item>
                            <v-row>
                                <v-col sm="12" cols="12" class="pt-0 px-6">
                                    <v-row class="grayBg">
                                        <v-col sm="12" cols="12" class="">
                                            <v-card outlined color="white" class="pa-3">
                                                <ListOfLoan :listOfLoan="listOfLoan"/>
                                            </v-card>
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>
                        </v-tab-item>
                        <v-tab-item>
                            <v-row>
                                <v-col sm="12" cols="12" class="pt-0 px-6">
                                    <v-row class="grayBg">
                                        <v-col sm="12" cols="12" class="">
                                            <v-card outlined color="white" class="pa-3">
                                                <CreditApplication :member="member"/>
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
// import DatePickerComponent from '@/components/custom_templates/DatePickerComponent'
import kendo from "@progress/kendo-ui"
import LinkTemplate from "@/components/kendo_templates/LinkTemplate"

const memberHandler = require("@/scripts/memberHandler")
const customerHandler = require("@/scripts/customerHandler")
const billingHandler = require("@/scripts/invoice/handler/billingHandler")
const $ = kendo.jQuery // require("jquery")

const textField = 'name'
const keyField = 'id'
const customerItem = {[textField]: 'Select Customer...', [keyField]: null}
const memberItem = {[textField]: 'Select Member...', [keyField]: null}
const emptyItem = {[textField]: 'loading ...'}

export default {
    name: "LoanCenter",
    components: {
        LoadingMe: () => import(`@/components/Loading`),
        // 'app-datepicker': DatePickerComponent,
        Info: () => import('./Info'),
        ListOfLoan: () => import('./ListOfLoan'),
        CreditApplication: () => import('./CreditApplication')
    },
    data: () => ({
        showLoading: true,
        showLoadingAtch: false,
        filter: '',
        textField: 'name',
        dataItemKey: 'id',
        loans: [],
        loanNumber: '',
        schemaDefinition: {
            model: {id: "id"}
        },
        attachments: [],
        listOfLoan: {},
        //default center
        headers: [],
        journal_entries: [],
        startDate: kendo.toString(new Date(), 'yyyy-MM-dd'),
        endDate: kendo.toString(new Date(), 'yyyy-MM-dd'),
        dateSorters: ['Today', 'This Week', 'This Month', 'This Year'],
        mDateSorter: 'Today',
        files: [],
        //
        selectMember: 'isMember',
        isMember: true,
        isCustom: false,
        saveOption: '',
        //customer
        cusBaseUrl: customerHandler.search(),
        customerList: [],
        customerItem: customerItem,
        customerfilter: '',
        customer: {},
        //member
        memBaseUrl: memberHandler.search(),
        memberList: [],
        memberItem: memberItem,
        memberfilter: '',
        member: {},
        oldLoan: [],
        loan: {},
        //transaction
        transactions: [],
        group: {field: 'name'},
        newClick: false,
        //attachment
        fileDesc: '',
        fileName: '',
        fileSize: '',
        fileType: '',
        imgFile: '',
        src: '',
        attachmentList: [],
        memberData: [],
    }),
    methods: {
        //
        async loanInfo() {
            this.$emit('onUpdate', this.loan)
        },
        async loanListOfLoan() {
            this.$emit('onUpdate', this.listOfLoan)
        },
        async onChanged() {
            let grid = $("#gridCustomer").data("kendoGrid")
            let selectedItem = grid.dataItem(grid.select())
            this.loan = selectedItem
            this.listOfLoan = selectedItem
            this.member = selectedItem.member
            window.console.log(this.member)
            this.$emit('onUpdate', selectedItem)
            this.loadAttachment()
        },
        //transaction tabe
        onSorterChanges(val) {
            let today = new Date()
            switch (val) {
                case "Today":
                    this.startDate = kendo.toString(today, 'yyyy-MM-dd')
                    this.endDate = kendo.toString(today, 'yyyy-MM-dd')

                    break
                case "This Week":
                    var first = today.getDate() - today.getDay(),
                        last = first + 6

                    this.startDate = kendo.toString(new Date(today.setDate(first)), 'yyyy-MM-dd')
                    this.endDate = kendo.toString(new Date(today.setDate(last)), 'yyyy-MM-dd')

                    break
                case "This Month":
                    this.startDate = kendo.toString(new Date(today.getFullYear(), today.getMonth(), 1), 'yyyy-MM-dd')
                    this.endDate = kendo.toString(new Date(today.getFullYear(), today.getMonth(), 31), 'yyyy-MM-dd')

                    break
                case "This Year":
                    this.startDate = kendo.toString(new Date(today.getFullYear(), 0, 1), 'yyyy-MM-dd')
                    this.endDate = kendo.toString(new Date(today.getFullYear(), 11, 31), 'yyyy-MM-dd')

                    break
                default:
                    this.startDate = ""
                    this.endDate = ""
            }
        },
        async searchTransaction(type) {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    this.showLoading = true
                    const startDate = this.startDate
                    const endDate = this.endDate
                    let strFilter = ''
                    if (type !== '') {
                        strFilter = '?start=' + startDate + '&end=' + endDate + '&type=' + type
                    } else {
                        strFilter = '?start=' + startDate + '&end=' + endDate
                    }

                    billingHandler.list(strFilter).then(res => {
                        if (res.data.statusCode === 200) {

                            window.console.log('im search', res)
                            this.transactions = res.data.data
                            const result = res.data.result
                            window.console.log(result)
                            // this.totalRevenue = kendo.toString(result.Revenue, result.decimalFormat)
                            // this.totalSaleLead = kendo.toString(result.SaleLead, result.decimalFormat)
                            // this.totalSaleOrder = kendo.toString(result.SaleOrder, result.decimalFormat)
                            // this.totalSaleQuote = kendo.toString(result.SaleQuote, result.decimalFormat)
                        }
                        this.showLoading = false
                    })
                }, 300);
            })
        },
        pageChangeHandler: function (event) {
            alert("change", event);
        },
        rowNumberTmpl(dataItem) {
            let ds = this.$refs.gridTransactionDS.kendoWidget(),
                index = ds.indexOf(dataItem)
            return index + 1
        },
        referenceTemplate(data) {
            let url = `invoice_view/${data.id}`
            if (data.type === 'Invoice') {
                url = `invoice_view/${data.id}`
            } else if (data.type === 'Sale Quote') {
                url = `sale_quote_view/${data.id}`
            } else if (data.type === 'Delayed Invoice') {
                url = `delayed_invoice_view/${data.id}`
            }
            let args = {
                text: data.referenceNo,
                url: url,
                data: data,
            }
            return {
                template: LinkTemplate,
                templateArgs: args
            }
        },
        goToConvert(e) {
            this.newClick = false
            e.preventDefault()
            // let grid = $("#gridAddress").data("kendoGrid")
            // let dataItem = grid.dataItem($(e.currentTarget).closest("tr"))
            // this.address = dataItem
            // this.mCountry = dataItem.country
            // this.dialogM2 = true
        },
        //
        async loadLoan() {
            this.showLoading = true
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    memberHandler.loanCenterGet().then(res => {
                        window.console.log(res.data.data)
                        this.showLoading = false
                        this.loans = res.data.data
                        this.oldLoan = res.data.data
                    })
                }, 300);
            })
        },
        loanNumberChange() {
            if (this.savingNumber) {
                let search = new RegExp(this.savingNumber, 'i')
                let newSaving = this.oldLoan.filter(item => search.test(item.number))
                if (newSaving.length > 0) {
                    this.loans = newSaving
                } else {
                    this.$snotify.error('No data found!')
                    this.loans = this.oldLoan
                }
            } else {
                this.loans = this.oldLoan
            }
        },
        //customer
        onCustomerChange(event) {
            const value = event.value
            if (value && value[textField] === emptyItem[textField]) {
                return;
            }
            this.customer = value
            this.getSavingAccount(value)
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
        getSavingAccount(member) {
            window.console.log(member, this.oldLoan)
            if (member) {
                let newSaving = []
                $.each(this.oldLoan, function (i, v) {
                    if (v.member.id === member.id) {
                        newSaving.push(v)
                    }
                })
                if (newSaving.length > 0) {
                    this.loans = newSaving
                } else {
                    this.$snotify.error('No data found!')
                    this.loans = this.oldLoan
                }
            } else {
                this.loans = this.oldLoan
            }
        },
        //member
        selectMemberChange() {
            if (this.selectMember == 'isMember') {
                this.isMember = 1
                this.memberData = this.memberList
            } else {
                this.isMember = 2
                this.memberData = this.customerList
            }
            this.member = {}
        },
        onMemberChange(event) {
            const value = event.value
            if (value && value[textField] === emptyItem[textField]) {
                return;
            }
            this.member = value
            this.getSavingAccount(value)
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
                        const id = this.loan.id || ''
                        const name = this.loan.number || ''
                        let data = {
                            file: this.imgFile,
                            info: {
                                name: this.fileName,
                                description: this.fileDesc,
                                size: this.fileSize,
                                type: this.fileType
                            },
                            type: 'AC Loan',
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
                    // if (this.$route.params.hasOwnProperty('id')) {
                        this.showLoadingAtch = true
                        const strFilter = '?id=' + this.loan.id
                        billingHandler.attachmentList(strFilter).then(res => {
                            if (res.data.statusCode === 200) {
                                this.showLoadingAtch = false
                                this.attachmentList = res.data.data
                            }
                        })
                    // }

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
    async mounted() {
        await this.loadLessMember()
        await this.loadLessCustomer()
        this.loadLoan()
    },
    computed: {},
    watch: {
        '$route': 'callback'
    },
};
</script>
<style scoped>
</style>
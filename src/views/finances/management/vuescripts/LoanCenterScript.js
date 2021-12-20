    import LoadingMe from '@/components/Loading'
    import LoanModel from "@/scripts/model/Loan"
    import helper from "@/helper.js"
    // import catalogHandler from "@/scripts/catalogHandler";
    import kendo from "@progress/kendo-ui"
    // const $ = kendo.jQuery
    const apiUrl = require('../../../../apiUrl.js')
    const loanHandler = require("@/scripts/financing/handler/loanHandler")
    const loanTypeHandler = require("@/scripts/entityTypeHandler.js")
    const billingHandler = require("@/scripts/invoice/handler/billingHandler")
    export default {
        name: "Loan",
        components: {
            'LoadingMe': LoadingMe,
            //'app-datepicker': DatePickerComponent,
            Info: () => import('../loan_center/Info'),
            ListOfLoan: () => import('../loan_center/ListOfLoan'),
            CreditApplication: () => import('../loan_center/CreditApplication'),
            // Schedule: () => import('../loan_center/Schedule'),
            // Txn: () => import('../loan_center/Txn'),
            Attachments: () =>import('../loan_center/Attachments')
        },
        data: () => ({
            helper: helper,
            bankAccountTypes: [],
            searchText: '',
            // LoadingMe
            isLoaded: false,
            showLoading: false,
            loanCenterURL: apiUrl.financing.loanGets,
            loan: new LoanModel({}),
            // Kendo dataSource
            schemaDefinition: {
                model: {id: "uuid"}
            },
            loans:[],
            loanFilter:[],
            loanTypes: [],
            loansBk:[],
            aggregateDefinition : [
                { field: "id", aggregate: "count"}
            ],
            files: [],
            //attachment
            fileDesc: '',
            fileName: '',
            fileSize: '',
            fileType: '',
            imgFile: '',
            src: '',
            attachmentList: [],
            memberData: [],
            listOfLoan: {},
            txnLoan: {},
            showLoadingAtch: false,
        }),
        methods: {
            // On Account Type Changes
            async onLoanTypeChanges(loanType) {
                new Promise(resolve => {
                    resolve('resolved')

                    if (loanType === undefined) {
                        this.loanFilter = this.loans;
                    } else {
                        this.loanFilter = this.loans.filter(
                            value => value.type.uuid === loanType.uuid
                        );
                    }
                })
            },
            // On Search Changes
            async onSearchChanges(searchText) {
                new Promise(resolve => {
                    resolve('resolved')

                    if (searchText !== '') {
                        this.loanFilter = this.loans.filter(
                            value => (~value.number.toLowerCase().indexOf(searchText))
                        )
                    } else {
                        this.loanFilter = this.loans
                    }
                })
            },
            // On Change item selection
            onLoanGridChanged() {
                let grid = this.$refs.gridLoan.kendoWidget();
                let selectedItem = grid.dataItem(grid.select());

                // if (this.loan.uuid !== selectedItem.uuid) {
                //     this.loan = selectedItem // new LoanModel(selectedItem);
                //     // if(this.loan.schedule.length === 0) {
                //     //     this.loan.schedule = [];
                //     // } else {
                //     //     let schedules = [];
                //     //     this.loan.schedule.forEach(element => {
                //     //         schedules.push(new LoanScheduleModel(element));
                //     //     });
                //     //     this.loan.schedule = schedules;
                //     // }
                //     // if(this.loan.details.length === 0) {
                //     //     this.loan.details = [];
                //     // } else {
                //     //     let details = [];
                //     //     this.loan.details.forEach(detail=>{
                //     //         details.push (new LoanDetailModel(detail));
                //     //     });
                //     //     this.loan.details = details;
                //     // }
                // }
                this.loan = selectedItem
                this.listOfLoan = selectedItem
                this.txnLoan = selectedItem
                // window.console.log(selectedItem, this.listOfLoan, this.loan, 'select')
                this.$emit('onUpdate', selectedItem)
                this.loadAttachment()
            },
            async loadLoan() {
                let self = this;
                this.isLoaded = true;
                this.showLoading = true
                await loanHandler.loanGets().then(res => {
                    self.loans = res;
                    self.loanFilter = self.loans;
                }).finally(function () {
                    self.showLoading = false;
                    self.isLoaded = false;
                });
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
            async loadLoanType() {
                let self = this;
                await loanTypeHandler.getByEntityType("loan").then(res => {
                  self.loanTypes = res;  
                });
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
            refreshGrid(){
                setTimeout(() => {
                    let a = kendo.jQuery('#gridLoan').data("kendoGrid");
                    if(a != undefined) {
                        a.dataSource.read();
                    }
                }, 1000);
            },
            async uploadFile() {
                this.showLoading = true
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
                                type: 'Finance Loan',
                                id: id,
                                name: name
                            }
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
                                    this.files = []
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
            transactionDate(dataItem) {
                const txnDate = dataItem.transactionDate
                const dateFormat = dataItem.dateFormat
                if (txnDate) {
                    return kendo.toString(new Date(txnDate), dateFormat)
                }
                return ''
            },
            fileUrl(dataItem) {
                if (dataItem.fileUrl) {
                    return `<a target="_blank" style="color:#ED1A3A !important" href="${dataItem.fileUrl}"><span>Open</span></a>`
                }
                return ``
            },
        },
        watch: {
            '$route': 'refreshGrid'
        },
        created() {

        }, 
        mounted() {
            this.refreshGrid()
        }
    }

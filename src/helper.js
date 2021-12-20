'use strict'

import {i18n} from '@/i18n';
import kendo from '@progress/kendo-ui';
import XLSX from "xlsx";
import LinkTemplate from "@/components/kendo_templates/LinkTemplate";
import {
    AccountModel,
    LocationModel,
    SegmentModel,
    ProjectModel,
    ClassModel,
    ClosingDateModel,
    UomModel,
    PaymentTermModel,
    ExchangeRateModel,
    DiscountItemModel,
    TaxModel,
    UserModel,
    BankAccountTypeModel,
} from '@/scripts/model/AppModels';

const Swal = require('sweetalert2');
const CryptoJS = require("crypto-js");
const store = require("@/institute.js");
const {instituteId} = store.default.state.cookies;
const {institute} = store.default.state;
/* Cookie */
const cookieJS = require("@/cookieNew.js");
const cookie = cookieJS.getCookie();
const {
    accountHandler,
    closingDateHandler,
    prefixHandler,
    currencyHandler,
    locationHandler,
    segmentHandler,
    projectHandler,
    classHandler,
    uomHandler,
    paymentTermHandler,
    discountItemHandler,
    taxHandler,
} = require("@/scripts/AppHandlers");
const {AccountTypeCode} = require("@/scripts/default_setup/Collections");

let exports = {};


/* Get User */
exports.getUser = () => {
    return new UserModel(cookie.user);
}

// Remove Currency Format From A Number
exports.removeCurrencyFormat = (num) => {
    return num.replace(/[^\d.-]+/g, "");
}

// Link Template
exports.linkTemplate = (displayText, urlPath) => {
    return {
        template: LinkTemplate,
        templateArgs: {
            text: displayText,
            url: urlPath
        }
    };
}

// Apply Prefix Number
exports.applyPrefixNumber = async (lastNumber, prefixType, transactionDate) => {
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
}

// Get Last Number
exports.generateAccountingNumber = async (prefixType, transactionDate) => {
    // Prefix
    const prefixes = await prefixHandler.getAll();
    let pf = prefixes.find(value => value.type.toLowerCase() === prefixType.toLowerCase());

    // Prefix Format "JE-yymm-00000"
    let shortPrefix = pf.abbr + pf.prefixSeparator + pf.structure + pf.numberSeparator,
        fullPrefix = shortPrefix + '0'.repeat(pf.format);

    // Last Number
    const lastNumbers = await prefixHandler.lastNumber(fullPrefix, transactionDate, shortPrefix);

    return exports.applyPrefixNumber(lastNumbers.data.last_number, prefixType, transactionDate);
}
exports.generateAccoutingNumber = async (prefixType, transactionDate) => {
    // Prefix
    const prefixes = await prefixHandler.getAll();
    let pf = prefixes.find(value => value.type.toLowerCase() === prefixType.toLowerCase());

    // Prefix Format "JE-yymm-00000"
    let shortPrefix = pf.abbr + pf.prefixSeparator + pf.structure + pf.numberSeparator,
        fullPrefix = shortPrefix + '0'.repeat(pf.format);

    // Last Number
    const lastNumbers = await prefixHandler.lastNumber(fullPrefix, transactionDate, shortPrefix);

    return exports.applyPrefixNumber(lastNumbers.data.last_number, prefixType, transactionDate);
}

// Get Max Number Of Account
exports.getMaxNumberOfAccount = async (accountTypeCode) => {
    const accounts = await accountHandler.getAll();
    let paList = accounts.filter(value => value.account_type.code === accountTypeCode);

    let number = "";
    if(paList.length > 0){
        let parentNums = [];
        paList.forEach(value => {
            parentNums.push(kendo.parseInt(value.number));
        });
        let bigNum = Math.max(...parentNums);
        number = bigNum + 10;
    }

    return number;
}

// Get Last Exchange Rate By Date
exports.getLastExchangeRateByDate = async (date, code) => {
    let xrate = new ExchangeRateModel(institute.baseCurrency);

    if (code !== institute.baseCurrency.code) {
        const response = await currencyHandler.getLastExchangeRateByDate(date, code);
        if (response.data.data) {
            xrate = new ExchangeRateModel(response.data.data[0]);
        }
    }

    return xrate;
}

// Convert Date to ISO
exports.toISODate = (aDate) => {
    let today = new Date();
    let theDate = new Date(aDate);
    theDate.setHours(today.getHours(), today.getMinutes(), today.getSeconds(), today.getMilliseconds());

    return new Date(theDate.getTime()).toISOString();
}

// Date Format
exports.dateFormat = (theDate) => {
    let formatedDate = theDate;
    if (formatedDate !== '') {
        formatedDate = kendo.toString(new Date(theDate), institute.dateFormat);
    }

    return formatedDate;
}
// Date Format form
exports.instituteDateFormat = () => {
    return institute.dateFormat;
}
// Alert Error Message
exports.alertErrorMsg = (msg = '') => {
    Swal.fire({
        position: "center",
        icon: "warning",
        title: "Oops...!",
        text: msg,
        showConfirmButton: true,
    });
}

// Pre-Confirm Closing Date
async function preConfirmClosingDate(txnDate) {
    let result = false,
        cdate = await closingDateHandler.last();

    if (typeof cdate.data.data != "undefined") {
        let cd = new ClosingDateModel(cdate.data.data);

        if (new Date(txnDate) <= new Date(cd.closingDate)) {
            let confirmPsw = await Swal.fire({
                title: "Please Enter Password!",
                text: "You are recording within closing date, please confirm password.",
                icon: "warning",
                input: "password",
                inputPlaceholder: "Password...",
                inputAttributes: {
                    autocapitalize: "off",
                    autocorrect: "off",
                },
                showCancelButton: true,
                confirmButtonText: "Submit",
                showLoaderOnConfirm: true,
                preConfirm: (password) => {
                    // Decrypt (Password, Key)
                    let pswInBytes = CryptoJS.AES.decrypt(
                        cd.password,
                        instituteId
                    );
                    let originalPsw = pswInBytes.toString(
                        CryptoJS.enc.Utf8
                    );

                    // Compare Password
                    if (password === originalPsw) {
                        return true;
                    } else {
                        Swal.showValidationMessage(
                            "Password Does Not Macth!"
                        );
                    }
                },
            });
            window.console.log("Confirm Password")
            result = Boolean(confirmPsw.value);
        } else {
            window.console.log("Greater than closing date")
            result = true; // Greater than closing date
        }
    } else {
        window.console.log("Not use closing date")
        result = true; // Not use closing date
    }

    return result;
}

// Show Alert
function showAlert(msg) {
    Swal.fire({
        position: "center",
        icon: "warning",
        title: "Oops...!",
        text: msg,
        showConfirmButton: true,
    });
}

// Get Fiscal Date By Date (Object)
exports.getFiscalDateByDate = (theDate) => {
    let aDate = new Date(theDate);
    let fiscalYear = institute.fiscalDate.find(value => aDate >= new Date(value.start_date) && aDate <= new Date(value.end_date));

    return fiscalYear;
}

// Generate Fiscal Months
exports.generateFiscalMonths = (startDate, endDate, columnBy) => {
    let fiscalMonths = [],
        interval = 1,
        sdate = new Date(startDate),
        edate = new Date(endDate),
        pairMonth = edate;

    while (sdate <= edate) {
        if (columnBy === "4") { // Quarter
            interval = 3;
            pairMonth = new Date(sdate);
            pairMonth.setMonth(sdate.getMonth() + (interval -1));
            fiscalMonths.push(kendo.toString(sdate, "MMM yyyy") +" - "+ kendo.toString(new Date(pairMonth), "MMM yyyy"));
        } else if (columnBy === "2") { // Semi-Annual
            interval = 6;
            pairMonth = new Date(sdate);
            pairMonth.setMonth(sdate.getMonth() + (interval -1));
            fiscalMonths.push(kendo.toString(sdate, "MMM yyyy") +" - "+ kendo.toString(new Date(pairMonth), "MMM yyyy"));
        } else { // Month
            interval = 1;
            fiscalMonths.push(kendo.toString(sdate, "MMM yyyy"));
        }

        // Next Month
        sdate.setMonth(sdate.getMonth() + interval);
    }
    
    return fiscalMonths;
}

// Format FiscalDate
exports.formatFiscalDate = (aDate) => {
    return kendo.toString(new Date(aDate), "MMM yyyy");
},

// Validate Closing Date (B Kethya forced me to do like this, in case he says No) also Rothny jol dai jol jerng
exports.validateClosingDate = async (aDate) => {
    let result = false,
        today = new Date(),
        txnDate = new Date(aDate).toISOString().substr(0, 10);
        // currentMonth = kendo.toString(new Date(), "yyyy-MM"),
        // txnMonth = new Date(aDate).toISOString().substr(0, 7);

    // Check if back date transaction
    if (new Date(txnDate) < today) {
        let currentYear = today.getFullYear(),
            firstFiscalDate = kendo.toString(new Date(institute.fiscalDate[0].first_fiscal_year), "MM-dd"),
            currentFiscalDate = new Date(currentYear + '-' + firstFiscalDate);
            // previousFiscalDate = new Date((currentYear - 1) + '-' + firstFiscalDate);
            
        // Approved Reporting Date
        if (new Date(txnDate) < currentFiscalDate) {// Within previous fiscal date
            // if (new Date(txnDate) >= previousFiscalDate) {// Within previous fiscal date with active approved reporting date
            //     if (kendo.toString(today, "yyyy-MM-dd")
            //         <= kendo.toString(new Date(institute.approvedReportingDate), "yyyy-MM-dd")) {
            //         result = await preConfirmClosingDate(txnDate);
            //     } else {// Within previous fiscal date with expired approved reporting date
            //         showAlert(i18n.t("msg_alert_approved_reporting_date"));
            //     }
            // } else {// Prevent edit before previous fiscal date
            //     showAlert(i18n.t("msg_alert_approved_reporting_date"));
            // }

            if (kendo.toString(new Date(txnDate), "yyyy-MM-dd") > kendo.toString(new Date(institute.approvedReportingDate), "yyyy-MM-dd")) {
                result = await preConfirmClosingDate(txnDate);
            } else {// Within previous fiscal date with expired approved reporting date
                showAlert(i18n.t("msg_alert_approved_reporting_date"));
            }
        } else {// Within Closing Date
            result = await preConfirmClosingDate(txnDate);
        }
    } else {
        result = true;// None back date transaction
    }

    return result;
}

// Get account by uuid
exports.getAccountByUuid = (uuid) => {
    let account = store.default.state.accounts.find(value => value.uuid === uuid);

    return new AccountModel(account);
}

// Get Location by id
exports.getLocationById = async (id) => {
    const response = await locationHandler.getAll();
    let location = null;

    if(id === 0){ /* First Data */
        location = response[0];
    }else{
        location = response.find(value => value.id === id);
    }

    return new LocationModel(location);
}

// Get Segment by id
exports.getSegmentById = async (id) => {
    const response = await segmentHandler.getAll();
    let segment = null;

    if(id === 0){ /* First Data */
        segment = response.find(value => value.isSystem === 1);
    }else{
        segment = response.find(value => value.id === id);
    }

    return new SegmentModel(segment);
}

// Get Project by id
exports.getProjectById = async (id) => {
    const response = await projectHandler.getAll();
    let project = response.find(value => value.id === id);

    return new ProjectModel(project);
}

// Get Class by uuid
exports.getClassById = async (id) => {
    const response = await classHandler.getAll();
    let clazz = response.find(value => value.id === id);

    return new ClassModel(clazz);
}

// Get unit of measurement by id
exports.getUOMById = async (id) => {
    const response = await uomHandler.getAll();
    let uom = response.find(value => value.id === id);

    return new UomModel(uom);
}

// Get Payment Term by id
exports.getPaymentTermById = async (id) => {
    const response = await paymentTermHandler.getAll();
    let pmt = response.find(value => value.id === id);

    return new PaymentTermModel(pmt);
}

// Get Discount by id
exports.getDiscountItemById = async (id, type = '') => {
    const response = await discountItemHandler.getAll(type);

    let dis = response.find(value => value.id === id);

    return new DiscountItemModel(dis);
}

// Get Tax by id
exports.getTaxItemById = async (id) => {
    const response = await taxHandler.getAll();
    let tax = response.find(value => value.id === id);

    return new TaxModel(tax);
}

// Get Bank Account Type by uuid
exports.getBankAccountTypeByUuid = (uuid) => {
    let bankAccountType = new BankAccountTypeModel();
    if(store.default.state.bankAccountTypes.length > 0){
        let ba = store.default.state.bankAccountTypes.find(value => value.uuid === uuid);
        bankAccountType = new BankAccountTypeModel(ba);
    }

    return bankAccountType;
}

// Group Expenses by Cash Advance (Advance Settlement Page)
exports.groupExpenseByCashAdvance = (data) => {
    let g = {};

    data.forEach(value => {
        let id = value.journal.uuid;
        if (value.account.number === AccountTypeCode.ADVANCE_SETTLEMENT_CLEARING_CODE) {
            if (g[id]) {
                g[id]['amount'] += value.amount * -1;
                g[id]['exchanged_amount'] += value.exchanged_amount * -1;
            } else {
                g[id] = {
                    uuid: id,
                    name: value.primary_contact.name,
                    number: value.journal.number,
                    amount: value.amount * -1,
                    exchanged_amount: value.exchanged_amount * -1,
                    currency: value.currency,
                }
            }
        }
    })

    return Object.values(g);
}

// Group Expense By Employee (Reimburstment Page)
exports.groupExpenseByEmployee = (data) => {
    let g = [];

    data.forEach(value => {
        let amt = 0, xamt = 0;
        value.expense_entries.forEach(ele => {
            if (ele.account.number === AccountTypeCode.ADVANCE_SETTLEMENT_CLEARING_CODE) {
                amt += ele.amount * -1;
                xamt += ele.exchanged_amount * -1;
            }
        });

        g.push({
            uuid: value.uuid,
            name: value.supplier.name,
            number: value.number,
            amount: amt,
            exchanged_amount: xamt,
            currency: value.bill_currency,
        });
    })

    return g;
}

// Account Editor
exports.accountEditor = (container, options, data) => {
    return kendo.jQuery('<input required name="' + options.field + '"/>')
        .appendTo(container)
        .kendoDropDownList({
            autoBind: false,
            autoWidth: true,
            height: 400,
            filter: "startswith",
            dataTextField: "number",
            dataValueField: "uuid",
            template: "<span>#=number# #=name#</span>",
            optionLabel: "--- Select ---",
            dataSource: new kendo.data.DataSource({
                data: data,
                group: {
                    field: "account_type.name",
                    compare: function (a, b) {// Order by number
                        if (a.items[0].number === b.items[0].number) {
                            return 0
                        } else if (a.items[0].number > b.items[0].number) {
                            return 1
                        } else {
                            return -1
                        }
                    }
                },
            })
        })
}

// Read Excel File
exports.getExcelData = async (rawFile) => {
    return new Promise((resolve) => {
        /* Initial File Reader */
        const reader = new FileReader();

        reader.onload = (e) => {
            /* Parse data */
            const data = e.target.result;
            const workbook = XLSX.read(data, {type: 'array'});

            /* Get first worksheet */
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];

            /* Convert array of arrays */
            let results = XLSX.utils.sheet_to_json(worksheet, {header: 1});
            resolve(results);
        }

        // Read File
        reader.readAsArrayBuffer(rawFile);
    })
}

export default exports;
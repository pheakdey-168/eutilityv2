const { dataStore } = require("@/observable/store");
const company_data = dataStore.company
const { getFormSetting } = require("@/scripts/settingsHandler.js")
const kendo =  require("@progress/kendo-ui");
const Header = (page,is_print) => {
    return`
        <html>
            <head>
            <title>Test</title>
            ${is_print ? '  <link media="print" href="https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.min.css" rel="stylesheet">' : ''}
            <style rel="stylesheet">
                * {
                    -webkit-print-color-adjust: true;
                    -webkit-print-color-adjust: exact;
                }
                @page {
                    size: ${page};
                    margin: 0.75in; 
                }
                @font-face {
                    font-family: 'Niradei-Bold';
                    font-weight: bold;
                    font-display: swap;
                    font-style: normal;
                    src: local('Niradei'), local('Niradei-Bold'), url('@/assets/styles/fonts/Niradei-Bold.woff2') format('woff2');
                }
                @font-face {
                    font-family: 'Niradei-Regular';
                    font-weight: 600;
                    font-display: swap;
                    font-style: normal;
                    src: local('Niradei'), local('Niradei-Regular'), url('@/assets/styles/fonts/Niradei-Regular.woff2') format('woff2');
                }
                body { 
                    -webkit-print-color-adjust: exact;
                    font-family: 'Niradei-Regular' !important;
                    print-color-adjust: exact;
                }
                table,tr,td{
                    border-collapse: collapse !important; 
                }
                table{
                 width:100%;
                }
                @media print {
                    html, body {
                        font-family: 'Niradei-Regular'  !important;
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact;
                    },
                    .pagebreak {
                        clear: both;
                        margin-top: 30mm;
                        page-break-before: always !important;
                        page-break-after: always !important;
                    }
                }
                table th{
                    padding: 8px 6px !important ;
                    border: 1px solid  #000;
                    border-collapse: collapse;
                }
                table{
                    width: 100%;
                    margin-top: 8px;
                    margin-bottom: 8px;
                    border-collapse: collapse;
                }
                .items tr td{
                    border: 1px solid #000;
                    padding: 6px;
                    height: 32px;
                }
                .items_tb_border tr td{
                    border: 1px solid #000;
                    padding: 6px;
                    height: 32px;
                }
                .flex{
                    display: flex;
                }
                .tleft{
                    text-align: left;
                }
                .tright{
                    text-align: right;
                }
                .text-bold{
                    font-weight: bold;
                }
                .text-center{
                    text-align: center;
                }
                </style>
            </head>
        <body>
`;
}
const Footer = `</body></html>`

function rederList(data,empty_td,show_column){
    var items = ""
    data.forEach((i,index) => {
        let currency_d =  i.currency.code == 'USD' ?  i.currency.symbolNative ? i.currency.symbolNative : i.currency.symbol_native :  '' 
        let currency_r =  i.currency.code == 'KHR' || i.currency.code != 'USD' ?  i.currency.symbolNative :  '' 
    
        items = items + `
                <tr>
                    ${show_column.one ? '<td class="text-center">'+(index+1)+'</td>': ''} 
                    ${show_column.two ? '<td class="text-center">'+ i.referenceNo+'</td>': ''} 
                    ${show_column.three ? '<td class="text-center">'+ i.billNumber +'</td>': ''} 
                    ${show_column.four ? '<td class="text-center">'+kendo.toString(new Date(i.dueDate), i.dateFormat) +'</td>': ''} 
                    ${show_column.five ? '<td class="text-center">'+ i.overDue +'</td>': ''} 
                    ${show_column.six ? '<td class="text-center">'+i.paymentTerm.name+'</td>': ''} 
                    ${show_column.seven ? '<td class="text-center">'+i.paymentOption.name+'</td>': ''} 
                    ${show_column.eight ? '<td class="text-center">'+i.bankReferenceNo +'</td>': ''} 
                    ${show_column.nine ? '<td class="text-center">'+i.status+'</td>': ''} 
                    ${show_column.ten ? '<td class="text-center">'+i.currency.code+'</td>': ''} 
                    ${show_column.ten1 ? '<td class="text-center">'+ currency_d+kendo.toString(i.amount, i.decimalFormat)+currency_r  +'</td>': ''} 
                    ${show_column.ten2 ? '<td class="text-center">'+  currency_d+kendo.toString(i.discount, i.decimalFormat)+currency_r   +'</td>': ''} 
                    ${show_column.ten3 ? '<td class="text-center">'+ currency_d+kendo.toString(i.amountTobePaid, i.decimalFormat)+currency_r  +'</td>': ''} 
                    ${show_column.ten4 ? '<td class="tright">'+ currency_d+kendo.toString(i.paidAmountTobase, i.decimalFormat)+currency_r  +'</td>': ''} 
                </tr>
            `;
    })
    if(data.length <=2){
        items = items + empty_td +  empty_td
    }
    return items;
}

function rederListAcounting(data,language){
    var items = ""
    data.forEach((i) => {
        i.entries.forEach(en => {
            let currency_d_base =  en.currency.code == 'USD' ?  en.currency.symbolNative ? en.currency.symbolNative :'$' : ''
            let currency_r_base =  en.currency.code !== 'USD' ?  en.currency.symbolNative ? en.currency.symbolNative :'៛'  : ''
            items = items + `
            <tr>
                <td class="tleft">${en.account.number}</td>
                <td class="tleft">${language == 'English' ? en.account.name  :  language == 'Khmer'?  en.account.local_name :  en.account.local_name+ '<br/>'+  en.account.name }</td>
                <td class= " ">${en.segment.name}</td>
                <td class="tleft">${en.type == 'dr' ?  currency_d_base+en.exchangeAmount+currency_r_base : '0'}</td>
                <td class="tleft">${en.type == 'cr' ?  currency_d_base+en.exchangeAmount*(-1)+currency_r_base : '0'}</td>
            </tr>
        `;
        })
  
    })
    return items;
}

exports.PaymentVoucher = (data, setting,is_print) => {
    window.console.log(data)
    var logo_postion = '';
    let center_text = '';
    let m_left = "";
    let m_right = ""
    let address_center_log_left = ""
    // let date =  setting.language=='English' ? 'Date':'កាលបរិច្ឆេទ';
    if(setting.logo.position == 'center'){
        logo_postion = "flex-direction: column;justify-content: center;align-items: center;"
        center_text = "text-align:center !important";
    }else if(setting.logo.position =="right"){
        logo_postion ="flex-direction: row-reverse;";
        center_text = "text-align:right !important";
        m_left = "margin-left: 20px";
        m_right = "margin-right:0px";
    }else{
        m_right = "margin-right:20px";
    }
    if(setting.address.align == 'center'){
        center_text = "text-align:center !important";
        address_center_log_left = true
    }else if(setting.address.align == 'left'){
        center_text = "text-align:left !important";
        address_center_log_left = false
    }else{
        center_text = "text-align:right !important";
        address_center_log_left = false
    }
    let hide_logo =''
    if(setting.logo.hide){
        hide_logo ="display:none;"
    }
    let is_header = ''
    if(setting.header){
        is_header ="display:none;"
    }
    let currency_d_base = ''
    let currency_r_base = ''
    if(data){
        currency_d_base =  data.currency.code == 'USD' ?  data.currency.symbolNative ? data.currency.symbolNative :'$' : ''
         currency_r_base =  data.currency.code !== 'USD' ?  data.currency.symbolNative ? data.currency.symbolNative :'៛'  : ''
    }
    // column
    let column_1  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Nº': setting.language=='Khmer' ?  'ល.រ' : 'ល.រ  <br/> Nº'}</th>`
    let column_2  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Purchase No': setting.language=='Khmer' ?  'កាលបរិច្ឆេទ​ពី' : 'កាលបរិច្ឆេទ​ពី <br/> Purchase No'}</th>`
    let column_3  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Vendor Invoice No': setting.language=='Khmer' ?  'ដល់កាលបរិច្ឆេទ​' : 'ដល់កាលបរិច្ឆេទ​  <br/> Vendor Invoice No'}</th>`
    let column_4  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Due Date':setting.language=='Khmer' ?  'ថ្ងៃផុតកំណត់' : 'ថ្ងៃផុតកំណត់<br/> Due Date'}</th>`
    let column_5  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Over Due': setting.language=='Khmer' ?  'ហួសកំណត់' : 'ហួសកំណត់  <br/> Over Due'}</th>`
    let column_6  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Payment Term': setting.language=='Khmer' ?  'លក្ខខណ្ឌទូទាត់' : 'លក្ខខណ្ឌទូទាត់  <br/> Payment Term'}</th>`
    let column_7  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Payment Option': setting.language=='Khmer' ?  'ជម្រើសនៃការទូទាត់' : 'ជម្រើសនៃការទូទាត់  <br/> Payment Option'}</th>`
    let column_8  = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Ref No': setting.language=='Khmer' ?  'លេខយោង' : 'លេខយោង  <br/> Ref No'}</th>`
    let column_9 = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Status': setting.language=='Khmer' ?  'ស្ថានភាព' : 'ស្ថានភាព  <br/> Status'}</th>`
    let column_10 = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Currency': setting.language=='Khmer' ?  'រូបិយប័ណ្ណ' : 'រូបិយប័ណ្ណ  <br/> Currency'}</th>`
    let column_11 = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Amount': setting.language=='Khmer' ?  'ចំនួនទឹកប្រាក់' : 'ចំនួនទឹកប្រាក់  <br/> Amount'}</th>`
    let column_12 = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Discount': setting.language=='Khmer' ?  'បញ្ចុះតម្លៃ' : 'បញ្ចុះតម្លៃ  <br/> Discount'}</th>`
    let column_13 = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Amount to be paid': setting.language=='Khmer' ?  'ទឹកប្រាក់ដែលត្រូវបង់' : 'ទឹកប្រាក់ដែលត្រូវបង់  <br/> Amount to be paid'}</th>`
    let column_14 = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'Paid Amount': setting.language=='Khmer' ?  'ទឹកប្រាក់បានបង់' : 'ទឹកប្រាក់បានបង់  <br/> Paid Amount'}</th>`
    let empty_td  =  `<tr> 
                        ${setting.column.one ? '<td></td>': ""}
                        ${setting.column.two ? '<td></td>': ""}
                        ${setting.column.three ? '<td></td>': ""}
                        ${setting.column.four ? '<td></td>': ""}
                        ${setting.column.five ? '<td></td>': ""}
                        ${setting.column.six ? '<td></td>': ""}
                        ${setting.column.seven ? '<td></td>': ""}
                        ${setting.column.eight ? '<td></td>': ""}
                        ${setting.column.nine ? '<td></td>': ""}
                        ${setting.column.ten8 ? '<td></td>': ""}
                        ${setting.column.ten1 ? '<td></td>': ""}
                        ${setting.column.ten2 ? '<td></td>': ""}
                        ${setting.column.ten3 ? '<td></td>': ""}
                        ${setting.column.ten4 ? '<td></td>': ""}
                    </tr>` 
    let show_column_num = 0;
    for (const property in setting.column) {
            if(setting.column[property]){
                show_column_num +=1
            }
    }

     return ` 
        ${Header(setting.page,is_print)}
         <div class="">
                <div  style="display: flex; ${logo_postion}">
                    <div style="${m_left}; ${hide_logo}; ${m_right} ;${ address_center_log_left ? 'flex:1': ''}">
                        <div class="logo" style="width: 97%;margin-left: -9px;">
                            <img src="${company_data.imgProfile ? company_data.imgProfile.thumb : '' }" style="margin-bottom: 2px; width: ${setting.logo.width}px !important;height: ${setting.logo.height}px !important; padding-left: 10px!important; margin-top: 2px;" />
                        </div>
                    </div>
                    <div  style="flex: 2; ${is_header}">
                        <div class="">
                            <h2 style="margin: 0px; ${center_text}; width: 100%;">${company_data.name}</h2>
                            <table  style="width:100%; text-align: left; ${ address_center_log_left && setting.logo.position=='right' ? 'text-align: right;': ''}">
                                <tr style="${center_text}">
                                    <td style="line-height: 22px;"> ${setting.language=='English' ? 'HP': setting.language=='Khmer' ? 'ទូរស័ព្ទលេខ' : 'ទូរស័ព្ទលេខ HP'}: ${company_data.invoiceAddress}</td>
                                </tr>
                                <tr style="${center_text}">
                                    <td style="line-height: 22px;"> ${setting.language=='English' ? 'Address': setting.language=='Khmer' ? 'អាសយដ្ឋាន' : 'អាសយដ្ឋាន Address'}:${company_data.companyPhone}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    ${address_center_log_left ? `<div style="flex:1" ></div>` : ''}
                </div>
                <div style="margin-bottom: 8px;">
                    <h2 style="text-align: center;margin-top: 20px;width: 100%">${setting.title}</h2>
                </div>
                <div style="margin-bottom:12px" >
                    <table class="items_tb_border">
                        <body>
                            <tr>
                                <td class="text-bold" style="width: 180px;">${setting.language=='English' ? 'Name': setting.language=='Khmer' ?  'ឈ្មោះ' : 'ឈ្មោះ Name'}</td>
                                <td>${data ? data.supplier.name : ''}</td>
                                <td class="text-bold">${setting.language=='English' ? 'Voucher No.': setting.language=='Khmer' ?  'លេខសក្ខីប័ត្រ' : 'លេខសក្ខីប័ត្រ<br/> Voucher No.'}</td>
                                <td>${data ? data.referenceNo : ''}</td>
                            </tr>
                            <tr>
                                <td class="text-bold" style="width: 180px;">${setting.language=='English' ? 'Transaction Type': setting.language=='Khmer' ? 'ប្រភេទប្រតិបត្តិការ' : 'ប្រភេទប្រតិបត្តិការ Transaction Type'}</td>
                                <td class="text-bold">${data ? data.transactionType.name : ''}</td>
                                <td class="text-bold">${setting.language=='English' ? 'Date': setting.language=='Khmer' ?  'កាលបរិច្ឆេទ' : 'កាលបរិច្ឆេទ Date'}</td>
                                <td>${data ? kendo.toString(new Date(data.transactionDate), data.itemLine[0].dateFormat) : ''}</td>
                            </tr>
                            <tr>
                                <td class="text-bold" style="width: 180px;">${setting.language=='English' ? 'Purpuse': setting.language=='Khmer' ?  'គោលបំណង' : 'គោលបំណង Purpuse'}</td>
                                <td colspan="3">${data ? data.journalNote : ''}</td>
                            </tr>
                        </body>
                    </table>
                 </div>
                 <table class="items">
                     <thead>
                         <tr style="background-color: ${setting.color.background}; color: ${setting.color.color};">
                            ${setting.column.one ? column_1 : ""}
                            ${setting.column.two ? column_2 : ""}
                            ${setting.column.three ? column_3 : ""}
                            ${setting.column.four ? column_4 : ""}
                            ${setting.column.five ? column_5 : ""}
                            ${setting.column.six ? column_6 : ""}
                            ${setting.column.seven ? column_7 : ""}
                            ${setting.column.eight ? column_8 : ""}
                            ${setting.column.nine ? column_9 : ""}
                            ${setting.column.ten ? column_10 : ""}
                            ${setting.column.ten1 ? column_11 : ""}
                            ${setting.column.ten2 ? column_12 : ""}
                            ${setting.column.ten3 ? column_13 : ""}
                            ${setting.column.ten4 ? column_14 : ""}
                         </tr>
                     </thead>
                     <tbody>
                        ${data != undefined ? rederList(data.itemLine,empty_td,setting.column  ) : empty_td }
                         <tr>
                             <td class="tright" colspan="${show_column_num-1}">${setting.language=='English' ? 'Grand Total':  setting.language=='Khmer' ?  'សរុបរួម' : 'សរុបរួម Grand Total'}</td>
                             <td colspan="3" class="tright">${data ? currency_d_base + data.total + currency_r_base : ''}</td>
                         </tr>
 
                     </tbody>
                 </table>
                 <div style="margin-top:12px" >
                    <table class="items_tb_border">
                        <body>
                            <tr>
                                <td class="text-bold" colspan="5">${setting.language=='English' ? 'For Accounting Department Only': setting.language=='Khmer' ?  'សម្រាប់នាយកដ្ឋានគណនេយ្យតែប៉ុណ្ណោះ' : 'សម្រាប់នាយកដ្ឋានគណនេយ្យតែប៉ុណ្ណោះ For Accounting Department Only'}</td>
                            </tr>
                            <tr>
                                <td class="text-bold" >${setting.language=='English' ? 'Account Code': setting.language=='Khmer' ? 'លេខកូដគណនី' : 'លេខកូដគណនី Account Code'}</td>
                                <td class="text-bold" >${setting.language=='English' ? 'Account Description': setting.language=='Khmer' ?  'ការពិពណ៌នាគណនី' : 'ការពិពណ៌នាគណនី  Account Description'}</td>
                                <td class="text-bold" >${setting.language=='English' ? 'Segment': setting.language=='Khmer' ?  'ផ្នែកអាជីវកម្ម' : 'ផ្នែកអាជីវកម្ម Segment'}</td>
                                <td class="text-bold" >${setting.language=='English' ? 'Debit': setting.language=='Khmer' ?  'ឥណពន្ធ' : 'ឥណពន្ធ Debit'}</td>
                                <td class="text-bold" >${setting.language=='English' ? 'Credit': setting.language=='Khmer' ?  'ឥណទាន' : 'ឥណទាន Credit'}</td>
                            </tr>
                            ${data != undefined ? rederListAcounting(data.jRaw, setting.language) : 
                            `
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            ` }
                        
                        </body>
                    </table>
                 </div>
                 <table style="margin-top: 12px;" class="items">
                    <tbody>
                        <tr style="text-align:center">
                        ${
                            setting.signature.prepared_by.status  ? 
                               '<th  class="text-bold">'+ setting.signature.prepared_by.text+'</th>'
                            :
                            ''
                        }
                        ${
                            setting.signature.reviewed_by.status  ? 
                               '<th class="text-bold">'+ setting.signature.reviewed_by.text+'</th>'
                            :
                            ''
                        }
                        ${
                            setting.signature.verified_by.status  ? 
                               '<th class="text-bold">'+ setting.signature.verified_by.text+'</th>'
                            :
                            ''
                        }
                        ${
                            setting.signature.approved_by.status  ? 
                               '<th class="text-bold">'+ setting.signature.approved_by.text+'</th>'
                            :
                            ''
                        }
                        ${
                            setting.signature.recorded_by.status  ? 
                               '<th class="text-bold">'+ setting.signature.recorded_by.text+'</th>'
                            :
                            ''
                        }
                        </tr>
                        <tr>
                        ${
                            setting.signature.prepared_by.status  ? 
                               '<td></td>'
                            :
                            ''
                        }
                        ${
                            setting.signature.reviewed_by.status  ? 
                               '<td></td>'
                            :
                            ''
                        }
                        ${
                            setting.signature.verified_by.status  ? 
                               '<td></td>'
                            :
                            ''
                        }
                        ${
                            setting.signature.approved_by.status  ? 
                               '<td></td>'
                            :
                            ''
                        }
                        ${
                            setting.signature.recorded_by.status  ? 
                               '<td></td>'
                            :
                            ''
                        }
                        </tr>
                    </tbody>
                </table>
         </div>
       ${Footer}
     `;
}

exports.print = (data, id, setting) => {
    window.console.log(id)
    let  is_print = true;
    var contents = this.PaymentVoucher(data, setting,is_print);
    var frame1 = document.createElement('iframe');
    frame1.name = "frame1";
    frame1.style.position = "absolute";
    frame1.style.top = "-1000000px";
    document.body.appendChild(frame1);
    var frameDoc = frame1.contentWindow ? frame1.contentWindow : frame1.contentDocument.document ? frame1.contentDocument.document : frame1.contentDocument;
    frameDoc.document.open();
    frameDoc.document.write(contents);
    frameDoc.document.close();
    setTimeout(function () {
        window.frames["frame1"].focus();
        window.frames["frame1"].print();
        document.body.removeChild(frame1);
    }, 300);
};

exports.getPrint = async (data) => {
    let id = 1
    let form_type = "Payment Voucher";

    let parm_f = `?formType=${form_type}`
    await getFormSetting(parm_f).then(  res => {
        if (res.data.statusCode === 200) {
          if(res.data.data.length > 0){
            this.print(data, id, res.data.data["0"].settings)
          }else{
              let def = {
                title: "Payment Voucher",
                logo: { width: 200, height: 120, position: "left", hide: false },
                header: false,
                page: "A4",
                paymentOption: true,
                color: { background: "#3B393E", color: "#ffffff", background2: '#000000', color2: "#ffffff"  },
                column: {
                    one: true,
                    two: false,
                    three: false,
                    four: false,
                    five: true,
                    six: false,
                    seven: true,
                    eight: false,
                    nine: true,
                    ten: true,
                    ten1: false,
                    ten2: false,
                    ten3: false,
                    ten4: false,
                    ten5: false,
                    ten6: false,
                    ten7: false,
                    ten8: false
                },
                signature: {
                  prepared_by: { status: false, text: "Prepare By" },
                  reviewed_by: { status: false, text: "Prepare By" },
                  verified_by: { status: false, text: "Prepare By" },
                  approved_by: { status: false, text: "Approved By" },
                  recorded_by: { status: false, text: "Recorded By" },
                },
                language: "English",
                address: { title: "St, 120 Kamport", align: "left" },
              };
             this.print(data, id, def)
          }
        }
    })
    return true
}

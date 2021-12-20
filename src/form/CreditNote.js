
const { dataStore } = require("@/observable/store");
const company_data = dataStore.company
const Header = (page,is_print)=>{
    
    return`
        <html>
            <head>
            <title>Test</title>
            ${is_print ? '  <link  href="https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.min.css" rel="stylesheet">' : ''}
                <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;500&display=swap" rel="stylesheet">
                <style rel="stylesheet" >
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
                        src: local('Niradei'), local('Niradei-Bold'), url('../assets/styles/fonts/Niradei-Bold.woff2') format('woff2');
                    }
                    @font-face {
                        font-family: 'Niradei-Regular';
                        font-weight: 600;
                        font-display: swap;
                        font-style: normal;
                        src: local('Niradei'), local('Niradei-Regular'), url('../assets/styles/fonts/Niradei-Regular.woff2') format('woff2');
                    }
                    body { 
                        -webkit-print-color-adjust: exact;
                        font-family: 'Roboto', sans-serif;
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
                            font-family: 'Roboto', sans-serif;
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
                    .items_bottom th{
                        padding: 8px 6px !important ;
                        border-bottom: 1px solid  #000;
                        border-collapse: collapse;
                        border-right: none !important;
                        border-left: none !important;
                    }
                    table{
                        width: 100%;
                        margin-top: 8px;
                        margin-bottom: 8px;
                        border-collapse: collapse;
                    }
                    .items_bottom tr td{
                        border-bottom: 1px solid #000 !important;
                        padding: 6px;
                        height: 32px;
                    }
                    .items_bottom_prepare tr td{
                        border-bottom: 1px solid #000 !important;
                        padding: 6px;
                        height: 32px;
                    }
                    .items_bottom_prepare tr td:first-child{
                        border-top: 1px solid #000 !important;
                    }
                    .items_bottom_prepare tr td:nth-child(2){
                        border-top: 1px solid #000 !important;
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
                        text-align: left !important;
                    }
                    .tright{
                        text-align: right !important;
                    }
                    .text-bold{
                        font-weight: bold;
                    }
                    .text-center{
                        text-align: center !important;
                    }
                </style>
            </head>
        <body>
`;
}
const Footer = `</body></html>`

function rederList(data,empty_td,show_column){
    var items = ""
    // show_column.one = No
    // show_column.two = Number
    // show_column.three = Description
    // show_column.four = UOM
    // show_column.five = Qty
    // show_column.six = Unity price
    // show_column.seven = Discount
    // show_column.eight = Amount
    data.forEach((i,index) => {
        items = items + `
                <tr>
                    ${show_column.one ? '<td class="text-center">'+index+'</td>': ''} 
                    ${show_column.two ? '<td class="text-center">'+i.number+'</td>': ''} 
                    ${show_column.three ? '<td class="tleft">'+i.description+'</td>': ''} 
                    ${show_column.four ? '<td class="text-center">'+i.uom.uom.toUOM.name+'</td>': ''} 
                    ${show_column.five ? '<td class="text-center">'+i.qty+'</td>': ''} 
                    ${show_column.six ? '<td class="text-center">'+i.price+'</td>': ''} 
                    ${show_column.seven ? '<td class="text-center">'+i.discountAmount+'</td>': ''} 
                    ${show_column.eight ? '<td class="tright">'+i.amount+'</td>': ''} 
                </tr>
            `;
    })
    if(data.length <=2){
        items = items + empty_td +  empty_td
    }
    return items;
}

exports.CreditNote = (data, form_id, setting,is_print) => {
    window.console.log('data',data)
    window.console.log('form_id',form_id)
    window.console.log('company',company_data)
    var logo_postion = '';
    let center_text = '';
    let m_left = "";
    let m_right = ""
    let address_center_log_left = ""
    let date =  setting.language=='English' ? 'Date': setting.language=='Khmer' ? 'កាលបរិច្ឆេទ' : 'កាលបរិច្ឆេទ <br/> Date';
    if(setting.logo.position == 'center'){
        logo_postion = "flex-direction: column;justify-content: center;align-items: center;"
        center_text = "text-align:center !important";
    }else if(setting.logo.position =="right"){
        logo_postion ="flex-direction: row-reverse;";
        center_text = "text-align:right !important";
        m_left = "margin-left: 20px";
        m_right = "margin-right:0px";
    }else{
        m_right = "margin-right:0px";
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
    let column_1 = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'NO.': setting.language=='Khmer' ?  'ល.រ' : 'ល.រ <br/> NO.'}</th>`
    let column_2 = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'NUMBER': setting.language=='Khmer' ?  'លេខកូដ' : 'លេខកូដ <br/> No.'}</th>`
    let column_3 = `<th class="text-bold tleft" style="line-height:20px">${setting.language=='English' ? 'ITEM DESCRIPTION': setting.language=='Khmer' ?  'ការពិពណ៌នា' : 'ការពិពណ៌នា <br/> ITEM DESCRIPTION'}</th>`
    let column_4 = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'UOM': setting.language=='Khmer' ?  'ឯកតា' : 'ឯកតា  <br/> UOM'}</th>`
    let column_5 = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'QTY': setting.language=='Khmer' ?  'បរិមាណ' : 'បរិមាណ  <br/> QTY'}</th>`
    let column_6 = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'UNIT PRICE':setting.language=='Khmer' ?  'តម្លៃ​ឯកតា' : 'តម្លៃ​ឯកតា  <br/> UNIT PRICE'}</th>`
    let column_7 = `<th class="text-bold" style="line-height:20px">${setting.language=='English' ? 'DISCOUNT':setting.language=='Khmer' ?  'បញ្ចុះតម្លៃ' : 'បញ្ចុះតម្លៃ  <br/> DISCOUNT'}</th>`
    let column_8 = `<th class="text-bold tright" style="line-height:20px">${setting.language=='English' ? 'TOTAL': setting.language=='Khmer' ?  'សរុប' : 'សរុប  <br/> TOTAL'}</th>`
    let empty_td =  `<tr> 
                        ${setting.column.one ? '<td></td>': ""}
                        ${setting.column.two ? '<td></td>': ""}
                        ${setting.column.three ? '<td></td>': ""}
                        ${setting.column.four ? '<td></td>': ""}
                        ${setting.column.five ? '<td></td>': ""}
                        ${setting.column.six ? '<td></td>': ""}
                        ${setting.column.seven ? '<td></td>': ""}
                        ${setting.column.eight ? '<td></td>': ""}
                    </tr>` 
     return ` 
        ${Header(setting.page,is_print)}
     
         <div class="">
                <div  style="display: flex; ${logo_postion}">
                    <div style="${m_left}; ${hide_logo}; ${m_right};${ address_center_log_left ? 'flex:1': ''}">
                        <div class="logo" style="width: 100%;margin-left: -9px;  ${ address_center_log_left && setting.logo.position=='right' ? 'text-align: right;': ''} ">
                            <img src="${company_data.imgProfile.thumb}" style="margin-bottom: 10px; width: ${setting.logo.width}px !important;height: ${setting.logo.height}px !important; padding-left: 10px!important; margin-top: 2px;" />
                        </div>
                    </div>
                    <div  style="flex: 2; ${is_header}">
                        <div class="">
                            <h2 style="margin: 0px; ${center_text}; width: 100%;">${company_data.name}</h2>
                            <table  style="width:100%; text-align: left;margin-top:0px !important;">
                                <tr style="${center_text}">
                                    <td style="line-height: 22px;"><span class="text-bold"> ${setting.language=='English' ? 'Address': setting.language=='Khmer' ? 'អាសយដ្ឋាន' : 'អាសយដ្ឋាន Address'}: </span> ${company_data.invoiceAddress}</td>
                                </tr>
                                <tr style="${center_text}">
                                    <td style="line-height: 22px;"><span class="text-bold"> ${setting.language=='English' ? 'Tel': setting.language=='Khmer' ? 'ទូរស័ព្ទលេខ' : 'ទូរស័ព្ទលេខ Tel'}: </span> ${company_data.companyPhone}</td>
                                </tr>
                                <tr style="${center_text}">
                                    <td style="line-height: 22px;"><span class="text-bold"> ${setting.language=='English' ? 'Email': setting.language=='Khmer' ? 'អ៊ីមែល' : 'អ៊ីមែល Email'}:</span>  ${company_data.invoiceEmail}</td>
                                </tr>
                                <tr style="${center_text}">
                                    <td style="line-height: 22px;"><span class="text-bold"> ${setting.language=='English' ? 'Websit': setting.language=='Khmer' ? 'គេហទំព័រ' : 'គេហទំព័រ Website'}:</span> ${company_data.website}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    ${address_center_log_left ? `<div style="flex:1" ></div>` : ''}
                </div>
                <div style="margin-bottom: 8px;">
                    <h2 style="text-align: center;margin-top: 20px;width: 100%">${setting.title}</h2>
                </div>
                <div class="row" style="background-color: ${setting.color.background}; color: ${setting.color.color};margin:0px !important; ">
                    <div class="col-7">
                        <p class="text-bold" style="font-weight: bold; margin-bottom: 6px;" >${setting.language=='English' ? 'CUSTOMER INFO': setting.language=='Khmer' ? 'ព័ត៌មានអតិថិជន' : 'ព័ត៌មានអតិថិជន CUSTOMER INFO'}:</p>
                        <table>
                            <body>
                                <tr style="color: ${setting.color.color};">
                                    <td style="width: 130px; ">${setting.language=='English' ? 'Name': setting.language=='Khmer' ?  'ឈ្មោះ' : 'ឈ្មោះ Name'}</td>
                                    <td style="color: ${setting.color.color};">:</td>
                                    <td>${data ? data.customer.name : ''}</td>
                                </tr>
                                <tr style="color: ${setting.color.color};">
                                    <td style="width: 130px;">${setting.language=='English' ? 'Address': setting.language=='Khmer' ?  'អាសយដ្ឋាន' : 'អាសយដ្ឋាន Address'}</td>
                                    <td>:</td>
                                    <td>Kamport</td>
                                </tr>
                                <tr style="color: ${setting.color.color};">
                                    <td style="width: 130px;">${setting.language=='English' ? 'Project': setting.language=='Khmer' ? 'គម្រោង' : 'គម្រោង Project'}</td>
                                    <td>:</td>
                                    <td>Vcnhhai</td>
                                </tr>
                                <tr style="color: ${setting.color.color};">
                                    <td style="width: 130px;">${setting.language=='English' ? 'Tel': setting.language=='Khmer' ?  'លេខទូរស័ព្ទ' : 'លេខទូរស័ព្ទ Tell'}</td>
                                    <td>:</td>
                                    <td>03939393</td>
                                </tr>
                            </body>
                        </table>
                    </div>
                    <div class="col-5">
                        <table>
                            <body>
                                <tr style="color: ${setting.color.color};">
                                    <td style="width: 120px;">${setting.language=='English' ? 'Nº': setting.language=='Khmer' ?  'ល.រ' : 'ល.រ Nº'}</td>
                                    <td>:</td>
                                    <td>${data ? data.referenceNo: ''}</td>
                                </tr>
                                <tr style="color: ${setting.color.color};">
                                    <td style="width: 120px;">${setting.language=='English' ? 'Date': setting.language=='Khmer' ?  'កាលបរិច្ឆេទ' : 'កាលបរិច្ឆេទ Date'} </td>
                                    <td>:</td>
                                    <td> ${data ? data.transactionDate : ''}</td>
                                </tr>
                            </body>
                        </table>
                    </div>
                </div>
                <div  style="background: #000;display:flex; justify-content:space-between; color:#fff;padding:12px">
                   
                      <p class="text-bold" style="flex:1;margin-bottom:0px !important;">${setting.language=='English' ? 'TERM OF PAYMENT': setting.language=='Khmer' ?  'លក្ខខណ្ឌ' : 'លក្ខខណ្ឌ <br/> TERM OF PAYMENT'}: Cash</p>
                      <p class="text-bold" style="flex:1;margin-bottom:0px !important;">${setting.language=='English' ? 'VALIDITY PERIOD': setting.language=='Khmer' ?  'លក្ខខណ្ឌ' : 'សុពលភាព <br/> VALIDITY PERIOD'}: 17-02-2021</p>
                </div>
                <table class="items_bottom" style="margin-top:0px !important;margin-bottom:0px !important">
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
                         </tr>
                     </thead>
                     <tbody>
                         ${data != undefined ? rederList(data.itemLines,empty_td,setting.column) : empty_td }
                     </tbody>
                 </table>
                 <div class="row" style="margin:0px !important;">
                    <div class="col-6" style="padding:0px !important;">
                    </div>
                    <div class="col-6" style="padding:0px !important;">
                    <table class="items_bottom" style="margin-top:0px !important;">
                        <tbody>
                            <tr>
                                <td class="text-bold tright" >${setting.language=='English' ? 'DISCOUNT': setting.language=='Khmer' ?  'បញ្ចុះតំលៃ' : 'បញ្ចុះតំលៃ DISCOUNT'} </td>
                                <td class="tright">${data ? data.discountTotal : ''}</td>
                            </tr>
                            <tr>
                                <td class="text-bold tright"> ${setting.language=='English' ? 'SUB TOTAL':setting.language=='Khmer' ? 'សរុបរង' : 'សរុបរង SUB TOTAL'}</td>
                                <td class="tright">${data ? data.subTotal : '00000.00'}</td>
                            </tr>
                            <tr>
                                <td class="text-bold tright">${setting.language=='English' ? 'TAX': setting.language=='Khmer' ?  'ពន្ធ' : 'ពន្ធ TAX'}</td>
                                <td class="tright">${data ? data.totalTaxAmount : ''}</td>
                            </tr>
                            <tr>
                                <td style="background:#000;color:#fff;"  class="text-bold tright">${setting.language=='English' ? 'GRAND TOTAL':  setting.language=='Khmer' ?  'សរុបរួម' : 'សរុបរួម GRAND TOTAL'}</td>
                                <td class="tright">${data ? data.total : ''}</td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                 </div>
                
                 <table style="margin-top: 20px;" class="items_bottom_prepare">
                    <tbody>
                        <tr>
                        ${
                            setting.signature.prepared_by.status  ? 
                               '<td style="">'+ setting.signature.prepared_by.text+'</td><td>'+date+'</td>'
                            :
                            ''
                        }
                        </tr>
                        <tr>
                        ${
                            setting.signature.reviewed_by.status  ? 
                            '<td>'+ setting.signature.reviewed_by.text+'</td><td>'+date+'</td>'
                            :
                            ''
                        }
                        </tr>
                        ${
                            setting.signature.verified_by.status  ? 
                                '<td>'+ setting.signature.verified_by.text+'</td><td>'+date+'</td>'
                            :
                            ''
                        }
                        <tr>
                        ${
                            setting.signature.approved_by.status  ? 
                            '<td>'+ setting.signature.approved_by.text+'</td><td>'+date+'</td>'
                            :
                            ''
                        }
                        </tr>
                        <tr>
                        ${
                            setting.signature.recorded_by.status  ? 
                            '<td>'+ setting.signature.recorded_by.text+'</td><td>'+date+'</td>'
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

exports.print = (data, form_id, setting) => {
  let  is_print = true;
  var contents = this.CreditNote(data, form_id, setting,is_print);
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

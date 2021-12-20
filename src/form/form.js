const { i18n } = require("@/i18n");

const header = `
<head>
<title>${i18n.t("list_of_saving")}</title>
<style rel="stylesheet" >
* {
    -webkit-print-color-adjust: true;
    -webkit-print-color-adjust: exact;
}
@page {
    size: A4;
}
@media print{@page {size: landscape}}
@font-face {
    font-family: 'Niradei-Bold';
    font-weight: bold;
    font-display: swap;
    font-style: normal;
    src: local('Niradei'), local('Niradei-Bold'), url('@/assetts/styles/fonts/Niradei-Bold.woff2') format('woff2');
}
@font-face {
    font-family: 'Niradei-Regular';
    font-weight: 600;
    font-display: swap;
    font-style: normal;
    src: local('Niradei'), local('Niradei-Regular'), url('@/assetts/styles/fonts/Niradei-Regular.woff2') format('woff2');
}
body { 
    -webkit-print-color-adjust: exact;
    font-family: 'Niradei-Regular' !important;
    print-color-adjust: exact;
}
table,tr,td{
    font-family: 'Niradei-Regular'  !important;
    border-collapse: collapse !important; 
    padding: 5px !important;
    font-size: 12px !important;
}
table,tr,th{
    font-family: 'Niradei-Bold'  !important; 
    padding: 5px !important;
    font-size: 12px !important;
}
@media print {
    html, body {
        font-family: 'Niradei-Regular'  !important;
        margin: 6;
        margin-top: 20;
        margin-bottom: 30;
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
</style>
</head>
`;
function loadPlay(data){
    var items = ""
    data.forEach(element => {
        window.console.log(1)
          
        items = items + `
            <tr>
                <td style="border: 1px solid;">${element.no}</td>
                <td style="border: 1px solid;">${element.cid}</td>
                <td style="border: 1px solid;">${element.name}</td>
                <td style="border: 1px solid;">${element.gender}</td>
                <td style="border: 1px solid;">${element.dob}</td>
                <td style="border: 1px solid;">${element.group}</td>
                <td style="border: 1px solid;">${element.issued_date}</td>
                <td style="border: 1px solid;">${element.number}</td>
                <td style="border: 1px solid;">${element.type}</td>
                <td style="border: 1px solid;">${element.status}</td>
                <td style="border: 1px solid;">${element.deposit}</td>
                <td style="border: 1px solid;">${element.withdraw}</td>
                <td style="border: 1px solid;">${element.interest}</td>
                <td style="border: 1px solid;">${element.total}</td>

            </tr>
            `;
        
    })
    return items;
}
exports.defaulFormGoute = (data) => {
    window.console.log(data)
  return ` 
    <html>
        ${header}
        <body>
            <table class="table" style="width: 100%; border: 1px solid;">
                <thead>
                    <tr>
                        <th style="border: 1px solid;"> ${i18n.t("no.")}</th>
                        <th style="border: 1px solid;"> ${i18n.t("cid")}</th>
                        <th style="border: 1px solid;"> ${i18n.t("name")}</th>
                        <th style="border: 1px solid;"> ${i18n.t("gender")}</th>
                        <th style="border: 1px solid;"> ${i18n.t("dob")}</th>
                        <th style="border: 1px solid;"> ${i18n.t("group")}</th>
                        <th style="border: 1px solid;"> ${i18n.t("issue_date")}</th>
                        <th style="border: 1px solid;">${i18n.t("number")}</th>
                        <th style="border: 1px solid;">${i18n.t("type")}</th>
                        <th style="border: 1px solid;">${i18n.t("status")}</th>
                        <th style="border: 1px solid;">${i18n.t("total_deposit")}</th>
                        <th style="border: 1px solid;">${i18n.t("total_withdraw")}</th>
                        <th style="border: 1px solid;">${i18n.t("total_interest")}</th>
                        <th style="border: 1px solid;">${i18n.t("total")}</th>
                    </tr>
                </thead>
                <tbody>
                    ${loadPlay(data)}
                </tbody>
            </table>
        
        </body>
    </html>
`;
};

exports.print = (data) => {
  let win = window.open("", "invoice", "width=1200, height=850,left=100");
  let doc = win.document.open();
  doc.write(this.defaulFormGoute(data));
  doc.close();
  setTimeout(function() {
    win.print();
    win.close();
  }, 300);
};
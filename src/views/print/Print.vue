<template>
    <v-container>
        <v-row>
            <v-col>
                <h3>Print</h3>
                <Form/>
                <v-btn @click="Test">Test</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
export default {
  name: "Print",
  data: () => ({

  }),
  components: {
      Form : ()=> import('./form/Form')
  },
  methods: {
    Test(){
        this.Print()
    },
    Print() {
        var divContents = document.getElementById("test").innerHTML;
        var win = window.open('', 'invoice', 'width=900, height=700');
        var doc = win.document.open();
        var htmlStart = `
            <html>
                <header>
                    <link href="https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.min.css" rel="stylesheet">
                    <link rel="preconnect" href="https://fonts.gstatic.com">
                    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400&display=swap" rel="stylesheet">
                    <style rel="stylesheet" media="print">
                    @font-face {
                            font-family: 'Krasar-Regular';
                            font-weight: 600;
                            font-display: swap;
                            font-style: normal;
                            src: local('Krasar'), local('Krasar-Regular'), url('@/assetts/styles/fonts/Krasar-Regular.woff2') format('woff2');
                        }

                        @font-face {
                            font-family: 'Krasar-Bold';
                            font-weight: bold;
                            font-display: swap;
                            font-style: normal;
                            src: local('Krasar'), local('Krasar-Bold'), url('@/assetts/styles/fonts/Krasar-Bold.woff2') format('woff2');
                        }
                        body {
                            -webkit-print-color-adjust: exact;
                            font-family: 'Noto Sans JP', sans-serif !important;
                            print-color-adjust: exact;

                            }
                        p{
                            font-family: 'Noto Sans JP', sans-serif !important;
                        }

                        .text-bold{
                            font-weight: bold !important;
                        }
                        .font_10 {
                            font-size: 10px !important;
                        }
                        .font_11 {
                            font-size: 11px !important;
                        }
                        .font_12 {
                            font-size: 12px !important;
                        }
                        .font_13 {
                            font-size: 13px !important;
                        }
                        .font_14 {
                            font-size: 14px !important;
                        }
                        .font_16 {
                            font-size: 16px !important;
                        }
                        .font_18 {
                            font-size: 18px !important;
                        }

                        .font_20 {
                            font-size: 20px !important;
                        }
                        .font_22 {
                            font-size: 22px !important;
                        }
                        .font_24 {
                            font-size: 24px !important;
                        }
                        .font_26 {
                            font-size: 26px !important;
                        }
                        .font_28 {
                            font-size: 28px !important;
                        }
                        .font_30 {
                            font-size: 30px !important;
                        }
                        .font_34 {
                            font-size: 34px !important;
                        }
                        .text_right{
                            text-align: right;
                        }
                        .text-left{
                            text-align: left;
                        }
                        @page {
                            size: A4;
                        }
                        @media print {
                            html, body {
                                font-family: 'Noto Sans JP', sans-serif !important;
                                margin: 6;
                                margin-top: 20;
                                margin-bottom: 30;
                                margin-right: 20;
                                width: 21cm;
                                height: 29.7cm;
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

                        .bg{
                            background: #e7e6e6 !important;
                        }
                        .btn_border{
                            border: 1px solid #c2baba
                        }

                        .theme--light.v-sheet--outlined {
                            border: none !important;
                        }
                        .invoicetext{
                            font-size: 32px;
                            color: #fff;
                            margin-top: 0;
                            padding-top: 22px;
                            padding-left: 10px;
                            text-transform: uppercase;
                            font-family: "Krasar-Bold"
                        }
                        .v-data-table > .v-data-table__wrapper > table > tbody > tr > td, .v-data-table > .v-data-table__wrapper > table > thead > tr > td, .v-data-table > .v-data-table__wrapper > table > tfoot > tr > td {
                            height: 36px !important;
                        }
                        .theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
                            color: #000;
                            font-size: 14px;
                            font-family: "Krasar-Bold"
                        }
                        @media(max-width: 600px){

                            .log_sm{
                                margin: auto;
                                width: 160px;
                                margin-top: 20px;
                            }
                            .sm_p{
                                text-align: left;
                            }
                            .sm_center{
                                text-align: center;
                            }
                            .invoice_id_small{
                                display: none;
                            }
                            .invoice_id_big{
                                display: block;
                            }


                        }
                        @media(min-width: 769px){
                            .invoice_id_small{
                                display: none;
                            }
                            .invoice_id_big{
                                display: block;
                            }
                        }
                    </style>
                </header>
                <body>
                </body>
            </html>
        `
        let hmtlEnd = '</div></body>' + '</html>';
        doc.write(htmlStart + divContents + hmtlEnd);
        doc.close();
        setTimeout(function () {
            win.print();
            win.close();
        }, 2000);
    },
  },
  activated(){
      window.console.log("Home")
  }
}
</script>

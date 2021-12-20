<template>
    <v-row class="">
        <v-col sm="12" cols="12" class="pt-0">
            <h2 class="mb-0 font_20">{{ $t('import_member') }}</h2>
        </v-col>
        <v-col sm="12" cols="12">
            <v-row>
                <v-col sm="4" cols="12" class="py-0">
                    <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" />
                </v-col>
                <v-col sm="4" cols="12">
                    <v-btn color="greenSky" class="rounded-pill white--text float-right text-capitalize mr-5" @click="downloadTimesheet">
                        {{$t('Download file format for import')}}
                    </v-btn>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>

<script>
import UploadExcelComponent from '@/components/upload_excel/Timesheet.vue';
import Timesheet from "@/scripts/model/Timesheet";
import kendo from "@progress/kendo-ui"
const $ = require("jquery")
const timesheetModel = new Timesheet({})
const employeeHandler = require("@/scripts/employeeHandler")
const locationHandler = require("@/scripts/locationHandler")
export default {
    name: "AddTimesheet",
    props: ['id'],
    components: {
        'upload-excel-component':UploadExcelComponent,
        // LoadingMe: () => import(`@/components/Loading`)
    },
    data: () => ({
        showLoading: false,
        locationSelected: '',
        location:[],
        name:'',
        start_date: '',
        resultsData: [],
        tableHeader: [],
        timesheet: timesheetModel,
        date: new Date().toISOString().substr(0, 7),
        menu: false,
        modal: false,
    }),
    methods: {
        downloadTimesheet(){

        },
        beforeUpload(file) {
            const isLt1M = file.size / 1024 / 1024 < 1

            if (isLt1M) {
                return true
            }

            this.$message({
                message: 'Please do not upload files larger than 1m in size.',
                type: 'warning'
            })
            return false
        },
        handleSuccess({ results, header }) {
            results.forEach(element => {
                window.console.log(element[0],'element')
                var utc_days  = Math.floor(element[0] - 25569);
                var utc_value = utc_days * 86400;
                var date_info = new Date(utc_value * 1000);
                var fractional_day = element[0] - Math.floor(element[0]) + 0.0000001;
                var total_seconds = Math.floor(86400 * fractional_day);
                var seconds = total_seconds % 60;
                total_seconds -= seconds;
                var hours = Math.floor(total_seconds / (60 * 60));
                var minutes = Math.floor(total_seconds / 60) % 60;
                var current_datetime =  new Date(date_info.getFullYear(), date_info.getMonth(), date_info.getDate(), hours, minutes, seconds);
                element[0]    = current_datetime
            });
            let tableData = results
            let tableHeader = header
            let DataList = '[';
            if(tableData.length > 0){
                $.each( tableData, function( index, value ) {
                    if(index == 0){
                        DataList += '{"'+ tableHeader[0]+'":"'+  value[0] +'","'+tableHeader[1]+'":"'+  value[1] +'","'+ tableHeader[2]+'":"'+  value[2] +'","'+tableHeader[3]+'":"'+  value[3] +'", "'+tableHeader[4]+'":"'+  value[4] +'", "'+tableHeader[5]+'":"'+  value[5] +'" }';
                    }else{
                        DataList += ',{"'+ tableHeader[0]+'":"'+  value[0] +'","'+tableHeader[1]+'":"'+  value[1] +'","'+ tableHeader[2]+'":"'+  value[2] +'","'+tableHeader[3]+'":"'+  value[3] +'", "'+tableHeader[4]+'":"'+  value[4] +'", "'+tableHeader[5]+'":"'+  value[5] +'" }';
                    }
                });
                DataList += ']';
                this.resultsData = JSON.parse(DataList);
                window.console.log(this.resultsData)
            }
        },
        async loadLocation() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    locationHandler.list().then(res => {
                        if(res.data.statusCode === 200){
                            this.location = res.data.data
                        }
                    })
                }, 300);
            })
        },
        onSaveClose(){
            let ds = this.$refs.inputTimesheet.kendoWidget();
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    let data = {
                        "id":               this.timesheet.id ? this.timesheet.id : '',
                        "employee":         this.employee ? this.employee : {},
                        "monthOf":          kendo.toString(new Date(this.start_date), 'yyyy-MM-dd'),
                        "location":         this.locationSelected,
                        "timeSheetRecord":  ds.data(),
                    }
                    employeeHandler.createTimesheet(data).then(response => {
                        if (response.data.statusCode === 201) {
                            this.$snotify.success('Success')
                            this.close()
                            this.clear()
                        }
                    }).catch(e => {
                        this.$snotify.error('Something went wrong')
                        this.errors.push(e)
                    })
                }, 300);
            })
        },
        cancel(){

        },
        close(){
            window.history.go(-1)
        },
        async initData() {
            if (this.$route.params.id !== undefined) {
                await this.loadSingleEmployee()
            }
        },
        async loadSingleEmployee() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    this.showLoading = true
                    employeeHandler.get(this.$route.params.id).then(res => {
                        this.showLoading = true
                        if (res.data.statusCode === 200) {
                            this.showLoading = false
                            this.employee = res.data.data[0]
                            if(this.employee){
                                this.name = this.employee.employeeId +'-'+this.employee.firstName + ' ' + this.employee.lastName
                            }
                        }
                    })
                }, 300);
            })
        },

    },
    mounted: async function () {
        this.initData()
        this.loadLocation()
    },
    watch: {
        '$route': 'loadSingleEmployee'
    }
}
</script>
<style scoped>
.attachment_table table tr th {
    height: 55px !important;
}

@media (max-width: 576px) {

}
</style>
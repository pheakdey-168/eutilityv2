<template>
    <v-row class="">
        <v-col sm="12" cols="12" class="pt-0">
            <v-row class="">
                <v-col sm="12" cols="12" class="pt-0">
                    <v-row class="">
                        <v-col sm="4" cols="12" class="py-0">
                            <v-text-field class="mt-1"
                                clearable
                                :placeholder="$t('search_directory')"
                                outlined
                                v-model="search"
                            />
                        </v-col>
                        <v-col sm="2" cols="12" class="py-1">
                            <v-btn color="third" class="white--text capitalize" @click="onSearch">
                                {{$t('search')}}
                            </v-btn>
                        </v-col>
                        <v-col sm="6" cols="1" class="py-1">
                            <v-btn to="employee" color="third" class="white--text capitalize float-right">
                                {{$t('new_employee')}}
                            </v-btn>
                            <v-btn outlined class="green--text mx-3 capitalize float-right">
                                {{$t('import')}}
                            </v-btn>
                          
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>

            <v-row class="">
                <v-col sm="12" cols="12" class="py-0">
                    <kendo-datasource ref="dataSource"
                        :data="recordList"
                        :page-size='100'
                        :sort="sort"
                        />
                        <kendo-grid id="grid" class="grid-function"
                            :data-source-ref="'dataSource'"
                            :scrollable-virtual="true"
                            :column-menu="false"
                            :pageable="true">
                        <kendo-grid-column
                            :field="'employee'"
                            :title="$t('employee')"
                            :width="150"
                            :template="'<span>#= employee.firstName# - #= employee.lastName#</span>'"
                            :headerAttributes="{
                                style: 'background-color: #EDF1F5'
                            }"/>
                        <kendo-grid-column
                            :field="'employeeId'"
                            :title="$t('employee_id')"
                            :width="100"
                            :template="'<span>#= employee.employeeId#</span>'"
                            :headerAttributes="{
                                style: 'background-color: #EDF1F5'
                            }"/>
                        <kendo-grid-column
                            :field="'employeeType'"
                            :title="$t('employee_type')"
                            :width="100"
                            :template="'<span>#= employee.employeeType.name ? employee.employeeType.name: ``#</span>'"
                            :headerAttributes="{
                                style: 'background-color: #EDF1F5'
                            }"/>
                        <kendo-grid-column
                            :field="'position'"
                            :title="$t('department_name')"
                            :width="100"
                            :template="'<span>#= position.department.name ? position.department.name: ``#</span>'"
                            :headerAttributes="{
                                style: 'background-color: #EDF1F5'
                            }"/>
                        <kendo-grid-column
                            :field="'position'"
                            :title="$t('position_name')"
                            :width="130"
                            :template="'<span>#= position.name#</span>'"
                            :headerAttributes="{
                                style: 'background-color: #EDF1F5'
                            }"/>
                        <kendo-grid-column
                            :field="'status'"
                            :title="$t('status')"
                            :width="50"
                            :template="'<span>#= status#</span>'"
                            :headerAttributes="{
                                style: 'background-color: #EDF1F5'
                            }"/>
                        <kendo-grid-column
                            :field="''"
                            :title="$t('action')"
                            :width="100"
                            :visible="true"
                            :command="[{iconClass: 'k-icon k-i-view', text: 'VIEW', click: goView }]"
                            :headerAttributes="{style: 'text-align: right; background-color: #EDF1F5'}"
                            :attributes="{ style: 'text-align: right'}"/> 
                    </kendo-grid>
                    <LoadingMe
                        :isLoading="showLoading"
                        :fullPage="true"
                        :myLoading="true"
                     />
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>
<script>
import LoadingMe from "@/components/Loading";
const employeeHandler = require("@/scripts/employeeHandler")
export default {
    data: () => ({
        showLoading: false,
        start_date: "",
        end_date: "",
        recordList: [],
        take: 10,
        sort:[
            { field: 'employeeId', dir: 'asc' }
        ],
        search: '',
    }),
    props: {},
    methods: {
        async loadRecord(){
            let param ={
                'status': 1,
                'search': this.search
            }
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    employeeHandler.getRecord(param).then(res => {
                        this.showLoading = true
                        if(res.data.statusCode === 200){
                            this.showLoading = false
                            this.recordList = res.data.data
                        }
                    })
                }, 300);
            })
        },
        goView(){
        },
        onSearch() {
            this.showLoading = true
            this.loadRecord()
        },

    },
    async mounted() {
        await this.loadRecord()
    },
    computed: {},
    components: {
        'LoadingMe': LoadingMe,
    },
};
</script>
<style scoped>
.acc_group header {
    height: 10px !important;
}

table.acc_group tr td {
    border-bottom: 1px solid #ccc;
    padding: 8px;
    vertical-align: middle;
}

table.acc_group tr td:first-child {
    font-weight: 700;
}

table.acc_group tr td:last-child {
    text-align: center;
}

.v-card__actions .v-btn.v-btn {
    padding: 0 16px;
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
}

.exchange-table.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:last-child td {
    border-bottom: 1px solid #000 !important;
}

.function_footer {
    padding: 15px;
    display: inline-block;
}

p {
    color: rgba(0, 0, 0, 0.87);
}

.actionBtn {
    height: 47.2px !important;
}

.text_tip {
    font-size: 9px;
    line-height: 10px;
}

@media (max-width: 576px) {

}
</style>

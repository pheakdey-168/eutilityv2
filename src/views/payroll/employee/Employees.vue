<template>
    <v-row class="">
        <v-col sm="4" cols="12" class="pt-0">
            <v-card outlined dense color="grayBg" class="pa-3 no_border mb-3" height="65px">
                <v-text-field class=""
                              @change="onSearchChanged"
                              v-model="search"
                              outlined
                              :placeholder="$t('number_or_name')"
                              append-icon="search"
                              clearable/>
            </v-card>
            <v-card outlined dense color="grayBg" class="pa-3 no_border hidden-sm-and-down">
                <!-- loading -->
                <div v-if="!isLoaded">
                    <LoadingMe
                        :isLoading="showLoading"
                        :fullPage="false"
                        :myLoading="true"/>
                </div>
                <kendo-datasource ref="employeeDS"
                                  :data="employees"
                                  :schema="schemaDefinition"/>

                <kendo-grid id="gridEmployeeCenter" class="grid-center"
                            :change="onChanged"
                            :data-source-ref="'employeeDS'"
                            :selectable="true"
                            :persistSelection="true"
                            :noRecords="true"
                            :scrollable="true"
                            :height="535"
                            :pageable-numeric="false"
                            :pageable-previous-next="false"
                            :pageable-messages-display="'Showing {2} data items'">
                    <kendo-grid-column
                        :field="'name'"
                        :attributes="{class:'tb_name_td'}"
                        :title="'name'"
                        :hidden="true"
                        :group-header-template="'#=value#'"
                    />
                    <kendo-grid-column
                        :field="'employeeId'"
                        :title="'&nbsp;'"
                        :template="'<span>#=employeeId# - #=firstName# #=lastName#</span>'"
                    />
                </kendo-grid>
            </v-card>
        </v-col>
        <v-col sm="8" cols="12" class="pt-0">
            <div v-if="isLoaded">
                <LoadingMe
                    :isLoading="showLoading"
                    :fullPage="false"
                    :myLoading="true"/>
            </div>
            <v-row>
                <v-col sm="12" cols="12" class="tab_txn_att pt-0 pl-0">
                    <v-tabs>
                        <v-tab>
                              <span class="hidden-sm-and-up">
                                <v-icon left>mdi-pen</v-icon>
                              </span>
                            <span class="hidden-sm-and-down">
                                {{ $t('info') }}
                            </span>
                        </v-tab>
                        <v-tab>
                              <span class="hidden-sm-and-up">
                                <v-icon left>mdi-pen</v-icon>
                              </span>
                            <span class="hidden-sm-and-down">{{ $t('txn_') }}</span>
                        </v-tab>
                        <v-tab>
                          <span class="hidden-sm-and-up">
                            <v-icon left>mdi-pen</v-icon>
                          </span>
                            <span class="hidden-sm-and-down">
                        {{ $t('history') }}
                        </span>
                        </v-tab>
                        <v-tab>
                          <span class="hidden-sm-and-up">
                            <v-icon left>mdi-pen</v-icon>
                          </span>
                            <span class="hidden-sm-and-down">
                            {{ $t('timesheet') }}
                          </span>
                        </v-tab>
                        <v-tab>
                          <span class="hidden-sm-and-up">
                            <v-icon left>mdi-pen</v-icon>
                          </span>
                            <span class="hidden-sm-and-down">
                            {{ $t('attachments') }}
                          </span>
                        </v-tab>
                        <v-tab-item>
                            <v-card flat class="pa-3" color="grayBg">
                                <v-card-text class="bg_white">
                                    <Info :employee="employee" @onUpdate="callback"/>
                                </v-card-text>
                            </v-card>
                        </v-tab-item>
                        <v-tab-item>
                            <v-card flat class="pa-3" color="grayBg">
                                <v-card-text class="bg_white">
                                    <Transaction :employee="employee" @onUpdate="callback"/>
                                </v-card-text>
                            </v-card>
                        </v-tab-item>

                        <v-tab-item>
                            <v-card flat class="pa-3" color="grayBg">
                                <v-card-text class="bg_white">
                                    <Histories :employee="employee" @onUpdate="callback"/>
                                </v-card-text>
                            </v-card>
                        </v-tab-item>

                        <v-tab-item>
                            <v-card flat class="pa-3 custom_vcard" color="grayBg">
                                <v-card-text class="pt-0 bg_white">
                                    <Timesheet :employee="employee" @onUpdate="callback"/>
                                </v-card-text>
                            </v-card>
                        </v-tab-item>

                        <v-tab-item>
                            <v-card flat class="pa-3" color="grayBg">
                                <v-card-text class="bg_white">
                                    <p class="mb-2">{{ $t('file_type') }} [PDF, JPG, JPEG, TIFF, PNG, GIF]</p>
                                    <template>
                                        <v-file-input
                                            v-model="files"
                                            :placeholder="$t('attachments')"
                                            multiple
                                            prepend-icon="mdi-paperclip">
                                            <template v-slot:selection="{ text }">
                                                <v-chip
                                                    small
                                                    label
                                                    color="primary">
                                                    {{ text }}
                                                </v-chip>
                                            </template>
                                        </v-file-input>
                                    </template>

                                    <v-simple-table class="attachment_table mb-3">
                                        <template v-slot:default>
                                            <thead>
                                            <tr>
                                                <th>{{ $t('file_name') }}</th>
                                                <th>{{ $t('description') }}</th>
                                                <th>{{ $t('date') }}</th>
                                                <th class="text-center"/>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr v-for="item in attachments" :key="item.file">
                                                <td>{{ item.file }}</td>
                                                <td>{{ item.desc }}</td>
                                                <td>{{ item.date }}</td>
                                                <td class="text-center">
                                                    <v-btn color="primary" class="mr-2 pa-0">
                                                        <v-icon size="" class="ma-1">edit</v-icon>
                                                    </v-btn>
                                                    <v-btn color="primary" class="mr-2 pa-0">
                                                        <v-icon size="" class="ma-1">delete</v-icon>
                                                    </v-btn>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </template>
                                    </v-simple-table>

                                    <v-btn class="btn_save_att">
                                        <v-icon size="15" class="mr-2">fa-check</v-icon>
                                        {{ $t('save') }}
                                    </v-btn>
                                </v-card-text>
                            </v-card>
                        </v-tab-item>

                    </v-tabs>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>

<script>

import EmployeeModel from "@/scripts/model/Employee";

const employeeModel = new EmployeeModel({})
const $ = require("jquery")
const employeeHandler = require("@/scripts/employeeHandler")

export default {
    name: "EmployeeCenter",
    components: {
        LoadingMe: () => import(`@/components/Loading`),
        Info: () => import(`./Info`),
        Transaction: () => import(`./Transaction`),
        Histories: () => import(`./Histories`),
        Timesheet: () => import(`./Timesheet`)
    },
    data: () => ({
        showLoading: true,
        isLoaded: false,
        info: {},
        employees: [],
        start_date: '',
        end_date: '',
        customerTypes: [],
        mCustomerType: {},
        dateSorters: [],
        headers: [],
        customerGroups: [],
        mCustomerGroup: {},
        journal_entries: [],
        forwarded: '',
        files: '',
        search: '',
        employee: employeeModel,
        schemaDefinition: {
            model: {id: "id"}
        },
        groupDefinition: {
            field: "type",
        },
    }),
    methods: {
        onSearchChanged() {
            this.showLoading = true
            this.loadEmployeeCenter()
        },
        async customerInfo() {
            this.$emit('onUpdate', this.customer)
        },
        async onChanged() {
            let grid = $("#gridEmployeeCenter").data("kendoGrid")
            let selectedItem = grid.dataItem(grid.select())
            this.employee = selectedItem
            this.$emit('onUpdate', selectedItem)
        },
        async loadEmployeeCenter() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.employees = []
                    employeeHandler.center(this.search).then(res => {
                        this.showLoading = true
                        if (res.data.statusCode === 200) {
                            this.showLoading = false
                            this.employees = res.data.data
                        }
                    }).catch()
                    {
                        this.showLoading = false
                    }
                }, 300)
            })
        },
        callback() {
            if (this.$route.params !== null && this.$route.params.hasOwnProperty('data')) {
                const employee = this.$route.params.data
                const index = this.employees.findIndex(item => {
                    return (employee.id === item.id)
                })
                if (index < 0) {
                    this.employees.push(employee)
                } else {
                    this.employees.splice(index, 1, employee)
                }
            }
        },
    },
    mounted: async function () {
        await this.loadEmployeeCenter()
    },
    computed: {
        btnEnabled() {
            return !this.employee.name
        },
    },
    watch: {
        '$route': 'callback'
    },
}
</script>

<style scoped>
.dropdown_view.theme--light.v-btn.v-btn--icon {
    color: rgba(0, 0, 0, 0.54);
    padding: 0px 40px 0px 50px;
}

.v-menu__content {
    top: 595px !important;
    left: 1243px !important;
}

.v-menu__content .v-list {
    width: 120px;
}

.v-menu__content .v-list .v-list-item {
    min-height: 30px !important;
}

.v-menu__content .v-list .v-list-item .v-list-item__title {
    font-size: 12px;
}
.v-card.bg_blue {
    background-color: #009efb;
    min-height: 60px;
}

.v-card.bg_black {
    background-color: #333;
    color: #fff;
    min-height: 52px;
}

.v-card.bg_blue p.title {
    color: #333;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.v-card.bg_blue p {
    color: #FFF;
}

.v-card.bg_green {
    background-color: #2CA01C;
    color: #FFF;
    display: grid;
    min-height: 52px;
}

.btn_edit {
    background-color: #009efb !important;
}

p.title {
    margin-bottom: 0;
    font-weight: 700;
    color: #333;
    text-align: left;
}

.v-tab--active {
    background-color: rgb(237, 241, 245);
}

.tab_txn_att .v-tab--active {
    font-weight: 700;
}

.bg_white {
    background-color: #fff;
}

.no_border .v-data-table {
    height: 470px;
    overflow-y: scroll !important;
}

.no_border.hidden-sm-and-down .v-data-table td {
    height: 40px;
}

.custom_vcard.v-card {
    overflow-wrap: initial;
}

.k-grid td.k-state-selected, .k-grid tr.k-state-selected > td {
    background-color: rgba(67, 168, 52, 0.25);
}

.attachment_file {
    background-color: #EFEDED;
    border-radius: 0 !important;
}

.view_action {
    text-transform: uppercase;
}

.disabled-header.k-grid tr * {
    cursor: pointer;
}

@media (max-width: 576px) {

}
</style>
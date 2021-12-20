<template>
    <v-row>
        <v-col sm="12" cols="12" class="pt-0">
            <v-card color="white" class="pl-2 no_border" elevation="0">
                <v-row>
                    <v-col sm="12" cols="12" class="pt-0">
                        <h2 class="mb-1">{{ $t('financial_accessibility') }}</h2>
                    </v-col>
                </v-row>
                <v-row>
					<v-col sm="3" cols="12"  class="kendo_dropdown_custom py-0">
                        <v-select
                        class="mt-1"
                        :placeholder="$t('select_province')"
                        item-text="name"
                        tage="select"
                        return-object
                        outlined/>
                    </v-col>
                    <v-col sm="3" cols="12" class="py-0">
                        <app-datepicker :initialDate="asOf"
                                        @emitDate="asOf = $event"/>
                       
                    </v-col>

                    <v-col sm="2" cols="12" class="py-0">
                        <v-btn class="btn_search mt-1" style="background-color: rgb(237, 241, 245)"  @click="search">
                            <span class="">{{$t('run_report')}}</span>
                        </v-btn>
                    </v-col>
                </v-row>


                <v-row>
                    <v-col sm="12" cols="12" class="py-0">
                        <template>
                            <kendo-datasource ref="gridCollectionDS"
                                              :type="'JSON'"
                                              :server-paging="false"/>
                            <kendo-grid id="gridCollection" class="grid-function"
                                        :data-source-ref="'gridCollectionDS'"
                                        :editable="false"
                                        :groupable="false"
                                        :column-menu="true"
                                        :noRecords="true"

                                        :sortable="true"
                                        :excel-file-name="$t('financial_accessibility')+'.xlsx'"
                                        :excel-filterable="true"
                                        :excel-all-pages="true"
                                        :toolbar="['excel']"

                                        :scrollable-virtual="true">
                                <kendo-grid-column
                                    :field="'province_ac'"
                                    :title="$t('province_ac')"
                                    :width="200"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
								
                            </kendo-grid>
							<LoadingMe
								:isLoading="showLoading"
								:fullPage="false"
								:myLoading="true"
								:alertMessage="loadingAlert"
								:color="loadingColorAlert"
								:alertText="loadingTextAlert"/>
                        </template>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
		
    </v-row>
	
</template>

<script>
import DatePickerComponent from '@/components/custom_templates/DatePickerComponent'
import JSZip from "jszip";
window.JSZip = JSZip;
export default {
    data: () => ({
		asOf: new Date().toISOString().substr(0, 10),
		showLoading: false,
		loadingAlert: false,
        loadingColorAlert: '',
        loadingTextAlert: '',
    }),
    components: {
		'app-datepicker': DatePickerComponent,
        LoadingMe: () => import(`@/components/Loading`),

    },
    methods: {
		search() {
            this.showLoading = true
                setTimeout(() => {
                        this.showLoading = false
                    }, 300);
                }
    },
    computed: {

	},
};
</script>
<style scoped>
.k-chart {
    height: 180px;
}

.theme--light.v-data-table {
    background-color: transparent !important;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
    height: 32px !important;
    border-bottom: thin solid rgba(0, 0, 0, 0.12) !important;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr:first-child > td {
    border-top: thin solid rgba(0, 0, 0, 0.12) !important;
}

.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
    background-color: transparent !important;
}
.k-grid th {
    padding: 8px 12px;
    border-width: 0 0 1px 1px;
    white-space: break-spaces !important;
    text-align: center !important;
}
</style>

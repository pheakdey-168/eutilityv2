<template>
    <v-row>
        <v-col sm="12" cols="12" class="pt-0">
            <v-card color="white" class="pl-2 no_border" elevation="0">
                <v-row>
                    <v-col sm="12" cols="12" class="pt-0">
                        <h2 class="mb-1 font_20">{{ $t('indicator_report') }}</h2>
                        <!-- <p class="mb-0">{{ $t('បញ្ជីប្រាក់កម្ចី') }}</p> -->
                    </v-col>
                </v-row>
                <v-row>
					<v-col sm="4" cols="12"  class="kendo_dropdown_custom py-0">
                        <v-select
                        class="mt-1"
                        placeholder="select group"
                        item-text="name"
                        tage="select"
                        return-object
                        outlined/>
                    </v-col>
                    <v-col sm="4" cols="12" class="py-0">
                        <app-datepicker :initialDate="asOf"
                                        @emitDate="asOf = $event"/>
                       
                    </v-col>

                    <v-col sm="1" cols="12" class="py-0">
                        <v-btn class="btn_search mt-1" style="background-color: rgb(237, 241, 245)"  @click="search">
                            <v-icon size="18">b-search</v-icon>
                        </v-btn>
                    </v-col>
                    <v-col sm="2" cols="12" class="py-0 text-right">
                        <v-btn icon color="black" class="bg-none float-right ">
                            <v-icon class="font_34">fa fa-file-excel</v-icon>
                        </v-btn>

                        <v-btn icon color="black" class="bg-none float-right ml-2">
                            <v-icon class="font_34">fa fa-print</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>


                <v-row>
                    <v-col sm="12" cols="12" class="py-0">
                        <template>
                            <kendo-datasource ref="gridCollectionDS"
                                              :type="'JSON'"
                                              :group="group"
                                              :server-paging="false"/>
                            <kendo-grid id="gridCollection" class="grid-function"
                                        :data-source-ref="'gridCollectionDS'"
                                        :editable="false"
                                        :groupable="true"
                                        :column-menu="true"
                                        :noRecords="true"
                                        :scrollable-virtual="true">
								<kendo-grid-column
                                    :field="'n'"
                                    :attributes="{class:'tb_name_td'}"
                                    :title="$t('n')"
                                    :width="70"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'cid'"
                                    :attributes="{class:'tb_name_td'}"
                                    :title="$t('cid')"
                                    :width="100"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'name'"
                                    :attributes="{class:'tb_name_td'}"
                                    :title="$t('name')"
                                    :width="200"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                               
                                <kendo-grid-column
                                    :field="'gender'"
                                    :attributes="{class:'tb_name_td'}"
                                    :title="$t('gender')"
                                    :width="100"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'dob'"
                                    :title="$t('dob')"
                                    :width="150"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5, color: green !important' }"/>
                                <kendo-grid-column
                                    :field="'group'"
                                    :title="$t('group')"
                                    :width="200"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5, color: green !important' }"/>
                                <kendo-grid-column
                                    :field="'address'"
                                    :title="$t('address')"
                                    :width="200"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'status'"
                                    :title="$t('status')"
                                    :width="200"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                <kendo-grid-column
                                    :field="'num_family'"
                                    :title="$t('num_family')"
                                    :width="200"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>

                                 <kendo-grid-column
                                    :field="'date'"
                                    :title="$t('date')"
                                    :width="200"
                                    :headerAttributes="{ style: 'background-color: #EDF1F5, color: green !important' }"/>
								
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
export default {
    data: () => ({
		asOf: new Date().toISOString().substr(0, 10),
		showLoading: false,
		loadingAlert: false,
        loadingColorAlert: '',
        loadingTextAlert: '',
		group: {field: 'type'},
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
</style>

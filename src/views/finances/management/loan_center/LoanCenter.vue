<template>
    <v-row class="">
        <v-col class="py-0 pr-4" sm="4" cols="12">
            <v-card outlined dense class="pa-3 no_border mb-md-4 mb-xs-0" color="grayBg" height="122px">
                <div class="d-flex">
                    <v-text-field
                        @change="onSearchChanges"
                        v-model="searchText"
                        outlined
                        :placeholder="$t('loan_no')"
                        append-icon="search"
                        clearable
                    />
                    <v-btn icon @click="refreshGrid">
                        <v-icon>refresh</v-icon>
                    </v-btn>
                </div>
                <v-select
                    @change="onLoanTypeChanges"
                    :items="loanTypes"

                    tage="loanTypes"
                    :placeholder="$t('loan_type')"
                    item-text="name"
                    clearable
                    outlined
                    return-object
                />
            </v-card>
            <v-card outlined dense class="pa-3 no_border hidden-sm-and-down" color="grayBg">
                <!-- loading -->
                <div v-if="isLoaded">
                    <LoadingMe
                        :isLoading="showLoading"
                        :fullPage="false"
                        type="loading"
                        :myLoading="true"/>
                </div>
                <kendo-datasource
                    ref="loanDataSource"
                    :transport-read-url="loanCenterURL"
                    :groupable="false"
                    :schema-data="'data'"
                    :schema-total="'total'"
                    :page-size='100'
                    :server-paging="true"
                    :schema-model-id="'id'"
                />
                <kendo-grid
                    id="gridLoan" class="grid-center center_heigth" ref="gridLoan"
                    :change="onLoanGridChanged"
                    :data-source-ref="'loanDataSource'"
                    :selectable="true"
                    :persistSelection="true"
                    :noRecords="true"
                    :scrollable="true"
                    :height="535"
                    :pageable="true"
                    :sortable="true"
                    :scrollable-virtual="true">

                    <kendo-grid-column
                        :field="'name'"
                        :title="'&nbsp;'"
                    />
                </kendo-grid>
            </v-card>
        </v-col>
        <v-col class="py-0 paddingLeft" sm="8" cols="12">
            <div v-if="isLoaded">
            </div>
            <v-row>
                <v-col sm="12" cols="12" class="tab_txn_att pt-0 pl-0">
                    <v-tabs>
                        <v-tab>
							<span class="hidden-sm-and-up">
								<v-icon left>mdi-information-variant</v-icon>
							</span>
                            <span class="hidden-sm-and-down">
                                {{ $t('info') }}
							</span>
                        </v-tab>
                        <v-tab>
							<span class="hidden-sm-and-up">
								<v-icon left>mdi-pen</v-icon>
							</span>
                            <span class="hidden-sm-and-down">
                                {{ $t('schedule') }}
							</span>
                        </v-tab>
                        <v-tab>
							<span class="hidden-sm-and-up">
								<v-icon left>mdi-pen</v-icon>
							</span>
                            <span class="hidden-sm-and-down">
                                {{ $t('txn_') }}
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

                        <v-tab-item class="grayBg">
                            <v-row>
                                <v-col sm="12" cols="12" class="pl-3">
                                    <Info :initLoan="loan"/>
                                </v-col>
                            </v-row>
                        </v-tab-item>

                        <v-tab-item class="grayBg">
                            <v-row>
                                <v-col sm="12" cols="12" class="pl-3">
                                    <ListOfLoan :listOfLoan="listOfLoan"/>
                                </v-col>
                            </v-row>
                        </v-tab-item>

                        <!-- Transaction -->
                        <v-tab-item class="grayBg">
                            <v-row>
                                <v-col sm="12" cols="12" class="pl-3">
                                    <CreditApplication :txnLoan="txnLoan"/>
                                </v-col>
                            </v-row>
                        </v-tab-item>
                        <!-- Attachment -->
                        <v-tab-item>
                            <v-row>
                                <v-col sm="12" cols="12" class="pt-0 px-6">
                                    <v-row class="grayBg" style="width: 104%;">
                                        <v-col sm="12" cols="12" class="">
                                            <v-card outlined color="white" class="pa-3">
                                                <v-row class="">
                                                    <v-col sm="12" cols="12" class="py-0">
                                                        <p class="mb-2">{{ $t('file_type') }} [PDF, JPG, JPEG, TIFF,
                                                            PNG, GIF] - 5MB</p>
                                                        <template>
                                                            <v-file-input
                                                                v-model="files"
                                                                id="loanAtt"
                                                                @change="onFileChange"
                                                                accept="image/jpg, image/jpeg, image/png, application/pdf"
                                                                :placeholder="$t('attachments')"
                                                                single
                                                                prepend-icon="mdi-paperclip">
                                                                <template v-slot:selection="{ text }">
                                                                    <v-chip
                                                                        small
                                                                        label
                                                                        color="primary"
                                                                    >
                                                                        {{ text }}
                                                                    </v-chip>
                                                                </template>
                                                            </v-file-input>
                                                            <v-text-field
                                                                v-model="fileDesc"
                                                                outlined
                                                                :placeholder="$t('description')"
                                                                clearable/>
                                                        </template>
                                                        <v-btn color="primary" class="text-capitalize white--text mb-2" @click="uploadFile">
                                                            <!-- <v-icon size="15" class="mr-2">fa-check</v-icon> -->
                                                            {{ $t('upload') }}
                                                        </v-btn>
                                                        <template>
                                                            <LoadingMe
                                                                :isLoading="showLoadingAtch"
                                                                :fullPage="false"
                                                                type="loading"
                                                                :myLoading="true">
                                                            </LoadingMe>
                                                            <kendo-datasource ref="attachmentDS"
                                                                              :data="attachmentList"/>
                                                            <kendo-grid id="gridAttachment" class="grid-function"
                                                                        :data-source-ref="'attachmentDS'"
                                                                        :editable="false"
                                                                        :scrollable-virtual="true">
                                                                <kendo-grid-column
                                                                    :field="''"
                                                                    :title="$t('open')"
                                                                    :width="70"
                                                                    :template="fileUrl"
                                                                    :attributes="{style: 'text-align: center'}"
                                                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                                                <kendo-grid-column
                                                                    :field="'fileName'"
                                                                    :title="$t('file_name')"
                                                                    :width="250"
                                                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                                                <kendo-grid-column
                                                                    :field="'description'"
                                                                    :title="$t('description')"
                                                                    :width="250"
                                                                    :headerAttributes="{ style: 'background-color: #EDF1F5' }"/>
                                                                <kendo-grid-column
                                                                    :field="'fileType'"
                                                                    :title="$t('file_type')"
                                                                    :width="150"
                                                                    :headerAttributes="{ style: 'background-color: #EDF1F5, color: green !important' }"/>
                                                                <kendo-grid-column
                                                                    :field="'size'"
                                                                    :title="$t('size')"
                                                                    :width="150"
                                                                    :template="byteToMB"
                                                                    :headerAttributes="{ style: 'background-color: #EDF1F5, color: green !important' }"/>
                                                                <kendo-grid-column
                                                                    :field="'createdAt'"
                                                                    :title="$t('date')"
                                                                    :width="120"
                                                                    :template="'<span>#= kendo.toString(new Date(createdAt), dateFormat)#</span>'"
                                                                    :headerAttributes="{ style: 'background-color: #EDF1F5, color: green !important' }"/>
                                                            </kendo-grid>
                                                        </template>
                                                    </v-col>
                                                </v-row>
                                            </v-card>
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>
                        </v-tab-item>
                    </v-tabs>
                </v-col>
            </v-row>
        </v-col>
        <LoadingMe
            :isLoading="showLoading"
            :fullPage="true"
            :myLoading="true"
        />
    </v-row>
</template>

<script src="../vuescripts/LoanCenterScript.js"/>

<style scoped>
.grid-center.center_heigth {
    height: 456px !important;
}

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

.v-card {
    background-color: #F8F8F9;
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

.v-card.third {
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
    .v-tab {
        min-width: auto !important;
    }

    .paddingLeft {
        margin-left: 15px;
    }
}
</style>
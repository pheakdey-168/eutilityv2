<template>
    <v-row class="">
        <v-col sm="10" cols="12" class="py-0">
            <h2 class="font_20 mb-0">{{ $t("type_of_loan") }}</h2>
            <p class="mb-0">
                This payment method can be applicable for customer collections, supplier
                payment, and other cash related transaction
            </p>
        </v-col>
        <v-col sm="2" cols="12">
            <v-dialog v-model="dialogm2" max-width="380px">
                <template v-slot:activator="{ on }">
                    <v-btn
                        color="primary"
                        class=" float-right capitalize white--text"
                        v-on="on"
                        @click="onNewClick"
                    >
                        {{ $t("create_new") }}
                    </v-btn>
                </template>
                <v-card>
                    <div class="modal_header">
                        <v-card-title>{{ $t("type_of_loan") }}</v-card-title>
                        <v-icon @click="dialogm2 = false">close</v-icon>
                    </div>
                    <v-card-text class="modal_text_content">
                        <v-row>
                            <v-col sm="12" cols="12" class="pb-0">
                                <label class="label">{{ $t("code") }}</label>
                                <v-text-field
                                    class="mt-1"
                                    outlined
                                    name="code"
                                    placeholder=""
                                    v-model="loanType.code"
                                />

                                <label class="label">{{ $t("name") }}</label>
                                <v-text-field
                                    class="mt-1"
                                    outlined
                                    name="name"
                                    placeholder=""
                                    v-model="loanType.name"
                                />
                                <label class="label">{{ $t("description") }}</label>
                                <v-text-field
                                    class="mt-1"
                                    outlined
                                    name="description"
                                    placeholder=""
                                    v-model="loanType.description"
                                />
                            </v-col>
                        </v-row>
                    </v-card-text>

                    <v-card-actions class="modal_footer d-flex justify-space-between">
                        <v-btn
                            outlined
                            color="primary"
                            class="black--text float-left"
                            @click="dialogm2 = false"
                        >{{ $t("cancel") }}
                        </v-btn
                        >
                        <v-btn
                            color="primary"
                            class="btn_save_close float-right"
                            @click.native="onSaveClick(false, option)"
                        >
                            {{ $t("save_close") }}
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-col>
        <v-row>
            <v-col sm="12" cols="12">
                <template>
                    <v-simple-table class="attachment_table">
                        <template v-slot:default>
                            <thead>
                            <tr>
                                <th class="text-uppercase">{{ $t("code") }}</th>
                                <th class="text-uppercase">{{ $t("name") }}</th>
                                <th class="text-uppercase">{{ $t("description") }}</th>
                                <th style="width: 50px"/>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="type in loanTypes" v-bind:key="type.id">
                                <td class="">{{ type.code }}</td>
                                <td class="">{{ type.name }}</td>
                                <td class="">{{ type.description }}</td>
                                <td style="width:90px;" v-if="type.isSystem !== 1">
                                    <v-btn class="btn_edit_setting" @click="onEditClick(type)">
                                        <v-icon class="white--text" size="12">fa fa-pen</v-icon>
                                        <span class="capitalize ml-1 white--text font_14">{{ $t('edit') }}</span>
                                    </v-btn>
                                </td>
                            </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </template>
            </v-col>
        </v-row>
        <LoadingMe
            :isLoading="showLoading"
            :fullPage="true"
            :myLoading="true" />
    </v-row>
</template>

<script>
import {i18n} from "@/i18n";
import {LoanTypeModel} from "@/scripts/model/AppModels";

const {entityTypeHandler} = require("@/scripts/AppHandlers");
const {EntityType} = require("@/scripts/default_setup/Collections");

const option = {
    update: 1,
    create: 2,
    detele: 0,
};
export default {
    components: {
        LoadingMe: () => import("@/components/Loading"),
    },
    data: () => ({
        showLoading: false,
        dialogm1: "", // Name should be meaningful
        dialogm2: false,
        compeletLoading: true,
        isFullpage: false,
        snackbar: false,
        textStatus: "Success",
        color: "#3DA72E", // use  css for all color  and other that handle by csss
        // timeout: 6000,// should be const
        x: "right", // Name must be meaningful
        y: "top", // name muist be meaning
        loanTypes: [],
        headers: [
            {
                text: i18n.t("name"),
                align: "start",
                sortable: false,
                value: "name",
            },
            {text: i18n.t("description"), value: "description", sortable: false},
            {
                text: i18n.t("account_type"),
                value: "account_type",
                sortable: false,
                align: " d-none",
            },
            {
                text: i18n.t("account_type"),
                value: "account_type.name",
                sortable: false,
            },
            {text: i18n.t("action"), value: "actions", sortable: false},
        ],
        option: option.create, //what is 1 meant?

        loanType: new LoanTypeModel(),
    }),
    watch: {
        dialogm2(val) {
            val || this.close();
        },
    },
    methods: {
        async onEditClick(value) {
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve("resolved");
                    this.loanType = value;
                    this.dialogm2 = true;
                    this.option = 2;
                }, 300);
            });
        },
        onNewClick() {
            this.option = 1;
            this.clear();
        },
        onSaveClick(isNew) {
            this.showLoading = true
            entityTypeHandler.save(EntityType.LOAN, this.loanType).then((res) => {
                this.showLoading = false
                //dont use number what is 200 stand for?
                let isSuccess = res.status === 200;
                if (isSuccess) {
                    this.snackbar = true;
                    this.textStatus = "Success";
                    this.color = "#3DA72E"; // avoid using magic value. declare an variable with name. activeColor, disactiveColor
                    if (isNew === false) {
                        this.dialogm2 = false;
                        this.loadData("loan");
                        this.clear();
                    }
                }
            });
        },
        close() {
            this.dialogm2 = false;
        },
        clear() {
            this.loanType = new LoanTypeModel();
        },
        async loadData() {
            this.showLoading = true
            entityTypeHandler.getByEntityType(EntityType.LOAN).then((res) => {
                this.showLoading = false
                this.loanTypes = res.data;
                window.console.log(res, 'loan type ')
                this.compeletLoading = false;
            });
        },
    },
    mounted: async function () {
        await this.loadData();
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

.exchange-table.theme--light.v-data-table
> .v-data-table__wrapper
> table
> thead
> tr
> th {
    font-family: "Niradei-Bold", serif;
    color: #000 !important;
    border-top: 1px solid #000 !important;
    border-bottom: 1px solid #000 !important;
    font-size: 15px !important;
}

.exchange-table.theme--light.v-data-table
> .v-data-table__wrapper
> table
> thead
> tr
> td {
    color: #000 !important;
    padding: 5px !important;
}

.exchange-table.theme--light.v-data-table
> .v-data-table__wrapper
> table
> tbody
> tr:last-child
td {
    border-bottom: 1px solid #000 !important;
}

.function_footer {
    padding: 15px;
    display: inline-block;
}

@media (max-width: 576px) {
}
</style>

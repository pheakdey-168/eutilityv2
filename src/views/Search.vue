<template>
    <v-app>
        <v-container>
            <v-row>
                <v-col sm="12" cols="12">
                    <v-card color="white" class="pa-5 no_border" elevation="0">
                        <v-row>
                            <v-col sm="3" cols="12">
                                <v-select
                                        class=""
                                        v-model="selectedType"
                                        :items="transactions"
                                        item-text="text"
                                        item-value="value"
                                        label="Transaction Type"
                                        return-object
                                        outlined
                                        required
                                />
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col sm="3" cols="12">
                                <v-select
                                        class=""
                                        v-model="selectedField"
                                        :items="fields"
                                        item-text="text"
                                        item-value="value"
                                        label="Field"
                                        return-object
                                        outlined
                                />
                            </v-col>
                            <v-col sm="5" cols="12">
                                <!-- Dropdown Value -->
                                <div v-if="controller === 'combobox'">
                                    <v-combobox
                                            class=" mb-3"
                                            :items="listDS"
                                            item-value="value"
                                            item-text="text"
                                            v-model="searchValue"
                                            no-data-text="No data found."
                                            label="Value"
                                            clearable
                                            outlined
                                    />
                                </div>

                                <div v-else-if="controller === 'datepicker'">
                                    <v-menu
                                            v-model="menuDate"
                                            :close-on-content-click="false"
                                            max-width="290"
                                    >
                                        <template v-slot:activator="{ on }">
                                            <v-text-field
                                                    v-model="searchValue"
                                                    readonly
                                                    outlined
                                                    append-icon="event"
                                                    v-on="on"
                                                    @click:clear="searchValue = ''"
                                            />
                                        </template>
                                        <v-date-picker
                                                v-model="searchValue"
                                                @change="menuDate = false"
                                                no-title
                                        />
                                    </v-menu>
                                </div>

                                <!-- Text Value -->
                                <div v-else>
                                    <v-text-field
                                            class=""
                                            v-model="searchValue"
                                            label="Value"
                                            outlined
                                    />
                                </div>
                            </v-col>
                        </v-row>
                        <v-row class="pl-3">
                            <v-btn class="btn-search" @click="search">search</v-btn>
                        </v-row>

                        <v-row>
                            <v-col sm="12" cols="12">
                                <template>
                                    <v-simple-table fixed-header height="300px">
                                        <template v-slot:default>
                                            <thead>
                                            <tr>
                                                <th class="text-left">DATE</th>
                                                <th class="text-left">TYPE</th>
                                                <th class="text-left">NUMBER</th>
                                                <th class="text-left">NAME</th>
                                                <th class="text-left">AMOUNT</th>
                                                <th class="text-left">LAST MODIFIED DATE</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr v-for="item in searchDS" :key="item.number">
                                                <td>{{ item.journal_date }}</td>
                                                <td>{{ item.journal_type }}</td>
                                                <td>
                                                    <router-link
                                                            :to="
                                item.journal_type.toLowerCase() +
                                  '/view/' +
                                  item.uuid
                              "
                                                    >{{ item.number }}
                                                    </router-link
                                                    >
                                                </td>
                                                <td/>
                                                <td/>
                                                <td>{{ item.created_date }}</td>
                                            </tr>
                                            </tbody>
                                        </template>
                                    </v-simple-table>
                                </template>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<script>
    const searchHandler = require("../scripts/searchHandler.js");
    const accountHandler = require("../scripts/accountHandler.js");

    export default {
        name: "Search",
        components: {},
        data: () => ({
            transactions: [
                {
                    text: "Journal Entries",
                    value: "journal",
                    fields: [
                        {
                            text: "Amount",
                            value: "amount",
                        },
                        {
                            text: "Account",
                            value: "account",
                        },
                        {
                            text: "Name",
                            value: "name",
                        },
                        {
                            text: "Description",
                            value: "description",
                        },
                        {
                            text: "Last Modified Date",
                            value: "last_modified_date",
                        },
                    ],
                },
                // {
                // 	text: "Account",
                // 	value: "account",
                // 	fields: [
                // 		{ text: "Number", value: "number" },
                // 		{ text: "Name", value: "name" },
                // 		{ text: "Description", value: "description" }
                // 	]
                // }
            ],
            fields: [],
            selectedType: "",
            selectedField: "",
            searchValue: "",
            listDS: [],
            searchDS: [],
            accounts: [],
            menuDate: false,
            controller: "textbox",
        }),
        methods: {
            search() {
                if (this.searchValue !== "") {
                    // Query
                    searchHandler
                        .getSearch({
                            params: {
                                type: this.selectedType.value,
                                field: this.selectedField.value,
                                search_value: this.searchValue,
                            },
                        })
                        .then((res) => {
                            // window.console.log(res)
                            if (res.data) {
                                // Bind dataSource
                                this.searchDS = res.data;
                            } else {
                                // Clear dataSource
                                this.searchDS = [];
                            }
                        });
                }
            },
        },
        watch: {
            selectedType() {
                // Clear previously selected values
                this.fields = [];
                this.listDS = [];
                this.selectedField = "";
                this.searchValue = "";
                this.controller = "textbox";
                // Populate list in the second dropdown
                if (this.selectedType) {
                    this.fields = this.selectedType.fields;
                    this.selectedField = this.fields[0];
                }
            },
            selectedField() {
                // Clear previously selected values
                this.listDS = [];
                this.searchValue = "";
                this.controller = "textbox";

                // Populate list in the second dropdown
                if (this.selectedField) {
                    switch (this.selectedField.value) {
                        case "account":
                            this.listDS = this.accounts;
                            this.controller = "combobox";
                            break;
                        case "last_modified_date":
                            this.searchValue = new Date().toISOString().substr(0, 10);
                            this.controller = "datepicker";
                            break;
                        default:
                            break;
                    }
                }
            },
        },
        mounted() {
            // Selected first option
            this.selectedType = this.transactions[0];
            this.fields = this.selectedType.fields;
            this.selectedField = this.fields[0];

            // Call Account List
            accountHandler.getAll().then((res) => {
                if (res) {
                    res.forEach((value) => {
                        this.accounts.push({
                            text: value.number + "-" + value.name,
                            value: value.uuid,
                        });
                    });
                }
            });
        },
    };
</script>

<style scoped>
    .btn-search {
        background-color: #2ca01c !important;
        color: #fff;
        margin-right: 15px;
    }

    .add-filter {
        background-color: #fff !important;
        border: 1px solid #000 !important;
    }
</style>

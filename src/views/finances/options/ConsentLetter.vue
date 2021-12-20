<template>
    <v-row >
        <v-col sm="12" cols="12" class="pt-0">
            <h2 class="mb-0 font_20">{{ $t("consent_letters_given") }}</h2>
            <v-row class="">
                <v-col sm="12" cols="12" class="">
                    <template>
                        <v-simple-table class="attachment_table">
                            <template v-slot:default>
                                <thead>
                                <tr>
                                    <th>{{ $t("num") }}</th>
                                    <th>{{ $t("financial_institution") }}</th>
                                    <th>{{ $t("application_no") }}</th>
                                    <th>{{ $t("consent_date") }}</th>
                                    <th>{{ $t("application_status") }}</th>
                                    <th>{{ $t("action") }}</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                </tbody>
                            </template>
                        </v-simple-table>
                    </template>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>
<script>
    export default {
        data: () => ({
            // Search transaction dates
            start_date: "",
            end_date: "",
            dateSorters: ["Today", "This Week", "This Month", "This Year"],
            account: [],
            files: [],
            attachments: [],

            dialogm3: false,
            // LoadingMe
            isLoaded: false,
            // Kendo dataSource
            schemaDefinition: {
                model: {
                    id: "id",
                },
            },
            /* Sort by account number */
            sortDefinition: {
                field: "number",
            },
        }),
        props: {},
        methods: {},
        mounted() {
        },
        computed: {},
        components: {
        },
    };
</script>

<style scoped>
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

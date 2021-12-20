<template>
    <v-row class="">
        <v-col sm="12" cols="12" class="pt-0">
            <h2 class="mb-0 font_20">{{$t('type_of_work')}}</h2>
            <v-dialog v-model="dialogm2" max-width="380px">
                <template v-slot:activator="{ on }">
                    <v-btn color="third" class="rounded-pill text-capitalize white--text float-right" v-on="on" @click="onNewClick">
                        {{$t('create_new')}}
                    </v-btn>
                </template>
                <v-card>
                    <v-card-title>{{$t('type_of_work')}}</v-card-title>
                    <v-icon class="btn_close" @click="dialogm2 = false">close</v-icon>
                    <v-divider/>
                    <v-card-text style="height: 190px; background-color: #EDF1F5; color: #333;">
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-row>
                                <v-col sm="12" cols="12" class="">
                                    <label class="label">{{$t('name')}}</label>
                                    <v-text-field class="mt-1"
                                        outlined
                                        tage="Name"
                                        v-model="typeofwork.name"
                                        :rules="[v => !!v || $t('field_is_required')]"
                                        placeholder=""/>

                                    <label class="label">{{$t('description')}}</label>
                                    <v-text-field class="mt-1"
                                        outlined
                                        tage="Name"
                                        v-model="typeofwork.description"
                                        :rules="[v => !!v || $t('field_is_required')]"
                                        placeholder=""/>

                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>
                    <v-divider/>
                    <v-card-actions class="py-2 px-4">
                        <v-row>
                            <v-col sm="6" cols="6" class="py-0 text-left">
                                <v-btn small color="black" outlined class=" text-capitalize rounded-pill black--text float-left" @click="dialogm2 = false">{{$t('cancel')}}</v-btn>
                            </v-col>
                            <v-col sm="6" cols="6" class="py-0 text-right">
                                <v-btn small color="secondary" class="px-3 rounded-pill white--text text-capitalize" @click="onSaveClose">{{$t('save_close')}}
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card-actions>

                </v-card>
            </v-dialog>
            <p class="mb-0">{{$t('department_desc')}} </p>
        </v-col>

        <v-col sm="12" cols="12" class="py-0">
            <template>
                <v-simple-table class="attachment_table">
                    <template v-slot:default>
                        <thead>
                        <tr>
                            <th class="text-uppercase">{{$t('name')}}</th>
                            <th class="text-uppercase">{{$t('description')}}</th>
                            <th style="width: 50px;"/>
                        </tr>
                        </thead>
                        <tbody>
                            <tr v-for="typeofwork in typeOfWorkList" v-bind:key="typeofwork.id">
                                <td class="text-bold">{{ typeofwork.name }}</td>
                                <td class="text-bold">{{ typeofwork.description }}</td>
                                <td>
                                    <v-btn class="btn_edit_setting" @click="onEditClick(typeofwork)">
                                        <v-icon class="white--text" size="12">fa fa-pen</v-icon>
                                        <span class="capitalize ml-1 white--text font_14">{{$t('edit')}}</span>
                                    </v-btn>
                                </td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </template>
        </v-col>
    </v-row>
</template>

<script>
    const payrollHandler = require("@/scripts/payrollHandler")
    import TypeOfWork from '@/scripts/model/TypeOfWork'
    const typeOfWorkModel = new TypeOfWork({})
    import {i18n} from '@/i18n'

    export default {
        components: {},
        data: () => ({
            dialogm1: '',
            valid: true,
            dialogm2: false,
            compeletLoading: true,
            isFullpage: false,
            snackbar: false,
            textStatus: 'Success',
            color: '#3DA72E',
            timeout: 6000,
            x: 'right',
            y: 'top',
            typeofwork: typeOfWorkModel,
            typeOfWorkList: [],
            headers: [
                {
                    text: i18n.t('name'),
                    align: 'start',
                    sortable: false,
                    value: 'name',
                },
                {text: i18n.t('description'), value: 'description', sortable: false,},
                {text: i18n.t('account_type'), value: 'account_type', sortable: false, align: ' d-none'},
                {text: i18n.t('account_type'), value: 'account_type.name', sortable: false,},
                {text: i18n.t('action'), value: 'actions', sortable: false},
            ],
            option: 1
        }),
        props: {},
        computed: {},
        watch: {
            dialogm2(val) {
                val || this.close()
            },
        },
        created() {
        },
        methods: {
            async onEditClick(value) {
                this.typeofwork = value
                this.dialogm2       = true
            },
            onNewClick() {
                this.option = 1
                this.clear()
            },
            async onSaveClose() {
                if (!this.$refs.form.validate()) {
                    this.$refs.form.validate()
                    return
                }
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        let data = {
                            "id": this.typeofwork.id ? this.typeofwork.id : '',
                            "name": this.typeofwork.name,
                            "description": this.typeofwork.description,
                        }
                        payrollHandler.createTypeOfWork(data).then(response => {
                            if (response.data.statusCode === 201) {
                                const res = response.data
                                const index = this.typeOfWorkList.findIndex(item => {
                                    return (res.data.id === item.id)
                                })
                                if (this.typeOfWorkList.length === 0) {
                                    this.loadTypeOfWork()
                                } else {
                                    if (index < 0) {
                                        this.typeOfWorkList.push(res.data)
                                    } else {
                                        this.typeOfWorkList.splice(index, 1, res.data)
                                    }
                                }
                                this.$snotify.success('Success')
                                this.clear()
                                this.close()
                            }
                        }).catch(e => {
                            this.$snotify.error('Something went wrong')
                            this.errors.push(e)
                        })
                    }, 300);
                })
            },
            async loadTypeOfWork(){
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve('resolved');
                        payrollHandler.getTypeOfWork().then(res => {
                            if(res.statusCode === 200){
                                this.typeOfWorkList = res.data
                            }
                        })
                    }, 300);
                })
            },
            close() {
                this.dialogm2 = false
            },
            clear() {  
                this.typeofwork = {}
            },
        },
        mounted: async function () {
            this.loadTypeOfWork()
        }
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

    @media (max-width: 576px) {

    }
</style>
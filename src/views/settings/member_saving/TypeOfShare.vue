<template>
    <v-row class="">
        <v-col sm="12" cols="12" class="pt-0">
            <h2 class="mb-0 font_20">{{ $t('type_of_share') }}</h2>
            <v-dialog v-model="dialogm2" max-width="500px">
                <template v-slot:activator="{ on }">
                    <v-btn class="white--text float-right text-capitalize" color="primary" v-on="on" @click="onNewClick">
                        {{ $t('create_new') }}
                    </v-btn>
                </template>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-card>
                        <v-card-title>{{ $t('add_type_of_share') }}</v-card-title>
                        <v-icon class="btn_close" @click="dialogm2 = false">close</v-icon>
                        <v-divider/>
                        <v-card-text style="height: 290px; background-color: #EDF1F5; color: #333333;">
                            <v-row>
                                <v-col sm="12" cols="12" class="pb-0">
                                    <label class="label">{{ $t('name') }}</label>
                                    <v-text-field
                                        class="mt-1"
                                        v-model="p.name"
                                        outlined
                                        placeholder=""
                                        :rules="[v => !!v || 'Name is required']"
                                    />
                                    <label class="label">{{ $t('abbr') }}</label>
                                    <v-text-field
                                        class="mt-1"
                                        v-model="p.abbr"
                                        outlined
                                        placeholder=""
                                        :rules="[v => !!v || 'Abbr is required']"
                                    />
                                </v-col>
                            </v-row>
                        </v-card-text>
                        <v-divider/>
                        <v-card-actions class="pa-4">
                            <v-row>
                                <v-col sm="6" cols="6" class="py-0">
                                    <v-btn color="black"
                                           outlined
                                           class=" text-capitalize  black--text float-left"
                                           @click="dialogm2 = false">{{ $t('cancel') }}
                                    </v-btn>
                                </v-col>
                                <v-col sm="6" cols="6" class="py-0">
                                    <v-btn color="secondary"
                                           class="px-3  white--text text-capitalize float-right"
                                           @click="saveClose">
                                        {{ $t('save_close') }}
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-card-actions>

                    </v-card>
                </v-form>
            </v-dialog>
        </v-col>
        <v-col sm="12" cols="12">
            <template>
                <v-simple-table class="attachment_table">
                    <template v-slot:default>
                        <thead>
                        <tr>
                            <th class="text-uppercase">{{ $t('name') }}</th>
                            <th class="text-uppercase">{{ $t('abbr') }}</th>
                            <th style="width: 50px"/>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="d in ps" v-bind:key="d.id">
                            <td>{{ d.name }}</td>
                            <td class="">{{ d.abbr }}</td>
                            <td>
                                <v-btn class="btn_edit_setting" @click="onEditClick(d)">
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
        <LoadingMe
            :isLoading="showLoading"
            :fullPage="true"
            :myLoading="true"/>
    </v-row>
</template>

<script>
import TypeOfShareModel from "@/scripts/model/TypeOfShare"
const loanHandler = require("@/scripts/loanHandler")
export default {
    components: {
        LoadingMe: () => import(`@/components/Loading`),
    },
    data: () => ({
        showLoading: false,
        dialogm1: '',
        dialogm2: false,
        compeletLoading: true,
        isFullpage: false,
        snackbar: false,
        textStatus: 'Success',
        errors: [],
        //
        valid: true,
        saveOption: '',
        p: new TypeOfShareModel({}),
        ps: [],
        oldps: [],
        edit: false,
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
        async loadTypeOfShare() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    loanHandler.typeOfShareGet().then(res => {
                        this.ps = res.data.data
                        this.oldps = res.data.data
                    })
                }, 300);
            })
        },
        async onEditClick(value) {
            this.edit = true
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    this.p = value
                    this.dialogm2 = true
                }, 300);
            })
        },
        onNewClick() {
            this.edit = false
            this.p = new TypeOfShareModel({})
            this.p.id = ''
            this.clear()
        },
        saveClose() {
            this.saveOption = "saveClose"
            this.save()
        },
        async save() {
            if (!this.$refs.form.validate()) {
                this.$refs.form.validate()
                return
            }
            this.showLoading = true
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    loanHandler.typeOfShareCreate(new TypeOfShareModel(this.p)).then(response => {
                        this.showLoading = false
                        if (response.data.statusCode === 201) {
                            this.close()
                            this.loadTypeOfShare()
                            this.$refs.form.reset()
                            this.$snotify.success('Successfully')
                        }
                    }).catch(e => {
                        this.$snotify.error('Something went wrong')
                        this.errors.push(e)
                        window.console.log(e)
                    })
                }, 300);
            })
        },
        close() {
            this.dialogm2 = false
        },
        clear() {
        },
    },
    mounted: async function () {
        await this.loadTypeOfShare()
    }
};
</script>
<style scoped>
.attachment_table table tr th {
    height: 55px !important;
}

@media (max-width: 576px) {

}
</style>
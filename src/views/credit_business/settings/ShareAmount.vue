<template>
    <v-row class="">
        <v-col sm="12" cols="12" class="pt-0">
            <h2 class="mb-0 font_20">{{ $t('share_amount') }}</h2>
            <v-dialog v-model="dialogm2" max-width="500px">
                <template v-slot:activator="{ on }">
                    <v-btn class="white--text float-right text-capitalize" color="primary" v-on="on" @click="onNewClick">
                        {{ $t('create_new') }}
                    </v-btn>
                </template>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-card>
                        <v-card-title>{{ $t('add_amount') }}</v-card-title>
                        <v-icon class="btn_close" @click="dialogm2 = false">close</v-icon>
                        <v-divider/>
                        <v-card-text style="height: 290px; background-color: #EDF1F5; color: #333333;">
                            <v-row>
                                <v-col sm="12" cols="12" class="pb-0">
                                    <label class="label">{{ $t('amount') }}</label>
                                    <v-text-field
                                        class="mt-1"
                                        v-model="p.amount"
                                        outlined
                                        placeholder=""
                                        :rules="[v => !!v || 'Amount is required']"
                                    />
                                    <label class="label">{{ $t('year') }}</label>
                                    <v-text-field
                                        class="mt-1"
                                        v-model="p.year"
                                        :disabled="edit"
                                        outlined
                                        placeholder=""
                                        :rules="[v => !!v || 'Year is required']"
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
                                           class=" text-capitalize rounded-pill black--text float-left"
                                           @click="dialogm2 = false">{{ $t('cancel') }}
                                    </v-btn>
                                </v-col>
                                <v-col sm="6" cols="6" class="py-0">
                                    <v-btn color="secondary"
                                           class="px-3 rounded-pill white--text text-capitalize float-right"
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
                            <th class="text-uppercase">{{ $t('amount') }}</th>
                            <th class="text-uppercase">{{ $t('year') }}</th>
                            <th style="width: 50px"/>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="d in ps" v-bind:key="d.id">
                            <td>{{ d.amount }}</td>
                            <td class="">{{ d.year }}</td>
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
    </v-row>
</template>

<script>
import ShareAmountModel from "@/scripts/model/credit/ShareAmount"
const loanHandler = require("@/scripts/loanHandler")
export default {
    components: {},
    data: () => ({
        dialogm1: '',
        dialogm2: false,
        compeletLoading: true,
        isFullpage: false,
        snackbar: false,
        textStatus: 'Success',
        errors: [],
        currencyList: [],
        //
        valid: true,
        saveOption: '',
        p: new ShareAmountModel({}),
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
        async loadShareAmount() {
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved');
                    loanHandler.shareAmountGet().then(res => {
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
            this.p = new ShareAmountModel({})
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
            /*if(this.edit === false) {
                let dub = this.oldps.filter((obj) => {
                    return obj.year === this.p.year
                })
                if (dub.length > 0) {
                    this.$snotify.error('Dublicate Year')
                    return
                }
            }*/
            new Promise(resolve => {
                setTimeout(() => {
                    resolve('resolved')
                    this.showLoading = true
                    loanHandler.shareAmountCreate(new ShareAmountModel(this.p)).then(response => {
                        this.showLoading = false
                        if (response.data.statusCode === 201) {
                            this.close()
                            this.loadShareAmount()
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
        await this.loadShareAmount()
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
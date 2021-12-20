    <template>
    <v-row class="">
        <v-col sm="12" cols="12" class="pt-0">
            <v-row class="">
                <v-col sm="12" cols="12" class="pt-0">
                    <v-row>
                        <v-col sm="10" cols="12" class="py-0">
                            <h2 class="mb-0 font_20">{{$t('payroll_tax_payments')}}</h2>
                        </v-col>
                     
                    </v-row>
                    <v-row class="mt-2">
                        <v-col sm="4" cols="12" class="py-0 d-flex justify-space-between">
                            <label class="mt-3 mr-1">{{$t('from')}}</label>
                            <app-datepicker :initialDate="start_date" @emitDate="start_date = $event"/>
                        </v-col>

                        <v-col sm="4" cols="12" class="py-0  d-flex justify-space-between">
                            <label class="mt-3 mr-1">{{$t('to')}}</label>
                            <app-datepicker :initialDate="end_date" @emitDate="end_date = $event"/>
                        </v-col>
                        <v-col sm="2" cols="1" class="py-1">
                            <v-btn color="third white--text">
                                {{$t('view')}}
                            </v-btn>
                        </v-col>
                
                    </v-row>
                </v-col>
            </v-row>

            <v-row class="">
                <v-col sm="12" cols="12" class="py-0">
                    <v-simple-table class="attachment_table">
                        <template v-slot:default>
                            <thead>
                            <tr>
                                <th>{{ $t('date') }}</th>
                                <th>{{ $t('num') }}</th>
                                <th>{{ $t('tax_filling_ref') }}</th>
                                <th>{{ $t('bank_account') }}</th>
                                <th>{{ $t('amount') }}</th>
                                <th>{{ $t('status') }}</th>
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
                    <LoadingMe
                        :isLoading="showLoading"
                        :fullPage="false"
                        :myLoading="true"
                       />
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>
<script>
import LoadingMe from "@/components/Loading";
export default {
    data: () => ({
        showLoading: false,
        start_date: "",
        end_date: "",
        data: []

    }),
    props: {},
    methods: {

    },
    async mounted() {
    },
    computed: {},
    components: {
        'LoadingMe': LoadingMe,
        'app-datepicker' : ()=> import('@/components/custom_templates/DatePickerComponent')
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
.v-btn {
    text-transform: capitalize !important;
}

@media (max-width: 576px) {

}
</style>

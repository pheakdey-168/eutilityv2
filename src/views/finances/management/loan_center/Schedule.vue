<template>
    <v-row class="white mx-3">
        <v-col sm="12" cols="12">
            <kendo-datasource 
                ref="schedulDS"
                :data="loan.schedule"
                page="1"
                page-size="10" />

            <kendo-grid id="schedulGrid"
                :data-source-ref="'schedulDS'"
                :pageable-page-sizes="true"
                :pageable-button-count="5">
                <kendo-grid-column 
                    :field="'order_number'"
                    :title="$t('no.')"
                    :width="50"
                    :headerAttributes="{
                        style: 'text-align: center; background-color: #EDF1F5',
                    }"
                    :attributes="{ style: 'text-align: center;' }" />
                <kendo-grid-column 
                    :field="'payment_date'"
                    :title="$t('date')"
                    :template="dateTmpl"
                    :width="150"
                    :headerAttributes="{
                        style: 'text-align: center; background-color: #EDF1F5',
                    }"
                    :attributes="{ style: 'text-align: center;' }" />
                <kendo-grid-column 
                    :field="'expected_amount'"
                    :title="$t('expected_amount')"
                    :format="'{0:n}'"
                    :width="150"
                    :headerAttributes="{
                        style: 'text-align: right; background-color: #EDF1F5',
                    }"
                    :attributes="{ style: 'text-align: right;' }" />
                <kendo-grid-column 
                    :field="'paid_amount'"
                    :title="$t('paid_amount')"
                    :format="'{0:n}'"
                    :width="150"
                    :headerAttributes="{
                        style: 'text-align: right; background-color: #EDF1F5',
                    }"
                    :attributes="{ style: 'text-align: right;' }" />
            </kendo-grid>
        </v-col>
    </v-row>
</template>

<script>
    // import {i18n} from '@/i18n';
    import kendo from '@progress/kendo-ui';
    import { LoanModel } from "@/scripts/model/AppModels";

    export default {
        name: "LoanSchedule",
        props: {
            initLoan: {
                type: LoanModel,
            },
        },
        data () {
            return {
                loan : [],
            }
        },
        methods: {
            dateTmpl(dataItem) {
                return kendo.toString(new Date(dataItem.payment_date), "dd-MM-yyyy");
            },
        },
        watch: {
            initLoan () {
                this.loan = this.initLoan
            }
        },
        mounted () {
            this.loan = this.initLoan
        }
    }
</script>

<style scoped>
    @media (max-width: 576px) {
    }
</style>

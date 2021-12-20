<template>
    <v-select class="mt-1"
        placeholder="Select Fiscal Date"
        v-model="fiscalDate"
        :items="fiscalDates"
        item-text="start_date"
        item-value="uuid"
        @change="emitFiscalDate();onChanged();"
        append-icon="mdi-calendar"
        return-object
        clearable
        outlined>
        <template slot="selection" slot-scope="{ item }">
            {{ item.start_date.substr(0, 4) }}
        </template>
        <template slot="item" slot-scope="{ item }">
            {{ item.start_date.substr(0, 4) }}
        </template>
    </v-select>
</template>

<script>
    import Helper from "@/helper.js";

    const store = require("@/institute.js");
	const { institute } = store.default.state;
    
    export default {
        name: 'FiscalYearDropDownList',
        props: {
            initFiscalDate: {
                type: Object,
            },
        },
        data () {
            return {
                Helper 			: Helper,
                fiscalDate 		: institute.fiscalDate[0],
                fiscalDates 	: institute.fiscalDate,
            }
        },
        methods: {
            emitFiscalDate () {
                this.$emit('emitFiscalDate', this.fiscalDate);
            },
            onChanged() {
                this.$emit('onChanged');
            },
        },
        watch: {
            initFiscalDate () {
                this.fiscalDate = this.initFiscalDate;
            }
        },
        mounted () {
            /* Initial Fiscal Date */
            this.fiscalDate = this.initFiscalDate;
        }
    }
</script>
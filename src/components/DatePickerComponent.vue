<template>
    <v-menu
        v-model="menuDate"
        :close-on-content-click="false"
        max-width="290">

        <template v-slot:activator="{ on, attrs }">
            <v-text-field
                class="mt-1"
                :value="dateFormatted"
                readonly
                outlined
                append-icon="event"
                v-on="on"
                v-bind="attrs"
                @click:append="menuDate = true"
            />
        </template>

        <v-date-picker
            v-model="theDate"
            @change="emitDate(),onChanged()"
            no-title
        />
    </v-menu>
</template>

<script>
import kendo from '@progress/kendo-ui'

const store = require("@/institute.js")
const {institute} = store.default.state

export default {
    name: 'DatePickerComponent',
    props: ['initialDate'],
    data() {
        return {
            menuDate: false,
            theDate: '',
        }
    },
    methods: {
        emitDate() {
            this.menuDate = false;
            this.$emit('emitDate', this.theDate)
        },
        onChanged() {
            this.$emit('onChanged')
        },
    },
    watch: {
        initialDate() {
            this.theDate = this.initialDate
        }
    },
    computed: {
        dateFormatted() {
            return this.theDate ? kendo.toString(new Date(this.theDate), institute.dateFormat) : ''
        },
    },
    mounted() {
        /* Initial Date */
        this.theDate = this.initialDate
    }
}
</script>
<template>
    <v-autocomplete
        class="mt-1"
        :loading="loading"
        placeholder="Search Employee"
        @change="emitEmployee(), onChanged()"
        v-model="employee"
        :items="employees"
        item-text="name"
        item-value="id"
        hide-no-data
        hide-selected
        return-object
        clearable
        outlined
    ></v-autocomplete>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'EmployeeDropDownList',
    props: {
        initEmployee: {
            type: Object,
        },
    },
    data() {
        return {
            employee: null,
            loading: false,
        }
    },
    methods: {
        async loadData () {
            this.loading = true;
            
            // Call List
            await this.$store.dispatch('employees/getList');

            this.loading = false;
        },
        emitEmployee() {
            this.$emit('emitEmployee', this.employee);
        },
        onChanged() {
            this.$emit('onChanged')
        },
    },
    watch: {
        initEmployee() {
            this.employee = this.initEmployee;
        }
    },
    computed: mapState({
        employees: state => state.employees.list
    }),
	created() {
        this.loadData();
    },
    mounted() {
        /* Initial Employee */
        this.employee = this.initEmployee;
    }
}
</script>
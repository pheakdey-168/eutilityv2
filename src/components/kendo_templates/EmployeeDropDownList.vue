<template>
    <v-select class="mt-1"
        placeholder="Select Employee"
        v-model="employee"
        :items="employees"
        item-text="firstName"
        item-value="id"
        @change="emitEmployee"
        return-object
        outlined>
        <template slot="selection" slot-scope="{ item }">
            {{ item.firstName }} {{ item.lastName }}
        </template>
        <template slot="item" slot-scope="{ item }">
            {{ item.firstName }} {{ item.lastName }}
        </template>
    </v-select>
</template>

<script>
    import { EmployeeModel } from "@/scripts/model/AppModels";
    const { employeeHandler } = require("@/scripts/AppHandlers");
    
    export default {
        name: 'EmployeeDropDownList',
        props: {
            initEmployee: {
                type: EmployeeModel,
            },
        },
        data () {
            return {
                employee    : new EmployeeModel(),
                employees   : [],
            }
        },
        methods: {
            emitEmployee () {
                this.$emit('emitEmployee', this.employee);
            },
        },
        watch: {
            initEmployee () {
                this.employee = this.initEmployee;
            }
        },
        mounted () {
            /* Initial Employee */
            this.employee = this.initEmployee;

            // Call Obj List
			employeeHandler.getAll()
			.then(res => {
				if(res){
                    let objList = [];
                    res.forEach(value => {
                        let obj = new EmployeeModel(value);
                        objList.push(obj);
                    });
					this.employees = objList;
				}
			})
        }
    }
</script>
import kendo from '@progress/kendo-ui';

const $ = require("jquery");
const store	= require("@/institute.js");
const { supplierHandler } = require("@/scripts/AppHandlers");

export default (container, options) => {
    // Defind ordering by number
    let compare = function(a, b) {
        if (a.items[0].number === b.items[0].number) {
            return 0;
        } else if (a.items[0].number > b.items[0].number) {
            return 1;
        } else {
            return -1;
        }
    };

    // Defind default group
    let group = { 
        field: "supplierType.name",
        compare: compare
    };

    // Use local data
    let ds = new kendo.data.DataSource({
        data: store.default.state.suppliers,
        group: group
    })

    // Definde dropdownlist
    let ddl = $('<input name="' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                autoWidth: true,
                height: 400,
                filter:"startswith",
                dataTextField: "name",
                dataValueField: "id",
                optionLabel: "--- Select ---",
                dataSource: ds
            }).data("kendoDropDownList");
    
    // Use remote data
    if(store.default.state.suppliers.length === 0){
        supplierHandler.getAll()
        .then(res => {
            let remoteDS = new kendo.data.DataSource({
                data: res,
                group: group
            })

            ddl.setDataSource(remoteDS);
        });
    }

    return ddl;
}
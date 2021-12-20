import kendo from '@progress/kendo-ui';

const $ = require("jquery");
const store	= require("@/institute.js");
const { discountItemHandler } = require("@/scripts/AppHandlers");

export default (container, options) => {
    // Use local data
    let ds = new kendo.data.DataSource({
        data: store.default.state.discountItems
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
    if(store.default.state.discountItems.length === 0){
        discountItemHandler.getAll()
        .then(res => {
            let remoteDS = new kendo.data.DataSource({
                data: res
            })

            ddl.setDataSource(remoteDS);
        });
    }

    return ddl;
}
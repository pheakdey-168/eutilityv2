import kendo from '@progress/kendo-ui';

const $ = require("jquery");
const store	= require("@/institute.js");
const { currencyHandler } = require("@/scripts/AppHandlers");

export default (container, options) => {
    // Use local data
    let ds = new kendo.data.DataSource({
        data: store.default.state.currencies
    })

    // Definde dropdownlist
    let ddl = $('<input required name="' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                autoWidth: true,
                height: 400,
                filter:"startswith",
                dataTextField: "name",
                dataValueField: "code",
                template: "<span>#=code# - #=name#</span>",
                optionLabel: "--- Select ---",
                dataSource: ds
            }).data("kendoDropDownList");
    
    // Use remote data
    if(store.default.state.currencies.length === 0){
        currencyHandler.getAll()
        .then(res => {
            let remoteDS = new kendo.data.DataSource({
                data: res
            })

            ddl.setDataSource(remoteDS);
        });
    }

    return ddl;
}
import kendo from '@progress/kendo-ui';

const $ = require("jquery");
const store	= require("@/institute.js");
const { exchangeRateHandler } = require("@/scripts/AppHandlers");

export default (container, options) => {
    // Use local data
    let ds = new kendo.data.DataSource({
        data: store.default.state.exchangeRates
    })

    // Definde dropdownlist
    let ddl = $('<input required name="' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                autoWidth: true,
                height: 400,
                filter:"startswith",
                dataTextField: "code",
                dataValueField: "sk",
                optionLabel: "--- Select ---",
                dataSource: ds
            }).data("kendoDropDownList");
    
    // Use remote data
    if(store.default.state.exchangeRates.length === 0){
        exchangeRateHandler.getAll()
        .then(res => {
            let remoteDS = new kendo.data.DataSource({
                data: res
            })

            ddl.setDataSource(remoteDS);
        });
    }

    return ddl;
}
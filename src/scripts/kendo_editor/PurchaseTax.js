import kendo from '@progress/kendo-ui';

import store from '@/store';

const apiUrl = require('@/apiUrl.js');

export default (container, options) => {
    // Defind ordering by type number
    let compare = function(a, b) {
        if (a.items[0].taxType.typeId === b.items[0].taxType.typeId) {
            return 0;
        } else if (a.items[0].taxType.typeId > b.items[0].taxType.typeId) {
            return 1;
        } else {
            return -1;
        }
    };

    // Defind default group
    let group = { 
        field: "taxType.name",
        compare: compare
    };

    // Use local data
    let ds = new kendo.data.DataSource({
        data: store.state.taxes.list.filter(value => value.transactionType.toLowerCase() === "purchase"),
        group: group,
    })

    // Define dropdownlist
    let ddl = kendo.jQuery('<input name="' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                autoBind: true,
                autoWidth: true,
                height: 400,
                filter:"startswith",
                dataTextField: "defaultTax",
                dataValueField: "id",
                optionLabel: "--- Select ---",
                dataSource: ds
            }).data("kendoDropDownList");
    
    // Use remote data
    if(!store.state.taxes.isLoaded){
        let remoteDS = new kendo.data.DataSource({
            transport: {
                read: {
                    url: apiUrl.tax_setting.tax_list_get,
                },
                dataType: "json",
            },
            schema: {
                model: {
                    id: "id"
                },
                data: (response) => {
                    /* Add to store */
                    store.dispatch('taxes/addList', response.data);
                    
                    return response.data.filter(value => value.transactionType.toLowerCase() === "purchase");
                },
            },
            group: group
        })

        ddl.setDataSource(remoteDS);
    }

    return ddl;
}
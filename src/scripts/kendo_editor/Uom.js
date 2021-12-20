import kendo from '@progress/kendo-ui';
import store from '@/store';

const apiUrl = require('@/apiUrl.js');

export default (container, options) => {
    // Defind ordering by name
    let compare = function(a, b) {
        if (a.items[0].name === b.items[0].name) {
            return 0;
        } else if (a.items[0].name > b.items[0].name) {
            return 1;
        } else {
            return -1;
        }
    };

    // Defind default group
    let group = { 
        field: "category.name",
        compare: compare
    };

    // Use local data
    let ds = new kendo.data.DataSource({
        data: store.state.unitOfMeasurements.list,
        group: group,
    })

    // Definde dropdownlist
    let ddl = kendo.jQuery('<input name="' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                autoBind: true,
                autoWidth: true,
                height: 400,
                filter:"startswith",
                dataTextField: "name",
                dataValueField: "id",
                optionLabel: "--- Select ---",
                dataSource: ds
            }).data("kendoDropDownList");
    
    // Use remote data
    if(!store.state.unitOfMeasurements.isLoaded){
        let remoteDS = new kendo.data.DataSource({
            transport: {
                read: {
                    url: apiUrl.product.uom_get,
                },
                dataType: "json",
            },
            schema: {
                model: {
                    id: "id"
                },
                data: (response) => {
                    /* Add to store */
                    store.dispatch('unitOfMeasurements/addList', response.data);
                    
                    return response.data;
                },
            },
            group: group
        })

        ddl.setDataSource(remoteDS);
    }

    return ddl;
}
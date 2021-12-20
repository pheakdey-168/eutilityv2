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
        field: "nature",
        compare: compare
    };

    // Use local data
    let ds = new kendo.data.DataSource({
        data: store.state.discountItems.list.filter(value => value.type.toLowerCase() === "purchase"),
        group: group,
    })

    // Define dropdownlist
    let ddl = kendo.jQuery('<input name="' + options.field + '"/>')
        .appendTo(container)
        .kendoDropDownList({
            autoWidth: true,
            height: 400,
            filter: "startswith",
            dataTextField: "name",
            dataValueField: "id",
            optionLabel: "--- Select ---",
            dataSource: ds
        }).data("kendoDropDownList");

    // Use remote data
    if(!store.state.discountItems.isLoaded){
        let remoteDS = new kendo.data.DataSource({
            transport: {
                read: {
                    url: apiUrl.item.discount_item_get,
                },
                dataType: "json",
            },
            schema: {
                model: {
                    id: "id"
                },
                data: (response) => {
                    /* Add to store */
                    store.dispatch('discountItems/addList', response.data);
                    
                    return response.data.filter(value => value.type.toLowerCase() === "purchase");
                },
            },
            group: group
        })

        ddl.setDataSource(remoteDS);
    }
            
    return ddl;
}
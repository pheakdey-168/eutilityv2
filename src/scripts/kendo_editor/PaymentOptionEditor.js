import kendo from '@progress/kendo-ui';
// import store from '@/store';
const apiUrl = require('@/api/setting');

export default (container, options) => {
    // Define ordering by number
    // let compare = function(a, b) {
    //     if (a.items[0].number === b.items[0].number) {
    //         return 0;
    //     } else if (a.items[0].number > b.items[0].number) {
    //         return 1;
    //     } else {
    //         return -1;
    //     }
    // };
    const model = options.model || {}
    const strFilter = "?optionType=" + model.optionType || '';
    // Define default group
    let group = {
        field: "name",
        // compare: compare
    };

    // // Use local data
    // let ds = new kendo.data.DataSource({
    //     data: store.state.accounting.accounts,
    //     group: group,
    // })
    //
    // Define Dropdownlist
    let ddl = kendo.jQuery('<input required name="' + options.field + '"/>')
        .appendTo(container)
        .kendoDropDownList({
            autoBind: true,
            autoWidth: true,
            height: 400,
            filter: "startswith",
            dataTextField: "bankAccountName",
            dataValueField: "lineId",
            optionLabel: "--- Select ---",
            dataSource: remoteDS
        }).data("kendoDropDownList");
    // Use remote data
    // if(!store.state.accounting.accounts.accountLoaded){
    let remoteDS = new kendo.data.DataSource({
        transport: {
            read: {
                url: apiUrl.payment_option_detail + strFilter,
            },
            dataType: "json",
        },
        schema: {
            model: {
                id: "id"
            },
            data: (response) => {
                /* Add to store */
                // store.dispatch('accounting/putAccounts', response);

                return response.data;
            },
        },
        group: group
    })

    ddl.setDataSource(remoteDS);
    // }

    return ddl;
}
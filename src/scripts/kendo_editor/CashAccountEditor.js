import kendo from '@progress/kendo-ui';

const $ = require("jquery");
const store	= require("@/institute.js");
const { accountHandler } = require("@/scripts/AppHandlers");
const { AccountTypeCode } = require("@/scripts/default_setup/Collections");

function filterCashAccount(accounts) {
    return accounts.filter(item => ~AccountTypeCode.CASH_ACCOUNTS.indexOf(item.account_type.number));
}

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
        field: "account_type.name",
        compare: compare
    };

    // Use local data
    let ds = new kendo.data.DataSource({
        data: filterCashAccount(store.default.state.accounts),
        group: group
    })

    // Definde dropdownlist
    let ddl = $('<input required name="' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                autoWidth: true,
                height: 400,
                filter:"startswith",
                dataTextField: "name",
                dataValueField: "uuid",
                optionLabel: "--- Select ---",
                dataSource: ds
            }).data("kendoDropDownList");
    
    // Use remote data
    if(store.default.state.accounts.length === 0){
        accountHandler.getAll()
        .then(res => {
            let remoteDS = new kendo.data.DataSource({
                data: filterCashAccount(res),
                group: group
            })

            ddl.setDataSource(remoteDS);
        });
    }

    return ddl;
}
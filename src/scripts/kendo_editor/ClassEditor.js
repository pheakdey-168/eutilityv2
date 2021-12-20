import kendo from '@progress/kendo-ui';
// import { ClassModel } from "@/scripts/model/AppModels";

const $ = require("jquery");
const store	= require("@/institute.js");
const { classHandler } = require("@/scripts/AppHandlers");

// Get local data
function getLocalData(code) {
    let localDS = new kendo.data.DataSource({
        data: store.default.state.classes.filter(value => value.class.code === code)
    })

    return localDS;
}

// Definde dropdownlist
function setDropDownList (container, options) {
    return $('<input name="' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                autoWidth: true,
                height: 400,
                filter:"startswith",
                dataTextField: "name",
                dataValueField: "id",
                optionLabel: "--- Select ---",
                dataSource: []
            }).data("kendoDropDownList");
}

// Initial Editors
let editors = [];

editors.class1 = (container, options) => {
    // Definde dropdownlist
    let ddl = setDropDownList(container, options);
    
    // Use remote data
    if(store.default.state.classes.length === 0){
        classHandler.getAll()
        .then(res => {
            let remoteDS = new kendo.data.DataSource({
                data: res.filter(value => value.class.code === 'C1')
            })

            ddl.setDataSource(remoteDS);
        });
    }else{
        // Use local data
        ddl.setDataSource(getLocalData("C1"));
    }

    return ddl;
};

editors.class2 = (container, options) => {
    // Definde dropdownlist
    let ddl = setDropDownList(container, options);
    
    // Use remote data
    if(store.default.state.classes.length === 0){
        classHandler.getAll()
        .then(res => {
            let remoteDS = new kendo.data.DataSource({
                data: res.filter(value => value.class.code === 'C2')
            })

            ddl.setDataSource(remoteDS);
        });
    }else{
        // Use local data
        ddl.setDataSource(getLocalData("C2"));
    }

    return ddl;
};

editors.class3 = (container, options) => {
    // Definde dropdownlist
    let ddl = setDropDownList(container, options);
    
    // Use remote data
    if(store.default.state.classes.length === 0){
        classHandler.getAll()
        .then(res => {
            let remoteDS = new kendo.data.DataSource({
                data: res.filter(value => value.class.code === 'C3')
            })

            ddl.setDataSource(remoteDS);
        });
    }else{
        // Use local data
        ddl.setDataSource(getLocalData("C3"));
    }

    return ddl;
};

editors.class4 = (container, options) => {
    // Definde dropdownlist
    let ddl = setDropDownList(container, options);
    
    // Use remote data
    if(store.default.state.classes.length === 0){
        classHandler.getAll()
        .then(res => {
            let remoteDS = new kendo.data.DataSource({
                data: res.filter(value => value.class.code === 'C4')
            })

            ddl.setDataSource(remoteDS);
        });
    }else{
        // Use local data
        ddl.setDataSource(getLocalData("C4"));
    }

    return ddl;
};

editors.class5 = (container, options) => {
    // Definde dropdownlist
    let ddl = setDropDownList(container, options);
    
    // Use remote data
    if(store.default.state.classes.length === 0){
        classHandler.getAll()
        .then(res => {
            let remoteDS = new kendo.data.DataSource({
                data: res.filter(value => value.class.code === 'C5')
            })

            ddl.setDataSource(remoteDS);
        });
    }else{
        // Use local data
        ddl.setDataSource(getLocalData("C5"));
    }

    return ddl;
};

export default editors
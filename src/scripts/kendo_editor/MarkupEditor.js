const $ = require("jquery");

export default (container, options) => {
    return $('<input data-bind="value:mark_up" name="' + options.field + '"/>')
            .appendTo(container)
            .kendoNumericTextBox({
                format: "p0",
                min: 0,
                max: 1,
                step: 0.01
            });
}
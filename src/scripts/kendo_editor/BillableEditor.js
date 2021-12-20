const $ = require("jquery");

export default (container, options) => {
    return $('<input class="k-checkbox" type="checkbox" data-type="boolean" data-bind="checked:billable" name="' + options.field + '"/>')
            .appendTo(container)
}
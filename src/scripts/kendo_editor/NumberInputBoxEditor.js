const $ = require("jquery");

export default (container, options) => {
    return $('<input name="' + options.field + '" type="number" class="k-textbox" />')
            .appendTo(container)
}
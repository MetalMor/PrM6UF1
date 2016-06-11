/**
 * Objeto para controlar las opciones de colores al pintar
 * Created by mor on 11/06/16.
 */

var options = {
    init: function() {
        var editable = canvas.editable, prop, element, val,
            form = elements.getElement(elements.selectors.options);
        for (prop in editable) {
            element = elements.getOption(prop);
            val = canvas.editable[elements.getId(element)];
            element.val(val);
            if(elements.exists(element))
                options.setOnChange(element);
        }
        return options;
    },
    solid: function() {
        return elements.isSolidChecked();
    },
    setOnChange: function(element) {
        var id, value, attr = 'id', event = 'change';
        elements.setEvent(event, element, function() {
            id = element.attr(attr);
            value = element.val() || element.text();
            canvas.editable[id] = value;
        });
    }
};
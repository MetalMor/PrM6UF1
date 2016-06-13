/**
 * Objeto para controlar las opciones de colores al pintar
 * Created by mor on 11/06/16.
 */

var options = {
    /**
     * Inicializa los controles de las propiedades de dibujo.
     * @returns {object}
     */
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
    /**
     * Valida si el elemento que indica si hay que pintar el fondo de los dibujos está marcado.
     * @returns {boolean}
     */
    solid: function() {
        return elements.isSolidChecked();
    },
    /**
     * Define la función que se llamará al cambiar los datos que contiene un elemento.
     * @param element Elemento al que vincular la función.
     */
    setOnChange: function(element) {
        var id, value, attr = 'id', event = 'change';
        elements.setEvent(event, element, function() {
            id = element.attr(attr);
            value = element.val() || element.text();
            canvas.editable[id] = value;
        });
    }
};
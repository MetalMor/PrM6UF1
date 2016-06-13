/**
 * Controlador de elementos del DOM
 * Created by mor on 8/06/16.
 */

var elements = {
    /**
     * Lista de selectores de los elementos activos.
     */
    selectors: {
        canvas: 'canvas#canvas',
        table: 'table#menu>tbody',
        options: 'form#options',
        video: 'video#video'
    },
    /**
     * Retorna el elemento obtenido a partir el selector especificado por parámetro.
     * @param selector Selector del elemento deseado.
     * @param notJquery Si es true, la función retornará el objeto neto DOM en lugar de un objeto jQuery.
     * @returns {jQuery|HTMLElement}
     */
    getElement: function(selector, notJquery) {
        var element = $(selector);
        return notJquery === true ? element[0] : element;
    },
    /**
     * Retorna la ID de un elemento.
     * @param element Elemento del que se requiere la ID.
     * @returns {string}
     */
    getId: function(element) {
        return element.attr('id');
    },
    /**
     * Retorna el elemento de reproducción nativa de vídeo.
     * @param notJquery Si es true, la función retornará el objeto del DOM en lugar de un objeto jQuery.
     * @returns {jQuery|HTMLElement}
     */
    getVideo: function(notJquery) {
        return elements.getElement(elements.selectors.video, notJquery);
    },
    /**
     * Retorna el elemento del lienzo canvas.
     * @param notJquery Si es true, la función retornará el objeto del DOM en lugar de un objeto jQuery.
     * @returns {jQuery|HTMLElement}
     */
    getCanvas: function(notJquery) {
        var params = [];
        params.push(elements.selectors.canvas);
        if(notJquery === true) params.push(notJquery);
        return elements.getElement.apply(elements, params);
    },
    /**
     * Retorna el elemento de la tabla de modos de dibujo.
     * @returns {jQuery|HTMLElement}
     */
    getTable: function() {
        return elements.getElement(elements.selectors.table);
    },
    /**
     * Retorna el elemento de las opciones de edición de las propiedades de dibujo.
     * @param id Valor string de la ID del elemento requerido.
     * @returns {jQuery|HTMLElement}
     */
    getOption: function(id) {
        return elements.getElement(elements.selectors.options+">input#"+id);
    },
    /**
     * Valida si el checkbox del color del contenido de las figuras dibujadas está activado o desactivado.
     * @returns {boolean}
     */
    isSolidChecked: function() {
        return elements.getOption('solid').is(':checked');
    },
    /**
     * Define un evento especificado para el elemento requerido, añadiéndole un callback.
     * @param event Identificador string del evento.
     * @param element Elemento al que vincular el evento.
     * @param callback Función llamada al detectar el evento.
     * @returns {jQuery}
     */
    setEvent: function(event, element, callback) {
        if(event && element && callback) {
            element.off(event);
            element.on(event, function (e) {
                callback(e)
            });
        }
        return element;
    },
    /**
     * Valida si un elemento existe en el DOM.
     * @param element Elemento a validar.
     * @returns {boolean}
     */
    exists: function(element) {
        return element.length > 0;
    }
};
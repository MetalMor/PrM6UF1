/**
 * Controlador de elementos del DOM
 * Created by mor on 8/06/16.
 */

var elements = {
    selectors: {
        canvas: 'canvas#canvas',
        table: 'table#menu>tbody'
    },
    getElement: function(selector, notJquery) {
        var element = $(selector);
        return notJquery === true ? element[0] : element;
    },
    getCanvas: function(notJquery) {
        var params = [];
        params.push(elements.selectors.canvas);
        if(notJquery === true) params.push(notJquery);
        return elements.getElement.apply(elements, params);
    },
    getTable: function() {
        return elements.getElement(elements.selectors.table);
    },
    setEvent: function(event, element, callback) {
        if(event && element && callback) {
            element.off(event);
            element.on(event, function (e) {
                callback(e)
            });
        }
        return element;
    }
};
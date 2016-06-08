/**
 * Controlador de elementos del DOM
 * Created by mor on 8/06/16.
 */

var elements = {
    selectors: {
        canvas: 'div#canvas_container>canvas#canvas',
        table: 'div#menu_container>table#menu>tbody>tr'
    },
    getCanvas: function() {
        return $(elements.selectors.canvas);
    },
    getTable: function() {
        return $(elements.selectors.table);
    }
};
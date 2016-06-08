/**
 * Objeto para controlar la tabla de botones.
 * Created by mor on 8/06/16.
 */

var table = {
    element: {},
    init: function() {
        var element = (table.element = elements.getTable()),
            modes = Object.keys(mouse.modes),
            toAppend = "";
        element.empty();
        modes.forEach(function(m) {
            toAppend += element.createRow(m);
        });
        element.append(toAppend);
    },
    createRow: function(m) {
        return '<td id="'+m+'"><button onClick="mouse.setMode(this.id)"></button></td>';
    },
};
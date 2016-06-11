/**
 * Objeto para controlar la tabla de botones.
 * Created by mor on 8/06/16.
 */

var table = {
    element: {},
    init: function() {
        var element = elements.getTable(),
            modes = Object.keys(mouse.modes),
            toAppend = "";
        element.empty();
        modes.forEach(function(m) {
            toAppend += table.createRow(m);
        });
        toAppend += table.createEraseRow();
        element.append(toAppend);
        return table;
    },
    createRow: function(m) {
        return '<tr><td id="'+m+'"><button onClick="mouse.setMode(\''+m+'\')">'+m+'</button></td></tr>';
    },
    createEraseRow: function() {
        return "<tr><td id='erase'><button onClick='canvas.erase(true)'>erase</button></td></tr>"
    }
};
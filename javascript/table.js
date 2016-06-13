/**
 * Objeto para controlar la tabla de botones.
 * Created by mor on 8/06/16.
 */

var table = {
    /**
     * Inicializa los elementos de modo de dibujo.
     * @returns {object}
     */
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
    /**
     * Crea una nueva fila en la tabla para un modo especificado.
     * @param m
     * @returns {string}
     */
    createRow: function(m) {
        return '<tr><td id="'+m+'"><button onClick="mouse.setMode(\''+m+'\')">'+m+'</button></td></tr>';
    },
    /**
     * Crea una fila en la tabla para el botón de borrar el dibujo.
     * @returns {string}
     */
    createEraseRow: function() {
        return "<tr><td id='erase'><button onClick='canvas.erase(true)'>erase</button></td></tr>"
    }
};
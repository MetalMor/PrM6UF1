/**
 * Script principal.
 * Created by mor on 8/06/16.
 */

$(document).ready(function() {
    init();
    var controllers = {
        table: table.init(),
        canvas: canvas.init(),
        mouse: mouse.init(),
        options: options.init()
    };
});

/**
 * Define funciones de utilidad al inicio de la aplicación.
 */
function init() {
    if (!Array.prototype.last){
        /**
         * Retorna la última posición del array. Parametrizable numéricamente.
         * @param i Total de posiciones a retroceder a partir de la última.
         * @returns {object}
         */
        Array.prototype.last = function(i){
            return this[this.length - (1+(i||0))];
        };
    }
}
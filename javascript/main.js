/**
 * Script principal.
 * Created by mor on 8/06/16.
 */

$(document).ready(function() {
    init();
    var controllers = {
        table: table.init(),
        canvas: canvas.init(),
        mouse: mouse.init()
    };
});

function init() {
    if (!Array.prototype.last){
        Array.prototype.last = function(i){
            return this[this.length - (1+(i||0))];
        };
    }
}
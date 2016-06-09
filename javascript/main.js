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
    var prev = controllers.mouse.addClick(0, 0),
        cur = controllers.mouse.addClick(controllers.canvas.width, controllers.canvas.height);
    controllers.canvas.square(cur, prev);
});

function init() {
    if (!Array.prototype.last){
        Array.prototype.last = function(){
            return this[this.length - 1];
        };
    }
}
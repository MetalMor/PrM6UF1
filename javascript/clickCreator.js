/**
 * Objeto que representa un clic
 * Created by mor on 8/06/16.
 */

var clickCreator = {
    click: function(mouseX, mouseY, modes, strokeStyle, lineJoin, lineWidth) {
        var click;
        return click = {
            x: mouseX,
            y: mouseY,
            modes: modes,
            strokeStyle: strokeStyle,
            lineJoin: lineJoin,
            lineWidth: lineWidth,
            getMode: function() {
                return util.getMode(click);
            }
        }
    }
};
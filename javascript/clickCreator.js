/**
 * Objeto que representa un clic
 * Created by mor on 8/06/16.
 */

var clickCreator = {
    click: function(mouseX, mouseY, mode, strokeStyle, lineJoin, lineWidth) {
        return {
            x: mouseX,
            y: mouseY,
            modes: mode,
            strokeStyle: strokeStyle,
            lineJoin: lineJoin,
            lineWidth: lineWidth
        }
    }
};
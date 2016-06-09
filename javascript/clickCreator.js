/**
 * Objeto factoria de clics.
 * Created by mor on 8/06/16.
 */

var clickCreator = {
    /**
     * Retorna un objeto clic.
     * @param mouseX Coordenada X del plano.
     * @param mouseY Coordenada Y del plano.
     * @param modes Objeto contenedor de modos del clic.
     * @param strokeStyle Estilo de línea
     * @param lineJoin Tipo de unión de la línea
     * @param lineWidth Grosor de la línea
     * @returns {click}
     */
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
/**
 * Objeto factoria de clics.
 * Created by mor on 8/06/16.
 */

var clickCreator = {
    /**
     * Retorna un objeto clic.
     * @param id Identificador del clic.
     * @param mouseX Coordenada X del plano.
     * @param mouseY Coordenada Y del plano.
     * @param modes Objeto contenedor de modos del clic.
     * @param strokeStyle Estilo de línea
     * @param lineJoin Tipo de unión de la línea
     * @param lineWidth Grosor de la línea
     * @param fillStyle Color de relleno de la figura
     * @returns {click}
     */
    click: function(id, mouseX, mouseY, modes, props) {
        var click;
        return click = {
            id: id,
            x: mouseX,
            y: mouseY,
            modes: modes,
            strokeStyle: props.strokeStyle,
            fillStyle: props.fillStyle,
            lineWidth: props.lineWidth,
            getMode: function() {
                return util.getMode(click);
            }
        }
    }
};
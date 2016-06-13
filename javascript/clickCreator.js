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
     * @param props Objeto contenedor de las propiedades del clic.
     * @returns {click}
     */
    click: function(id, mouseX, mouseY, modes, props) {
        var click;
        return click = {
            /**
             * Identificador del clic.
             */
            id: id,
            /**
             * Coordenada X del plano.
             */
            x: mouseX,
            /**
             * Coordenada Y del plano.
             */
            y: mouseY,
            /**
             * Objeto contenedor de modos del clic.
             */
            modes: modes,
            /**
             * Color de la línea.
             */
            strokeStyle: props.strokeStyle,
            /**
             * Color del contenido.
             */
            fillStyle: props.fillStyle,
            /**
             * Grosor de la línea.
             */
            lineWidth: props.lineWidth,
            /**
             * Retorna el modo activo del objeto clic.
             * @returns {object}
             */
            getMode: function() {
                return util.getMode(click);
            }
        }
    }
};
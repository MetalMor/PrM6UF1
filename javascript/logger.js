/**
 * Objeto controlador del log de la consola.
 * Created by mor on 9/06/16.
 */

var logger = {
    /**
     * Boolean que define si el log está activado o no.
     */
    on: false,
    /**
     * Objeto contenedor de etiquetas indicadoras de la procedencia de los mensajes.
     */
    sources: {
        canvas: '[canvas]',
        mouse: '[mouse]'
    },
    /**
     * Envía una lista de mensajes a la consola.
     * @param source
     * @param messages
     */
    log: function(source, messages) {
        messages.forEach(function(mes) {
            if (logger.on) console.log(logger.message(source, mes));
        });
    },
    /**
     * Envía mensajes que indiquen la actividad de la aplicación al dibujar.
     * @param current Objeto click que representa la posición actual.
     * @param prev Objeto click que representa la posición anterior.
     */
    draw: function(current, prev) {
        var source = logger.sources.canvas,
            messages = [
                'calling '+ current.getMode()+' method.',
                'current: '+current.id+'('+ current.x+','+ current.y+').',
                'previous: '+prev.id+'('+ prev.x+','+ prev.y+').'
            ];
        logger.log(source, messages);
    },
    /**
     * Envía mensajes que indiquen la actividad de los eventos.
     * @param evName String nombre del evento.
     */
    event: function(evName) {
        var source = logger.sources.mouse,
            messages = [evName + ' called.'];
        logger.log(source, messages);
    },
    /**
     * Formula un mensaje a partir de una etiquera de procedencia y el cuerpo del mensaje.
     * @param source
     * @param message
     * @returns {string}
     */
    message: function(source, message) {
        return source + ' ' + message;
    }
};
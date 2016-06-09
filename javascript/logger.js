/**
 * Objeto controlador del log
 * Created by mor on 9/06/16.
 */

var logger = {
    on: false,
    sources: {
        canvas: '[canvas]',
        mouse: '[mouse]'
    },
    log: function(source, messages) {
        messages.forEach(function(mes) {
            if(logger.on)console.log(logger.message(source, mes));
        });
    },
    draw: function(current, prev) {
        var source = logger.sources.canvas,
            messages = [
                'calling '+ current.getMode()+' method.',
                'current: '+current.id+'('+ current.x+','+ current.y+').',
                'previous: '+prev.id+'('+ prev.x+','+ prev.y+').'
            ];
        logger.log(source, messages);
    },
    event: function(evName) {
        var source = logger.sources.mouse,
            messages = [evName + ' called.'];
        logger.log(source, messages);
    },
    message: function(source, message) {
        return source + ' ' + message;
    }
};
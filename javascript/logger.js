/**
 * Objeto controlador del log
 * Created by mor on 9/06/16.
 */

var logger = {
    sources: {
        canvas: '[canvas]'
    },
    log: function(source, messages) {
        messages.forEach(function(mes) {
            console.log(source + ' ' + mes);
        });
    },
    draw: function(current, prev) {
        var source = logger.sources.canvas,
            messages = [
                'calling '+ current.getMode()+' method.',
                'current: ('+ current.x+','+ current.y+').',
                'previous: ('+ prev.x+','+ prev.y+').'
            ];

    }
}
/**
 * Controlador del lienzo (canvas)
 * Created by mor on 8/06/16.
 */

var canvas = {

    /**
     * Valor del contexto, y una vez inicializado el objeto, referencia al contexto del elemento canvas.
     */
    ctxt: '2d',

    attributes: {height: 500, width: 1000},

    bgColor: '#FFFFFF',
    strokeStyle: '#000000',
    lineJoin: 'round',
    lineWidth: 5,

    init: function() {
        var element = elements.getCanvas(true),
            ctxt = element.getContext(canvas.ctxt);
        canvas.setAttributes(element);
        canvas.ctxt = ctxt;
        canvas.element = element;
        if(canvas.ctxt) logger.message(logger.sources.canvas, 'canvas init');
        return canvas;
    },
    areNext: function(one, other) {
        var x = one.x - other.x, y = one.y - other.y;
        return util.nearZero(x) && util.nearZero(y);
    },
    redraw: function() {
        var i, ctxt = canvas.ctxt, strokeStyle = canvas.strokeStyle, lineJoin = canvas.lineJoin,
            modes = mouse.modes, mode, lineWidth = canvas.lineWidth, clicks = mouse.clicks,
            prev = clickCreator.click(0, 0, modes, strokeStyle, lineJoin, lineWidth);


        ctxt.strokeStyle = strokeStyle;
        ctxt.lineJoin = lineJoin;
        ctxt.lineWidth = lineWidth;

        canvas.ctxt = ctxt;

        canvas.erase();
        var debugCounter = 0, debugLim = clicks.length-1;
        clicks.forEach(function(cur) {
            if(debugCounter === debugLim) {
                console.log('HARD DEBUGGING ' + clicks.indexOf(mouse.getFirstClick(cur.id)));
            }
            if(!modes.pencil) {
                var firstIndex = clicks.indexOf(mouse.getFirstClick(cur.id)),
                    lastIndex = clicks.indexOf(mouse.getLastClick(cur.id));
                clicks.splice(firstIndex, lastIndex-firstIndex-1);
            }
            var other;
            mode = cur.getMode();
            other = cur.id === prev.id ? prev : cur;
            prev = canvas.drawFigure(mode, cur, other);
            debugCounter++;
        });
        return canvas;
    },
    drawPath: function(ctxt, pos, func) {
        ctxt.beginPath();
        ctxt.moveTo(pos.x, pos.y);
        if(func) func();
        ctxt.closePath();
        ctxt.stroke();
    },
    drawFigure: function(mode, current, other) {
        canvas[mode](current, other);
        return current;
    },
    pencil: function(current, prev) {
        logger.draw(current, prev);
        var ctxt = canvas.ctxt, mode = current.getMode();
        canvas.drawPath(ctxt, prev, function() {
            ctxt.lineTo(current.x, current.y);
        });
    },
    line: function(current, prev) {
        logger.draw(current, prev);
        var ctxt = canvas.ctxt, mode = current.getMode();
        canvas.drawPath(ctxt, prev, function() {
            if(current.id === prev.id) ctxt.lineTo(current.x, current.y);
        });
    },
    square: function(current, prev) {
        logger.draw(current, prev);
        var prev = mouse.getFirstClick(current.id);
        var ctxt = canvas.ctxt, mode = current.getMode();
        canvas.drawPath(ctxt, prev, function() {
            ctxt.rect(prev.x, prev.y, current.x, current.y);
        });
    },
    circle: function(current, prev) {
        logger.draw(current, prev);
        var ctxt = canvas.ctxt, mode = current.getMode(), radius = util.getDistance(current, prev),
            perimeter = 2*Math.PI;
        canvas.drawPath(ctxt, prev, function() {
            ctxt.arc(prev.x, prev.y, radius, 0, perimeter, false);
        });
    },
    erase: function() {
        canvas.ctxt.clearRect(0, 0, canvas.attributes.width, canvas.attributes.height);
    },
    setAttributes: function(element) {
        var attributes = canvas.attributes, attr;
        for(attr in attributes)
            element.setAttribute(attr, attributes[attr]);
    }
};
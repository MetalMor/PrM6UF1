/**
 * Controlador del lienzo (canvas)
 * Created by mor on 8/06/16.
 */

var canvas = {

    ctxt: '2d',

    attributes: {height: 500, width: 500},

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
        return canvas;
    },
    areNext: function(one, other) {
        var x = one.x - other.x, y = one.y - other.y;
        return util.isOneOrZero(x) && util.isOneOrZero(y);
    },
    redraw: function() {
        var i, ctxt = canvas.ctxt, strokeStyle = canvas.strokeStyle, lineJoin = canvas.lineJoin,
            modes = mouse.modes, mode, lineWidth = canvas.lineWidth, clicks = mouse.clicks,
            prev = clickCreator.click(0, 0, modes, strokeStyle, lineJoin, lineWidth), other;

        canvas.erase();

        ctxt.strokeStyle = strokeStyle;
        ctxt.lineJoin = lineJoin;
        ctxt.lineWidth = lineWidth;

        clicks.forEach(function(cur) {
            mode = cur.getMode();
            other = canvas.areNext(cur, prev) && prev.modes[mode] ? prev : cur;
            prev = canvas.drawFigure(mode, cur, other);
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
        canvas.drawPath(ctxt, function() {
            ctxt.lineTo(current.x, current.y);
        });
    },
    line: function(current, prev) {
        logger.draw(current, prev);
        var ctxt = canvas.ctxt, mode = click.getMode();
        canvas.drawPath(ctxt, prev, function() {
            ctxt.lineTo(current.x, click.y);
        });
    },
    square: function(current, prev) {
        logger.draw(current, prev);
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
/**
 * Controlador del lienzo (canvas)
 * Created by mor on 8/06/16.
 */

var canvas = {

    ctxt: '2d',
    container: {},
    element: {},

    attributes: {height: 500, width: 500},

    strokeStyle: '#000000',
    lineJoin: 'round',
    lineWidth: 5,

    init: function() {
        var element = elements.getCanvas(),
            ctxt = element.getContext(canvas.ctxt);
        canvas.setAttributes(element);
        canvas.ctxt = ctxt;
        canvas.element = element;
        return canvas;
    },
    redraw: function() {
        var i, ctxt = canvas.ctxt, strokeStyle = canvas.strokeStyle, lineJoin = canvas.lineJoin,
            lineWidth = canvas.lineWidth, clicks = mouse.clicks;
        canvas.erase();

        ctxt.strokeStyle = strokeStyle;
        ctxt.lineJoin = lineJoin;
        ctxt.lineWidth = lineWidth;

        clicks.forEach(function(c) {
            canvas[c.mode]();
        });
        return canvas;
    },
    pencil: function() {
        // TODO
    },
    line: function() {
        // TODO
    },
    square: function() {
        // TODO
    },
    circle: function() {
        // TODO
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
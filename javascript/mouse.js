/**
 * Controlador de acciones del ratón.
 * Created by mor on 8/06/16.
 */

var mouse = {

    paint: false,

    modes: {pencil: true, line: true,  square: true, circle: true},

    mouseX: 0,
    mouseY: 0,

    clicks: [],

    init: function() {
        var needle = 'setO', element = elements.getCanvas().css('float', 'right'),
            condition = function(p) {return p.indexOf(needle) >= 0},
            keys = Object.keys(mouse), funcList = [];
        keys.forEach(function(k) {
            if(condition(k)) funcList.push(k);
        });
        funcList.forEach(function(s) {
            mouse[s](element);
        });
        return mouse;
    },
    setOnMouseMove: function(element) {
        element.mousemove(function(e) {
            var mouseX = mouse.getMouseX(e, this),
                mouseY = mouse.getMouseY(e, this);
            if (mouse.paint) {
                if(mouse.modes.pencil) mouse.addClick(mouseX, mouseY);
                else mouse.changeClick(mouseX, mouseY);
                canvas.redraw();
            }
        });
        return mouse;
    },
    setOnMouseDown: function(element) {
        element.mousedown(function(e) {
            var mouseX = mouse.getMouseX(e, this),
                mouseY = mouse.getMouseY(e, this);
            mouse.painting();
            mouse.addClick(mouseX, mouseY);
            canvas.redraw();
        });
        return mouse;
    },
    setOnMouseLeave: function(element) {
        element.mouseleave(function(e) {
            mouse.notPainting();
        });
        return mouse;
    },
    setOnMouseUp: function(element) {
        element.mouseup(function(e) {
            mouse.notPainting();
        });
        return mouse;
    },
    setMode: function(m) {
        var mode, modes = mouse.modes;
        for(mode in modes) modes[mode] = false;
        modes[m] = true;
        return mouse;
    },
    getMode: function() {
        util.getMode(mouse);
    },
    getMouseX: function(e, self) {
        return mouse.mouseX = e.pageX - self.offsetLeft;
    },
    getMouseY: function(e, self) {
        return mouse.mouseY = e.pageY - self.offsetTop;
    },
    addClick: function(mouseX, mouseY) {
        var modes = mouse.modes,
            c = clickCreator.click(mouseX, mouseY, modes,
            canvas.strokeStyle, canvas.lineJoin, canvas.lineWidth);
        mouse.clicks.push(c);
        return mouse;
    },
    changeClick: function(mouseX, mouseY, prev) {
        return mouse.removeClick(prev).addClick(mouseX, mouseY);
    },
    removeClick: function(c) {
        var clicks = mouse.clicks;
        if(typeof clickCreator != 'undefined') {
            clicks.pop();
        } else {
            var index = clicks.indexOf(c);
            clicks.splice(index, 1);
        }
        mouse.clicks = clicks;
        return mouse;
    },
    painting: function() {
        mouse.paint = true;
        return mouse;
    },
    notPainting: function() {
        mouse.paint = false;
        return mouse;
    }
};
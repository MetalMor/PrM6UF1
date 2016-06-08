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



    init: function(element) {
        var needle = 'setO',
            condition = function(p) {return p.indexOf(needle) > 0};

        Object.keys(mouse).map(condition).forEach(function(s) {
            mouse[s](element);
        });

        return mouse;
    },

    setOnMouseMove: function(element) {
        element.mousemove(function(e) {
            var mouseX = mouse.getMouseX(e, this),
                mouseY = mouse.getMouseY(e, this);
            if (mouse.paint) {
                mouse.addClick(mouseX, mouseY);
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
        var modes = mouse.modes, mode;
        for (mode in modes) {
            if(modes[mode]) return mode;
        }
        return false;
    },
    getMouseX: function(e, self) {
        return mouse.mouseX = e.pageX - self.offsetLeft;
    },
    getMouseY: function(e, self) {
        return mouse.mouseY = e.pageY - self.offsetTop;
    },
    addClick: function(mouseX, mouseY) {
        var mode = mouse.getMode(),
            c = clickCreator.click(mouseX, mouseY, mode,
            canvas.strokeStyle, canvas.lineJoin, canvas.lineWidth);
        mouse.clicks.push(c);
        return mouse;
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
    paintToCanvas: function(mouseX, mouseY) {
        mouse.addClick(mouseX, mouseY);
        canvas.redraw();
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
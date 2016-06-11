/**
 * Controlador de acciones del ratón.
 * Created by mor on 8/06/16.
 */

var mouse = {

    paint: false,

    modes: {pencil: true, line: false,  square: false, circle: false},

    id: 0,

    mouseX: 0,
    mouseY: 0,

    clicks: [],

    init: function() {
        var needle = 'setOn', element = elements.getCanvas().css('float', 'right'),
            condition = function(p) {return p.indexOf(needle) >= 0},
            keys = Object.keys(mouse), funcList = [];
        keys.forEach(function(k) {
            if(condition(k)) funcList.push(k);
        });
        funcList.forEach(function(f) {
            mouse[f](element);
            logger.event(f);
        });
        return mouse;
    },
    removeBetween: function(id) {
        var clicks = mouse.clicks, len = clicks.length, cnt,
            foundFirst = false, firstIndex = 0, qtyToRemove, cur, next;
        for(cnt = 0; cnt < len; cnt++) {
            cur = clicks[cnt];
            next = clicks[cnt+1];
            if(!foundFirst && cur.id === id) {
                foundFirst = true;
                firstIndex = cnt+1;
            } else if(foundFirst && next.id != id) {
                qtyToRemove = cnt - firstIndex;
                return clicks.splice(firstIndex, qtyToRemove);
            }
        }
    },
    getFirstClick: function(id) {
        var clicks = mouse.clicks, ret;
        clicks.forEach(function(c) {
            if(!ret && c.id === id) ret = c;
        });
        return ret;
    },
    getLastClick: function(id) {
        var clicks = mouse.clicks, cnt, cur;
        for (cnt = clicks.length-1; cnt >= 0; cnt--) {
            cur = clicks[cnt];
            if(cur.id === id) return cur;
        }
    },
    newId: function() {
        mouse.id++/* = (new Date()).getTime()*/;
        return mouse;
    },
    setOnMouseMove: function(element) {
        var cv, mouseX, mouseY, prev, cur, modes,
            clicks = mouse.clicks;
        elements.setEvent('mousemove', element, function(e) {
            if (mouse.paint) {
                modes = util.clone(mouse.modes);
                cv = e.toElement;
                mouseX = mouse.getMouseX(e, cv);
                mouseY = mouse.getMouseY(e, cv);
                prev = clicks.last();
                cur = mouse.newClick(mouseX, mouseY, modes);
                cur.fill = options.solid();
                mouse.addClick(cur);
                canvas.redraw();
            }
        });
        return mouse;
    },
    setOnMouseDown: function(element) {
        var cur, cv, mouseX, mouseY, modes;
        elements.setEvent('mousedown', element, function(e) {
            cv = e.toElement;
            modes = util.clone(mouse.modes);
            mouseX = mouse.getMouseX(e, cv);
            mouseY = mouse.getMouseY(e, cv);
            cur = mouse.newClick(mouseX, mouseY, modes);
            cur.fill = options.solid();
            mouse.painting();//.addClick(cur);
            canvas.redraw();
        });
        return mouse;
    },
    setOnMouseLeave: function(element) {
        elements.setEvent('mouseleave', element, mouse.notPainting);
        canvas.redraw();
        return mouse;
    },
    setOnMouseUp: function(element) {
        elements.setEvent('mouseup', element, mouse.notPainting);
        canvas.redraw();
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
    newClick: function(mouseX, mouseY, modes) {
        var editable = util.clone(canvas.editable);
        return clickCreator.click(mouse.id, mouseX, mouseY, modes, editable);
    },
    addClick: function(cur) {
        mouse.clicks.push(cur);
        return cur;
    },
    changeClick: function(cur, prev) {
        return mouse.removeClick(prev).addClick(cur);
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
        return mouse.newId();
    },
    notPainting: function() {
        mouse.paint = false;
        return mouse;
    }
};
/**
 * Controlador de acciones del ratón.
 * Created by mor on 8/06/16.
 */

var mouse = {

    /**
     * Flag que indica si el ratón está pintando sobre el lienzo.
     */
    paint: false,
    /**
     * Objeto contenedor de flags de modo del ratón.
     */
    modes: {pencil: true, line: false,  square: false, circle: false},
    /**
     * Identificador actual del ratón.
     */
    id: 0,
    /**
     * Posición X del ratón.
     */
    mouseX: 0,
    /**
     * Posición Y del ratón.
     */
    mouseY: 0,
    /**
     * Lista de objetos click generados por el ratón.
     */
    clicks: [],
    /**
     * Inicializa las funcionalidades del ratón.
     * @returns {object}
     */
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
    /**
     * Elimina los elementos del array de clicks que se encuentren comprendidos entre el primer y el último click con
     * la ID especificada.
     * @param id String identificador de un objeto click.
     * @returns {array}
     */
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
    /**
     * Retorna el primer objeto click con una ID especificada.
     * @param id String identificador de un objeto click.
     * @returns {object}
     */
    getFirstClick: function(id) {
        var clicks = mouse.clicks, ret;
        clicks.forEach(function(c) {
            if(!ret && c.id === id) ret = c;
        });
        return ret;
    },
    /**
     * Retorna el último objeto click con una ID especificada.
     * @param id String identificador de un objeto click.
     * @returns {object}
     */
    getLastClick: function(id) {
        var clicks = mouse.clicks, cnt, cur;
        for (cnt = clicks.length-1; cnt >= 0; cnt--) {
            cur = clicks[cnt];
            if(cur.id === id) return cur;
        }
    },
    /**
     * Define una nueva ID para el ratón y los objetos click que genere.
     * @returns {object}
     */
    newId: function() {
        mouse.id++;
        return mouse;
    },
    /**
     * Define la función que se disparará al mover el ratón sobre el lienzo. Si el ratón está pintando, añadirá un
     * nuevo objeto click a la lista y llamará a la función redraw del objeto canvas para volver a dibujar el plano
     * incluyendo el nuevo objeto click.
     * @param element Elemento al que añadir el evento.
     * @returns {{paint: boolean, modes: {pencil: boolean, line: boolean, square: boolean, circle: boolean}, id: number, mouseX: number, mouseY: number, clicks: Array, init: mouse.init, removeBetween: mouse.removeBetween, getFirstClick: mouse.getFirstClick, getLastClick: mouse.getLastClick, newId: mouse.newId, setOnMouseMove: mouse.setOnMouseMove, setOnMouseDown: mouse.setOnMouseDown, setOnMouseLeave: mouse.setOnMouseLeave, setOnMouseUp: mouse.setOnMouseUp, setMode: mouse.setMode, getMode: mouse.getMode, getMouseX: mouse.getMouseX, getMouseY: mouse.getMouseY, newClick: mouse.newClick, addClick: mouse.addClick, changeClick: mouse.changeClick, removeClick: mouse.removeClick, painting: mouse.painting, notPainting: mouse.notPainting}}
     */
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
    /**
     * Define la función que se disparará al clicar. Activa el flag que indica que el ratón está pintando y define
     * un click inicial para el trazo.
     * @param element Elemento al que añadir el evento.
     * @returns {object}
     */
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
    /**
     * Define la función que se disparará al sacar el ratón del elemento especificado. Llama a la función que vuelve
     * a dibujar el plano y desactiva el flag que indica que el ratón está pintando.
     * @param element Elemento al que añadir el evento.
     * @returns {object}
     */
    setOnMouseLeave: function(element) {
        elements.setEvent('mouseleave', element, mouse.notPainting);
        canvas.redraw();
        return mouse;
    },
    /**
     * Define la función que se disparará al "desclicar" el ratón. Llama a la función que vuelve
     * a dibujar el plano y desactiva el flag que indica que el ratón está pintando.
     * @param element Elemento al que añadir el evento.
     * @returns {object}
     */
    setOnMouseUp: function(element) {
        elements.setEvent('mouseup', element, mouse.notPainting);
        canvas.redraw();
        return mouse;
    },
    /**
     * Define el modo en el que dibujará el ratón.
     * @param m String identificador del modo.
     * @returns {object}
     */
    setMode: function(m) {
        var mode, modes = mouse.modes;
        for(mode in modes) modes[mode] = false;
        modes[m] = true;
        return mouse;
    },
    /**
     * Retorna el modo en el que está dibujando el ratón.
     */
    getMode: function() {
        util.getMode(mouse);
    },
    /**
     * Retorna la posición actual del ratón sobre el eje horizontal del lienzo.
     * @param e Objeto que representa el evento de una acción del ratón sobre un elemento.
     * @param self Elemento que recibe la acción.
     * @returns {number}
     */
    getMouseX: function(e, self) {
        return mouse.mouseX = e.pageX - self.offsetLeft;
    },
    /**
     * Retorna la posición actual del ratón sobre el eje vertical del lienzo.
     * @param e Objeto que representa el evento de una acción del ratón sobre un elemento.
     * @param self Elemento que recibe la acción.
     * @returns {number}
     */
    getMouseY: function(e, self) {
        return mouse.mouseY = e.pageY - self.offsetTop;
    },
    /**
     * Retorna un nuevo objeto click.
     * @param mouseX Posición del ratón sobre el eje horizontal del lienzo.
     * @param mouseY Posición del ratón sobre el eje vertical del lienzo.
     * @param modes Objeto contenedor de modos de dibujo del ratón.
     * @returns {*|click}
     */
    newClick: function(mouseX, mouseY, modes) {
        var editable = util.clone(canvas.editable);
        return clickCreator.click(mouse.id, mouseX, mouseY, modes, editable);
    },
    /**
     * Añade un objeto click a la lista de clicks.
     * @param cur
     * @returns {*}
     */
    addClick: function(cur) {
        mouse.clicks.push(cur);
        return cur;
    },
    /**
     * Cambia un elemento click por otro.
     * @param cur Objeto click a añadir.
     * @param prev Objeto click a eliminar.
     * @returns {object}
     */
    changeClick: function(cur, prev) {
        return mouse.removeClick(prev).addClick(cur);
    },
    /**
     * Elimina un objeto click de la lista de clicks.
     * @param c Objeto click a eliminar.
     * @returns {object}
     */
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
    /**
     * Activa el flag que indica que el ratón está dibujando y genera un nuevo identificador para los próximos objetos
     * click que el ratón genere.
     * @returns {object}
     */
    painting: function() {
        mouse.paint = true;
        return mouse.newId();
    },
    /**
     * Desactiva el flag que indica que el ratón está dibujando.
     * @returns {object}
     */
    notPainting: function() {
        mouse.paint = false;
        return mouse;
    }
};
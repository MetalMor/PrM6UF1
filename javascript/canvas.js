/**
 * Controlador del lienzo (canvas)
 * Created by mor on 8/06/16.
 */

var canvas = {

    /**
     * Valor del contexto, y una vez inicializado el objeto, referencia al contexto del elemento canvas.
     */
    ctxt: '2d',
    /**
     * Objeto contenedor de los atributos de proporciones del lienzo
     */
    attributes: {height: 500, width: 1000},
    /**
     * Valor hexadecimal del color de fondo del lienzo
     */
    bgColor: '#FFFFFF',
    /**
     * Modo de unión de las líneas.
     */
    lineJoin: 'round',
    /**
     * Objeto contenedor de las propiedades editables del dibujo en canvas.
     */
    editable: {
        strokeStyle: '#000000',
        fillStyle: '#000000',
        lineWidth: 5
    },
    /**
     * Función inicializadora del controlador del lienzo.
     * @returns {object}
     */
    init: function() {
        var element = elements.getCanvas(true),
            ctxt = element.getContext(canvas.ctxt);
        canvas.setAttributes(element);
        canvas.ctxt = ctxt;
        canvas.element = element;
        if(canvas.ctxt) logger.message(logger.sources.canvas, 'canvas init');
        return canvas;
    },
    /**
     * Comprueba si dos posiciones de un objeto click son contiguas.
     * @param one Objeto click.
     * @param other Otro objeto click.
     * @returns {boolean}
     */
    areNext: function(one, other) {
        var x = one.x - other.x, y = one.y - other.y;
        return util.nearZero(x) && util.nearZero(y);
    },
    /**
     * Borra el contenido del lienzo y vuelve a dibujarlo siguiendo el búffer de objetos click.
     * @returns {object}
     */
    redraw: function() {

        var editable = canvas.editable, modes = mouse.modes, mode,
            clicks = mouse.clicks, prev = clickCreator.click(-1, 0, 0, modes, editable);

        canvas.erase();
        var debugCounter = 0, debugLim = clicks.length-1;
        clicks.forEach(function(cur) {
            modes = cur.modes;
            if(debugCounter === debugLim) {
                console.log('HARD DEBUGGING ' + clicks.indexOf(mouse.getFirstClick(cur.id)));
            }
            debugCounter++;
            if(!modes.pencil) {
                var firstIndex = clicks.indexOf(mouse.getFirstClick(cur.id)),
                    lastIndex = clicks.indexOf(mouse.getLastClick(cur.id));
                clicks.splice(firstIndex, lastIndex-firstIndex-2);
            } else
                console.log('pencil approaching!');
            var other;
            mode = cur.getMode();
            other = cur.id === prev.id ? prev : cur;
            prev = canvas.drawFigure(mode, cur, other);
        });
        return canvas;
    },
    /**
     * Dibuja un camino a partir de una función pasada por parámetro. Tiene en cuenta las propiedades (color,
     * grosor de la linea y contenido) del objeto click especificado por parámetro.
     * @param ctxt Objeto contexto del lienzo.
     * @param pos Objeto click que representa la posición inicial del trazo.
     * @param func Función que dibuja el trazo.
     */
    drawPath: function(ctxt, pos, func) {
        var propName, prop, editable = canvas.editable;
        for (propName in editable) {
            prop = pos[propName];
            if(prop)
                ctxt[propName] = prop;
        }
        ctxt.beginPath();
        ctxt.moveTo(pos.x, pos.y);
        if(func) func();
        ctxt.closePath();
        ctxt.stroke();
    },
    /**
     * Llama a la función de dibujo de figuras especificada por parámetro.
     * @param mode Función que será llamada.
     * @param current Objeto click que representa la posición actual.
     * @param other Objeto click que representa la posición anterior.
     * @returns {object}
     */
    drawFigure: function(mode, current, other) {
        canvas[mode](current, other);
        return current;
    },
    /**
     * Función que dibuja el trazo de un lápiz.
     * @param current Objeto click que representa la posición actual del ratón.
     * @param prev Objeto click que representa la posición anterior del ratón.
     */
    pencil: function(current, prev) {
        logger.draw(current, prev);
        var ctxt = canvas.ctxt, mode = current.getMode();
        canvas.drawPath(ctxt, prev, function() {
            ctxt.lineTo(current.x, current.y);
        });
    },
    /**
     * Función que dibuja el trazo de una línea recta.
     * @param current Objeto click que representa la posición actual del ratón.
     * @param prev Objeto click que representa la posición anterior del ratón.
     */
    line: function(current, prev) {
        logger.draw(current, prev);
        var ctxt = canvas.ctxt, mode = current.getMode();
        canvas.drawPath(ctxt, prev, function() {
            if(current.id === prev.id) ctxt.lineTo(current.x, current.y);
        });
    },
    /**
     * Función que dibuja un cuadrado.
     * @param current Objeto click que representa la posición actual del ratón.
     * @param prev Objeto click que representa la posición anterior del ratón.
     */
    square: function(current, prev) {
        logger.draw(current, prev);
        var prev = mouse.getFirstClick(current.id);
        var ctxt = canvas.ctxt, mode = current.getMode();
        canvas.drawPath(ctxt, prev, function() {
            if(current.fill) {
                ctxt.fillRect(prev.x, prev.y, current.x, current.y);
            }
            ctxt.rect(prev.x, prev.y, current.x, current.y);
        });
    },
    /**
     * Función que dibuja un círculo.
     * @param current Objeto click que representa la posición actual del ratón.
     * @param prev Objeto click que representa la posición anterior del ratón.
     */
    circle: function(current, prev) {
        logger.draw(current, prev);
        var ctxt = canvas.ctxt, mode = current.getMode(), radius = util.getDistance(current, prev),
            perimeter = 2*Math.PI;
        canvas.drawPath(ctxt, prev, function() {
            ctxt.arc(prev.x, prev.y, radius, 0, perimeter, false);
        });
    },
    /**
     * Función que elimina el contenido del lienzo.
     * @param forced Si es true, restaura el búffer de clicks al valor inicial.
     */
    erase: function(forced) {
        canvas.ctxt.clearRect(0, 0, canvas.attributes.width, canvas.attributes.height);
        if (forced === true) mouse.clicks = [];
    },
    /**
     * Define los atributos del lienzo.
     * @param element
     */
    setAttributes: function(element) {
        var attributes = canvas.attributes, attr;
        for(attr in attributes)
            element.setAttribute(attr, attributes[attr]);
    }
};
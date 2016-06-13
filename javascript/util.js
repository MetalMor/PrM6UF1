/**
 * Objeto de utilidad
 * Created by mor on 9/06/16.
 */

var util = {
    obj: 'Object',
    arr: 'Array',
    func: 'Function',
    /**
     * Retorna el modo en el que está pintando.
     * @param obj Objeto click/ratón.
     * @returns {string|boolean}
     */
    getMode: function (obj) {
        var modes = obj.modes, mode;
        for (mode in modes) {
            if (modes[mode]) return mode;
        }
        return false;
    },
    /**
     * Define todas las propiedades de un objeto con un valor.
     * @param obj Objeto a manipular.
     * @param val Nuevo valor.
     */
    setAllObjProps: function (obj, val) {
        var prop;
        for (prop in obj) obj[prop] = val;
    },
    /**
     * Valida si un número está por debajo de las 5 unidades alejado del 0.
     * @param n Número a validar.
     * @returns {boolean}
     */
    nearZero: function (n) {
        return Math.abs(n) <= 5;
    },
    /**
     * Retorna el módulo del vector comprendido entre 2 puntos x,y.
     * @param one
     * @param other
     * @returns {number}
     */
    getDistance: function (one, other) {
        var x1 = one.x, x2 = other.x,
            y1 = one.y, y2 = other.y;
        return Math.sqrt((x2 -= x1) * x2 + (y2 -= y1) * y2);
    },
    /**
     * Retorna si el objeto es del tipo especificado en base a su prototipo.
     * @param crit Tipo requerido
     * @param obj Objeto a comprobar
     * @returns {boolean}
     */
    type: function (crit, obj) {
        return Object.prototype.toString.call(obj) === '[object ' + crit + ']'
    },
    /**
     * Retorna el clon de un objeto.
     * @param obj Objeto a clonar.
     * @returns {object}
     */
    clone: function (obj) {
        var copy;
        // Handle the 3 simple types, and null or undefined
        if (null == obj || "object" != typeof obj) return obj;
        // Handle Date
        if (obj instanceof Date) {
            copy = new Date();
            copy.setTime(obj.getTime());
            return copy;
        }
        // Handle Array
        if (obj instanceof Array) {
            copy = [];
            for (var i = 0, len = obj.length; i < len; i++)
                copy[i] = util.clone(obj[i]);
            return copy;
        }
        // Handle Object
        if (obj instanceof Object) {
            copy = {};
            for (var attr in obj)
                if (obj.hasOwnProperty(attr)) copy[attr] = util.clone(obj[attr]);
            return copy;
        }
        throw new Error("Unable to copy obj! Its type isn't supported.");
    }
};
/**
 * Objeto de utilidad
 * Created by mor on 9/06/16.
 */

var util = {
    obj: 'Object',
    arr: 'Array',
    func: 'Function',
    getMode: function (obj) {
        var modes = obj.modes, mode;
        for (mode in modes) {
            if (modes[mode]) return mode;
        }
        return false;
    },
    setAllObjProps: function (obj, val) {
        var prop;
        for (prop in obj) obj[prop] = val;
    },
    nearZero: function (n) {
        return Math.abs(n) <= 5;
    },
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
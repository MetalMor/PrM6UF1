/**
 * Objeto de utilidad
 * Created by mor on 9/06/16.
 */

var util = {
    getMode: function(obj) {
        var modes = obj.modes, mode;
        for (mode in modes) {
            if(modes[mode]) return mode;
        }
        return false;
    },
    setAllObjProps: function(obj, val) {
        var prop;
        for(prop in obj) obj[prop] = val;
    },
    isOneOrZero: function(n) {
        return Math.abs(n) <= 1;
    },
    getDistance: function(one, other) {
        var x1 = one.x, x2 = other.x,
            y1 = one.y, y2 = other.y;
        return Math.sqrt((x2-=x1)*x2 + (y2-=y1)*y2);
    }
};
/**************************************************
 ** GAME MOUSE CLASS
 **************************************************/
var Mouse = function(x, y) {
    var x = x || 0,
        y = y || 0;

    var onMouseUpdate = function(e) {
        var that = this;

        //that.x = e.clientX;
        //that.y = e.clientY;
        that.x = e.pageX - offsetX;
        that.y = e.pageY - offsetY;
    };

    return {
        x: x,
        y: y,
        onMouseUpdate: onMouseUpdate
    };
};
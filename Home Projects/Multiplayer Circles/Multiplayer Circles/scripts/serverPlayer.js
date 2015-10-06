var serverPlayer = function(xpos, ypos, rotation)
{
    var x = xpos,
        y = ypos,
        rot = rotation;

    var update = function (newx, newy, newrot)
    {
        x = newx;
        y = newy;
        rot = newrot;
    }

    var getX = function () { return x; };
    var getY = function () { return y; };
    var getRot = function () { return rot; };

    return {
        update: update,
        getX: getX,
        getY: getY,
        getRot: getRot
    }
}

module.exports = serverPlayer;
var Player = function (startX, startY) {
    var x = startX,
        y = startY,
        rotation = 0,
        sprite,
        speed = 0.25,
        width = 20,
        height = 20,
        now,            //now, delta, then -> timebased animation
        delta,
        then = new Date().getTime();
    
    sprite = new Image();
    sprite.src = "./images/player.png";
    
    var update = function (keys, mouseX, mouseY) {
        
        now = new Date().getTime();
        delta = now - then;
        
        //if(hp >= 0) {
        
        if (keys.up) {
            y -= speed * delta;
        } else if (keys.down) {
            y += speed * delta;
        }
        
        if (keys.left) {
            x -= speed * delta;
        } else if (keys.right) {
            x += speed * delta;
        }
        
        if (x < 15)
            x = 15;
        else if (x > 1265)
            x = 1265;
        
        if (y < 15)
            y = 15;
        else if (y > 705)
            y = 705;
        
        
        rotation = Math.atan((x - mouseX) / (y - mouseY));
        
        then = now;
        //}
    };
    
    var draw = function (ctx) {
        ctx.save();
        ctx.translate(x, y);
                
        
        ctx.translate(-x, -y);
        ctx.drawImage(sprite, x - 10, y - 10);
        //ctx.fillRect(x-10, y-10, 20, 20);
        
        
        ctx.restore();
    };
    
    var getX = function () { return x; };
    var getY = function () { return y; };
    var getRot = function () { return rotation; };
    
    return {
        update: update,
        draw: draw,
        getX: getX,
        getY: getY,
        getRot: getRot
    }
};
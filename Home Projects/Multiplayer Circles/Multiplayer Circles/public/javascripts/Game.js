var gamestart,
    canvas,			// Canvas DOM element
    ctx,			// Canvas rendering context
    keys,			// Keyboard input
    localPlayer,	// Local player
    mouse,          // Mouse capture
    offsetX,        // Centreren van het gameveld
    offsetY,       // Centreren van het gameveld
    socket = io.connect('localhost:1337');

function init() {
    // Declare the canvas and rendering context
    canvas = document.getElementById("gameCanvas");
    ctx = canvas.getContext("2d");
    
    // Maximise the canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    offsetX = (window.innerWidth - 1280) / 2;
    if (offsetX < 0)
        offsetX = 0;
    
    offsetY = (window.innerHeight - 720) / 2;
    if (offsetY < 0)
        offsetY = 0;
    
    ctx.save();
    ctx.translate(offsetX, offsetY);
    
    // Mouse capture
    mouse = new Mouse();
    
    // Initialise keyboard controls
    keys = new Keys();
    
    // Start position player
    var startX = 640,
        startY = 360;
    
    // Initialise the local player
    localPlayer = new Player(startX, startY, 0);
    
    //Initialize Ally list
    allies = {};

    // Start listening for events
    setEventHandlers();
    
    // Gamestart
    gamestart = true;
};

var setEventHandlers = function () {
    // Keyboard
    window.addEventListener("keydown", onKeydown, false);
    window.addEventListener("keyup", onKeyup, false);
    
    // Mouse
    window.addEventListener("mousemove", onMouseUpdate, false);
    
    // Window resize
    window.addEventListener("resize", onResize, false);
};

// Keyboard key down
function onKeydown(e) {
    if (localPlayer && gamestart) {
        keys.onKeyDown(e);
    }
}

// Keyboard key up
function onKeyup(e) {
    if (localPlayer && gamestart) {
        keys.onKeyUp(e);
    }
}

// Mouse Position
function onMouseUpdate(e) {
    if (localPlayer && gamestart) {
        mouse.onMouseUpdate(e);
    }
}

// Browser window resize
function onResize(e) {
    // Maximise the canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    offsetX = (window.innerWidth - 1280) / 2;
    if (offsetX < 0)
        offsetX = 0;
    
    offsetY = (window.innerHeight - 720) / 2;
    if (offsetY < 0)
        offsetY = 0;
    
    ctx.restore();
    ctx.save();
    ctx.translate(offsetX, offsetY);
}

function animate() {
    if (gamestart) {
        update();
        draw();
        // Request a new animation frame using Paul Irish's shim
        window.requestAnimFrame(animate);
    }
}

socket.on('newplayer', function (x, y, rot, id) {
        var ally = new Player(x, y, rot);
        allies[id] = ally;
});

socket.on('allyUpdate', function (x, y, rot, id) {
    if (id != localPlayer.getID() && allies[id]) {
        allies[id].update(x, y, rot);
    }

});

function update() {
    localPlayer.update(keys, mouse.x, mouse.y);
    socket.emit('allyUpdateServer', localPlayer.getX(), localPlayer.getY(), localPlayer.getRot());
}

function draw() {
    // Wipe the canvas clean
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    // Draw the local player
    localPlayer.draw(ctx);

    ctx.fillStyle = 'black';
}
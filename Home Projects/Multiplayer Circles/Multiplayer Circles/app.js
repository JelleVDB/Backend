
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var io;
var playerList = {};


var serverPlayer = require('./scripts/serverPlayer.js');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

var server = http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
    io = require('socket.io')(server);

    io.sockets.on('connection', function (socket) {
        var player = new serverPlayer(640, 360, 0);
        playerList[socket.id] = player;
        //dit is voor localPlayer ID
        socket.emit('newplayer', player.getX(), player.getY(), player.getRot());
        console.log("new player: " + socket.id);
        
        //dit is voor de ally list op te vullen
        socket.broadcast.emit('newplayer', player.getX(), player.getY(), player.getRot(), socket.id);


        socket.on('allyUpdateServer', function (x, y, rot) {
            var id = socket.id
            //console.log("id: " + id +" x: " + x + " y: " + y + " rot: " + rot)
            if (playerList[id]) {
                
                
                playerList[socket.id].update(x, y, rot);
                socket.broadcast.emit('allyUpdate', playerList[id].getX(), playerList[id].getY(), playerList[id].getRot(), id);
            }
        });
    });

    
});



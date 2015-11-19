/*
 * Oefenng 12B: TCP server
 * TCP server sluit connectie enkel af op vraag van cliënt "quit"
 * 
 * Noot: start de server zonder onmiddellijk een browser te openen
 */

var net = require('net');

var sockets = [];

//1. aanmaken van de TCP server
var server = net.createServer({
    allowHalfOpen: false
},
    function (socket) {
    //3. connecties verwerken
    console.log("server heeft nieuwe connectie met " , socket.remotePort.toString());
    sockets.push(socket);
    
    socket.setEncoding('utf8');
    socket.write("Dit is een  WELKOM boodschap voor de client " + socket.remotePort.toString() + ".");
    socket.on("data", function (data) {
        //ontvangen browser data (headers) naar console
        if (data) {
            console.log("ontvangen data: " + data);
        }
        //broadcasting
        sockets.forEach(function (currentSocket) {
            if (socket !== currentSocket) {
                currentSocket.write(data);
            }
        });

            // SOCKET NIET AFSLUITEN OP SERVER, GEBEURT OP CLIENT met QUIT
           // return socket.end();  
    });
    socket.on("end", function (data) {
        var index = sockets.indexOf(socket);
        console.log("Goodbye. Client connectie " + index + " is beëindigd.");
        sockets.splice(index, 1);
    });
});

//2. TCP server luistert naar random poort 
server.listen(1337, function () {
    console.log("luisteren naar poort " + server.address().port);
    // server.close();
});

//3. error handling
server.on("error", function (error) {
    if (error.code === "EADDRINUSE") {
        console.log("Deze poort is reeds in gebruik");
    } else {
        console.log("Fout" + error.message);
    }
});

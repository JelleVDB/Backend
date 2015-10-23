var net = require('net');

var sockets = [];

//1. aanmaken van de TCP server
var server = net.createServer(
//3. Connection listener
    function (socket) {
        
        sockets.push(socket);
        
        socket.setEncoding('utf8');
        
        socket.on("data", function (data) {
            //ontvangst van browser headers of van cliënt data.
            if (data) {
                sockets.forEach(function (currentSocket) {
                    if (socket !== currentSocket) {
                        currentSocket.write(data);
                    }
                });
            }
        });
        
        socket.on("end", function (data){
            var index = sockets.indexOf(socket);
            console.log("Goodbye. Client connectie " + index + " is beëindigd")
            sockets.splice(index, 1);
        });
        
    })
//2. TCP server luistert naar poort 1337 (listening listener)
server.listen(1337, function () {
    console.log("luisteren naar poort" + server.address().port);
});
//4. error handling
server.on("error", function (error) {
    if (error.code === "EADDRINUSE") {
        console.log("Deze poort is reeds in gebruik");
    } else {
        console.log("Fout" + error.message);
// server.close();
    }
});
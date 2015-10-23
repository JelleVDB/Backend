var net = require('net');

var client;
var retryTimeout = 1000;
var nmbrRetries = 0;
var maxNmbrRetries = 3;

(function connect() {
    client = net.connect(1337, "localhost", function () {
        console.log("Client maakt verbinding");
        client.write("hier een boodschap van de TCP client");
    });
})();

process.stdin.on("data", function (data) {
    if (data.toString().toLowerCase().trim() === "quit") {
        client.end(); //client.emit("end");
    } else {
        client.write(data);
    }
});

client.on("close", function () {
    console.log("Client connectie afgesloten. Er gebeurt een retry");
    reconnect();
});

client.on("data", function (data) {
    console.log(data.toString());
});

function reconnect(){
    if (nmbrRetries === maxNmbrRetries) {
        console.log("Maximum aantal retries is bereikt.")
    } else {
        nmbrRetries += 1;
        setTimeout(connect, retryTimeout);
    }
};
var http = require("http"),
    fs = require("fs");

http.createServer(function (request, response) {
    //1
    fs.readFile("./Resources/TextFile1.csv", "utf-8", function (error, data) {
        
        //2
        var obj = {};

        var lines = data.split("\n");
        lines.forEach(function (line) {
            var parts = line.split(";");

            obj["Hoofdstuk" + parts[0]] = parts[1];
        });

        //3
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(obj));
    });
}).listen(3000);
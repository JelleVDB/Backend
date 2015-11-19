////MP4 Reader -> streaming

//var http = require("http");
//var path = require("path");
//var fs = require("fs");

//var server = http.createServer();

//server.on("request", function (req, res) {
//    var file = path.normalize('./Resources/20150311_210130.mp4');

//    res.writeHead(200, { 'Content-Type': 'text/html, video/mp4' });

//    var readStream = fs.createReadStream(file, {
//        flags: 'r',
//        encoding: null,
//        fd: null,
//        mode: 0666,
//        bufferSize: 256 * 1024
//    })

//    readStream.on("data", function (chunck) {
//        if (!res.write) {
//            console.log("WAITING");
//            readStream.pause();
//        }
//        else {
//            console.log("WORKING");
//            //res.resume();
//            res.write(chunck);
//        }   
//    });

//    readStream.constructor("drain", function () {
        
//        return function () {
//            readStream.resume();
//        }
            
//    });
//});

//server.listen(4000);

//console.log("server listening to port 4000


/*
 * mp4Reader -> streaming
 */

var http = require("http"),
    path = require("path"),
    fs = require("fs");

var server = http.createServer();

server.on("request", function (req, res) {
    
    var file = path.normalize('./Resources/20150311_210130.mp4');
    
    res.writeHead(200,
        { 'Content-Type': 'text/html, video/mp4' }
    );
    
    var readStream = fs.createReadStream(file, {
        flags: 'r',
        encoding: null,
        fd: null,
        mode: 0666,
        bufferSize: 256 * 1024
    });
    
    //TO DO: header Chrome nazien
    readStream.on("data", function (chunck) {
        //zie cursus
        if (!res.write) {
            console.log("ik wacht");
            readStream.pause();
        }

        else {
            console.log("ik doe voort");
            //res.resume();
            res.write(chunck);
        }

    });
    
    res.on("drain", function () {
        return function () {
            readStream.resume();
        };
    });
});

server.listen(4000);
console.log("server listens to port 4000");

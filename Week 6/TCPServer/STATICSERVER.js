////static server

//var http = require("http"),
//    path = require("path"),
//    fs = require("fs"),
//    extentions = {
//        ".html": "text/html",
//        ".css": "text/css",
//        ".js": "application/javascript",
//        ".mp4": "video/mp4",
//        ".png": "image/png",
//    },
//    localMaps = {
//        ".html": "/public/",
//        ".css": "/public/css/",
//        ".js": "/public/js/",
//        ".mp4": "/public/images/",
//        ".png": "/public/images/",
//    };

//var server = http.createServer(function (req, res) {
//    var filename = path.basename(req.url) || path.resolve("./index.html"),
//        ext = path.extname(req.url),
//        localPath = process.cwd() + "/public/" + filename;

//    getFile(localPath, extentions[ext], res);
//});



//server.listen(8000);

//console.log("Listening to port 8000");


//function getFile(localPath, mimeType, res) {

//    fs.readFile(localPath, function (err, contents) {
//        if (!err) {
//            res.writeHead(200, { 'Content-Type': mimeType });
//        }
//        else {
//            res.writeHead(500);
//            res.end;
//        }
//    });
//}

/*
 * 
 * Static server
 * 
 */

var http = require("http"),
    fs = require("fs"),
    path = require("path"),
    extensions = {
        ".html": "text/html",
        ".css": "text/css",
        ".js": "application/javascript",
        ".png": "image/png",
        ".gif": "image/gif",
        ".jpg": "image/jpeg",
        ".mp4": "video/mp4"
    },
    localMaps = {
        ".html": "/Public/",
        ".css": "/Public/css/",
        ".js": "/Public/js/",
        ".png": "/Public/images/",
        ".gif": "/Public/images/",
        ".jpg": "/Public/images/",
        ".mp4": "/Public/videos/"
    };

var server = http.createServer(function (req, res) {
    
    var filename = path.basename(req.url) || "index.html",
        ext = path.extname(filename),
        localPath = process.cwd() + localMaps[ext] + filename;
    
    getFile(localPath, extensions[ext], res);
});

/*helper file*/
function getFile(localPath, mimeType, res) {
    fs.readFile(localPath, function (err, contents) {
        if (!err) {
            res.writeHead(200, {
                'Content-Type': mimeType
            });
            res.end(contents);
            //res.write(contents);
        }
        else {
            res.writeHead(500);
            res.end();
        }
    });
}
server.listen(8000);
console.log("listening to port 8000");

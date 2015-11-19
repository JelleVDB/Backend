//requesthandlers.js

//private
var path = require('path'), path = require("path"),
    url = require("url"),
    getAPIData = require("./getAPIData.js"),
    querystring = require('querystring');


var extensions = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "application/javascript",
    ".mp4": "video/mp4",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".ico": "image/x-icon"
};
    
//public

var apiData = function (req, res) { };

var getFile = function (uri, req, res, callback) { 
    //haal de extentie op
    var filename = path.basename(uri.pathname) || "index.html",
        ext = path.extname(filename),
        //localPath = process.cwd() + localMaps[ext] + filename;
        localPath = path.resolve(process.cwd() + filename);

    //lees file
    getFile(filename, function (err, data) {
        fs.stat(localPath, function (err, stats) {
            if (stats && stats.isFile) {
                fs.readFile(localPath, function (err, contents) {
                    if (err) {
                        callback(err, null)
                    } else {
                        if (callback && typeof (callback) === "function") {
                            callback(null, data , extensions[ext]);
                        }
                    }; 
                });
            }
        });
        

    });
};

var upload = function (req, res) { };

//exports the request handlers
exports.apiData = apiData;
exports.getFile = getFile;
exports.upload = upload;
/*
 * Oef: streams op elkaak afstemmen met pipe()
 * Stream alfabet
 * 
 */

var Readable = require("stream").Readable;
//rs = readStream , ws = writeStream...
var rs = new Readable({ encoding: 'utf8' });
var path = require("path");

//1. Readable stream aanmaken
rs.push("Het alfabet: \n");

for (var i = 97, len = 'z'.charCodeAt(0); i <= len ; i++) {
    rs.push(String.fromCharCode(i));   
}

var i = 0;

rs.on("data", function () {
    //NIET VERGETEN = EINDE AANDUIDEN (async)
    if (i >= 'z'.charCodeAt(0))
        rs.push(null);
});

rs.on("error", function () { 
    //niet geïmplementeerd
});

//2. stream naar console schrijven 
rs.pipe(process.stdout);

//3. stream naar een file schrijven
var fs = require("fs");
var writable = fs.createWriteStream(path.normalize('./data/alfabet.txt'));
// NIET : rs.pipe("iets.txt")
//rs.pipe(writable);

rs.pipe(writable).on('finish', function () {
    console.log("de file alfabet.txt is aangemaakt!");
});

setTimeout(function () { process.exit(); }, 10000);

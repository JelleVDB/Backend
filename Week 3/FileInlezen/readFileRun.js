var fs = require("fs");
var fileRead = require('./readFileModule.js');

var fileName = __dirname + '/data/textfile.txt';

fs.readFile(fileName, 'utf8' ,function (err, data){

    if (err) { throw err; }
    else {
        fileRead.readFileData(data, function (err, element) {
            if (err) { throw err; }
            else {
                console.log(element);
            }
        });
    }
});
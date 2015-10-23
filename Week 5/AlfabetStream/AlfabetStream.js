var Readable = require('stream').Readable,
    path = require('path');

var rs = Readable({ encoding: 'utf8' });

//String.fromCharCode(97) => a

rs.push('Het Alfabet: \n');

for (var i = 97, len = 'z'.charCodeAt(0); i <= len; i++) {
    rs.push(String.fromCharCode(i));
    
    //NIET vergeten = einde aanduiden (async)
    if (i >= 'z'.charCodeAt(0) + '\n') {
        rs.push(null);
    }
}

rs.on("data", function (data) {
    
});

rs.on("error", function (err) { 
    
});

rs.pipe(process.stdout);

var fs = require('fs');

var writeable = fs.createWriteStream(path.normalize('./data/alfabet.txt'));


rs.pipe(writeable).on('finish', function (){
    console.log("\nde file alfabet.txt is aangemaakt");
})
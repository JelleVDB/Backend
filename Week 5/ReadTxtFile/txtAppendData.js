var fs = require('fs');
var myFile = __dirname + "/MyTextFile.txt";

fs.open(myFile, 'a', function opened(err, fd) {
    if (err) throw err;
    
    var writeBuffer = new Buffer('\n <div>Deze string werd geschreven op ' + new Date() + '</div>'),
        bufferposition = 0,
        bufferLength = writeBuffer.length,
        filePosition = null;
    
    fs.write(fd,
            writeBuffer, 
            bufferLength,
            filePosition,
            function wrote(err, written) {
        console.log('wrote ' + written + ' bytes');
    });
    
    fs.close(fd, function closed(err) {
        console.log("File closed");
    });
});
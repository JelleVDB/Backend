var Loader = require('././flowControl.js');


var users = [];
var usersIds = ["P1", "P2", "P3", "P4", "ERROR", "P6", "P7", "P8", "P9"];

var loader = new Loader();

loader.loadArrayAsync(users, usersIds, function (err, arr, duration) {
    if (err) {
        console.log(err);
    } else {
        console.log("ctor doorlooptijd bedraagt :", duration);
    }
});

loader.emitter.on("error", function (element) {
    console.log("Emitted error: " + element);
});

loader.emitter.on("data", function (element) {
    console.log("Emitted data: " + element);
});

var getSeries = function (){
    loader.loadSeries(users, usersIds, function (err, arr, duration) {
        if (err) {
            console.log(err);
        } else {
            console.log("Output array - seriële loader: in ", duration, " ms");
        }
    });
}



setTimeout(function () { process.exit() }, 15000 );
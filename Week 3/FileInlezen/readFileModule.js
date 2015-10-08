(function () { "use strict"; })();

var ReadFile = (function () {
    
    var text = {};
    var result = {};

    var readFileData = function (data, cb) {
        text = data.split('\n');
        text.forEach(function (element, index) {
            cb(null, index + ". " + element);
        });
    };


    return {
        readFileData: readFileData
    }
})();

module.exports = ReadFile;
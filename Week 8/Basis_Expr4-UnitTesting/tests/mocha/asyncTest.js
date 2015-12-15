// asynchroon testen met mocha en "done"

var assert = require("assert");
var should = require("should");

describe('setTimeout ', function () {
    it('should return TRUE after 1000 mseconds', function (done) {
        setTimeout(function () {
            assert.equal(1, 1);
            done();
        }, 1000);

    });
});

describe('setTimeout ', function () {
    it('should return TRUE after 500 mseconds', function (done) {
        setTimeout(function () {
            assert.equal(1, 1);
            done();
        }, 500);
    });
});
/*
 * JSON message test
 *  met should.js && mocha.js
 */
var assert = require("assert");
var http = require('http');
var should = require('should');
//opstarten van app om van daaruit een request te plaatsen - anders socket hangup ECONNREFUSED

//var app = require('../../app');
//app.set('port', process.env.PORT || 3000);
//var server = app.listen(app.get('port'), function () {
//    console.log("listening to ", server.address().port)
//})

if (!app) {
    var app = require('../../bin/www');
}

//var config = require('../config/config');

var opts = {
    host: '127.0.0.1',
    port: process.env.PORT || 3000,
    path: '/sendMessage',
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' }
};

describe('Testing the small message sender: \n', function () {
    //zinloze test als test...
    describe('#indexOf()', function () {
        it('should return -1 when the value is not present', function () {
            assert.equal(-1, [1, 2, 3].indexOf(5));
            assert.equal(-1, [1, 2, 3].indexOf(9));
        });
    });
    
    describe('Send message, recieve JSON', function () {
        var msg = {
            status: 'ok',
            message: 'Message test',
        };
        it('should return OK when receiving the success JSON msg', function (done) {
            // Set up the request op basis vd post opties 
            var req = http.request(opts, function (res) {
                res.setEncoding('utf8');
                //event listener om streaming data op te vangen
                var result = "";
                res.on('data', function (d) {
                    // console.log(d);
                    result += d;
                });
                
                ////event listener bij end vh response 
                res.on('end', function (err) {
                    assert.strictEqual(JSON.stringify(JSON.parse(result)),
                    '{"status":"ok","message":"' + msg.message + '"}' , 
                    "fout bij res");
                    if (err) {
                        throw err;
                    }
                    //na import van should.js:
                    this.statusCode.should.match(200);
                    JSON.parse(result).should.have.property("status");
                    
                    done(); //niet vergeten, zoniet timeout
                });
            });
            // posten  van klein bericht als test
            req.write('message=' + msg.message);
            req.end();
        });
    });
});
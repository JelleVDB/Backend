var assert = require('assert');
var sinon = require('sinon');

//overkoepelende describe
describe('SINON is testing: ', function () {
    //1. helpers or fakes
    var getData, dataAccessor;
    
    beforeEach(function () {
        getData = {
            callAPI: function (searchTerm, cb) {
                console.log(" cb is called");
                cb();
            },
            getFromDatabase : function (dataAccessor) {
                dataAccessor.getUser();
            }
        };
        
        //DA:
        dataAccessor = {
            getUser: function () {
                console.log("getUsers");
                return ({ name: "JVN" , profession: "docent" });
            },
            getProfession: function (username) {
                if (username === "JVN") { return "docent";}
            }
        };

    });
    
    describe('SPY: callApi with faked callback', function () {
        it("runs a http call", function () {
            var spy = sinon.spy();
            getData.callAPI("howest", spy);
            assert.equal(spy.called, true);//enkel getest dat de cb opgeroepen is.        
        });
    });
    
    describe('STUB: callApi stubbing een dataAccessor', function () {
        it('should call one stubbed method', function () {
            //bij stub wordt een javascript object meegegeven waarop de returns "kunnen" getest worden, naast alleen een oproep test
            var stub = sinon.stub(dataAccessor);
            dataAccessor.getProfession(stub);
            
            assert.equal(stub.getUser.called, false);
            assert.equal(stub.getProfession.called, true);
        });
        
        it('should return a stubbed profession', function () {
            var stub = sinon.stub(dataAccessor);
            stub.getProfession.returns("nendocent");  //initialiseren op stub waarde
            
            dataAccessor.getProfession(stub);   //real resultaat wordt niet gecontroleerd        
            
            assert.equal(stub.getProfession.called, true);
            assert.equal(stub.getProfession("JVN Stub"), "nendocent"); //controleert de stub waarde
        });
    });
});
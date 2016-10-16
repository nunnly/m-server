var assert = require('assert');
var mServer = require('../lib/index.js').createServer;
var http = require('http');
console.log(process.env)
describe('m-server', function() {
  describe('When m-server is listening on port 7000', function() {
    var sever = mServer();
    it('http server should return 200 status', function(done) {
      http.get('http://localhost:7000', function(res){
        assert.equal(res.statusCode, 200);
        done()
      })
    });
  });
});
var assert = require('assert');
var request = require('supertest');
var app = require('../app/app.js');

describe('Express', function() {
  it('should validate a fresh template', function(done) {
    var json = require('./samples/complex_template.json');
    var output = require('./samples/complex_template_transformed.json');
    request(app)
      .post('/transform')
      .send({
        data: json
      })
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.deepEqual(res.body.data, output);
        done();
      });
  });
});

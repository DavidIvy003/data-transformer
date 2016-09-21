var assert = require('assert');
var Wraggler = require('../app/src/wraggler');

describe('Wraggler', function() {
  it('should preserve strings', function() {
    var output = Wraggler.flatten({ name: 'string' });
    assert.deepEqual(output, { name: 'string' });
  });

  it('should preserve numbers', function() {
    var output = Wraggler.flatten({ count: 2 });
    assert.deepEqual(output, { count: 2 });
  });

  it('should calculate metrics of number arrays', function() {
    var output = Wraggler.flatten({ array: [1, 10, 100] });
    assert.equal(output['max_array'], 100);
    assert.equal(output['min_array'], 1);
    assert.equal(output['sum_array'], 111);
    assert.equal(output['avg_array'], 37);
  });

  it('should turn string arrays to lists', function() {
    var output = Wraggler.flatten({ party: ['beer', 'cheese', 'hats'] });
    assert.equal(output['party'], 'beer, cheese, hats');
  });

  it('should calculate metrics of hash arrays', function() {
    var json = require('./samples/array_of_hashes.json');
    var output = Wraggler.flatten(json);
    assert.equal(output['max_count_of_supplies'], 100);
    assert.equal(output['min_count_of_supplies'], 1);
    assert.equal(output['sum_count_of_supplies'], 111);
    assert.equal(output['avg_count_of_supplies'], 37);
    assert.equal(output['max_number_of_supplies'], 400);
    assert.equal(output['min_number_of_supplies'], 4);
    assert.equal(output['sum_number_of_supplies'], 444);
    assert.equal(output['avg_number_of_supplies'], 148);
  });

  it('should perserve hash with strings', function() {
    var output = Wraggler.flatten({ party: { name: 'bday', type: 'festivus' } });
    assert.equal(output['party_name'], 'bday');
    assert.equal(output['party_type'], 'festivus');
  });

  it('should perserve hash with numbers', function() {
    var output = Wraggler.flatten({ party: { coming: 15, maybe: 1, invited: 1000 } });
    assert.equal(output['party_coming'], 15);
    assert.equal(output['party_maybe'], 1);
    assert.equal(output['party_invited'], 1000);
  });

  it('All together now', function() {
    var json = require('./samples/complex_template.json');
    var results = require('./samples/complex_template_transformed.json');
    var output = Wraggler.flatten(json);
    assert.deepEqual(output, results);
  });


});

'use strict';

var Wraggler = {};

function flattenArrayOfHashes (key, value) {
  var output = {};
  Object.keys(value[0]).forEach(function (childKey) {
    var childValue = value[0][childKey];
    if (typeof childValue === 'number') {
      var array = value.map(function (v) {
        return v[childKey];
      });
      output = merge(flattenArray(childKey, array), output, '', '_of_' + key);
    }
  });
  return output;
}

function flattenArray (key, value) {
  var output = {};
  if (typeof value[0] === 'number') {
    output['max_' + key] = Math.max(...value);
    output['min_' + key] = Math.min(...value);
    output['sum_' + key] = value.reduce(function(a, b) { return a + b; }, 0);;
    output['avg_' + key] = output['sum_' + key] / value.length;
  } else if (typeof value[0] === 'string') {
    output[key] = value.join(', ');
  } else if (value[0] instanceof Array) {
    output = merge(flattenArray(key, value), output, '', '');
  } else if (typeof value[0] === 'object') {
    output = merge(flattenArrayOfHashes(key, value), output, '', '');
  }
  return output;
}

function merge (hash1, hash2, prefix, postfix) {
  Object.keys(hash1).forEach(function (childKey) {
    hash2[prefix + childKey + postfix] = hash1[childKey];
  });
  return hash2;
}

Wraggler.flatten = function(content) {

  function flattenContent (content) {
    var output = {};

    Object.keys(content).forEach(function(key) {
      var value = content[key];
      if (value instanceof Array) {
        output = merge(flattenArray(key, value), output, '', '');
      } else if (typeof value === 'object') {
        output = merge(flattenContent(value), output, key + '_', '');
      } else {
        output[key] = value;
      }
    });

    return output;
  }

  return flattenContent(content);
};

module.exports = Wraggler;

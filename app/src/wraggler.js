'use strict';

var Wraggler = {};

function flattenArrayOfHashes(key, value) {
  let output = {};
  Object.keys(value[0]).forEach( childKey => {
    let childValue = value[0][childKey];
    if (typeof childValue === 'number') {
      const array = value.map(v => v[childKey]);
      output = merge(flattenArray(childKey, array), output, '', '_of_' + key);
    }
  });
  return output;
}

function flattenArray(key, value) {
  let output = {};
  if (typeof value[0] === 'number') {
    output['max_' + key] = Math.max.apply(null, value);
    output['min_' + key] = Math.min.apply(null, value);
    output['sum_' + key] = value.reduce(((a, b) => a + b), 0);
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

function merge(hash1, hash2, prefix, postfix) {
  Object.keys(hash1).forEach( childKey => {
    hash2[prefix + childKey + postfix] = hash1[childKey];
  });
  return hash2;
}

Wraggler.flatten = (content) => {

  function flattenContent(content) {
    let output = {};

    Object.keys(content).forEach( key => {
      let value = content[key];
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

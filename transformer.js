'use strict';

let Wraggler = require('./app/src/wraggler');

exports.handler = (event, context, callback) => {
    var body = event;
    console.log(body);
    var output = Wraggler.flatten(body.data);

    callback(null, {
      data: output
    });
};

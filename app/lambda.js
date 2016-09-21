'use strict';

let Wraggler = require('./app/src/wraggler');
let Wordsmith = require('wordsmith-node-sdk');

exports.handler = (event, context, callback) => {
  const body = event;
  const data = Wraggler.flatten(body.data);
  const wordsmith = Wordsmith(body.api_key, 'transformer');

  wordsmith.projects.find(body.project_slug)
  .then(project => project.templates.find(body.template_slug))
  .then(template => template.generate(data))
  .then(content => {
    console.log(content);
    callback(null, {
      data: content
    });
  });
};

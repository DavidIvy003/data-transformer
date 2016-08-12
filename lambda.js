'use strict';

let Wraggler = require('./app/src/wraggler');
let Wordsmith = require('wordsmith-node-sdk');

exports.handler = (event, context, callback) => {
    var body = event;
    console.log(body);
    var data = Wraggler.flatten(body.data);
    var wordsmith = Wordsmith(body.api_key, 'transformer');

    wordsmith.projects.find(body.project_slug)
    .then(function(project) {
      return project.templates.find(body.template_slug);
    }).then(function(template) {
      return template.generate(data);
    }).then(function(content) {
      console.log(content);
      callback(null, {
        data: content
      });
    });
};

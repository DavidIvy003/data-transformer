const PORT = 3003;
const JSON_SIZE_LIMIT = '50mb';

var express = require('express');
var bodyParser = require('body-parser');
var Wraggler = require('./src/wraggler');
var Wordsmith = require('wordsmith-node-sdk');

var app = express();

app.use(bodyParser.json({limit: JSON_SIZE_LIMIT}));

app.use(function(err, request, response, next){
  response.json({
    'valid': false,
    'errors': 'invalid POST'
  });
});

app.post('/generate', function(request, response) {
  var body = request.body;
  console.log(body);
  var data = Wraggler.flatten(body.data);
  var wordsmith = Wordsmith(body.api_key, 'transformer');

  wordsmith.projects.find(body.project_slug)
  .then(function(project) {
    return project.templates.find(body.template_slug);
  }).then(function(template) {
    return template.generate(data);
  }).then(function(content) {
    response.json({
      data: content
    });
  });
});

app.post('/transform', function(request, response) {
  response.json({
    data: Wraggler.flatten(request.body.data)
  });
});

app.get('/monitor', function(request, response){
  response.send('Status: OK');
});

app.listen(PORT, function () {
  console.log('JSON Validator listening on port: %s', PORT);
});

module.exports = app;

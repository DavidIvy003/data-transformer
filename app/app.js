const PORT = 3003;
const JSON_SIZE_LIMIT = '50mb';

const express = require('express');
const bodyParser = require('body-parser');
const Wraggler = require('./src/wraggler');
const Wordsmith = require('wordsmith-node-sdk');

const app = express();

app.use(bodyParser.json({ limit: JSON_SIZE_LIMIT }));

app.use((err, request, response, next) => {
  response.json({
    'valid': false,
    'errors': 'invalid POST'
  });
});

app.post('/generate', (request, response) => {
  const body = request.body;
  const data = Wraggler.flatten(body.data);
  const wordsmith = Wordsmith(body.api_key, 'transformer');

  wordsmith.projects.find(body.project_slug)
  .then(project => {
    return project.templates.find(body.template_slug);
  }).then(template => {
    return template.generate(data);
  }).then(content => {
    response.json({
      data: content
    });
  });
});

app.post('/transform', (request, response) => {
  response.json({
    data: Wraggler.flatten(request.body.data)
  });
});

app.get('/monitor', (request, response) => {
  response.send('Status: OK');
});

app.listen(PORT, () => {
  console.log('JSON Validator listening on port: %s', PORT);
});

module.exports = app;

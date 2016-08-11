const PORT = 3003;
const JSON_SIZE_LIMIT = '50mb';

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json({limit: JSON_SIZE_LIMIT}));

app.use(function(err, request, response, next){
  response.json({
    'valid': false,
    'errors': 'invalid POST'
  });
});

app.post('/generate', function(request, response) {
  response.json({
    'valid': valid,
    'errors': ajv.errors
  });
});

app.get('/monitor', function(request, response){
  response.send('Status: OK');
});

app.listen(PORT, function () {
  console.log('JSON Validator listening on port: %s', PORT);
});

module.exports = app;

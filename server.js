var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World! ' + process.env.TXT);
});

var server = app.listen(process.env.PORT || 8888, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

app.use('/static', express.static('public'));
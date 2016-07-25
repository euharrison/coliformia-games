var express = require('express');
var mustacheExpress = require('mustache-express');
var app = express();

//register file extension mustache
app.engine('html', mustacheExpress());

//register file extension for partials
app.set('view engine', 'html'); 
app.set('views', __dirname);

app.get('/', function(req, res) {
  res.render('index',{
    title: 'Coliformia Games',
    description: 'Uma descrição supimpa',
    image: 'assets/img/facebook/big/01.jpg',
  });
});

app.get('/:id', function(req, res) {
  var index = Number(req.params.id) - 1;
  var tags = [
    {
      title: 'Coliformia Games 1',
      description: 'Uma descrição supimpa 1',
      image: 'assets/img/facebook/big/01.jpg',
    },
    {
      title: 'Coliformia Games 2',
      description: 'Uma descrição supimpa 2',
      image: 'assets/img/facebook/big/02.jpg',
    },
    {
      title: 'Coliformia Games 3',
      description: 'Uma descrição supimpa 3',
      image: 'assets/img/facebook/big/03.jpg',
    }
  ]
  res.render('index', tags[index]);
});

app.use('/', express.static(__dirname));

var server = app.listen(process.env.PORT || 8000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('App listening at http://%s:%s', host, port);
});

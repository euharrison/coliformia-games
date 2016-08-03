var express = require('express');
var mustacheExpress = require('mustache-express');
var app = express();

//register file extension mustache
app.engine('html', mustacheExpress());

//register file extension for partials
app.set('view engine', 'html'); 
app.set('views', __dirname);

app.get('/', function(req, res) {
  res.render('index',
  {
    url: 'http://coliformiagames.com',
    title: 'Coliformia Games',
    description: 'Sejam bem-vindos a maior competição de sobrevivência a coliformes fecais do mundo! Coliformia Games - Rip 2016! #RioDeMerda',
    image: '01.jpg',
  });
});

app.get('/:id', function(req, res) {
  var index = Number(req.params.id) - 1;
  var tags = [
    {
      url: 'http://coliformiagames.com/1',
      title: 'Coliformia Games :: Sebacitóide Bolhosa',
      description: 'Peguei Sebacitóide Bolhosa na Baía de Guanabara! #RioDeMerda',
      image: '01.jpg',
    },
    {
      url: 'http://coliformiagames.com/2',
      title: 'Coliformia Games :: Eczecrose Amebática',
      description: 'Peguei Eczecrose Amebática na Lagoa Rodrigo de Freitas nadando mais de 200m! #RioDeMerda',
      image: '02.jpg',
    },
    {
      url: 'http://coliformiagames.com/3',
      title: 'Coliformia Games :: Lepstosciforme Cutínica',
      description: 'Peguei Lepstosciforme Cutínica na Praia de Copacabana nadando mais de 300m! #RioDeMerda',
      image: '03.jpg',
    },
    {
      url: 'http://coliformiagames.com/4',
      title: 'Coliformia Games :: Tifoidema Urticariante',
      description: 'Peguei Tifoidema Urticariante na Baía de Guanabara nadando mais de 500m! #RioDeMerda',
      image: '04.jpg',
    },
    {
      url: 'http://coliformiagames.com/5',
      title: 'Coliformia Games :: Ceraglifia Imunoglobótica',
      description: 'Peguei Ceraglifia Imunoglobótica na Lagoa Rodrigo de Freitas nadando mais de 900m! #RioDeMerda',
      image: '05.jpg',
    },
    {
      url: 'http://coliformiagames.com/6',
      title: 'Coliformia Games :: Anidrosema Sebacitante',
      description: 'Peguei Anidrosema Sebacitante na Praia de Copacabana nadando mais de 1200m! #RioDeMerda',
      image: '06.jpg',
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

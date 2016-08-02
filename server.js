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
    description: 'Sejam bem-vindos a maior competição de sobrevivência a coliformes fecais do mundo! Coliformia Games - Rip 2016! #RiodeMerda',
    image: '01.jpg',
  });
});

app.get('/:id', function(req, res) {
  var index = Number(req.params.id) - 1;
  var tags = [
    {
      title: 'Coliformia Games :: Sebacitóide Bolhosa',
      description: 'Peguei Sebacitóide Bolhosa na Baía de Guanabara! #RiodeMerda',
      image: '01.jpg',
    },
    {
      title: 'Coliformia Games :: Eczecrose Amebática',
      description: 'Peguei Eczecrose Amebática na Lagoa Rodrigo de Freitas nadando mais de 100m! #RiodeMerda',
      image: '02.jpg',
    },
    {
      title: 'Coliformia Games :: Lepstosciforme Cutínica',
      description: 'Peguei Lepstosciforme Cutínica na Praia de Copacabana nadando mais de 200m! #RiodeMerda',
      image: '03.jpg',
    },
    {
      title: 'Coliformia Games :: Tifoidema Urticariante',
      description: 'Peguei Tifoidema Urticariante na Baía de Guanabara nadando mais de 500m! #RiodeMerda',
      image: '04.jpg',
    },
    {
      title: 'Coliformia Games :: Ceraglifia Imunoglobótica',
      description: 'Peguei Ceraglifia Imunoglobótica na Lagoa Rodrigo de Freitas nadando mais de 1000m! #RiodeMerda',
      image: '05.jpg',
    },
    {
      title: 'Coliformia Games :: Anidrosema Sebacitante',
      description: 'Peguei Anidrosema Sebacitante na Praia de Copacabana nadando mais de 1500m! #RiodeMerda',
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

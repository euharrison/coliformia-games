var express = require('express');
var mustacheExpress = require('mustache-express');
var app = express();
var extend = require('util')._extend;

var pt_br = {
  url: 'http://coliformiagames.com',
  title: 'Coliformia Games',
  description: 'Sejam bem-vindos a maior competição de sobrevivência a coliformes fecais do mundo! Coliformia Games - Rip 2016! #RioDeMerda',
  image: '01.jpg',

  contato:'Contato',
  sobre:'Sobre',

  header_text:'Sejam bem-vindos a maior competição de sobrevivência a coliformes fecais do mundo!',
  paragrafo_1:'Nessa competição emocionante, os melhores atletas de todo o planeta terão o privilégio de correr atrás de sua merdalha imersa em esgoto puro, de baixo dos braços da sétima maravilha do mundo moderno, desafiando os limites do corpo humano.',
  paragrafo_2:'São duas lindíssimas praias, uma bela lagoa e uma enorme baia repletas de cocô de aproximadamente 5 milhões de pessoas que vivem em situações precárias e sem nenhuma estrutura de saneamento básico, que proporcionarão aos nossos atletas e turistas convidados uma gama de oportunidades de doenças exclusivas da cidade maravilhosa, com 99% de chance a cada 3 colheres de chá ingeridas!',
  paragrafo_3:'Venha nadar com a gente no Coliformia Games!',
  main_quote:'Os atletas que vão competir nos Jogos Olímpicos de 2016 terão que nadar e velejar em águas tão contaminadas por fezes humanas que se arriscam a contrair alguma doença e não poder concluir as provas, de acordo com uma investigação da Associated Press.',
  quote_1:'Em consequência, os atletas olímpicos quase certamente entrarão em contato com vírus causadores de doenças, que, segundo alguns testes, estão presentes em níveis até 1,7 milhão de vezes acima do que seria considerado alarmante em praias no sul da California',
  quote_2:'Segundo o biólogo marinho John Griffith, o que tem na Baía de Guanabara é basicamente esgoto puro! "É agua dos banheiros, dos chuveiros e do que as pessoas jogam na pia, tudo misturado, que vai para a água das praias. Isso seria interditado imediatamente se fosse encontrado aqui [nos EUA]',
  quote_3:'As concentrações dos vírus foram aproximadamente as mesmas que são encontradas no esgoto puro, mesmo em uma das áreas menos poluídas testadas, a praia de Copacabana, onde serão realizadas as provas de natação do triatlo e maratona aquática e onde muitos dos 350.000 turistas estrangeiros esperados podem dar seus mergulhos',
  quote_4:'Um especialista americano em avaliação de risco para vírus transmitidos pela água examinou os dados da AP e estimou que os atletas internacionais em todos os locais de competições aquáticas teriam uma chance de 99% de infecção ao ingerir apenas 3 colheres de chá da água, embora a probabilidade de uma pessoa ficar doente dependa da imunidade e outros fatores.',
  testemonial_1:'Acho que já tenho anticorpos suficientes para as cincos próximas olimpíadas no Rio.',
  description_testemonial_1a:'Atleta brasileiro durante a competição',
  description_testemonial_1b:'de natação no Rio de Janeiro',
  testemonial_2:'Graças aos jogos do Rio de Janeiro, hoje ganhei um bracinho a mais, bem próximo ao meu umbigo.',
  description_testemonial_2a:'Atleta brasileiro durante a competição',
  description_testemonial_2b:'de natação no Rio de Janeiro'
};

var en_us = {
  url: 'http://coliformiagames.com',
  title: 'Coliformia Games',
  description: 'Sejam bem-vindos a maior competição de sobrevivência a coliformes fecais do mundo! Coliformia Games - Rip 2016! #RioDeMerda',
  image: '01.jpg',

  contato:'Email us',
  sobre:'About',

  header_text:'Welcome to the shittiest survival competition in the entire globe!',
  paragrafo_1:'The best athletes from all over the planet will have the privilege of running after the medal under the arms of one of world\'s seven wonders. A challenge to the human body.',
  paragrafo_2:'Two amazing beaches, a beautiful lake, a gigantic bay and around 5 million people that live around it with no access to basic infrastructure such as a sewer system, offering visitors and participants a vast range of exclusive diseases from the wonderful city. You have a 99% chance of acquiring one on every 3 tea spoons of our liquid!',
  paragrafo_3:'So come and join us for swim in Coliformia Games!',
  main_quote:'According to investigations from the Associated Press, the competing athletes from the Olympic games 2016 will have to swim and sail in water so much polluted by human feces that they risk getting infected and not being able to conclude the games.',
  quote_1:'As a consequence, Olympic athletes will most certainly get in contact with viruses that cause diseases, according to tests these viruses can be found up to 1,7 million times above the Californian alarming concentration amount for beaches.',
  quote_2:'According to marine biologist John Griffith, what one finds in Guanabara Bay is a sewer! Water from people\'s toilets, showers and everything else that is thrown in the drains, all in a mix that ends up at the shore. That would not be allowed if ever found here (in the US)',
  quote_3:'The virus concentration is the same one found in sewer systems, even in the least polluted areas, Copacabana beach, where we will have the swimming for the triathlon and the aquatic marathon and many of the 350.000 expected tourists may go for a swim',
  quote_4:'An American specialist in water transmitted virus risk evaluations examined the data from AP and estimated that all international athletes that have contact with water have also a 99% infection chance if they ingest 3 or more tea spoons from the water, even though for actually developing the diseases other factors are involved as well such as the person\'s immune system.',
  testemonial_1:'I believe I have my immune system strong enough for the next 5 Rio Olympics.',
  description_testemonial_1a:'Brazilian athlete during a competition',
  description_testemonial_1b:'swimming in Rio de Janeiro',
  testemonial_2:'Thanks to the Olympic games in Rio de Janeiro I\'ve got an extra arm today, here, next to my belly.',
  description_testemonial_2a:'Brazilian athlete during a competition',
  description_testemonial_2b:'swimming in Rio de Janeiro'
};

//register file extension mustache
app.engine('html', mustacheExpress());

//register file extension for partials
app.set('view engine', 'html');
app.set('views', __dirname);

app.get('/', function(req, res) {
  res.render('index', pt_br);
});

app.get('/en', function(req, res) {
  res.render('index', en_us);
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
  var data = extend(pt_br, tags[index]);
  res.render('index', data);
});

//register file extension mustache
app.engine('html', mustacheExpress());

// //register file extension for partials
app.set('view engine', 'html');
app.set('views', __dirname);

app.use('/', express.static(__dirname));

var server = app.listen(process.env.PORT || 8000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('App listening at http://%s:%s', host, port);
});

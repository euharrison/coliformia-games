var gameoverState = {

  create: function() {

    game.stage.backgroundColor = '#ffffff';

    //calculate disease
    var diseaseList = [
      { score: 0, name: 'Sebacitóide Bolhosa' },
      { score: 100, name: 'Eczecrose Amebática' },
      { score: 200, name: 'Lepstosciforme Cutínica' },
      { score: 500, name: 'Tifoidema Urticariante' },
      { score: 1000, name: 'Ceraglifia Imunoglobótica' },
      // { score: 1500, name: 'Amebtose Shigeciforme' },
      // { score: 1500, name: 'Psorisite Giardótica' },
      { score: 1500, name: 'Anidrosema Sebacitante' },
    ];

    var index = 0;
    for (var i = 0; i < diseaseList.length; i++) {
      if (game.score > diseaseList[i].score) {
        index = i;
      }
    }
    var disease = diseaseList[index];

    //calculate random place
    var placeList = [
      'Baía de Guanabara',
      'Praia de Copacabana',
      'Lagoa Rodrigo de Freitas',
    ];
    var place = placeList[ Math.floor( Math.random()*placeList.length ) ];

    //text score
    var scoreValue = Math.ceil(game.score);
    var textScore = game.add.text(750, 160, scoreValue+'m na '+place, {
      font: 'Noyh',
      fill: '#e83434',
      fontSize: 30
    }).addColor('#000000', String(scoreValue).length+1);

    if (typeof ga === 'function') {
        ga('send', {
          hitType: 'event',
          eventCategory: 'Game',
          eventAction: 'gameover',
          eventLabel: 'success',
          eventValue: scoreValue
        });
    }

    //text disease
    var textDisease = game.add.text(textScore.x, textScore.y+textScore.height, disease.name.replace(' ', '\n'), {
      font: 'Noyh',
      fill: '#e83434',
      fontSize: 80
    });
    textDisease.lineSpacing = -30;

    //text quote
    var quoteList = [
      '“As concentrações dos vírus foram \naproximadamente as mesmas que são \nencontradas no esgoto puro” \n- Estadão',
      '“É agua dos banheiros, dos chuveiros \ne do que as pessoas jogam na pia, \ntudo misturado, que vai para a água \ndas praias.” - John Griffith',
      '“A gente vive por uma medalha olímpica, \ne pode realmente acontecer de ficar \ndoente alguns dias antes da prova e \nnão conseguir competir” - Bujala',
      '“O número de coliformes fecais excedeu \no limite legal brasileiro para ‘contato \nsecundário’, como navegação ou remo, \ntendo ficado, em duas amostras, mais de \n10 vezes acima do nível aceitável.” \n- Estadão',
      '“As autoridades cariocas prometeram \nque os jogos ‘recuperariam as águas \nmagníficas do Rio’ com um programa \ngovernamental de US$ 4 bilhões para \na expansão da infraestrutura de \nsaneamento básico” - Estadão',
      '“Esta é de longe a pior qualidade de \nágua que já vimos em toda a nossa \ncarreira no iatismo” \n- Ivan Bujala, técnico da equipe \naustríaca de iatismo.',
      '“As águas do Rio estão cronicamente \ncontaminadas, A quantidade de matéria \nfecal que entra nos corpos de água \nno Brasil é extremamente alta.” \n- Fernando Spilki',
      '“Os atletas internacionais em todos \nos locais de competições aquáticas \nteriam uma chance de 99% de infecção \nao ingerir apenas 3 colheres de chá \nda água” - Estadão',
      '“É muito provável que haja organismos \nainda piores que não foram pesquisados \ne que estejam ali escondidos” \n- Griggith, pesquisador EUA.',
      '“Os testes da AP revelaram que suas \náguas estão entre as mais poluídas dos \nlocais de competições olímpicas, com \nresultados que variam de 14 milhões \nde adenovírus por litro no extremo \ninferior a 1,7 bilhão por litro no \nextremo superior” - Estadão',
      '“Os atletas olímpicos quase certamente \nentrarão em contato com vírus causadores \nde doenças, que, segundo alguns testes, \nestão presentes em níveis até 1,7 milhão \nde vezes acima do que seria considerado \nalarmante em praias no sul da California” \n- Estadão',
      '“Os atletas que vão competir nos Jogos \nOlímpicos de 2016 terão que nadar e \nvelejar em águas tão contaminadas por \nfezes humanas que se arriscam a contrair \nalguma doença e não poder concluir \nas provas” - Estadão',
    ];
    var quote = quoteList[ Math.floor( Math.random()*quoteList.length ) ];
    var textQuote = game.add.text(textDisease.x, textDisease.y+textDisease.height+10, quote, {
      font: 'Noyh',
      fill: '#5e5e5e',
      fontSize: 30
    });
    textQuote.lineSpacing = -10;

    //share
    game.add.button(textQuote.x, textQuote.y+textQuote.height+20, 'button-share', this.share, index+1);

    //illustation
    game.add.image(0, 0, 'disease'+(index+1));

    //logo
    game.add.image(531, 65, 'gameover-logo');

    //play again
    game.add.button(548, 263, 'button-play-again', this.playAgain);
    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(this.playAgain);
  },

  playAgain: function() {
      ga('send', {
        hitType: 'event',
        eventCategory: 'Game',
        eventAction: 'play',
        eventLabel: 'restart'
      });

    game.state.start('play');
  },

  share: function() {
    FB.ui({
      method: 'share',
      display: 'popup',
      href: 'http://coliformiagames.com/'+this,
    }, function(response){
        if (typeof ga === 'function') {
            var score = Math.ceil(game.score) || 0;
            ga('send', {
              hitType: 'event',
              eventCategory: 'Game',
              eventAction: 'share',
              eventLabel: 'success',
              eventValue: score
            });
        }
    });
  },
};

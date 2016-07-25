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
    ]

    var index = 0;
    for (var i = 0; i < diseaseList.length; i++) {
      if (game.score > diseaseList[i].score) {
        index = i;
      }
    }
    var disease = diseaseList[index];

    //text score
    var scoreValue = Math.ceil(game.score);
    game.add.text(760, 202, scoreValue+'m na Baía de Guanabara', {
      font: 'Noyh',
      fill: '#e83434',
      fontSize: 30
    }).addColor('#000000', String(scoreValue).length+1);

    //text disease
    var text = game.add.text(760, 233, disease.name.toUpperCase().replace(' ', '\n'), {
      font: 'Noyh',
      fill: '#e83434',
      fontSize: 80
    });
    text.lineSpacing = -30;

    //illustation
    game.add.image(0, 0, 'disease'+(index+1));

    //logo
    game.add.image(531, 65, 'gameover-logo');

    //play again
    game.add.button(548, 263, 'button-play-again', this.playAgain);

    //share
    game.add.button(760, 520, 'button-share', this.share);
  },

  playAgain: function() {
    game.state.start('play');
  },

  share: function(a,b,c) {
    console.log(a,b,c, this);
    FB.ui({
      method: 'share',
      display: 'popup',
      href: 'http://coliformiagames.com',
    }, function(response){});
  },
};

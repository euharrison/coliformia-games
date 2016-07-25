var gameoverState = {

  create: function() { 
    game.add.image(0, 0, 'gameover-screen');

    var fontConfig = {
      font: 'Noyh',
      fill: '#fff',
      fontSize: 100
    }

    //score
    var score = Math.ceil(game.score);
    game.add.text(170, 210, score+'m', fontConfig);

    //disease
    var list = ['Porfiria\ncutânea', 'Piodermite\nGangrenosa'];
    var index = Math.floor(game.score/500);
    if (index > list.length - 1) {
      index = list.length - 1;
    }
    var disease = list[index].toUpperCase();

    var text = game.add.text(170, 400, disease, fontConfig);
    text.lineSpacing = -20;



    game.add.image(740, 522, 'share');



    //tap to play again
    game.input.onTap.add(this.start, this);
  },

  start: function() {
    game.state.start('play');
  }
};

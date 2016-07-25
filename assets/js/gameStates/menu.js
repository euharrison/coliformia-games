var menuState = {

  create: function() {
    game.add.image(0, 0, 'start-screen');

    var text = game.add.text(100, game.height-70, 'Touch the shitty\nwater to begin'.toUpperCase(), {
      font: 'Noyh',
      fill: '#ffffff',
      fontSize: 44
    });
    text.lineSpacing = -10;
    text.anchor.setTo(0, 1);

    game.input.onTap.add(this.start, this);
  },

  start: function() {
    if (game.coliformiaConfig.useFullScreen) {
      game.scale.startFullScreen();
    }

    game.state.start('play');
  }
};

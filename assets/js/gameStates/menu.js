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

    game.coliformiaSounds = {};

    game.coliformiaSounds.bolha_ou_pulo1 = game.add.audio('bolha_ou_pulo1');
    game.coliformiaSounds.bolha_ou_pulo2 = game.add.audio('bolha_ou_pulo2');
    game.coliformiaSounds.cai_na_agua = game.add.audio('cai_na_agua');
    game.coliformiaSounds.coco_canhao = game.add.audio('coco_canhao');
    game.coliformiaSounds.hit = game.add.audio('hit');
    game.coliformiaSounds.morte_boiando = game.add.audio('morte_boiando');
    game.coliformiaSounds.musica = game.add.audio('musica');
    game.coliformiaSounds.nada = game.add.audio('nada');
    game.coliformiaSounds.power_up = game.add.audio('power_up');
  },

  start: function() {
    if (game.coliformiaConfig.useFullScreen) {
      game.scale.startFullScreen();
    }

    if (typeof ga === 'function') {
        ga('send', {
          hitType: 'event',
          eventCategory: 'Game',
          eventAction: 'play',
          eventLabel: 'start'
        });
    }

    game.state.start('play');
  }
};

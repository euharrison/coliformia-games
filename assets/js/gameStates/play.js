var playState = {

  create: function() {

    this.initialPosition = game.coliformiaConfig.initialPosition;
    this.playerlife = game.coliformiaConfig.player.life;
    this.velocity = game.coliformiaConfig.velocity;
    this.velocityIncrease = game.coliformiaConfig.velocityIncrease;

    this.playerlife.current = this.playerlife.initial;

    // add back backgrounds, like sky and buildings
    this.bgBack = new ParalaxBg(game, this, game.add.group(), [
      ['bg', 0, 0],
      ['bg-sky', .2, 0],
      ['bg-clouds', .6, 47],
      ['bg-mountains-back', 1, 118],
      ['bg-mountains-front', 1.5, 103],
      ['bg-buildings', 2, 169],
    ]);
    game.add.sprite(0, 203, 'bg-water-back').animations.add('', null, 16, true).play();

    // start the P2JS physics system
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.setImpactEvents(true);
    this.playerCollisionGroup = game.physics.p2.createCollisionGroup();
    this.enemiesCollisionGroup = game.physics.p2.createCollisionGroup();
    this.powerupsCollisionGroup = game.physics.p2.createCollisionGroup();
    game.physics.p2.updateBoundsCollisionGroup();

    // add enemies/power-ups sequecences
    this.sequenciador = new Sequenciador(game, this, game.add.group());
    this.sequenciador.setup();

    // add player
    this.player = new Player(game, this.initialPosition.x, this.initialPosition.y);
    this.player.body.setCollisionGroup(this.playerCollisionGroup);
    this.player.body.collides(this.enemiesCollisionGroup, this.enemyCollisionHandler, this);
    this.player.body.collides(this.powerupsCollisionGroup, this.powerupCollisionHandler, this);

    game.debug.body(this.player);

    // add over backgrounds, like water and grass
    this.bgFront = new ParalaxBg(game, this, game.add.group(), [
      ['bg-waves', 5, 236],
      ['bg-grass', 6, 571],
      ['bg-water', 0, 304],
    ]);
    game.add.sprite(0, 203, 'bg-water-front').animations.add('', null, 16, true).play();

    // add swimming splash effect
    this.rastro = new PlayerRastro(game, this.player);

    // add life interface
    var lifeX = 415;
    var lifeY = 37;
    game.add.sprite(lifeX, lifeY, 'lifebar-outline');
    this.lifeBar = game.add.sprite(lifeX, lifeY-2, 'lifebar');
    this.lifeSkull = game.add.sprite(lifeX, lifeY+10, 'lifebar-skull');
    this.lifeSkull.anchor.setTo(0.5);
    this.lifeSkullAnimation = game.add.tween(this.lifeSkull).to({angle: -20}, 250, "Linear", false, 0, -1, true);

    // add score interface
    game.score = 0;
    game.add.sprite(770, 25, 'score-bg');
    this.scoreText = game.add.text(830, 53, '0', {
      font: 'Noyh',
      fill: '#ffffff',
      fontSize: 23
    });
    this.scoreText.anchor.setTo(0.5);

    this.isJumping = false;

    cursors = game.input.keyboard.createCursorKeys();
  },

  update: function() {

    this.bgBack.update();
    this.bgFront.update();

    //life
    if (this.playerlife.current >= 0) {
      this.playerlife.current-=5;
      var lifePercent = this.playerlife.current / this.playerlife.initial;
      //bar
      this.lifeBar.scale.setTo(lifePercent, 1);
      if (lifePercent > 0.5) {
        this.lifeBar.tint = 0xd9e021;
      } else if (lifePercent > 0.45) {
        this.lifeBar.tint = Phaser.Color.interpolateColor(0xf15a24, 0xd9e021, 0.05, lifePercent-0.45);
      } else if (lifePercent > 0.3) {
        this.lifeBar.tint = 0xf15a24;
      } else if (lifePercent > 0.25) {
        this.lifeBar.tint = Phaser.Color.interpolateColor(0xe83434, 0xf15a24, 0.05, lifePercent-0.25);
      } else {
        this.lifeBar.tint = 0xe83434;
      }
      //skull
      this.lifeSkull.scale.setTo(1 + 0.25*(1-lifePercent));
      if (lifePercent < 0.9) {
        this.lifeSkullAnimation.start();
        this.lifeSkullAnimation.resume();
        this.lifeSkullAnimation.timeScale = 4*(1-lifePercent);

      } else {
        this.lifeSkullAnimation.pause();
        this.lifeSkull.angle = 0;
      }
    } else {
      game.state.start('gameover');
    }

    //velocidade do jogo
    this.velocity += this.velocityIncrease;

    //score
    game.score += this.velocity/1000;
    this.scoreText.text = game.score.toFixed(0)+'m';

    //sequence
    this.sequenciador.update(Math.ceil(game.score), this.playerlife.current / this.playerlife.initial);
  },

  enemyCollisionHandler: function(body1, body2) {
    game.state.start('gameover');
  },

  powerupCollisionHandler: function(body1, body2) {
    if (body2.sprite) {
      body2.sprite.destroy();
    }
    if (this.playerlife.current > this.playerlife.initial - body2.power) {
      this.playerlife.current = this.playerlife.initial;
    } else {
      this.playerlife.current = this.playerlife.current + body2.power;
    }
  },
};

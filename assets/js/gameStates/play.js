var playState = {

  create: function() {

    this.initialPosition = game.coliformiaConfig.initialPosition;
    this.playerlife = game.coliformiaConfig.playerlife;
    this.velocity = game.coliformiaConfig.velocity;
    this.velocityIncrease = game.coliformiaConfig.velocityIncrease;

    this.sequenciador = new Sequenciador(game, this);
    this.sequenciador.setup();

    // add all backgrounds
    this.bg = new ParalaxBg(game, this);

    // start the P2JS physics system
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.setImpactEvents(true);
    this.playerCollisionGroup = game.physics.p2.createCollisionGroup();
    this.enemiesCollisionGroup = game.physics.p2.createCollisionGroup();
    this.powerupsCollisionGroup = game.physics.p2.createCollisionGroup();
    game.physics.p2.updateBoundsCollisionGroup();

    // add player
    this.player = new Player(game, this.initialPosition.x, this.initialPosition.y);
    this.player.body.setCollisionGroup(this.playerCollisionGroup);
    this.player.body.collides(this.enemiesCollisionGroup, this.enemyCollisionHandler, this);
    this.player.body.collides(this.powerupsCollisionGroup, this.powerupCollisionHandler, this);

    // move player to back to the water
    this.player.moveDown();
    this.player.moveDown();
    this.player.moveDown();
    this.player.moveDown();
    this.player.moveDown();
    this.player.moveDown();

    // add swimming splash effect
    this.rastro = new PlayerRastro(game, this.player);

    // add life interface
    var lifeX = 730;
    var lifeY = 55;
    this.lifeBg = game.add.sprite(lifeX, lifeY-15, 'lifeBg');
    this.lifeBar = game.add.sprite(lifeX, lifeY-18, 'lifeBar');
    this.lifeSkull = game.add.sprite(lifeX, lifeY, 'lifeSkull');
    this.lifeSkull.anchor.setTo(0.5);
    this.lifeSkullAnimation = game.add.tween(this.lifeSkull).to({angle: -20}, 250, "Linear", false, 0, -1, true);

    // add score interface
    game.score = 0;
    this.scoreText = game.add.text(16, 16, 'Distance: 0', { fontSize: '32px', fill: '#FFF' });

    this.isJumping = false;

    this.group = game.add.group();
    this.group.enableBody = true;
    this.group.enableBodyDebug = game.debugPhysics;
    this.group.physicsBodyType = Phaser.Physics.P2JS;

    cursors = game.input.keyboard.createCursorKeys();
  },

  update: function() {

    this.bg.update();

    //life
    if (this.playerlife.current >= 0) {
      this.playerlife.current--;
      var lifePercent = this.playerlife.current / this.playerlife.initial;
      //bar
      this.lifeBar.scale.setTo(lifePercent, 1);
      if (lifePercent > 0.66) {
        this.lifeBar.tint = 0xd9e021;
      } else {
        this.lifeBar.tint = Phaser.Color.interpolateColor(0xf15a24, 0xd9e021, 67, 100*lifePercent);
      }
      //skull
      this.lifeSkull.scale.setTo(1 + 0.5*(1-lifePercent));
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

    //update enemies
    for (var i = 0; i < game.world.children.length; i++) {
      if (game.world.children[i] instanceof LevelItem) {
        game.world.children[i].update();
      }
    }

    this.group.forEach(function(enemy) {
      if (enemy.body.x < 0) {
        //out of the bounds
        enemy.body.clearShapes();
        enemy.kill();
      }
    }, this);

    //velocidade do jogo
    this.velocity += this.velocityIncrease;

    //score
    game.score += this.velocity/1000;
    this.scoreText.text = 'Distance: '+Math.ceil(game.score)+'m';

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

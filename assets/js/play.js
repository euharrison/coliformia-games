var playState = {

	create: function() {

		this.initialPosition = {
			x: 100,
			y: 350
		};

		this.playerlife = {
			initial: 2000,
			current: 2000,
		};

		this.velocity = 150;
		this.velocityIncrease = 0.01;

		this.sequenciador = new Sequenciador(game, this);
		this.sequenciador.setup();

		this.sky = game.add.graphics(0, 0);
		this.sky.beginFill(0x5c91a7, 1);
		this.sky.drawRect(0, 0, game.width, this.initialPosition.y);

		this.bg = new ParalaxBg(game, this);

		var lifeX = 730;
		var lifeY = 55;
		this.lifeBg = game.add.sprite(lifeX, lifeY-15, 'lifeBg');
		this.lifeBar = game.add.sprite(lifeX, lifeY-18, 'lifeBar');
		this.lifeSkull = game.add.sprite(lifeX, lifeY, 'lifeSkull');
		this.lifeSkull.anchor.setTo(0.5);
		this.lifeSkullAnimation = game.add.tween(this.lifeSkull).to({angle: -20}, 250, "Linear", false, 0, -1, true);

		game.score = 0;
		this.scoreText = game.add.text(16, 16, 'Distance: 0', { fontSize: '32px', fill: '#FFF' });

		// start the P2JS physics system
		game.physics.startSystem(Phaser.Physics.P2JS);
		game.physics.p2.setImpactEvents(true);
		this.playerCollisionGroup = game.physics.p2.createCollisionGroup();
		this.enemiesCollisionGroup = game.physics.p2.createCollisionGroup();
		this.powerupsCollisionGroup = game.physics.p2.createCollisionGroup();
		game.physics.p2.updateBoundsCollisionGroup();

		this.player = new Player(game, this.initialPosition.x, this.initialPosition.y);
		this.player.body.setCollisionGroup(this.playerCollisionGroup);
		this.player.body.collides(this.enemiesCollisionGroup, this.enemyCollisionHandler, this);
		this.player.body.collides(this.powerupsCollisionGroup, this.powerupCollisionHandler, this);

		this.rastro = new PlayerRastro(game, this.player);

		this.agua = game.add.graphics(0, this.initialPosition.y);
		this.agua.beginFill(0x8de1af, .5);
		this.agua.drawRect(0, 0, game.width, game.height - this.initialPosition.y);

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

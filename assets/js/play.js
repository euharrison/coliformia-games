var playState = {

	create: function() {
		game.debugPhysics = false;

		this.initialPosition = {
			x: 100,
			y: 233
		};

		this.playerlife = {
			initial: 1000,
			current: 1000,
			powerup: 100
		};

		this.velocity = 500;
		this.velocityIncrease = 0.001;

		this.sky = game.add.graphics(0, 0);
		this.sky.beginFill(0x5c91a7, 1);
		this.sky.drawRect(0, 0, game.width, this.initialPosition.y);

		this.bg = new ParalaxBg(game, this);

		this.lifeBar = game.add.sprite(game.world.centerX, 35, 'progressBar');
		this.lifeBar.anchor.setTo(0, 0.5);
		this.lifeBar.position.setTo(game.world.centerX - this.lifeBar.width, 35);
		this.lifeBar.scale.setTo(3, 1);

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

		//life bar
		if (this.playerlife.current >= 0){
			this.playerlife.current--;
			this.lifeBar.scale.setTo(3 * this.playerlife.current / this.playerlife.initial, 1);
		} else {
			game.state.start('gameover');
		}

		//sorteio de sair um obstáculo
		if (game.rnd.frac() < 0.02) {
			this.createObstacle();
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
		this.scoreText.text = 'Distance: ' + Math.ceil(game.score);
	},

	enemyCollisionHandler: function(body1, body2) {
		game.state.start('gameover');
	},

	powerupCollisionHandler: function(body1, body2) {
		if (body2.sprite) {
			body2.sprite.destroy();
		}

		if (this.playerlife.current > this.playerlife.initial - this.playerlife.powerup) {
			this.playerlife.current = this.playerlife.initial;
		} else {
			this.playerlife.current = this.playerlife.current + this.playerlife.powerup;
		}
	},

	createObstacle: function() {
		var obstacle;
		var random = game.rnd.frac();
		var defaultBody = false;

		switch (true) {
			case random < 0.1:
				obstacle = new Sewer(game, this);
				break;
			case random < 0.2:
				obstacle = new Cocolito(game, this);
				break;
			case random < 0.3:
				obstacle = new Fly(game, this);
				break;
			case random < 0.4:
				obstacle = new Dudu(game, this);
				break;
			default:
				obstacle = this.group.create(game.width, game.rnd.integerInRange(this.initialPosition.y, game.height), 'powerup');
				obstacle.attackSpeed = 1;
				obstacle.scale.setTo(.3,.3);

				obstacle.body.clearShapes();
				obstacle.body.loadPolygon('physicsData', obstacle.key);

				obstacle.body.setCollisionGroup(this.powerupsCollisionGroup);
				obstacle.body.collides([this.playerCollisionGroup]);

				obstacle.body.collideWorldBounds = false;
				obstacle.body.fixedRotation = true;
				obstacle.body.velocity.x = -this.velocity;
				obstacle.body.velocity.y = 0;
		}
	}
};

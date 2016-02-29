var playState = {

	create: function() {
		this.debugPhysics = true;
	
		this.forcas = {
			forcaPraBaixo: 20,
			empuxoDaAgua: .07,
			gravidade: 70
		};

		this.initialPosition = {
			x:250,
			y:220
		};

		this.playerlife = {
			initial: 1000,
			current: 1000,
			powerup: 100
		};

		this.lifeBar = game.add.sprite(game.world.centerX, 35, 'progressBar');
		this.lifeBar.anchor.setTo(0, 0.5);
		this.lifeBar.position.setTo(game.world.centerX - this.lifeBar.width, 35);
		this.lifeBar.scale.setTo(3, 1);

		this.velocity = -100;
		this.velocityIncrease = -0.05;
		
		game.score = 0;
		this.scoreText = game.add.text(16, 16, 'Distance: 0', { fontSize: '32px', fill: '#FFF' });
		
		// start the P2JS physics system
		game.physics.startSystem(Phaser.Physics.P2JS);
		game.physics.p2.setImpactEvents(true);
		this.playerCollisionGroup = game.physics.p2.createCollisionGroup();
		this.enemiesCollisionGroup = game.physics.p2.createCollisionGroup();
		this.powerupsCollisionGroup = game.physics.p2.createCollisionGroup();
		game.physics.p2.updateBoundsCollisionGroup();

		this.player = game.add.sprite(this.initialPosition.x, this.initialPosition.y, 'nadador');
		this.player.name = 'phaser-dude';
		this.player.scale.setTo(.35,.35);
		this.player.animations.add('nada', [0,1,2,3,4,5,6], 12, true);
		this.player.animations.play('nada');
		
		game.physics.p2.enable(this.player, this.debugPhysics);
		this.player.body.clearShapes();
		this.player.body.loadPolygon('physicsData', 'player');
		this.player.body.setCollisionGroup(this.playerCollisionGroup);
		this.player.body.collides(this.enemiesCollisionGroup, this.enemyCollisionHandler, this);
		this.player.body.collides(this.powerupsCollisionGroup, this.powerupCollisionHandler, this);
		this.player.body.fixedRotation = true;
		
		this.rastro = game.add.sprite(this.initialPosition.x - 100, this.initialPosition.y - 15, 'rastro');
		this.rastro.scale.setTo(.35,.35);
		this.rastro.animations.add('rastra', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], 12, true);
		this.rastro.animations.play('rastra');

		//cor da água #00375b

		this.agua = game.add.graphics(0, 220);
		this.agua.beginFill(0x00375b, .5);
		this.agua.drawRect(0, 0, 800, 400);


		this.bosta = game.add.sprite(0, 200, 'bosta');
		this.bosta.scale.setTo(.7,.7);
		this.bosta.animations.add('boia', [0,1,2,3,4,5], 4, true);
		this.bosta.animations.play('boia');

		this.isTouchDown = false;
		this.isJumping = false;

		group = game.add.group();
		group.enableBody = true;
		group.enableBodyDebug = this.debugPhysics;
		group.physicsBodyType = Phaser.Physics.P2JS;
		
		cursors = game.input.keyboard.createCursorKeys();

		/*
		* coloca o jogo pra escutar se há mouse down ou touch
		*/
		game.input.onDown.add(this.onTouchDown, this);
		game.input.onUp.add(this.onTouchUp, this);
	},

	onTouchDown: function(e) {
		this.isTouchDown = true;

		//se for para começar a nadar baixo, diminuir a possível velocidade para cima para dar uma resposta mais rápida
		if (!this.isJumping) {
			this.player.body.velocity.y /= 5;
		}
	},

	onTouchUp: function() {
		this.isTouchDown = false;
	},

	update: function() {
		//movimento horizontal do player
		this.player.body.velocity.x = 0;
		this.player.body.x = this.initialPosition.x;

		//player fora da água
		if (this.isJumping) {
			//gravidade
			this.player.body.velocity.y += this.forcas.gravidade;

			//ao entrar na água após o pulo, desacelerar
			if (this.player.body.y >= this.initialPosition.y) {
				this.player.body.velocity.y /= 10;
			}
		}
		//player dentro da água
		else {
			//empuxo
			this.player.body.velocity.y -= (this.player.body.y - this.initialPosition.y) * this.forcas.empuxoDaAgua;

			//nadar para baixo
			if (this.isTouchDown) {
				this.player.body.velocity.y += this.forcas.forcaPraBaixo;
			}
			//nadar para cima, somente se houver espaço
			else if (this.player.body.y > this.initialPosition.y + 10) {	
				this.player.body.velocity.y -= this.forcas.forcaPraBaixo;
			}
		}

		//atualiza se está dentro da água ou não
		this.isJumping = (this.player.body.y < this.initialPosition.y);

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
		
		group.forEach(function(enemy) {
		  if(enemy.body.x<0){
			  //out of the bounds
			  enemy.body.clearShapes();
			  enemy.kill();
		  }else if(enemy.body.y > game.world.height){
			  enemy.body.velocity.y *= -1;
		  }else if(enemy.body.y < this.initialPosition.y){
			  enemy.body.velocity.y = 0;
			  enemy.body.y = this.initialPosition.y;
		  }
		}, this);
		
		//velocidade do jogo
		this.velocity += this.velocityIncrease;
		
		//score
		game.score += -this.velocity/1000;
		this.scoreText.text = 'Distance: ' + Math.ceil(game.score);
	},

	enemyCollisionHandler: function(body1, body2) {
		game.state.start('gameover');
	},

	powerupCollisionHandler: function(body1, body2) {

		body2.sprite.destroy();

		if (this.playerlife.current > this.playerlife.initial - this.playerlife.powerup)
		{
			this.playerlife.current = this.playerlife.initial;
		} else {
			this.playerlife.current = this.playerlife.current + this.playerlife.powerup;
		}
	},
	
	createObstacle: function() {
		var obstacle;
		if (game.rnd.frac() < 0.4) {
			obstacle = group.create(800, game.rnd.integerInRange(this.initialPosition.y, 570), 'powerup');
		} else if(game.rnd.frac() < 0.8){
			obstacle = group.create(800, game.rnd.integerInRange(this.initialPosition.y, 570), 'tv');
		} else {
			obstacle = group.create(800, game.rnd.integerInRange(this.initialPosition.y, 500), 'sofa');
		}

		obstacle.scale.setTo(.3,.3);
		obstacle.body.clearShapes();
		obstacle.body.loadPolygon('physicsData', obstacle.key);

		if (obstacle.key === 'powerup')
		{

			obstacle.body.setCollisionGroup(this.powerupsCollisionGroup);
			obstacle.body.collides([this.powerupsCollisionGroup, this.enemiesCollisionGroup, this.playerCollisionGroup]);
		} else{
			obstacle.body.setCollisionGroup(this.enemiesCollisionGroup);
			obstacle.body.collides([this.powerupsCollisionGroup, this.enemiesCollisionGroup, this.playerCollisionGroup]);
		}

		obstacle.body.collideWorldBounds = false;
		obstacle.body.velocity.x = this.velocity;
	}
};
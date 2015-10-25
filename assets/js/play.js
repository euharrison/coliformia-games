var playState = {

	create: function() {
		this.debugPhysics = true;
	
		this.forcas = {
			forcaPraBaixo: 100,
			empuxoDaAgua: .02
		};

		this.initialPosition = {
			x:200,
			y:220
		};
		
		this.velocity = -100;
		this.velocityIncrease = -0.05;
		
		// start the P2JS physics system
		game.physics.startSystem(Phaser.Physics.P2JS);
		game.physics.p2.setImpactEvents(true);
		this.playerCollisionGroup = game.physics.p2.createCollisionGroup();
		this.enemiesCollisionGroup = game.physics.p2.createCollisionGroup();
		game.physics.p2.updateBoundsCollisionGroup();

		this.player = game.add.sprite(this.initialPosition.x + 50, this.initialPosition.y, 'nadador');
	    this.player.name = 'phaser-dude';
	    this.player.scale.setTo(.35,.35);
	    this.player.animations.add('nada', [0,1,2,3,4,5,6], 12, true);
	    this.player.animations.play('nada');
		
		game.physics.p2.enable(this.player, this.debugPhysics);
		this.player.body.clearShapes();
		this.player.body.loadPolygon('physicsData', 'player');
		this.player.body.setCollisionGroup(this.playerCollisionGroup);
		this.player.body.collides(this.enemiesCollisionGroup, this.collisionHandler, this);
		this.player.body.fixedRotation = true;
		
	    this.rastro = game.add.sprite(this.initialPosition.x - 50, this.initialPosition.y - 15, 'rastro');
	    this.rastro.scale.setTo(.35,.35);
	    this.rastro.animations.add('rastra', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], 12, true);
	    this.rastro.animations.play('rastra');

	    window.rastro = this.rastro;

	    //cor da água #00375b

	    this.agua = game.add.graphics(0, 220);
		this.agua.beginFill(0x00375b, .5);
		this.agua.drawRect(0, 0, 800, 400);


		this.bosta = game.add.sprite(0, 200, 'bosta');
		this.bosta.scale.setTo(.7,.7);
	    this.bosta.animations.add('boia', [0,1,2,3,4,5], 4, true);
	    this.bosta.animations.play('boia');

	    this.intouchdown = false;

	    group = game.add.group();
	    group.enableBody = true;
		group.enableBodyDebug = this.debugPhysics;
	    group.physicsBodyType = Phaser.Physics.P2JS;
		
	    cursors = game.input.keyboard.createCursorKeys();

	    /*
		* coloca o jogo pra escutar se há mouse down ou touch
	    */
		game.input.onDown.add(function(){
			this.player.body.velocity.y += this.forcas.forcaPraBaixo;
		}, this);
	},

	update: function() {
		if(this.intouchdown){
	    	this.player.body.velocity.y += this.forcas.forcaPraBaixo;
	    }

		this.player.body.velocity.x = 0;
		this.player.body.x = this.initialPosition.x;
		
	    if(this.player.body.y > this.initialPosition.y){
	    	this.player.body.velocity.y -= (this.player.body.y - this.initialPosition.y) * this.forcas.empuxoDaAgua;

	    	if (this.rastro.alpha === 1) {
	    		game.add.tween(this.rastro).to({alpha: 0}, 200).start();
	    	}

	    }else if(this.player.body.y < this.initialPosition.y){
	    	this.player.body.velocity.y = 0;
	    	this.player.body.y = this.initialPosition.y;

	    	if (this.rastro.alpha != 1) {
	    		game.add.tween(this.rastro).to({alpha: 1}, 200).start();
	    	}
	    }


	    if (game.rnd.frac() < 0.02) {
			this.createEnemy();
	    } 
		this.velocity += this.velocityIncrease;
		
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
	},

	collisionHandler: function(body1, body2) {
	    game.state.start('gameover');
	},
	
	createEnemy: function() {
		var enemy;
		if (game.rnd.frac() < 0.8) {
			enemy = group.create(800, game.rnd.integerInRange(this.initialPosition.y, 570), 'tv');
		} else {
			enemy = group.create(800, game.rnd.integerInRange(this.initialPosition.y, 500), 'sofa');
		}
		
		enemy.scale.setTo(.3,.3);
		enemy.body.clearShapes();
		enemy.body.loadPolygon('physicsData', enemy.key);
		enemy.body.setCollisionGroup(this.enemiesCollisionGroup);
		enemy.body.collideWorldBounds = false;
		enemy.body.collides([this.enemiesCollisionGroup, this.playerCollisionGroup]);
		enemy.body.velocity.x = this.velocity;
	}
};
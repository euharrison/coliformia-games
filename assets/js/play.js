var playState = {

	create: function() {

		this.forcas = {
			forcaPraBaixo: 10,
			empuxoDaAgua: .07
		};

		this.initialPosition = {
			x:200,
			y:180
		};

		this.player = game.add.sprite(this.initialPosition.x, this.initialPosition.y, 'nadador');
	    this.player.name = 'phaser-dude';
	    this.player.scale.setTo(.35,.35);
	    this.player.animations.add('nada', [0,1,2,3,4,5,6], 12, true);
	    this.player.animations.play('nada');

	    this.rastro = game.add.sprite(this.initialPosition.x - 50, this.initialPosition.y + 25, 'rastro');
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

	    game.physics.enable(this.player, Phaser.Physics.ARCADE);

	    group = game.add.group();
	    group.enableBody = true;
	    group.physicsBodyType = Phaser.Physics.ARCADE;

	    cursors = game.input.keyboard.createCursorKeys();

	    /*
		* coloca o jogo pra escutar se há mouse down ou touch
	    */
		game.input.onDown.add(function(){
			this.intouchdown = true;
		}, this);
		game.input.onUp.add(function(){
			this.intouchdown = false;
		}, this);
	},

	update: function() {
		game.physics.arcade.collide(this.player, group, this.collisionHandler, null, this);
	    //game.physics.arcade.overlap(this.player, group, this.collisionHandler, null, this);

	    if(this.intouchdown){
	    	this.player.body.velocity.y += this.forcas.forcaPraBaixo;
	    }

	    if(this.player.body.position.y > this.initialPosition.y){
	    	this.player.body.velocity.y -= (this.player.body.position.y - this.initialPosition.y) * this.forcas.empuxoDaAgua;

	    	if (this.rastro.alpha === 1) {
	    		game.add.tween(this.rastro).to({alpha: 0}, 200).start();
	    	}

	    }else if(this.player.body.position.y < this.initialPosition.y){
	    	this.player.body.velocity.y = 0;
	    	this.player.body.position.y = this.initialPosition.y;

	    	if (this.rastro.alpha != 1) {
	    		game.add.tween(this.rastro).to({alpha: 1}, 200).start();
	    	}
	    }


	    if (game.rnd.frac() < 0.02) {
			var enemy;
			if (game.rnd.frac() < 0.8) {
				enemy = group.create(800, game.rnd.integerInRange(this.initialPosition.y, 570), 'tv');
			} else {
				enemy = group.create(800, game.rnd.integerInRange(this.initialPosition.y, 500), 'sofa');
			}
			 
			enemy.scale.setTo(.3,.3);
			enemy.checkWorldBounds = true;
			enemy.outOfBoundsKill = true; //TODO validar que isso funciona, parece ter algum bug
			enemy.body.velocity.x = -600;
	    } 
	},

	collisionHandler: function() {
	    game.state.start('gameover');
	}
};
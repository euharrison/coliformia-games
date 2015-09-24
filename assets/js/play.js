var playState = {

	create: function() {

		this.forcas = {
			forcaPraBaixo: 10,
			empuxoDaAgua: .07
		};

		this.initialPosition = {
			x:32,
			y:200
		};

		this.player = game.add.sprite(this.initialPosition.x, this.initialPosition.y, 'phaser');
	    this.player.name = 'phaser-dude';

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
		// game.physics.arcade.collide(sprite, group, this.collisionHandler, null, this);
	    //game.physics.arcade.overlap(sprite, group, this.collisionHandler, null, this);

	    if(this.intouchdown){
	    	this.player.body.velocity.y += this.forcas.forcaPraBaixo;
	    }

	    if(this.player.body.position.y > this.initialPosition.y){
	    	this.player.body.velocity.y -= (this.player.body.position.y - this.initialPosition.y) * this.forcas.empuxoDaAgua;
	    }else if(this.player.body.position.y < this.initialPosition.y){
	    	this.player.body.velocity.y = 0;
	    	this.player.body.position.y = this.initialPosition.y;
	    }

	    if (game.rnd.frac() < 0.1) {
	        var c = group.create(800, game.rnd.integerInRange(0, 570), 'veggies');
	        c.body.velocity.x = -100;
	    } 

	    //TODO verificar quando o sprite sair da tela para apagar ele evitando memory leak
	},

	collisionHandler: function() {
		// veg.kill();

	    //HACK para reiniciar o jogo quando há uma colisão
	    game.state.start('menu');
	}
};
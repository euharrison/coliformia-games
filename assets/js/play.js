var playState = {

	create: function() {
		sprite = game.add.sprite(32, 200, 'phaser');
	    sprite.name = 'phaser-dude';

	    game.physics.enable(sprite, Phaser.Physics.ARCADE);
	    
	    group = game.add.group();
	    group.enableBody = true;
	    group.physicsBodyType = Phaser.Physics.ARCADE;


	    cursors = game.input.keyboard.createCursorKeys();
		
	},

	update: function() {
		// game.physics.arcade.collide(sprite, group, this.collisionHandler, null, this);
	    game.physics.arcade.overlap(sprite, group, this.collisionHandler, null, this);

	    sprite.body.velocity.x = 0;
	    sprite.body.velocity.y = 0;

	    if (cursors.left.isDown)
	    {
	        sprite.body.velocity.x = -200;
	    }
	    else if (cursors.right.isDown)
	    {
	        sprite.body.velocity.x = 200;
	    }

	    if (cursors.up.isDown)
	    {
	        sprite.body.velocity.y = -200;
	    }
	    else if (cursors.down.isDown)
	    {
	        sprite.body.velocity.y = 200;
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
	    location.href = location.href;
	}
};
var playState = {

	create: function() {
		sprite = game.add.sprite(32, 200, 'phaser');
	    sprite.name = 'phaser-dude';

	    game.physics.enable(sprite, Phaser.Physics.ARCADE);
	    
	    group = game.add.group();
	    group.enableBody = true;
	    group.physicsBodyType = Phaser.Physics.ARCADE;
	},

	update: function() {
		// game.physics.arcade.collide(sprite, group, this.collisionHandler, null, this);
	    game.physics.arcade.overlap(sprite, group, this.collisionHandler, null, this);

	    sprite.body.velocity.x = 0;
	    sprite.body.velocity.y = 0;


      if (game.input.activePointer.isDown) {
        sprite.body.velocity.y = 200;
      } else {
        if (sprite.body.position.y > 0) {
          sprite.body.velocity.y = -200;
        }
      }


	    if (game.rnd.frac() < 0.075) {
	        var enemy = group.create(800, game.rnd.integerInRange(0, 570), 'veggies');
          enemy.checkWorldBounds = true;
          enemy.outOfBoundsKill = true; //TODO validar que isso funciona, parece ter algum bug
          enemy.body.velocity.x = -600;
	    } 
	},

	collisionHandler: function() {
		
	    game.state.start('menu');
	}
};
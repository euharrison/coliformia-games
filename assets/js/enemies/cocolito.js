var Cocolito = function(game, play, x, y) {
  x = (x === undefined) ? game.width : x;
  y = (y === undefined) ? game.rnd.integerInRange(play.initialPosition.y, game.height) : y;

  Phaser.Sprite.call(this, game, x, y, 'cocolito');
  this.scale.set(0.5, 0.5);

  this.animations.add('cocolito', [0,1,2], 12, true);
  this.animations.play('cocolito');
  game.add.existing(this);

  game.physics.p2.enable(this, game.debugPhysics);
  this.body.clearShapes();
  this.body.loadPolygon('physicsData', this.key);
  this.body.fixedRotation = true;
  this.body.collideWorldBounds = false;
  this.body.velocity.x = -play.velocity;

  this.body.setCollisionGroup(play.enemiesCollisionGroup);
  this.body.collides([play.playerCollisionGroup]);
};

Cocolito.prototype = Object.create(Phaser.Sprite.prototype);
Cocolito.prototype.constructor = Cocolito;

var Fly = function (game, play) {
  Phaser.Sprite.call(this, game, game.width+75, play.initialPosition.y-50, 'fly');

  console.log(this.key);

  this.animations.add('fly', [0,1,2], 12, true);
  this.animations.play('fly');
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

Fly.prototype = new Enemy();
Fly.prototype.constructor = Fly;

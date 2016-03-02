var Fly = function (game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'fly');
  
  this.animations.add('fly', [0,1,2], 12, true);
  this.animations.play('fly');
  game.add.existing(this);

  game.physics.p2.enable(this, game.debugPhysics);
  this.body.clearShapes();
  this.body.loadPolygon('physicsData', this.key);
  this.body.fixedRotation = true;
  this.body.collideWorldBounds = false;
};

Fly.prototype = Object.create(Phaser.Sprite.prototype);
Fly.prototype.constructor = Fly;

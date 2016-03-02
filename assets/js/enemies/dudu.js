var Dudu = function (game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'dudu');
  
  this.animations.add('dudu', [0,1,2], 12, true);
  this.animations.play('dudu');
  game.add.existing(this);
  
  var laser = new Phaser.Image(game, -340, 10, 'dudu-laser');
  this.addChild(laser);

  game.physics.p2.enable(this, game.debugPhysics);
  this.body.clearShapes();
  this.body.loadPolygon('physicsData', 'dudu');
  this.body.fixedRotation = true;
  this.body.collideWorldBounds = false;
};

Dudu.prototype = Object.create(Phaser.Sprite.prototype);
Dudu.prototype.constructor = Dudu;

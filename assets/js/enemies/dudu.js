var Dudu = function (game, play) {
  Phaser.Sprite.call(this, game, game.width, play.initialPosition.y, 'dudu');

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
  this.body.velocity.x = -play.velocity;

  this.body.setCollisionGroup(play.enemiesCollisionGroup);
  this.body.collides([play.playerCollisionGroup]);
};

Dudu.prototype = new Enemy();
Dudu.prototype.constructor = Dudu;

Dudu.prototype.entra = function(){

};

Dudu.prototype.ataca = function(){

};

var Cocolito = function (game, x, y) {
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
};

Cocolito.prototype = Object.create(Phaser.Sprite.prototype);
Cocolito.prototype.constructor = Cocolito;

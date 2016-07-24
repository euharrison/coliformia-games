var Cocolito = function(game, play, group, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'cocolito');

  this.animations.add('cocolito', [0,1,2], 12, true);
  this.animations.play('cocolito');
  group.add(this);

  this.addBody(game, play, play.enemiesCollisionGroup, this.key);
};

Cocolito.prototype = new LevelItem();
Cocolito.prototype.constructor = Cocolito;

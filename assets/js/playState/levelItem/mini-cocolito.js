var MiniCocolito = function(game, play, group, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'mini-cocolito');

  this.animations.add('mini-cocolito', [0,1,2], 12, true);
  this.animations.play('mini-cocolito');
  group.add(this);

  this.addBody(game, play, play.enemiesCollisionGroup, this.key);
};

MiniCocolito.prototype = new LevelItem();
MiniCocolito.prototype.constructor = MiniCocolito;

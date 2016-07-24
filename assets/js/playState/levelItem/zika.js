var Zika = function (game, play, group, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'zika');

  this.animations.add('zika', [0,1,2], 12, true);
  this.animations.play('zika');
  group.add(this);

  this.addBody(game, play, play.enemiesCollisionGroup, this.key);
};

Zika.prototype = new LevelItem();
Zika.prototype.constructor = Zika;

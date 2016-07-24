var Zika = function (game, play, group) {
  Phaser.Sprite.call(this, game, game.width+539, play.initialPosition.y-120, 'zika');

  this.animations.add('zika', [0,1,2], 12, true);
  this.animations.play('zika');
  group.add(this);

  this.addBody(game, play, play.enemiesCollisionGroup, this.key);
};

Zika.prototype = new LevelItem();
Zika.prototype.constructor = Zika;

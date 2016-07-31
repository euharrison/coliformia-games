var Enemy = function(game, play, group, x, y, key, animationFrames) {
  Phaser.Sprite.call(this, game, x, y, key);

  this.animations.add(key, animationFrames, 12, true);
  this.animations.play(key);
  group.add(this);

  this.addBody(game, play, play.enemiesCollisionGroup, key);
};

Enemy.prototype = new LevelItem();
Enemy.prototype.constructor = Enemy;

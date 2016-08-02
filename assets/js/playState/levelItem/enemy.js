var Enemy = function(game, play, group, x, y, key) {
  Phaser.Sprite.call(this, game, x, y, key);

  this.animations.add(key, null, 12, true);
  this.animations.play(key);
  group.add(this);

  if (key == 'defunto' || key == 'sofa') {
    this.attackSpeed = 2;
  }

  if (key == 'monte-bosta') {
    this.attackSpeed = game.coliformiaConfig.monteBostaSpeed;
  }

  this.addBody(game, play, play.enemiesCollisionGroup, key);
};

Enemy.prototype = new LevelItem();
Enemy.prototype.constructor = Enemy;

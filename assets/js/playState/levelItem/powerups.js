var PowerUp = function(game, play, group, x, y, key) {
  Phaser.Sprite.call(this, game, x, y, key);

  this.animations.add(key, null, 12, true);
  this.animations.play(key);
  group.add(this);

  var body = this.addBody(game, play, play.powerupsCollisionGroup, key);

  if (key == 'injection') {
    body.power = 500;
  } else {
    body.power = 150;
  }
};

PowerUp.prototype = new LevelItem();
PowerUp.prototype.constructor = PowerUp;

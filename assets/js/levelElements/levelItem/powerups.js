var PowerUp = function(game, play, name, y, x) {
  x = (x === undefined) ? game.width : x;
  x += 225/2;

  y = (y === undefined) ? game.rnd.integerInRange(0, game.height-play.initialPosition.y-100) : y;
  y += play.initialPosition.y;

  Phaser.Sprite.call(this, game, x, y, name);

  this.animations.add(name, [0,1,2], 12, true);
  this.animations.play(name);
  game.add.existing(this);

  var body = this.addBody(game, play, play.powerupsCollisionGroup, this.key);

  if (name == 'powerup_injecao') {
    body.power = 1000;
  } else {
    body.power = 300;
  }
};

PowerUp.prototype = new LevelItem();
PowerUp.prototype.constructor = PowerUp;

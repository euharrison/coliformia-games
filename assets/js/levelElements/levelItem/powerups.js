var PowerUp = function(game, play, imgname, x, y) {
  x = (x === undefined) ? game.width+225 : x;
  y = (y === undefined) ? game.rnd.integerInRange(play.initialPosition.y, game.height) : y;

  Phaser.Sprite.call(this, game, x, y, imgname);

  this.animations.add(imgname, [0,1,2], 12, true);
  this.animations.play(imgname);
  game.add.existing(this);

  this.addBody(game, play, play.powerupsCollisionGroup, this.key);
};

PowerUp.prototype = new LevelItem();
PowerUp.prototype.constructor = PowerUp;

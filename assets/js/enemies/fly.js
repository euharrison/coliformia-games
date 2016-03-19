var Fly = function (game, play) {
  Phaser.Sprite.call(this, game, game.width+75, play.initialPosition.y-50, 'fly');

  console.log(this.key);

  this.animations.add('fly', [0,1,2], 12, true);
  this.animations.play('fly');
  game.add.existing(this);

  this.addBody(game, play, this.key);
};

Fly.prototype = new Enemy();
Fly.prototype.constructor = Fly;

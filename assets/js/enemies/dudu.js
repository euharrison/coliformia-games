var Dudu = function (game, play) {
  this.play = play;
  Phaser.Sprite.call(this, game, game.width * 0.9, play.initialPosition.y + 10, 'dudu');

  this.animations.add('dudu', [2, 1, 0], 12);
  this.animations.add('duduEntra', [0, 1, 2], 12);
  game.add.existing(this);

  this.anchor.setTo(0.5,0.5);
  this.scale.setTo(0.3,0.3);

  this.entra();
};

Dudu.prototype = new Enemy();
Dudu.prototype.constructor = Dudu;

Dudu.prototype.entra = function(){
    var tween = this.game.add.tween(this.scale).to({x:1.3 , y:1.3}, 1000, Phaser.Easing.Elastic.In);
    tween.onComplete.add(this.ataca, this);
    tween.start();

    this.animations.play('duduEntra');
};

Dudu.prototype.ataca = function(){
    this.animations.play('dudu');

    var laser = new Phaser.Image(game, 0, 0, 'dudu-laser');
    laser.scale.setTo(.3, .8);
    laser.anchor.setTo(1, 0);
    this.addChild(laser);

    this.addBody(game, this.play, 'dudu');
};

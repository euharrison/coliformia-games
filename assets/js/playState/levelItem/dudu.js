var Dudu = function (game, play) {
  this.play = play;
  Phaser.Sprite.call(this, game, game.width * 0.95, play.initialPosition.y + 10, 'dudu');

  this.animations.add('dudu', [2, 1, 0], 12);
  this.animations.add('duduEntra', [0, 1, 2], 12);
  game.add.existing(this);

  this.anchor.setTo(0.5,0.5);
  this.scale.setTo(0.2, 0.2);

  this.entra();
};

Dudu.prototype = new LevelItem();
Dudu.prototype.constructor = Dudu;

Dudu.prototype.entra = function(){
    var tween = this.game.add.tween(this.scale).to({x:1 , y:1}, 1000, Phaser.Easing.Elastic.In);
    tween.onComplete.add(this.ataca, this);
    tween.start();

    this.animations.play('duduEntra');
};

Dudu.prototype.ataca = function(){
    this.animations.play('dudu');

    var laser = new Phaser.Image(game, -392, -32, 'dudu-laser');
    this.addChild(laser);

    this.addBody(game, this.play, this.play.enemiesCollisionGroup, 'dudu');
};

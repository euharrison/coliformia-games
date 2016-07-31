var Dudu = function (game, play, group) {
  this.play = play;
  Phaser.Sprite.call(this, game, game.width-65, play.initialPosition.y+10, 'dudu');

  this.animations.add('duduEntra', [0, 0, 0, 1, 2, 2], 12);
  this.animations.add('dudu', [2, 1, 0], 12);
  group.add(this);

  this.anchor.setTo(0.5,0.5);
  this.scale.setTo(0.2, 0.2);

  this.entra();
};

Dudu.prototype = new LevelItem();
Dudu.prototype.constructor = Dudu;

Dudu.prototype.entra = function(){
  this.animations.play('duduEntra');

  var tween = this.game.add.tween(this.scale).to({ x:1 , y:1 }, 500, Phaser.Easing.Back.Out, true);

  this.game.time.events.add(Phaser.Timer.SECOND*1.5, this.fechaOlhos, this);
};

Dudu.prototype.fechaOlhos = function() {
  this.animations.play('dudu');
  this.game.time.events.add(Phaser.Timer.SECOND*4/12, this.ataca, this);
};

Dudu.prototype.ataca = function() {
  var laser = new Phaser.Image(game, -341, -14, 'dudu-laser');
  this.addChild(laser);

  this.attackSpeed = 4;
  this.addBody(game, this.play, this.play.enemiesCollisionGroup, 'dudu');
};

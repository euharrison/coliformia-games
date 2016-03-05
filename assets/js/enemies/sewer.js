var Sewer = function (game, play) {
  this.game = game;
  this.play = play;
  
  this.sewer = new Phaser.Image(game, game.width, play.initialPosition.y, 'sewer');
  this.sewer.scale.set(0.5, 0.5);
  game.add.existing(this.sewer);

  this.tween({ x: game.width-170 }, this.goDown);
};

Sewer.prototype.goDown = function() {
  this.releaseCocolito();
  this.tween({ y: this.game.height-170 }, this.goUp);
};

Sewer.prototype.goUp = function() {
  this.releaseCocolito();
  this.tween({ y: this.play.initialPosition.y }, this.goBack);
};

Sewer.prototype.goBack = function() {
  this.releaseCocolito();
  this.tween({ x: game.width }, this.remove);
};

Sewer.prototype.remove = function(value, callback) {
  this.sewer.destroy();
};

Sewer.prototype.tween = function(value, callback) {
  var tween = this.game.add.tween(this.sewer).to(value, 500, Phaser.Easing.Cubic.Out).start();
  tween.onComplete.add(callback, this);
  tween.start();
};

Sewer.prototype.releaseCocolito = function(value, callback) {
  new Cocolito(this.game, this.play, this.sewer.x, this.sewer.y+60);
};

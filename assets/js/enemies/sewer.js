var Sewer = function (game, play) {
  this.game = game;
  this.play = play;

  this.sewer = new Phaser.Image(game, game.width, play.initialPosition.y, 'sewer');
  this.sewer.scale.set(0.5, 0.5);
  game.add.existing(this.sewer);

  this.steps = [
    'enter',
    'releaseCocolito',
    'goDown',
    'releaseCocolito',
    'goUp',
    'releaseCocolito',
    'goBack',
    'remove'
  ];

  this.currentStep = 0;
  this.enter();
};

Sewer.prototype = new Enemy();

Sewer.prototype.tween = function(value, callback) {
  var tween = this.game.add.tween(this.sewer).to(value, 1000, Phaser.Easing.Elastic.In);
  tween.onComplete.add(callback, this);
  tween.start();
};

Sewer.prototype.nextStep = function(){
    if (typeof this[this.steps[this.currentStep + 1]] === 'function') {
        this.currentStep++;
        this[this.steps[this.currentStep]]();
    }
};

Sewer.prototype.enter = function() {
  this.tween({ x: game.width-170 }, this.nextStep);
};

Sewer.prototype.goDown = function() {
  this.tween({ y: this.game.height-170 }, this.nextStep);
};

Sewer.prototype.goUp = function() {
  this.tween({ y: this.play.initialPosition.y }, this.nextStep);
};

Sewer.prototype.goBack = function() {
  this.tween({ x: game.width }, this.nextStep);
};

Sewer.prototype.remove = function() {
  this.sewer.destroy();
};

Sewer.prototype.releaseCocolito = function() {
    var isso = this;

    var tween = this.game.add.tween(this.sewer).to({ x: isso.sewer.x + 50 }, 500, Phaser.Easing.Elastic.In);
    tween.onComplete.add(function() {
        new Cocolito(this.game, this.play, this.sewer.x, this.sewer.y+60);
        this.tween({ x: isso.sewer.x - 50 }, this.nextStep);
    }, this);
    tween.start();
};

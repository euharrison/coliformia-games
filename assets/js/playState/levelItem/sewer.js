var Sewer = function (game, play, group) {
  this.game = game;
  this.play = play;
  this.group = group;

  this.sewer = new Phaser.Image(game, game.width, play.initialPosition.y-60, 'sewer');
  group.add(this.sewer);

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

Sewer.prototype = new LevelItem();

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
  this.tween({ y: this.game.height-150 }, this.nextStep);
};

Sewer.prototype.goUp = function() {
  this.tween({ y: this.play.initialPosition.y-60 }, this.nextStep);
};

Sewer.prototype.goBack = function() {
  this.tween({ x: game.width }, this.nextStep);
};

Sewer.prototype.remove = function() {
  this.sewer.destroy();
};

Sewer.prototype.releaseCocolito = function() {
  var isso = this;

  var tween = this.game.add.tween(this.sewer).to({ x: isso.sewer.x+33 }, 500, Phaser.Easing.Elastic.In);
  tween.onComplete.add(function() {
    this.game.coliformiaSounds.coco_canhao.play();
    this.play.pool.get('cocolito',this.sewer.x, this.sewer.y+80);
    this.tween({ x: isso.sewer.x-33 }, this.nextStep);
  }, this);
  tween.start();
};

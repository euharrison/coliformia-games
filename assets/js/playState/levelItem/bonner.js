var Bonner = function(game, play, group) {
  this.game = game;
  this.play = play;
  this.group = group;

  Phaser.Sprite.call(this, game, game.width-170, play.initialPosition.y+30, 'bonner');
  this.animations.add('atira', [0,1,2,3], 12);

  this.anchor.setTo(0.5, 0.5);
  this.scale.setTo(0, 0);
  group.add(this);

  this.steps = [
    'enter',
    'desceAtirando',
    'desceAtirando',
    'desceAtirando',
    'desceAtirando',
    'desceAtirando',
    'desceAtirando',
    'desceMais',
    'sobeAtirando',
    'sobeAtirando',
    'sobeAtirando',
    'sobeAtirando',
    'sobeAtirando',
    'sobeAtirando',
    'sobeAtirando',
    'sobeMais',
    'remove'
  ];

  this.currentStep = 0;
  this.enter();
};

Bonner.prototype = new LevelItem();
Bonner.prototype.constructor = Bonner;

Bonner.prototype.nextStep = function(){
  if (typeof this[this.steps[this.currentStep + 1]] === 'function') {
    this.currentStep++;
    this[this.steps[this.currentStep]]();
  }
};

Bonner.prototype.enter = function(){
  var tween = this.game.add.tween(this.scale).to({ x:1 , y:1 }, 500, Phaser.Easing.Back.Out);
  tween.onComplete.add(this.nextStep, this);
  tween.start();
};

Bonner.prototype.desceAtirando = function() {
  this.animations.play('atira');
  this.atira();
  var tween = this.game.add.tween(this.position).to({ y:this.y+60 }, 80, Phaser.Easing.Cubic.Out);
  tween.onComplete.add(this.nextStep, this);
  tween.start();
};

Bonner.prototype.desceMais = function() {
  var tween = this.game.add.tween(this.position).to({ y:this.y+30 }, 300, Phaser.Easing.Cubic.Out);
  tween.onComplete.add(this.nextStep, this);
  tween.start();
};

Bonner.prototype.sobeAtirando = function() {
  this.atira();
  var tween = this.game.add.tween(this.position).to({ y:this.y-60 }, 80, Phaser.Easing.Cubic.Out);
  tween.onComplete.add(this.nextStep, this);
  tween.start();
};

Bonner.prototype.sobeMais = function() {
  var tween = this.game.add.tween(this.position).to({ y:this.y-60 }, 200, Phaser.Easing.Cubic.Out);
  tween.onComplete.add(this.nextStep, this);
  tween.start();
};

Bonner.prototype.remove = function() {
  var tween = this.game.add.tween(this.scale).to({ x:0 , y:0 }, 500, Phaser.Easing.Elastic.In);
  tween.onComplete.add(this.nextStep, this);
  tween.start();
};

Bonner.prototype.atira = function() {
  this.play.pool.createMiniCocolito(this.x, this.y);

  var tween = this.game.add.tween(this).to({ angle:10 }, 100, Phaser.Easing.Cubic.Out, true);
  tween.onComplete.add(function() {
    this.game.add.tween(this).to({ angle:0 }, 100, Phaser.Easing.Cubic.Out, true);
  }, this);
};

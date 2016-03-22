var Bonner = function(game, play){
    this.game = game;
    this.play = play;


    Phaser.Sprite.call(this, game, game.width - 170, play.initialPosition.y+50, 'bonner');
    this.animations.add('atira', [0,1,2,3,2,1,0], 24);

    this.anchor.setTo(0.5, 0.5);
    this.scale.setTo(0.05, 0.05);
    game.add.existing(this);

    this.steps = [
      'enter',
      'desceAtirando',
      'desceAtirando',
      'desceAtirando',
      'desceMais',
      'sobeAtirando',
      'sobeAtirando',
      'sobeAtirando',
      'sobeMais',
      'remove'
    ];

    this.currentStep = 0;
    this.enter();
};

Bonner.prototype = new Enemy();
Bonner.prototype.constructor = Bonner;

Bonner.prototype.nextStep = function(){
    if (typeof this[this.steps[this.currentStep + 1]] === 'function') {
        this.currentStep++;
        this[this.steps[this.currentStep]]();
    }
};

Bonner.prototype.enter = function(){
    var tween = this.game.add.tween(this.scale).to({x:0.5 , y:0.5}, 500, Phaser.Easing.Elastic.In);
    tween.onComplete.add(this.nextStep, this);
    tween.start();
};

Bonner.prototype.desceAtirando = function(){
    var tween = this.game.add.tween(this.position).to({y:this.y + 50}, 500, Phaser.Easing.Cubic.Out);
    tween.onComplete.add(this.nextStep, this);
    this.atira();
    tween.start();
};

Bonner.prototype.desceMais = function(){
    var tween = this.game.add.tween(this.position).to({y:this.y + 150}, 500, Phaser.Easing.Cubic.Out);
    tween.onComplete.add(this.nextStep, this);
    this.atira();
    tween.start();
};

Bonner.prototype.sobeAtirando = function(){
    var tween = this.game.add.tween(this.position).to({y:this.y - 50}, 500, Phaser.Easing.Cubic.Out);
    tween.onComplete.add(this.nextStep, this);
    this.atira();
    tween.start();
};

Bonner.prototype.sobeMais = function(){
    var tween = this.game.add.tween(this.position).to({y:this.y - 150}, 500, Phaser.Easing.Cubic.Out);
    tween.onComplete.add(this.nextStep, this);
    this.atira();
    tween.start();
};

Bonner.prototype.remove = function(){
    var tween = this.game.add.tween(this.scale).to({x:0.01 , y:0.01}, 500, Phaser.Easing.Elastic.In);
    tween.onComplete.add(this.nextStep, this);
    tween.start();
};

Bonner.prototype.atira = function(){
    var tween = this.game.add.tween(this).to({angle:'+15'}, 50, Phaser.Easing.Cubic.Out);
    tween.onComplete.add(function(){
        new Cocolito(this.game, this.play, this.x, this.y);
        this.game.add.tween(this).to({angle:'-15'}, 200, Phaser.Easing.Elastic.Out).start();
    }, this);

    this.animations.play('atira');
    tween.start();
};

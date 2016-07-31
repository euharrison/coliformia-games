var PlayerRastro = function(game, player) {
  this.player = player;

  Phaser.Sprite.call(this, game, this.player.initialPosition.x-100, this.player.initialPosition.y-35, 'rastro');
  this.animations.add('rastra', null, 12, true);
  this.animations.play('rastra');

  game.add.existing(this);
};

PlayerRastro.prototype = Object.create(Phaser.Sprite.prototype);

PlayerRastro.prototype.update = function(){
  if (this.player.initialPosition.y - 10 <= this.player.body.y &&
    this.player.body.y <= this.player.initialPosition.y + 10){
    this.visible = true;
  } else {
    this.visible = false;
  }
};

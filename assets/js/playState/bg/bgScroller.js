var BgScroller = function(game, play, spriteName, speedModifier, height){

  this.play = play;
  this.speedModifier = speedModifier || 1;
  this.speedModifier = this.speedModifier/play.velocity;

  this.elems = [];
  this.elems[0] = new Phaser.Image(game, 0, height, spriteName);
  this.elems[1] = new Phaser.Image(game, this.elems[0].width, height, spriteName);

  for (var i = 0; i < this.elems.length; i++)
  {
    game.add.existing(this.elems[i]);
  }
};

BgScroller.prototype = Object.create(Phaser.Sprite.prototype);

BgScroller.prototype.update = function(){

  if (this.elems[0].x <= -this.elems[0].width) {
    this.elems[0].x = this.elems[1].x - this.play.velocity  * this.speedModifier;
    this.elems[1].x = this.elems[0].x + this.elems[0].width;
  } else {
    this.elems[0].x -= this.play.velocity  * this.speedModifier;
    this.elems[1].x -= this.play.velocity  * this.speedModifier;
  }
};

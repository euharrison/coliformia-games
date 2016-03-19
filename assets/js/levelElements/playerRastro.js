var PlayerRastro = function(game, player) {
    this.player = player;

    Phaser.Sprite.call(this, game, this.player.initialPosition.x - 100, this.player.initialPosition.y - 15, 'rastro');

    //this.sprite = game.add.sprite(this.player.initialPosition.x - 100, this.player.initialPosition.y - 15, 'rastro');
    this.scale.setTo(.35,.35);
    this.animations.add('rastra', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], 12, true);
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

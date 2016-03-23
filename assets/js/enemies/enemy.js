var Enemy = function(){
    this.attackSpeed = 1;
}

Enemy.prototype = Object.create(Phaser.Sprite.prototype);

Enemy.prototype.addBody = function(game, play, key){
    game.physics.p2.enable(this, game.debugPhysics);
    this.body.clearShapes();
    this.body.loadPolygon('physicsData', key);
    this.body.fixedRotation = true;
    this.body.collideWorldBounds = false;
    this.body.velocity.x = -play.velocity * this.attackSpeed;

    this.body.setCollisionGroup(play.enemiesCollisionGroup);
    this.body.collides([play.playerCollisionGroup]);
};

Enemy.prototype.update = function() {
  if (this.body) {
    if (this.body.x < 0) {
      this.destroy();
    }
  }
}

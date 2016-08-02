var LevelItem = function() {
  this.attackSpeed = 3.5;
}

LevelItem.prototype = Object.create(Phaser.Sprite.prototype);

LevelItem.prototype.addBody = function(game, play, colisionGroup, key){
  game.physics.p2.enable(this, game.coliformiaConfig.debugPhysics);
  this.body.clearShapes();
  this.body.loadPolygon('physicsData', key);
  this.body.fixedRotation = true;
  this.body.collideWorldBounds = false;
  this.body.velocity.x = -play.velocity * this.attackSpeed;

  this.body.setCollisionGroup(colisionGroup);
  this.body.collides([play.playerCollisionGroup]);

  return this.body;
};

LevelItem.prototype.update = function() {
  if (this.body) {
    if (this.body.x < -400) {
      this.kill();
    }
  }
}

LevelItem.prototype.reviveItem = function(x, y, velocity) {
  this.revive();
  this.reset(x, y);
  this.body.velocity.x = velocity * this.attackSpeed;
}

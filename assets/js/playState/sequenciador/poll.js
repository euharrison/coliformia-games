var Poll = function(game, play, group) {

  //public

  this.createCocolito = createCocolito;

  //private

  var game = game;
  var play = play;
  var group = group;

  function createCocolito(x, y) {
    var levelItem = group.getFirstDead();
    if (levelItem) {
      levelItem.reviveItem(x, y, -play.velocity);
    } else {
      levelItem = new Cocolito(game, play, group, x, y);
    }
  }
};

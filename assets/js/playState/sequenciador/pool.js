var Pool = function(game, play, group) {

  //public

  this.get = get;

  //private

  var game = game;
  var play = play;
  var enemies = {
    'cocolito': game.add.group(group),
    'zika': game.add.group(group),
    'defunto': game.add.group(group),
    'mini-cocolito': game.add.group(group),
  }

  function get(key, x, y) {
    createEnemy(key, x, y);
  }

  function createEnemy(id, x, y) {
    var group = enemies[id];
    var levelItem = group.getFirstDead();

    if (levelItem) {
      levelItem.reviveItem(x, y, -play.velocity);
      levelItem.bringToTop();
      return;
    } 

    new Enemy(game, play, group, x, y, id);
  }
};

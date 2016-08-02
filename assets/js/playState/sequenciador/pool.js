var Pool = function(game, play, group) {

  //public

  this.get = get;

  //private

  var game = game;
  var play = play;
  var groups = {
    'cocolito': game.add.group(group),
    'garrafa-pet': game.add.group(group),
    'zika': game.add.group(group),
    'defunto': game.add.group(group),
    'sofa': game.add.group(group),
    'monte-bosta': game.add.group(group),
    'mini-cocolito': game.add.group(group),
    'sus': game.add.group(group),
    'injection': game.add.group(group),
  }

  function get(key, x, y) {
    var group = groups[key];
    var levelItem = group.getFirstDead();

    if (levelItem) {
      levelItem.reviveItem(x, y, -play.velocity);
      levelItem.bringToTop();
    } else {
      if (key == 'sus' || key == 'injection') {
        levelItem = new PowerUp(game, play, group, x, y, key);
      } else {
        levelItem = new Enemy(game, play, group, x, y, key);
      }
    }

    return levelItem;
  }
};

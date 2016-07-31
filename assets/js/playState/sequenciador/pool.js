var Pool = function(game, play, group) {

  //public

  this.get = get;

  //private

  var game = game;
  var play = play;
  var enemies = {
    'cocolito': game.add.group(group),
    'garrafa-pet': game.add.group(group),
    'zika': game.add.group(group),
    'defunto': game.add.group(group),
    'sofa': game.add.group(group),
    'monte-bosta': game.add.group(group),
    'mini-cocolito': game.add.group(group),
  }

  function get(key, x, y) {
    var group = enemies[key];
    var levelItem = group.getFirstDead();

    if (levelItem) {
      levelItem.reviveItem(x, y, -play.velocity);
      levelItem.bringToTop();
    } else {
      levelItem = new Enemy(game, play, group, x, y, key);
    }

    return levelItem;
  }
};

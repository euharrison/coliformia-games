var Poll = function(game, play, group) {

  //public

  this.createCocolito = createCocolito;
  this.createZika = createZika;

  //private

  var game = game;
  var play = play;
  var enemies = {
    'cocolito': game.add.group(group),
    'zika': game.add.group(group)
  }

  function createCocolito(x, y) {
    createEnemy('cocolito', x, y);
  }

  function createZika(x, y) {
    createEnemy('zika', x, y);
  }

  function createEnemy(id, x, y) {
    var group = enemies[id];
    var levelItem = group.getFirstDead();

    if (levelItem) {
      levelItem.reviveItem(x, y, -play.velocity);
      return;
    } 

    switch (id) {
      case 'cocolito':
        new Cocolito(game, play, group, x, y);
        break;
      case 'zika':
        new Zika(game, play, group, x, y);
        break;
    }
  }
};

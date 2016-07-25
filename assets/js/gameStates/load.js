var loadState = {

  preload: function () {
    // Add loading screen
    game.add.image(0, 0, 'loading-screen');

    var progressBar = game.add.sprite(457, 487, 'loading-bar');
    game.load.setPreloadSprite(progressBar);

    // Load other screens
    game.load.image('start-screen', 'assets/sprites/screens/start-screen.png');
    game.load.image('gameover-screen', 'assets/sprites/screens/gameover-screen.png');

    // Load game sprites
    var SPRITES_DIR = 'assets/sprites/';

    game.load.image('bg', SPRITES_DIR + 'bg/bg.png');
    game.load.image('bg-sky', SPRITES_DIR + 'bg/bg-sky.png');
    game.load.image('bg-clouds', SPRITES_DIR + 'bg/bg-clouds.png');
    game.load.image('bg-mountains-back', SPRITES_DIR + 'bg/bg-mountains-back.png');
    game.load.image('bg-mountains-front', SPRITES_DIR + 'bg/bg-mountains-front.png');
    game.load.image('bg-buildings', SPRITES_DIR + 'bg/bg-buildings.png');
    game.load.image('bg-water', SPRITES_DIR + 'bg/bg-water.png');
    game.load.image('bg-waves', SPRITES_DIR + 'bg/bg-waves.png');
    game.load.image('bg-grass', SPRITES_DIR + 'bg/bg-grass.png');

    game.load.spritesheet('bg-water-back', SPRITES_DIR + 'bg/bg-water-back.png', 1280, 101);
    game.load.spritesheet('bg-water-front', SPRITES_DIR + 'bg/bg-water-front.png', 1280, 101);

    game.load.image('lifeBg', SPRITES_DIR + 'life/lifeBg.svg');
    game.load.image('lifeBar', SPRITES_DIR + 'life/lifeBar.svg');
    game.load.image('lifeSkull', SPRITES_DIR + 'life/lifeSkull.svg');

    game.load.spritesheet('player', SPRITES_DIR + 'player.png', 150, 120);

    game.load.spritesheet('bonner', SPRITES_DIR + 'enemies/bonner.png', 431, 304);
    game.load.spritesheet('zika', SPRITES_DIR + 'enemies/zika.png', 359, 253);
    game.load.spritesheet('dudu', SPRITES_DIR + 'enemies/dudu.png', 237, 207);
    game.load.spritesheet('dudu-laser', SPRITES_DIR + 'enemies/dudu-laser.png', 272, 375);
    game.load.spritesheet('cocolito', SPRITES_DIR + 'enemies/cocolito.png', 150, 120);
    game.load.image('sewer', SPRITES_DIR + 'enemies/sewer.png', 237, 175);

    game.load.image('sus', SPRITES_DIR + 'powerup_sus.png');
    game.load.image('injection', SPRITES_DIR + 'powerup_injecao.png');

    game.load.spritesheet('rastro', SPRITES_DIR + 'rastro.png', 293, 56);

    // Load physics data json
    game.load.physics('physicsData', 'assets/physics/collision.json');
  },

  create: function() {
    game.state.start('menu');
  }
};

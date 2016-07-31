var loadState = {

  preload: function () {
    // Add loading screen
    game.add.image(0, 0, 'loading-screen');

    var progressBar = game.add.sprite(457, 487, 'loading-bar');
    game.load.setPreloadSprite(progressBar);

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

    game.load.image('start-screen', SPRITES_DIR + 'ui/start-screen.png');

    game.load.image('lifebar-outline', SPRITES_DIR + 'ui/lifebar-outline.png');
    game.load.image('lifebar', SPRITES_DIR + 'ui/lifebar.png');
    game.load.image('lifebar-skull', SPRITES_DIR + 'ui/lifebar-skull.png');
    game.load.image('score-bg', SPRITES_DIR + 'ui/score-bg.png');

    game.load.image('gameover-logo', SPRITES_DIR + 'ui/gameover-logo.png');
    game.load.image('button-play-again', SPRITES_DIR + 'ui/button-play-again.png');
    game.load.image('button-share', SPRITES_DIR + 'ui/button-share.png');

    game.load.image('disease1', SPRITES_DIR + 'diseases/1.jpg');
    game.load.image('disease2', SPRITES_DIR + 'diseases/2.jpg');
    game.load.image('disease3', SPRITES_DIR + 'diseases/3.jpg');
    game.load.image('disease4', SPRITES_DIR + 'diseases/4.jpg');
    game.load.image('disease5', SPRITES_DIR + 'diseases/5.jpg');
    game.load.image('disease6', SPRITES_DIR + 'diseases/6.jpg');

    game.load.spritesheet('bonner', SPRITES_DIR + 'enemies/bonner.png', 431, 304);
    game.load.spritesheet('zika', SPRITES_DIR + 'enemies/zika.png', 359, 253);
    game.load.spritesheet('dudu', SPRITES_DIR + 'enemies/dudu.png', 236, 207);
    game.load.spritesheet('dudu-laser', SPRITES_DIR + 'enemies/dudu-laser.png', 347, 465);
    game.load.spritesheet('cocolito', SPRITES_DIR + 'enemies/cocolito.png', 150, 120);
    game.load.spritesheet('mini-cocolito', SPRITES_DIR + 'enemies/mini-cocolito.png', 110, 88);
    game.load.image('sewer', SPRITES_DIR + 'enemies/sewer.png', 237, 175);

    game.load.image('sus', SPRITES_DIR + 'powerup/sus.png');
    game.load.image('injection', SPRITES_DIR + 'powerup/injecao.png');

    game.load.spritesheet('player', SPRITES_DIR + 'player.png', 150, 120);

    game.load.spritesheet('rastro', SPRITES_DIR + 'rastro.png', 293, 56);

    // Load physics data json
    game.load.physics('physicsData', 'assets/physics/collision.json');
  },

  create: function() {
    game.state.start('menu');
  }
};

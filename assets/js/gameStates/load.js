var loadState = {

	preload: function () {
		// Add loading screen
		game.add.image(0, 0, 'loading-screen');

		var progressBar = game.add.sprite(685, 730, 'progress-bar');
		game.load.setPreloadSprite(progressBar);

		// Load other screens
		game.load.image('start-screen', 'assets/img/start-screen.png');
		game.load.image('gameover-screen', 'assets/img/gameover-screen.png');

		// Load game sprites
		var SPRITES_DIR = 'assets/sprites/';

		game.load.image('bg', SPRITES_DIR + 'bg/bg.png');
		game.load.image('bg_montanhas', SPRITES_DIR + 'bg/bg_montanhas.png');
		game.load.image('bg_predios', SPRITES_DIR + 'bg/bg_predios.png');

		game.load.image('lifeBg', SPRITES_DIR + 'life/lifeBg.svg');
		game.load.image('lifeBar', SPRITES_DIR + 'life/lifeBar.svg');
		game.load.image('lifeSkull', SPRITES_DIR + 'life/lifeSkull.svg');

		game.load.spritesheet('player', SPRITES_DIR + 'player.png', 225, 180);

		game.load.spritesheet('bonner', SPRITES_DIR + 'enemies/bonner.png', 646, 455);
		game.load.spritesheet('fly', SPRITES_DIR + 'enemies/fly.png', 539, 380);
		game.load.spritesheet('dudu', SPRITES_DIR + 'enemies/dudu.png', 355, 311);
		game.load.spritesheet('dudu-laser', SPRITES_DIR + 'enemies/dudu-laser.png', 408, 562);
		game.load.spritesheet('cocolito', SPRITES_DIR + 'enemies/cocolito.png', 225, 180);
		game.load.image('sewer', SPRITES_DIR + 'enemies/sewer.png', 355, 262);

		game.load.image('sus', SPRITES_DIR + 'powerup_sus.png');
		game.load.image('injection', SPRITES_DIR + 'powerup_injecao.png');

		game.load.spritesheet('rastro', SPRITES_DIR + 'rastro.png', 440, 84);

		// Load physics data json
		game.load.physics('physicsData', 'assets/physics/collision.json');
	},

	create: function() {
		game.state.start('menu');
	}
};

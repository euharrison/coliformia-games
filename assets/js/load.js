var loadState = {

	preload: function () {
		// Add a loading label
		var loadingLabel = game.add.text(game.world.centerX, 150, 'loading...', { font: '30px Arial', fill: '#ffffff' });
		loadingLabel.anchor.setTo(0.5, 0.5);

		// Add a progress bar
		var progressBar = game.add.sprite(game.world.centerX, 200, 'progressBar');
		progressBar.anchor.setTo(0.5, 0.5);
		game.load.setPreloadSprite(progressBar);

		var BASE_DIR = 'assets/sprites/';

		// Load all assets
		game.load.image('bg', BASE_DIR + 'bg/bg.png');
		game.load.image('bg_montanhas', BASE_DIR + 'bg/bg_montanhas.png');
		game.load.image('bg_predios', BASE_DIR + 'bg/bg_predios.png');

		game.load.image('lifeBg', BASE_DIR + 'life/lifeBg.svg');
		game.load.image('lifeBar', BASE_DIR + 'life/lifeBar.svg');
		game.load.image('lifeSkull', BASE_DIR + 'life/lifeSkull.svg');

		game.load.spritesheet('player', BASE_DIR + 'player.png', 225, 180);

		game.load.spritesheet('bonner', BASE_DIR + 'enemies/bonner.png', 646, 455);
		game.load.spritesheet('fly', BASE_DIR + 'enemies/fly.png', 539, 380);
		game.load.spritesheet('dudu', BASE_DIR + 'enemies/dudu.png', 355, 311);
		game.load.spritesheet('dudu-laser', BASE_DIR + 'enemies/dudu-laser.png', 408, 562);
		game.load.spritesheet('cocolito', BASE_DIR + 'enemies/cocolito.png', 225, 180);
		game.load.image('sewer', BASE_DIR + 'enemies/sewer.png', 355, 262);

		game.load.image('powerup_sus', BASE_DIR + 'powerup_sus.png');
		game.load.image('powerup_injecao', BASE_DIR + 'powerup_injecao.png');

		game.load.spritesheet('rastro', BASE_DIR + 'rastro.png', 440, 84);

		// load the physics data json
		game.load.physics('physicsData', 'assets/physics/collision.json');
	},

	create: function() {
		game.state.start('menu');
	}
};

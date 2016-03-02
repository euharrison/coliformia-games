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
		game.load.spritesheet('player', BASE_DIR + 'player.png', 225, 180);

		game.load.spritesheet('fly', BASE_DIR + 'enemies/fly.png', 151, 100);
		game.load.spritesheet('dudu', BASE_DIR + 'enemies/dudu.png', 114, 100);
		game.load.spritesheet('dudu-laser', BASE_DIR + 'enemies/dudu-laser.png', 365, 500);

		game.load.image('tv', BASE_DIR + 'tv.png');
		game.load.image('sofa', BASE_DIR + 'sofa.png');
		game.load.image('powerup', BASE_DIR + 'powerup.png');

		game.load.spritesheet('bosta', BASE_DIR + 'bosta.png', 334, 578);
		game.load.spritesheet('rastro', BASE_DIR + 'rastro.png', 440, 84);
		
		// load the physics data json
		game.load.physics('physicsData', 'assets/physics/collision.json');
	},

	create: function() {
		game.state.start('menu');
	}
};
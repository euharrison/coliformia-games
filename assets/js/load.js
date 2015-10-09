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
		game.load.spritesheet('nadador', BASE_DIR + 'nadador.png', 210, 206);
		game.load.spritesheet('rastro', BASE_DIR + 'rastro.png', 440, 84);

		game.load.image('tv', BASE_DIR + 'tv.png');

		game.load.spritesheet('bosta', BASE_DIR + 'bosta.png', 334, 578);
	},

	create: function() {
		game.state.start('menu');
	}
};
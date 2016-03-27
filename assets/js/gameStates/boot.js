var bootState = {

	preload: function () {
		game.load.image('progressBar', 'assets/img/progressBar.png');
	},

	create: function() {
		// Set a background color
		game.stage.backgroundColor = '#000';

		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.state.start('load');

		game.coliformiaConfig = ColiformiaConfigurations.getInstance();
	}
};

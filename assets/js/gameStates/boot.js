var bootState = {

	preload: function () {
		game.load.image('progress-bar', 'assets/img/progress-bar.png');
		game.load.image('loading-screen', 'assets/img/loading-screen.png');
	},

	create: function() {
		// Set a background color
		game.stage.backgroundColor = '#000';

		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.state.start('load');

		game.coliformiaConfig = ColiformiaConfigurations.getInstance();
	}
};

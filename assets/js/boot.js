var bootState = {

	preload: function () {
		game.load.image('progressBar', 'assets/img/progressBar.png');
	},

	create: function() { 
		// Set a background color and the physic system
		game.stage.backgroundColor = '#000';
		game.physics.startSystem(Phaser.Physics.ARCADE);

		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.state.start('load');
	}
};
var bootState = {

	preload: function () {
		game.load.image('progressBar', 'assets/img/progressBar.png');
	},

	create: function() { 
		// Set a background color and the physic system
		game.stage.backgroundColor = '#000';
		game.physics.startSystem(Phaser.Physics.ARCADE);

		//game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

		if(!game.device.desktop) {

			game.scale.minWidth = 280;
			game.scale.minHeight = 360;
			game.scale.maxWidth = 1800;
			game.scale.maxHeight = 1400;

			game.scale.pageAlignHorizontally = true;
			game.scale.pageAlignVertically = true;
        	game.scale.setScreenSize(true);
		}

		game.state.start('load');
	}
};
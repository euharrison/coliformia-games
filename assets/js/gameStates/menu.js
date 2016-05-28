//splash screen do jogo

var menuState = {

	create: function() {
		// How to start the game
		var startLabel = game.add.text(game.world.centerX, game.world.height-80, 'touch para começar / touch para afundar', { font: '25px Arial', fill: '#ffffff' });
		startLabel.anchor.setTo(0.5, 0.5);

		game.input.onUp.add(this.start, this);
	},

	start: function() {
		game.state.start('play');
	}
};

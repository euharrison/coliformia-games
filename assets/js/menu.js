//splash screen do jogo

var menuState = {

	create: function() { 
		// How to start the game
		var startLabel = game.add.text(game.world.centerX, game.world.height-80, 'espaço para começar / setas para mover', { font: '25px Arial', fill: '#ffffff' });
		startLabel.anchor.setTo(0.5, 0.5);
		
		// Start the game when the up arrow key is pressed /*/
		var startKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		startKey.onDown.addOnce(this.start, this);
	},

	start: function() {
		game.state.start('play');
	}
};
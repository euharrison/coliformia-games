//tela de game over

var gameoverState = {

	create: function() { 
		// How to start the game
		var startLabel = game.add.text(game.world.centerX, game.world.height/2, 'perdeu!! tá cagado!!\ntoca pra jogar de novo\nvai filhão!', { font: '25px Arial', fill: '#ffffff' });
		startLabel.anchor.setTo(0.5, 0.5);
		
		var scoreText = game.add.text(game.world.centerX, game.world.height/2-150, 'Distance:\n' + Math.ceil(game.score), { fontSize: '52px', fill: '#FFF' });
		scoreText.anchor.setTo(0.5, 0.5);
		
		game.input.onUp.add(this.start, this);
	},

	start: function() {
		game.state.start('play');
	}
};
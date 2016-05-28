var reviveState = {

	create: function() {

		this.initialPosition = game.coliformiaConfig.initialPosition;
		this.playerlife = game.coliformiaConfig.playerlife;
		this.velocity = game.coliformiaConfig.velocity;
		this.velocityIncrease = game.coliformiaConfig.velocityIncrease;

		this.bg = new ParalaxBg(game, this);
	},

	update: function() {
		this.bg.update();
	}
};

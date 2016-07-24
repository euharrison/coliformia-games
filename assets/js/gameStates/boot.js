var bootState = {

  preload: function () {
    game.load.image('loading-screen', 'assets/sprites/screens/loading-screen.png');
    game.load.image('loading-bar', 'assets/sprites/screens/loading-bar.png');
  },

  create: function() {
    // Set a background color
    game.stage.backgroundColor = '#000';

    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.state.start('load');

    game.coliformiaConfig = ColiformiaConfigurations.getInstance();
  }
};

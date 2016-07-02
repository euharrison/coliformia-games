var ParalaxBg = function(game, play){
  this.list = [
    new BgScroller(game, play, 'bg', 0),
    new BgScroller(game, play, 'bg-sky', .2),
    new BgScroller(game, play, 'bg-clouds', .5, 67),
    new BgScroller(game, play, 'bg-mountains-back', .7),
    new BgScroller(game, play, 'bg-mountains-front', .8),
    new BgScroller(game, play, 'bg-buildings', .9),
    new BgScroller(game, play, 'bg-waves', 1, 355),
    new BgScroller(game, play, 'bg-grass', 1.1, 857),
  ]
};

ParalaxBg.prototype.update = function(){
  for (var i = this.list.length - 1; i >= 0; i--) {
    this.list[i].update();
  }
};

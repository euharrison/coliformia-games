var ParalaxBg = function(game, play){
  this.list = [
    new BgScroller(game, play, 'bg', 0),
    new BgScroller(game, play, 'bg-sky', .2),
    new BgScroller(game, play, 'bg-clouds', .4, 67),
    new BgScroller(game, play, 'bg-mountains-back', .6, 177),
    new BgScroller(game, play, 'bg-mountains-front', .8, 154),
    new BgScroller(game, play, 'bg-buildings', 1, 253),
    new BgScroller(game, play, 'bg-water', 0, 354),
    new BgScroller(game, play, 'bg-waves', 5, 354),
    new BgScroller(game, play, 'bg-grass', 6, 857),
  ]
};

ParalaxBg.prototype.update = function(){
  for (var i = this.list.length - 1; i >= 0; i--) {
    this.list[i].update();
  }
};

var ParalaxBg = function(game, play, group, bgList) {
  this.list = [];
  for (var i = 0; i < bgList.length; i++) {
    var props = bgList[i];
    this.list.push(
      new BgScroller(game, play, group, props[0], props[1], props[2])
    );
  }
};

ParalaxBg.prototype.update = function(){
  for (var i = this.list.length - 1; i >= 0; i--) {
    this.list[i].update();
  }
};

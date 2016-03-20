var ParalaxBg = function(game, play){
    this.paralax1 = new BgScroller(game, play, 'bg', .6, 0);
    this.paralax2 = new BgScroller(game, play, 'bg_montanhas', .8, -6);
    this.paralax3 = new BgScroller(game, play, 'bg_predios', .9, 29);

};

ParalaxBg.prototype.update = function(){
    this.paralax1.update();
    this.paralax2.update();
    this.paralax3.update();
};

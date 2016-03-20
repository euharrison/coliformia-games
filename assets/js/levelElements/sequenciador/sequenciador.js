var Sequenciador = function(game, play){
    this.game = game;
    this.play = play;

    this.sequencias = new SequenciaDeInimigos();
    this.currentSequence = 0;
    this.currentElement = 0;
    this.basePosition = 0;
};

Sequenciador.prototype.setUpASequence = function(){
    this.currentSequence = this.sequencias.getRandom();
    this.currentElement = 0;

    console.log('set up sequence');
};

Sequenciador.prototype.getCurrentObject = function(currentPosition){

    console.log('here', this.sequencias.sequencias[this.currentSequence].length > this.currentElement);

    while (this.sequencias.sequencias[this.currentSequence].length > this.currentElement &&
        this.basePosition + this.sequencias.sequencias[this.currentSequence][this.currentElement].posicao < currentPosition ) {

        console.log('here2', this.currentElement);

        this.createEnemy(this.sequencias.sequencias[this.currentSequence][this.currentElement]);
        this.currentElement += 1;
    }

    if (this.sequencias.sequencias[this.currentSequence].length <= this.currentElement) {
        this.basePosition = currentPosition;
        this.setUpASequence();
    }
};

Sequenciador.prototype.createEnemy = function(enemy){
    switch (enemy.tipo) {
        case 'Sewer':
            new Sewer(this.game, this.play);
            break;
        case 'Cocolito':
            new Cocolito(this.game, this.play);
            break;
        case 'Fly':
            new Fly(this.game, this.play);
            break;
        case 'Dudu':
            new Dudu(this.game, this.play);
            break;
    }
};

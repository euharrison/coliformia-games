var SequenciaDeInimigos = function(){

    this.sequencias = [
        [
            {
                tipo: 'Bonner',
                posicao: 50
            },
            {
                tipo: 'Cocolito',
                posicao: 5000
            }
        ]

        /*[
            {
                tipo: 'Cocolito',
                posicao: 100
            },
            {
                tipo: 'Sewer',
                posicao: 130
            },
            {
                tipo: 'Fly',
                posicao: 200
            },
            {
                tipo: 'Cocolito',
                posicao: 300
            },
            {
                tipo: 'Cocolito',
                posicao: 330
            },
            {
                tipo: 'Dudu',
                posicao: 500
            }
        ]*/
    ];
}

SequenciaDeInimigos.prototype.getRandom = function(){
    return Math.floor(Math.random() * this.sequencias.length);
}

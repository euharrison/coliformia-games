var Sequenciador = function(game, play){
    this.game = game;
    this.play = play;

    this.currentSequence = null;
    this.currentElement = 0;
    this.sequenciaStartTime = 0;

    this.sequencias = [
        {
            id:"vidaBoa",
            scoreMin:0,
            scoreMax:Infinity,
            elements: [
                {
                    tipo: 'powerup',
                    id: 'powerup_injecao',
                    time: 0,
                    posY: 100
                },
                {
                    tipo: 'powerup',
                    id: 'powerup_sus',
                    time: 1000,
                    posY: 300
                },
                {
                    tipo: 'powerup',
                    id: 'powerup_injecao',
                    time: 2000,
                    posY: 300
                },
                {
                    tipo: 'powerup',
                    id: 'powerup_sus',
                    time: 3000,
                    posY: 300
                },
                {
                    tipo: 'powerup',
                    id: 'powerup_injecao',
                    time: 4000,
                    posY: 200
                },
                {
                    tipo: 'powerup',
                    id: 'powerup_sus',
                    time: 5000,
                    posY: 250
                }
            ]
        },
        {
            id:"exemplo1",
            scoreMin:0,
            scoreMax:Infinity,
            elements: [
                {
                    tipo: 'enemy',
                    id: 'Bonner',
                    time: 1000
                },
                {
                    tipo: 'enemy',
                    id: 'Fly',
                    time: 2500
                },
                {
                    tipo: 'enemy',
                    id: 'Fly',
                    time: 3500
                },
                {
                    tipo: 'enemy',
                    id: 'Fly',
                    time: 4500
                },
                {
                    tipo: 'enemy',
                    id: 'Fly',
                    time: 5500
                },
                {
                    tipo: 'powerup',
                    id: 'powerup_injecao',
                    time: 0,
                    posY: 100
                },
                {
                    tipo: 'powerup',
                    id: 'powerup_injecao',
                    time: 1000,
                    posY: 300
                },
                {
                    tipo: 'powerup',
                    id: 'powerup_injecao',
                    time: 2000,
                    posY: 500
                },
                {
                    tipo: 'powerup',
                    id: 'powerup_sus',
                    time: 3000,
                    posY: 300
                }
            ]
        },
        {
            id:"exemplo2",
            scoreMin:0,
            scoreMax:Infinity,
            elements: [
                {
                    tipo: 'enemy',
                    id: 'Bonner',
                    time: 1000
                },
                {
                    tipo: 'enemy',
                    id: 'Fly',
                    time: 3000
                },
                {
                    tipo: 'enemy',
                    id: 'Fly',
                    time: 4000
                },
                {
                    tipo: 'enemy',
                    id: 'Fly',
                    time: 5000
                },
                {
                    tipo: 'enemy',
                    id: 'Fly',
                    time: 6000
                }
            ]
        }
    ];
};

Sequenciador.prototype.setup = function(currentScore){
    this.changeSequence(0);
};

Sequenciador.prototype.changeSequence = function(currentScore){
    var isValidSequence = false;
    var maxTries = 10;
    var triesCount = 0;
    while(!isValidSequence && triesCount++ < maxTries){
        var randomIndex = Math.floor(Math.random() * this.sequencias.length);
        this.currentSequence = this.sequencias[randomIndex];
        isValidSequence = currentScore >= this.currentSequence.scoreMin && currentScore <= this.currentSequence.scoreMax;
    }
    var timeBetweenSequences = 3000;
    this.sequenciaStartTime = new Date().getTime() + timeBetweenSequences;
    this.currentElement = 0;
};

Sequenciador.prototype.updateSequence = function(){
    var now = new Date().getTime();
    var timeDiff = now - this.sequenciaStartTime;
    while (this.currentElement<this.currentSequence.elements.length && this.currentSequence.elements[this.currentElement].time < timeDiff ) {
        var element = this.currentSequence.elements[this.currentElement];
        if(element.tipo=="enemy"){
            this.createEnemy(element);
        }else if(element.tipo=="powerup"){
            this.createPowerUp(element);
        }
        this.currentElement ++;
    }
};

Sequenciador.prototype.update = function(currentScore){

    if(this.currentElement == this.currentSequence.elements.length){
        this.changeSequence(currentScore);
    }

    this.updateSequence();
};

Sequenciador.prototype.createEnemy = function(enemy){
    switch (enemy.id) {
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
        case 'Bonner':
            new Bonner(this.game, this.play);
            break;
    }
};

Sequenciador.prototype.createPowerUp = function(powerup) {
    //powerup.id = powerup_sus, powerup_injecao

    var sprite = this.play.group.create(this.game.width, this.play.initialPosition.y + powerup.posY, powerup.id);
    sprite.attackSpeed = 1;

    sprite.body.clearShapes();
    sprite.body.loadPolygon('physicsData', sprite.key);

    sprite.body.setCollisionGroup(this.play.powerupsCollisionGroup);
    sprite.body.collides([this.play.playerCollisionGroup]);

    sprite.body.collideWorldBounds = false;
    sprite.body.fixedRotation = true;
    sprite.body.velocity.x = -this.play.velocity;
    sprite.body.velocity.y = 0;
};
var Sequenciador = function(game, play) {

  //public

  this.setup = setup;
  this.update = update;

  //private

  var game = game;
  var play = play;

  var currentSequence = null;
  var currentElement = 0;
  var sequenciaStartTime = 0;
  var elapsedTime = 0;

  function element(type, id, time, y) {
    return {
      type: type,
      id: id,
      time: time === undefined ? 0 : time,
      y: y
    }
  }

  function enemy(id, time, y) {
    return element('enemy', id, time, y);
  }

  function powerUp(id, time, y) {
    return element('powerUp', id, time, y);
  }

  function cocolito(time, y) {
    return enemy('cocolito', time, y);
  };

  function zika(time, y) {
    return enemy('zika', time, y);
  };

  function sewer(time, y) {
    return enemy('sewer', time, y);
  };

  function bonner(time, y) {
    return enemy('bonner', time, y);
  };

  function dudu(time, y) {
    return enemy('dudu', time, y);
  };

  function sus(time, y) {
    return powerUp('sus', time, y);
  };

  function injection(time, y) {
    return powerUp('injection', time, y);
  };

  var sequencesPool = [
    {
      id: 'first',
      scoreMin: -1,
      scoreMax: 2,
      time: 4000,
      elements: [ cocolito(1000, 50) ]
    },
    {
      id: 'coco-single',
      scoreMin: 1,
      scoreMax: 500,
      time: 3000,
      elements: [ cocolito() ]
    },
    {
      id: 'sus',
      scoreMin: 1,
      scoreMax: Infinity,
      time: 1000,
      elements: [ sus() ]
    },
    {
      id: 'coco-double',
      scoreMin: 50,
      scoreMax: Infinity,
      time: 3000,
      elements: [ cocolito(0), cocolito(100) ]
    },
    {
      id: 'zika',
      scoreMin: 100,
      scoreMax: Infinity,
      time: 3000,
      elements: [ zika() ]
    },
    {
      id: 'coco-tunnel',
      scoreMin: 200,
      scoreMax: Infinity,
      time: 3000,
      elements: [
        cocolito(0, 0), cocolito(200, 0), cocolito(400, 0),
        cocolito(0, 500), cocolito(200, 500), cocolito(400, 500),
      ]
    },
    {
      id: 'sus-double',
      scoreMin: 250,
      scoreMax: Infinity,
      time: 1000,
      elements: [ sus(), sus(200) ]
    },
    {
      id: 'sewer',
      scoreMin: 300,
      scoreMax: Infinity,
      time: 7000,
      elements: [ sewer() ]
    },
    {
      id: 'injection',
      scoreMin: 300,
      scoreMax: Infinity,
      time: 1000,
      elements: [ injection() ]
    },
    {
      id: 'bonner',
      scoreMin: 600,
      scoreMax: Infinity,
      time: 5000,
      elements: [ bonner() ]
    },
    {
      id: 'refill-life',
      scoreMin: 700,
      scoreMax: Infinity,
      time: 1000,
      elements: [ sus(), injection(300), sus(600) ]
    },
    {
      id: 'dudu',
      scoreMin: 1000,
      scoreMax: Infinity,
      time: 6000,
      elements: [ dudu() ]
    },
  ];

  var sequences = [];

  function setup () {
    changeSequence(0);
  }

  function update(currentScore){
    elapsedTime += game.time.elapsed;

    if (elapsedTime > sequenciaStartTime + currentSequence.time) {
      changeSequence(currentScore);
    }

    updateSequence();
  };

  function changeSequence(currentScore) {
    var availableIndexes = [];
    sequencesPool.map(function(sequence, index) {
      if (currentScore > sequence.scoreMin && currentScore < sequence.scoreMax) {
        availableIndexes.push(index);
      }
    })

    var randomIndex = availableIndexes[ Math.floor(Math.random() * availableIndexes.length) ];
    currentSequence = sequencesPool[randomIndex];

    sequenciaStartTime = elapsedTime;
    currentElement = 0;

    console.log('starting: ' + currentSequence.id, availableIndexes);
  };

  function updateSequence() {
    var timeDiff = elapsedTime - sequenciaStartTime;
    while (currentElement < currentSequence.elements.length && currentSequence.elements[currentElement].time < timeDiff ) {
      var element = currentSequence.elements[currentElement];
      switch (element.type) {
        case 'enemy':
          createEnemy(element);
          break;
        case 'powerUp':
          createPowerUp(element);
          break;
      }
      currentElement++;
    }
  };

  function createEnemy(enemy) {
    switch (enemy.id) {
      case 'cocolito':
        new Cocolito(game, play, undefined, enemy.y);
        break;
      case 'zika':
        new Fly(game, play);
        break;
      case 'sewer':
        new Sewer(game, play);
        break;
      case 'bonner':
        new Bonner(game, play);
        break;
      case 'dudu':
        new Dudu(game, play);
        break;
    }
  };

  function createPowerUp(powerup) {
    new PowerUp(game, play, powerup.id);
  };
};

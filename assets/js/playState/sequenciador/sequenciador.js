var Sequenciador = function(game, play, group) {

  //public

  this.update = update;

  //private

  var game = game;
  var play = play;
  var group = group;

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

  var sequencesPool = [
    // first enemy, like an intro
    {
      id: 'first',
      scoreMin: -1,
      scoreMax: 2,
      time: 4000,
      elements: [ enemy('cocolito', 1000, 30) ]
    },

    // easy enemies
    {
      id: 'coco-single',
      scoreMin: 1,
      scoreMax: Infinity,
      time: 500,
      elements: [ enemy('cocolito') ]
    },
    {
      id: 'coco-double',
      scoreMin: 1,
      scoreMax: Infinity,
      time: 600,
      elements: [ enemy('cocolito', 0), enemy('cocolito', 100) ]
    },
    {
      id: 'zika',
      scoreMin: 1,
      scoreMax: Infinity,
      time: 500,
      elements: [ enemy('zika') ]
    },

    // hard enemies
    {
      id: 'coco-triple',
      scoreMin: 300,
      scoreMax: Infinity,
      time: 1000,
      elements: [ enemy('cocolito', 0), enemy('cocolito', 100), enemy('cocolito', 200) ]
    },
    {
      id: 'coco-tunnel',
      scoreMin: 300,
      scoreMax: Infinity,
      time: 1000,
      elements: [
        enemy('cocolito', 0, 0), enemy('cocolito', 200, 0), enemy('cocolito', 400, 0),
        enemy('cocolito', 0, 500), enemy('cocolito', 200, 500), enemy('cocolito', 400, 500),
      ]
    },
    {
      id: 'defunto',
      scoreMin: 300,
      scoreMax: Infinity,
      time: 1000,
      elements: [
        enemy('defunto'),
      ]
    },

    // bosses
    {
      id: 'sewer',
      scoreMin: 300,
      scoreMax: Infinity,
      time: 7000,
      elements: [ enemy('sewer') ]
    },
    {
      id: 'dudu',
      scoreMin: 600,
      scoreMax: Infinity,
      time: 3000,
      elements: [ enemy('dudu') ]
    },
    {
      id: 'bonner',
      scoreMin: 900,
      scoreMax: Infinity,
      time: 4000,
      elements: [ enemy('bonner') ]
    },

    // life
    {
      id: 'sus',
      scoreMin: 1,
      scoreMax: Infinity,
      time: 1000,
      elements: [ powerUp('sus') ]
    },
    {
      id: 'injection',
      scoreMin: 300,
      scoreMax: Infinity,
      time: 1000,
      elements: [ powerUp('injection') ]
    },
    {
      id: 'refill-life',
      scoreMin: 700,
      scoreMax: Infinity,
      time: 1000,
      elements: [ powerUp('sus'), powerUp('injection', 300), powerUp('sus', 600) ]
    },
  ];

  var sequences = [];
  changeSequence(0);

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
        var x = game.width + 150/2;
        var y = enemy.y ? enemy.y + play.initialPosition.y : game.rnd.integerInRange(play.initialPosition.y, game.height-100);
        play.pool.get('cocolito', x, y);
        break;
      case 'zika':
        var x = game.width + 359;
        var y = play.initialPosition.y - 120;
        play.pool.get('zika', x, y);
        break;
      case 'defunto':
        var x = game.width + 150/2;
        var y = game.rnd.integerInRange(play.initialPosition.y+120, game.height-120);
        play.pool.get('defunto', x, y);
        break;
      case 'sewer':
        new Sewer(game, play, group);
        break;
      case 'bonner':
        new Bonner(game, play, group);
        break;
      case 'dudu':
        new Dudu(game, play, group);
        break;
    }
  };

  function createPowerUp(powerup) {
    new PowerUp(game, play, group, powerup.id);
  };
};

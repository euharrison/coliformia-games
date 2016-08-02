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

  function element(id, time, y) {
    return {
      id: id,
      time: time === undefined ? 0 : time,
      y: y
    }
  }

  var sequencesPool = [
    // first enemy, like an intro
    {
      id: 'first',
      scoreMin: -1,
      scoreMax: 2,
      time: 4000,
      elements: [ element('cocolito', 1000, 30) ]
    },

    // easy enemies
    {
      id: 'coco-single',
      scoreMin: 1,
      scoreMax: Infinity,
      time: 400,
      elements: [ element('cocolito') ]
    },
    {
      id: 'peixe',
      scoreMin: 150,
      scoreMax: Infinity,
      time: 400,
      elements: [ element('peixe') ]
    },
    {
      id: 'zika',
      scoreMin: 20,
      scoreMax: Infinity,
      time: 400,
      elements: [ element('zika') ]
    },

    // medium enemies
    {
      id: 'coco-double',
      scoreMin: 50,
      scoreMax: Infinity,
      time: 500,
      elements: [ element('cocolito', 0), element('cocolito', 100) ]
    },
    {
      id: 'defunto',
      scoreMin: 200,
      scoreMax: Infinity,
      time: 2000,
      elements: [
        element('defunto'),
      ]
    },
    {
      id: 'finding-nemo',
      scoreMin: 300,
      scoreMax: Infinity,
      time: 1100,
      elements: [
        element('peixe', 0, 250),
        element('peixe', 150, 250),
        element('peixe', 300, 250),
        element('peixe', 450, 250),
        element('peixe', 600, 250),
        element('peixe', 750, 250),
      ]
    },
    {
      id: 'sofa',
      scoreMin: 400,
      scoreMax: Infinity,
      time: 2000,
      elements: [
        element('sofa'),
      ]
    },

    // hard enemies
    {
      id: 'coco-triple',
      scoreMin: 500,
      scoreMax: Infinity,
      time: 600,
      elements: [ 
        element('cocolito', 0),
        element('cocolito', 100),
        element('cocolito', 200)
      ]
    },
    {
      id: 'coco-tunnel',
      scoreMin: 300,
      scoreMax: Infinity,
      time: 600,
      elements: [
        element('cocolito', 0, 0), 
        element('cocolito', 0, 430),
        element('cocolito', 100, 0), 
        element('cocolito', 100, 430),
        element('cocolito', 200, 0),
        element('cocolito', 200, 430),
      ]
    },
    {
      id: 'coco-wall',
      scoreMin: 600,
      scoreMax: Infinity,
      time: 1100,
      elements: [
        element('cocolito', 0, 0),
        element('cocolito', 0, 400),
        element('cocolito', 100, 50),
        element('cocolito', 100, 350),
        element('cocolito', 200, 100),
        element('cocolito', 200, 300),
      ]
    },
    {
      id: 'monte-bosta',
      scoreMin: 800,
      scoreMax: Infinity,
      time: 4000,
      elements: [
        element('monte-bosta'),
      ]
    },

    // bosses
    {
      id: 'sewer',
      scoreMin: 100,
      scoreMax: Infinity,
      time: 2000,
      elements: [ element('sewer') ]
    },
    {
      id: 'dudu',
      scoreMin: 500,
      scoreMax: Infinity,
      time: 3000,
      elements: [ element('dudu') ]
    },
    {
      id: 'bonner',
      scoreMin: 250,
      scoreMax: Infinity,
      time: 4000,
      elements: [ element('bonner') ]
    },

    // life
    {
      id: 'sus',
      scoreMin: 1,
      scoreMax: Infinity,
      time: 400,
      elements: [ element('sus') ]
    },
    {
      id: 'sussa',
      scoreMin: 200,
      scoreMax: Infinity,
      time: 1200,
      elements: [ 
        element('sus', 0, 400),
        element('sus', 100, 300),
        element('sus', 200, 200),
        element('sus', 300, 100),
        element('sus', 400, 0)
      ]
    },
    {
      id: 'injection',
      scoreMin: 400,
      scoreMax: Infinity,
      time: 400,
      elements: [ element('injection') ]
    },
    {
      id: 'refill-life',
      scoreMin: 700,
      scoreMax: Infinity,
      time: 800,
      elements: [
        element('injection', 0),
        element('injection', 200),
        element('injection', 400)
      ]
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

    // console.log('starting: ' + currentSequence.id, availableIndexes, new Date());
  };

  function updateSequence() {
    var timeDiff = elapsedTime - sequenciaStartTime;
    while (currentElement < currentSequence.elements.length && currentSequence.elements[currentElement].time < timeDiff ) {
      var element = currentSequence.elements[currentElement];
      createElement(element);
      currentElement++;
    }
  };

  function createElement(element) {
    switch (element.id) {
      case 'cocolito':
      case 'peixe':
        var x = game.width + 150/2;
        var y = element.y !== undefined ? element.y + play.initialPosition.y : game.rnd.integerInRange(play.initialPosition.y, game.height-88);
        play.pool.get(element.id, x, y);
        break;

      case 'zika':
        var x = game.width + 359;
        var y = play.initialPosition.y - 50;
        play.pool.get(element.id, x, y);
        break;

      case 'defunto':
        var x = game.width + 150/2;
        var y = game.rnd.integerInRange(play.initialPosition.y+120, game.height-120);
        play.pool.get(element.id, x, y);
        break;

      case 'sofa':
        var x = game.width + 431/2;
        var y = game.height - 150;
        play.pool.get(element.id, x, y);
        break;

      case 'monte-bosta':
        var x = game.width + 735/2;
        var y = game.height - 528/2;
        play.pool.get(element.id, x, y);
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

      case 'sus':
      case 'injection':
        var x = game.width + 225/2;
        var y = element.y !== undefined ? element.y + play.initialPosition.y : game.rnd.integerInRange(play.initialPosition.y, game.height-88);
        play.pool.get(element.id, x, y);
        break;
    }
  };
};

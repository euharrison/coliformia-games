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

    // game engine: < 200m
    {
      id: 'coco-single',
      scoreMin: 1,
      scoreMax: 600,
      time: 600,
      elements: [ element('cocolito') ]
    },
    {
      id: 'zika',
      scoreMin: 60,
      scoreMax: 600,
      time: 600,
      elements: [ element('zika') ]
    },
    {
      id: 'peixe',
      scoreMin: 100,
      scoreMax: 600,
      time: 600,
      elements: [ element('peixe') ]
    },

    // special enemies: < 600m
    {
      id: 'bonner',
      scoreMin: 200,
      scoreMax: 300,
      time: 3000,
      elements: [ element('bonner') ]
    },
    {
      id: 'dudu',
      scoreMin: 300,
      scoreMax: 400,
      time: 3000,
      elements: [ element('dudu') ]
    },
    {
      id: 'galvao',
      scoreMin: 400,
      scoreMax: Infinity,
      time: 600,
      elements: [ element('galvao') ]
    },
    {
      id: 'defunto',
      scoreMin: 400,
      scoreMax: 500,
      time: 2000,
      elements: [
        element('defunto'),
      ]
    },
    {
      id: 'monte-bosta',
      scoreMin: 500,
      scoreMax: Infinity,
      time: 4000,
      elements: [
        element('monte-bosta'),
      ]
    },

    // hard mode: > 600m
    {
      id: 'bonner',
      scoreMin: 600,
      scoreMax: Infinity,
      time: 2500,
      elements: [ element('bonner') ]
    },
    {
      id: 'dudu',
      scoreMin: 600,
      scoreMax: Infinity,
      time: 2500,
      elements: [ element('dudu') ]
    },
    {
      id: 'defunto',
      scoreMin: 600,
      scoreMax: Infinity,
      time: 1500,
      elements: [
        element('defunto'),
      ]
    },
    {
      id: 'sewer',
      scoreMin: 600,
      scoreMax: Infinity,
      time: 500,
      elements: [ element('sewer') ]
    },
    {
      id: 'sofa',
      scoreMin: 600,
      scoreMax: Infinity,
      time: 1500,
      elements: [
        element('sofa'),
      ]
    },
    {
      id: 'coco-double',
      scoreMin: 600,
      scoreMax: Infinity,
      time: 700,
      elements: [
        element('cocolito', 0),
        element('cocolito', 200)
      ]
    },
    {
      id: 'rodizio-japones',
      scoreMin: 600,
      scoreMax: Infinity,
      time: 1300,
      elements: [
        element('peixe', 0),
        element('peixe', 200),
        element('peixe', 400),
        element('peixe', 600),
        element('peixe', 800)
      ]
    },
    {
      id: 'coco-tunnel',
      scoreMin: 600,
      scoreMax: Infinity,
      time: 700,
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
      id: 'coco-funnel',
      scoreMin: 600,
      scoreMax: Infinity,
      time: 700,
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
      id: 'finding-nemo',
      scoreMin: 600,
      scoreMax: Infinity,
      time: 1250,
      elements: [
        element('peixe', 0, 250),
        element('peixe', 150, 250),
        element('peixe', 300, 250),
        element('peixe', 450, 250),
        element('peixe', 600, 250),
        element('peixe', 750, 250),
      ]
    },

    // life
    {
      id: 'sus',
      scoreMin: 150,
      scoreMax: Infinity,
      time: 400,
      elements: [ element('sus') ]
    },
    {
      id: 'injection',
      scoreMin: 400,
      scoreMax: Infinity,
      time: 400,
      elements: [ element('injection') ]
    },
    {
      id: 'sussa',
      scoreMin: 600,
      scoreMax: Infinity,
      time: 1200,
      elements: [
        element('sus', 0, 400),
        element('sus', 100, 300),
        element('sus', 200, 200),
        element('sus', 300, 100),
        element('sus', 400, 0),
      ]
    },
    {
      id: 'refill-life',
      scoreMin: 600,
      scoreMax: Infinity,
      time: 800,
      elements: [
        element('injection', 0),
        element('injection', 200),
        element('injection', 400)
      ]
    },
  ];

  var events = [
    {
      id: 'super-sussa',
      score: 150,
      time: 3000,
      elements: [
        element('sus', 0, 0),
        element('sus', 0, 100),
        element('sus', 0, 200),
        element('sus', 0, 300),
        element('sus', 0, 400),
        element('sus', 200, 0),
        element('sus', 200, 100),
        element('sus', 200, 200),
        element('sus', 200, 300),
        element('sus', 200, 400),
        element('sus', 400, 0),
        element('sus', 400, 100),
        element('sus', 400, 200),
        element('sus', 400, 300),
        element('sus', 400, 400),
        element('sus', 600, 0),
        element('sus', 600, 100),
        element('sus', 600, 200),
        element('sus', 600, 300),
        element('sus', 600, 400),
        element('sus', 800, 0),
        element('sus', 800, 100),
        element('sus', 800, 200),
        element('sus', 800, 300),
        element('sus', 800, 400),
      ]
    },
    {
      id: 'bonner',
      score: 200,
      time: 3000,
      elements: [ element('bonner') ]
    },
    {
      id: 'dudu',
      score: 300,
      time: 3000,
      elements: [ element('dudu') ]
    },
    {
      id: 'super-injection',
      score: 400,
      time: 3000,
      elements: [
        element('injection', 0, 0),
        element('injection', 0, 100),
        element('injection', 0, 200),
        element('injection', 0, 300),
        element('injection', 0, 400),
      ]
    },
    {
      id: 'monte-bosta',
      score: 500,
      time: 6000,
      elements: [
        element('monte-bosta'),
      ]
    },
  ]

  changeSequence(0);

  function update(currentScore){
    elapsedTime += game.time.elapsed;

    if (elapsedTime > sequenciaStartTime + currentSequence.time) {
      changeSequence(currentScore);
    }

    updateSequence();
  };

  function changeSequence(currentScore) {
    //if has an event, it's higher priority
    if (events.length && currentScore > events[0].score) {
      // console.log('event: ', events[0].id)
      currentSequence = events.shift();
    }
    //else, use any available sequence
    else {
      var availableIndexes = [];
      sequencesPool.forEach(function(sequence, index) {
        if (currentScore > sequence.scoreMin && currentScore < sequence.scoreMax) {
          availableIndexes.push(index);
        }
      })

      var randomIndex = availableIndexes[ Math.floor(Math.random() * availableIndexes.length) ];
      currentSequence = sequencesPool[randomIndex];
    }

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
        var y = element.y !== undefined ? element.y + play.initialPosition.y : game.rnd.integerInRange(play.initialPosition.y, game.height-50);
        play.pool.get(element.id, x, y);
        break;

      case 'zika':
      case 'galvao':
        var x = game.width + 359;
        var y = play.initialPosition.y - 50;
        play.pool.get(element.id, x, y);
        break;

      case 'defunto':
        var x = game.width + 150/2;
        var y = game.rnd.integerInRange(play.initialPosition.y+120, game.height-100);
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
          if (typeof ga === 'function') {
              ga('send', {
                hitType: 'event',
                eventCategory: 'Game',
                eventAction: 'boss',
                eventLabel: 'bonner'
              });
          }
        new Bonner(game, play, group);
        break;

      case 'dudu':
          if (typeof ga === 'function') {
              ga('send', {
                hitType: 'event',
                eventCategory: 'Game',
                eventAction: 'boss',
                eventLabel: 'dudu'
              });
          }
        new Dudu(game, play, group);
        break;

      case 'sus':
      case 'injection':
        var x = game.width + 225/2;
        var y = element.y !== undefined ? element.y + play.initialPosition.y : game.rnd.integerInRange(play.initialPosition.y, game.height-100);
        play.pool.get(element.id, x, y);
        break;
    }
  };
};

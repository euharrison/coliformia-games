var ColiformiaConfigurations = (function () {
  var instance;

  function create() {
    var config = {
      velocity: 200,
      velocityIncrease: 0.02,
      initialPosition: {
        x: 130,
        y: 230
      },
      playerlife: {
        initial: 2000,
        current: 2000
      },
      player: {
        forcas: {
          forcaPraBaixo: 40,
          empuxoDaAgua: 0.01,
          gravidade: 10
        }
      },
      debugPhysics: false,
    };

    // http://localhost:8000/?velocity=150&velocityIncrease=0.02&debugPhysics=true
    var overrideConfig = getUrlVars();
    for (var param in overrideConfig) {
      config[param] = Number(overrideConfig[param]);
    }

    return config;
  }

  function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
      vars[key] = value;
    });
    return vars;
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = create();
      }
      return instance;
    }
  };
})();

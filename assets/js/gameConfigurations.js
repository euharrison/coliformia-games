var ColiformiaConfigurations = (function () {
    var instance;

    function create() {
        var config = {
            velocity : 150,
            velocityIncrease : 0.02,
            initialPosition : {
    			x: 200,
    			y: 350
    		},
            playerlife : {
    			initial: 2000,
    			current: 2000
    		},
            player : {
                forcas : {
                  forcaPraBaixo: 20,
                  empuxoDaAgua: 0.01,
                  gravidade: 20
                }
            }
        };

        // http://localhost:8000/?velocity=150&velocityIncrease=0.02
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

var ColiformiaConfigurations = (function () {
    var instance;

    function create() {
        // Aqui a gente tem que colocar o leitor de URL depois
        // pra pegar as variaveis da URL e aplicar no jogo
        var coliformiaConfig = {
            velocity : 700,
            velocityIncrease : 0.001,
            initialPosition : {
    			x: 100,
    			y: 350
    		},
            playerlife : {
    			initial: 1000,
    			current: 1000,
    			powerup: 100
    		}
        };
        return coliformiaConfig;
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

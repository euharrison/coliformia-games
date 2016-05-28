var ColiformiaConfigurations = (function () {
    var instance;

    function create() {
        // Aqui a gente tem que colocar o leitor de URL depois
        // pra pegar as variaveis da URL e aplicar no jogo
        var coliformiaConfig = {
            velocity : 150,
            velocityIncrease : 0.01,
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

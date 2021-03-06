var Player = function (game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'player');

  this.forcas = game.coliformiaConfig.player.forcas;
  this.initialPosition = game.coliformiaConfig.initialPosition;

  this.isJumping = false;
  this.isTouchDown = false;

  this.animations.add('swim', [0,1,2,3,4,5], 12, true);
  this.animations.add('jump', [6], 12, false);
  this.animations.add('fall', [7], 12, false);
  this.animations.add('die', [8,9,10,11], 12, false);
  this.animations.play('swim');
  game.add.existing(this);

  game.physics.p2.enable(this, game.coliformiaConfig.debugPhysics);
  this.body.clearShapes();
  this.body.loadPolygon('physicsData', this.key);
  this.body.fixedRotation = true;
  this.body.collideWorldBounds = false;

  game.input.onDown.add(this.onTouchDown, this);
  game.input.onUp.add(this.onTouchUp, this);

  var keySpacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  keySpacebar.onDown.add(this.onTouchDown, this);
  keySpacebar.onUp.add(this.onTouchUp, this);

  //disable space on browser
  game.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR);
};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {
    //movimento horizontal
    this.body.velocity.x = 0;
    this.body.x = this.initialPosition.x;

    //player fora da água
    if (this.isJumping) {
      //gravidade
      this.body.velocity.y += this.forcas.gravidade;

      //ao entrar na água após o pulo, desacelerar
      if (this.body.y >= this.initialPosition.y) {
        this.body.velocity.y /= 10;
        if (this.alive) {
          this.animations.play('swim');
        }
      } else {
        if (this.body.velocity.y < 0) {
          if (this.alive) {
            this.animations.play('jump');
          }
        } else {
          if (this.alive) {
            this.animations.play('fall');
          }
        }
      }
    }
    //player dentro da água
    else {
      //empuxo
      this.body.velocity.y -= (this.body.y - this.initialPosition.y) * this.forcas.empuxoDaAgua;

      //nadar para baixo
      if (this.isTouchDown && this.alive) {
        this.body.velocity.y += this.forcas.forcaPraBaixo;

        //impoe um limite de velocidade para baixo
        if (this.body.velocity.y > 600) {
          this.body.velocity.y = 600;
        }
      }
      //nadar para cima, somente se houver espaço
      else if (this.body.y > this.initialPosition.y + 10) {
        this.body.velocity.y -= this.forcas.forcaPraBaixo;

        //impoe um limite de velocidade para cima
        if (this.body.velocity.y < -600) {
          this.body.velocity.y = -600;
        }
      }
    }

    this.angle = this.body.velocity.y/15;
    this.body.rotation = this.angle * Math.PI / 180;

    if (this.isJumping && !(this.body.y < this.initialPosition.y))
    {
        game.coliformiaSounds.cai_na_agua.play();
        if (this.alive) {
            game.coliformiaSounds.nada.loopFull(0.5);
        }
    } else if(!this.isJumping && (this.body.y < this.initialPosition.y)) {
        if(Math.random() > 0.5)
        {
            game.coliformiaSounds.bolha_ou_pulo1.play();
        } else {
            game.coliformiaSounds.bolha_ou_pulo2.play();
        }
        game.coliformiaSounds.nada.stop();
    }

    //atualiza se está dentro da água ou não
    this.isJumping = (this.body.y < this.initialPosition.y);

    //limita a tela somente no chão
    if (this.body.y >= 660) {
      this.body.y = 660;

      //se permanecer em baixo, dividir a velocidade positiva pela metade assim vai freiando/
      //isso ajuda a poder subir rapidamente quando estiver nadando somente lá embaixo
      if (this.body.velocity.y > 0) {
        this.body.velocity.y /= 2;
      };
    }
};

Player.prototype.onTouchDown = function() {
  this.isTouchDown = true;
}

Player.prototype.onTouchUp = function() {
  this.isTouchDown = false;
}

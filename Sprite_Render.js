/**
 * Created by Riley on 11/06/2016.
 * This is test
 */

var mainState = {
    preload: function () {
        this.load.image('background', 'assets/images/bkg_background1.jpg');
        this.load.image('dude', 'assets/images/spr_character1proto2.png');
    },

    create: function () {

        //game.stage.backgroundColor = '71c5cf';

        //set physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        //sets a background
        this.background = this.game.add.sprite(0,0,'background');
        //this.background.scale.setTo(2);

        this.dude = game.add.sprite(this.game.world.centerX,this.game.world.centerY,'dude');
        this.dude.anchor.setTo(0.5,0.5);
        this.dude.scale.setTo(0.3);
        //gives phyics to given object
        game.physics.arcade.enable(this.dude);

        this.dude.body.gravity.y = 500;


        var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.jump, this);
    },

    update: function () {
        if(this.dude.y<0|| this.dude.y > 490){
            this.restartGame();
        };
    },

    jump: function() {
        //preform jump
        this.dude.body.velocity.y = -350;
    },

    restartGame: function(){
        // restart the game after death
        game.state.start('main');
    },
};

// Initialize Phaser, and create a 400px by 490px game
var game = new Phaser.Game(400, 490);

// Add the 'mainState' and call it 'main'
game.state.add('main', mainState);

// Start the state to actually start the game
game.state.start('main');

/**
 * Created by Riley on 11/06/2016.
 */

var mainState = {
    preload: function () {
        this.load.image('background', 'assets/images/bkg_background1.jpg');
        this.load.image('dude', 'assets/images/spr_chr1.png');
    },

    create: function () {
        this.background = this.game.add.sprite(0,0,'background');

        this.dude = game.add.sprite(100,245,'dude');
        
    },

    update: function () {

    },
};

// Initialize Phaser, and create a 400px by 490px game
var game = new Phaser.Game(400, 490);

// Add the 'mainState' and call it 'main'
game.state.add('main', mainState);

// Start the state to actually start the game
game.state.start('main');
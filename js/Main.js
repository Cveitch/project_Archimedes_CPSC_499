
var Main = function(game){
	//This function allows "Main" to be accessed by the game instance
};

Main.prototype = {

	create: function() {

		//sets a background (which doesn't want to work somehow...)
		background = game.add.sprite(0,0,"background");
		background.scale.setTo(2);

		//temporary colour for the background
		this.game.stage.backgroundColor = "71c5cf";

	    // Start the P2 Physics Engine
	    this.game.physics.startSystem(Phaser.Physics.P2JS);

	    // Set the gravity
	    this.game.physics.p2.gravity.y = 1000;

		// Create the ceiling
	    //this.createBlock();

		//Doesn't work now...
		//this.createSlope();

	    // Create the player
	    this.createPlayer();
	},

	createBlock: function() {

	    // Define a block using bitmap data rather than an image sprite
	    var blockShape = this.game.add.bitmapData(this.game.world.width, 200);

	    // Fill the block with black color
	    blockShape.ctx.rect(0, 0, this.game.world.width, 200);
	    blockShape.ctx.fillStyle = "71c5cf";
	    blockShape.ctx.fill();

	    // Create a new sprite using the bitmap data
	    this.block = this.game.add.sprite(0, 0, blockShape);

	    // Enable P2 Physics and set the block not to move
	    this.game.physics.p2.enable(this.block);
	    this.block.body.static = true;
	    this.block.anchor.setTo(0, 0);
	},

	/*

	<!--The following is under development. Creating a slope of sorts should be made in a separate .js where the main focus
	is to generate the landscape for the sprite to run on.-->

	createSlope: function(){
	// Define a block using bitmap data rather than an image sprite
	var slopeShape = this.game.add.bitmapData(this.game.world.width, 200);

	// Fill the block with black color
	slopeShape.ctx.rect(0, 0, this.game.world.width, 100);
	slopeShape.ctx.fillStyle = '255';
	slopeShape.ctx.fill();

	// Create a new sprite using the bitmap data
	this.slope = this.game.add.sprite(0, 0, slopeShape);

	// Enable P2 Physics and set the block not to move
	this.game.physics.p2.enable(this.slope);
	this.slope.body.static = false;
	this.slope.anchor.setTo(0, 0);
	},
	* */

	createPlayer: function() {

	    // Add the player to the game
	    this.player = this.game.add.sprite(200, 400, "betty");

	    // Enable physics, use "true" to enable debug drawing
	    this.game.physics.p2.enable([this.player], false);

	    // Get rid of current bounding box
	    this.player.body.clearShapes();

	    // Add our PhysicsEditor bounding shape (causes betty to have NOT fly out of the page)
	    this.player.body.loadPolygon("sprite_physics", "betty");

		var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		spaceKey.onDown.add(this.jump, this);
	},

	update: function() {
		//updates the game if betty dies or exceeds boundaries
	},

	jump: function() {
		//preform jump
		this.player.body.velocity.y = -350;
	},

	restartGame: function(){
		// restart the game after death
		this.game.state.start('main');
	},

};

var Main = function(game)
{
	//This function allows "Main" to be accessed by the game instance
};

Main.prototype = {

	create: function()
	{
		//Sets a background (which can't seem to be tiled...)
		//var background = game.add.sprite(0,0,"background");
		//background.scale.setTo(2);

		//Temporary colour for the background
		this.game.stage.backgroundColor = "71c5cf";

	    //Start the P2 Physics Engine
	    this.game.physics.startSystem(Phaser.Physics.P2JS);

	    //Set the gravity
	    this.game.physics.p2.gravity.y = 1000;

		//Create the ceiling
	    this.createBlock();

		//Winning condition
		this.winLevel();

	    //Create the player
	    this.createPlayer();
	},

	update: function()
	{
		//Keep the sprite moving until it reaches the opposite side of the window: 0  is default speed
		this.movePlayer(0);
		this.game.physics.arcade.overlap(this.player, this.blockE, this.movePlayer(0), null, this);
	},

	createSlope: function()
	{
		//Define a block using bitmap data rather than an image sprite
		var slopeShape = this.game.add.bitmapData(this.game.world.width, 200);

		//Fill the slope with black color
		//slopeShape.ctx.rect(0, 0, this.game.world.width, 200);
		//slopeShape.ctx.fillStyle = "71c5cf";
		//slopeShape.ctx.fill();

		//Create a new sprite using the bitmap data and place it at (x,y) location
		this.slope = this.game.add.sprite(0, this.game.world.height-200, slopeShape);

		//Enable P2 Physics and set the block not to move
		this.game.physics.p2.enable(this.slope);
		this.slope.body.static = true;

		//Some detection of sorts that will prevent sprite from overcoming the slope without the require acceleration threshold
		//Initializing slope's boundary to generate a response with the sprite
		var blockMaterial = this.game.physics.p2.createMaterial('slopeMaterial', this.block.body);
	},

	createBlock: function()
	{
		//Define a block using bitmap data rather than an image sprite
		var blockShape = this.game.add.bitmapData(this.game.world.width, 200);

		//Fill the block with black color
		blockShape.ctx.rect(0, 0, this.game.world.width, 200);
		blockShape.ctx.fillStyle = "000000";
		blockShape.ctx.fill();

		//Create a new sprite using the bitmap data and place it at (x,y) location
		this.block = this.game.add.sprite(this.game.world.width/2,this.game.world.height, blockShape);

		//Enable P2 Physics and set the block not to move
		this.game.physics.p2.enable(this.block);
		this.block.body.static = true;
	},

	createPlayer: function()
	{
	    //Add the player to the game
	    this.player = this.game.add.sprite(200, 400, "betty");

	    //Enable physics, use "true" to enable debug drawing
	    //this.game.physics.p2.enable([this.player], false);
		this.game.physics.p2.enable(this.player);


	    //Get rid of current bounding box
	    //this.player.body.clearShapes();

	    //Add our PhysicsEditor bounding shape (causes betty to have NOT fly out of the page)
	    //this.player.body.loadPolygon("sprite_physics", "betty");

		//Initializing player's boundary to generate a response with the block
		var playerMaterial = this.game.physics.p2.createMaterial('playerMaterial', this.player.body);
	},

	movePlayer: function(speed)
	{
		//Makes sprite jump (temporary measure)
		var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		spaceKey.onDown.add(this.jump, this);

		//If player is in contact with a slope
		//-->code

		if(speed === 0)
		{
			//Sprite speed
			this.player.body.velocity.x = 150;
		}
		else
		{
			this.player.body.velocity.x = speed;
		}
	},

	winLevel: function()
	{
		//Define a block using bitmap data rather than an image sprite
		var blockEnd = this.game.add.bitmapData(100, 200);

		//Fill the block with black color
		blockEnd.ctx.rect(0, 0, 100, 200);
		blockEnd.ctx.fillStyle = "ff0000";
		blockEnd.ctx.fill();

		//Create a new sprite using the bitmap data and place it at (x,y) location
		this.blockE = this.game.add.sprite(this.game.world.width-100,this.game.world.height-200, blockEnd);

		//Enable P2 Physics and set the block not to move
		this.game.physics.p2.enable(this.blockE);
		this.blockE.body.static = true;
	},

	jump: function()
	{
		//preform jump
		this.player.body.velocity.y = -350;
	},

	accelerate: function()
	{
		//Set new speed based on retrieved data from queue stored in local memory
	},
};
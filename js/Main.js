
var Main = function(game)
{
	//This function allows "Main" to be accessed by the game instance
};

Main.prototype = {

	create: function()
	{
		//Sets a background (which can't seem to be tiled...)
		this.background = game.add.tileSprite(0, game.height - 700, game.width, 456, "background");
		//this.background.scale.setTo();

		//Temporary colour for the background, similar to cloud_1
		this.game.stage.backgroundColor = "#5cc5f2";

		//Index for the queue/array
		this.arrayIndex = 0;

		//Time interval value to determine when to pull from queue/array
		this.arrayMoment = 0;

		//Current speed for the sprite
		this.nextSpeed = 0;

		//Puts the index of the queue/array on display (TESTING)
		//OR: a possible expansion to displaying the score on the screen!
		this.labelIndex = game.add.text(20, 20, "0",{ font: "30px Arial", fill: "#000000" });

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
		//Updates sprite speed
		this.movePlayer(this.getSpeed());

		//Some sort of restart logic wherein a restart button resets everything back to square one
		/*
		 if(button.press === value)
		 {
		 this.restart();
		 }
		 * */
	},

	createBlock: function()
	{
		//Define a block using bitmap data rather than an image sprite
		var blockShape = this.game.add.bitmapData(this.game.world.width, 200);

		//Fill the block with black color
		blockShape.ctx.rect(0, 0, this.game.world.width, 200);
		blockShape.ctx.fillStyle = "#00cc00";
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
		this.game.physics.p2.enable(this.player);

		//Get rid of current bounding box
		this.player.body.clearShapes();

		//Add our PhysicsEditor bounding shape (causes betty to have NOT fly out of the page)
		this.player.body.loadPolygon("sprite_physics", "betty");

		//Initializing player's boundary to generate a response with the block
		var playerMaterial = this.game.physics.p2.createMaterial('playerMaterial', this.player.body);
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

	movePlayer: function()
	{
		//Makes sprite jump (temporary measure)
		var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		spaceKey.onDown.add(this.jump, this);

		//If player is in contact with a slope
		//-->code

		//If the queue is empty OR if the velocity is 0
		if(this.nextSpeed === 0)
		{
			//Sprite speed
			//this.player.body.velocity.x = 150;

			//Can remove the speed allocation to enable the sprite to carry momentum!
		}
		else
		{
			this.player.body.velocity.x = this.nextSpeed;
			//var newSpeed = this.player.accerelate(speed);
		}
	},

	jump: function() {
		//preform jump
		this.player.body.velocity.y = -350;
		if (this.arrayIndex)
		{
			//deletes ds
			//delete localStorage.ds;
		}
	},

	getSpeed: function()
	{
		//Retrieve queue/array of the speed values
		this.speedValues = JSON.parse(localStorage.ds);

		//Checks every 50 cycles to pull from queue/array
		if(this.arrayMoment % 100 === 0 && this.speedValues.length > 0)
		{
			//if(speedValues[this.arrayIndex] !== null)
			if(this.arrayIndex < this.speedValues.length)
			{
				this.nextSpeed = this.speedValues[this.arrayIndex];
			}
			else
			{
				//sets the speed to the default setting
				this.nextSpeed = 0;
			}

			this.arrayIndex += 1;
		}

		//Update arrayMoment
		this.arrayMoment += 1;

		//Display the current velocity
		this.labelIndex.text =  "step..."+this.arrayIndex;
	},

	accelerate: function()
	{
		//Potential to expand as a kinematics function of sorts
	},

	restart: function()
	{
		//Resets the character back to its original position without any ds values to have
		//delete localStorage.ds;
		//reset player
		//reset level
	},
};
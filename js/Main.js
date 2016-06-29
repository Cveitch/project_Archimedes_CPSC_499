
var Main = function(game)
{
	//This function allows "Main" to be accessed by the game instance
};

Main.prototype = {
	
	create: function()
	{
		// Start the P2 Physics Engine
		this.game.physics.startSystem(Phaser.Physics.P2JS);
		
		// Set the gravity
		this.game.physics.p2.gravity.y = 1400;

		// initialised tilemap with matching tileset
		var mymap = this.game.add.tilemap('testmap');
		mymap.addTilesetImage('tset_world1');

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

		//temporary colour for the background
		//this.game.stage.backgroundColor = "71c5cf";
		
		//creates layers matching the .json testlevel 
	    layerbackground = mymap.createLayer('background');
		layerblocks 	= mymap.createLayer('block1');
		layerdetails 	= mymap.createLayer('detail1');
	
		//we resize the world to the background as it will be covering the entire level
	    layerbackground.resizeWorld();

		//turns polylines solid
		layerpolyline_tiles = this.game.physics.p2.convertCollisionObjects(mymap, "objects1");

	    //Create the player
	    this.createPlayer();
		
		// Add goal to the game
		goal 	= this.game.add.sprite(520,400,"goal");
		
		//this allows for real time in game control with keyboard, thanks to the update function 
		cursors = this.game.input.keyboard.createCursorKeys();
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

	createPlayer: function() {

		//places character in world
		this.player = this.game.add.sprite(100, 100, "avatar");
		this.game.physics.p2.enable(this.player);

		//quality of life settings 
		this.player.anchor.setTo(0.5,0.5);
		this.game.camera.follow(this.player);

		//gives player a circle hitbox (radius,offestx,offsety)
		this.player.body.setCircle(44,0,0);

        //wouldn't want the character tumbling over
		this.player.body.fixedRotation=true;

        //Prevent sprite from reaching a certain speed
        this.player.body.maxVelocity.x= 500;
	},

	movePlayer: function()
	{
		//Makes sprite jump (temporary measure)
		var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		spaceKey.onDown.add(this.jump, this);

		//If player is in contact with a slope
		//-->code

		//If the queue is empty OR if the velocity is 0
		if(this.nextSpeed !== 0)
		{

            //Accelerating sprite
            //this.player.body.thrust(this.nextSpeed);
            //this.player.body.thrust(400);
            this.player.body.velocity.x = this.nextSpeed;
		}
		else
		{
            //alert("hey");
            //Default sprite velocity
            this.player.body.velocity.x = 30;
		}
	},
	
	//can set controls in update so this function not called
	jump: function()
    {
		//preform jump
		this.player.body.velocity.y = -350;
	},

	getSpeed: function()
	{
		//Retrieve queue/array of the speed values
		this.speedValues = JSON.parse(localStorage.ds);

		//Checks every 80 cycles to pull from queue/array
		if(this.arrayMoment % 100 === 0 && this.speedValues.length > 0)
		{
			//if(speedValues[this.arrayIndex] !== null)
			if(this.arrayIndex < this.speedValues.length)
			{
				//this.nextSpeed = this.speedValues[this.arrayIndex];
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

	acceleratePlayer: function(value)
	{
		//Set up local variable to hold current d.s. acceleration value
		var acceleration = value;
		var setSpeed = 25;
        var time = 1.5;

		//setSpeed = (acceleration*time)-this.nextSpeed;

		//Set the acceleration to be used as the next speed
		//this.nextSpeed = setSpeed;
        //this.player.body.thrust(acceleration);
	},

	//currently not called
	restartGame: function(){
		// restart the game after death
		this.game.state.start('main');
	},

};
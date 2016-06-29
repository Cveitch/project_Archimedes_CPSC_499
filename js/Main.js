
var Main = function(game)
{
	//This function allows "Main" to be accessed by the game instance
};
//variables to keep track of time. 
var timer;
var timerEvent;
//if out of time turn false
var outOfTime; 


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
        
        //start timer
        timer = game.time.create(); 
        //delayed event
        timerEvent = timer. add(Phaser.Timer.SECOND * 5, this.endTimer, this);
        //start timer
        timer.start(); 
        outOfTime = false; 

		//temporary colour for the background
		//this.game.stage.backgroundColor = "71c5cf";
		
		//creates layers matching the .json testlevel 
	    layerbackground = mymap.createLayer('background');
		layerblocks 	= mymap.createLayer('block1');
		layerdetails 	= mymap.createLayer('detail1');
	
		//we resize the world to the background as it will be covering the entire level
	    layerbackground.resizeWorld();
		//Create the ceiling
		this.createBlock();

		
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
		
	    // Enable physics, use "true" to enable debug drawing
	    //this.game.physics.p2.enable([this.player], false);

	    // Get rid of current bounding box
	    //this.player.body.clearShapes();

	    // Add our PhysicsEditor bounding shape (causes betty to have NOT fly out of the page)
	    //this.player.body.loadPolygon("sprite_physics", "betty");

		//var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		//spaceKey.onDown.add(this.jump, this);
		
		
	},

	movePlayer: function()
	{
		//Makes sprite jump (temporary measure)
		var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		spaceKey.onDown.add(this.jump, this);

		//If player is in contact with a slope
		//-->code

        //check win condition; 
        this.gameWin(this.player,goal); 
        
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
	
	// update: function() {
	// 	//updates the game if betty dies or exceeds boundaries
	//
	// 	//cursors is used for in game control as an example of physics capabilities
	//
	// 	this.player.body.velocity.x = 0;
	//
	// 	if 		(cursors.left.isDown)
	// 	{//move left, flip character left
	// 		this.player.scale.x = -1;
	// 		this.player.body.velocity.x = -300;
	// 	}
	// 	else if (cursors.right.isDown)
	// 	{//move right, flip right
	// 		this.player.scale.x = 1;
	// 		this.player.body.velocity.x = 300;
	// 	}
	// 	if(cursors.up.isDown)
	// 	{//jumps
	// 		this.player.body.velocity.y = -600;
	// 	}
	//
	// },
	
	//can set controls in update so this function not called
	jump: function() {
		//preform jump
		this.player.body.velocity.y = -350;
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

	//currently not called
	restartGame: function(){
		// restart the game after death
		this.game.state.start('main');
	},
    //Checks game state to see if player won. 
    gameWin: function(PLAYER, GOAL) 
    {
    var error = 1; 
    //get position of player. 
    var playerX = Math.floor(PLAYER.x-35); 
    var playerY = Math.floor(PLAYER.y-96); 
        console.log("PX: "+ playerX +"PY: "+playerY ); 
        
    //get position of Goal. 
    var goalX = Math.floor(GOAL.x); 
    var goalY = Math.floor(GOAL.y); 
    console.log("GX: "+ goalX + "GY: "+goalY); 
        
    //if time is more than 5 seconds you lose. 
    if(!timer.running){
        window.location.href = 'Canvas_Page.html'; 
       //lose game 
    }
    
        //if player is near goal, you win :D
    if((playerX <= goalX+error && playerX >= goalX-error ) && playerY === goalY ){
        window.location.href = 'Score_Page.html';

    }
    

    },
    
    //stop timer; 
    endTimer: function()
    {
    timer.stop(); 
    outOfTime = true; 
    },
    render: function () 
    {
        // If our timer is running, show the time in a nicely formatted way, else show 'Done!'
        if (timer.running) 
        {
            game.debug.text(this.formatTime(Math.round((timerEvent.delay - timer.ms) / 1000)), 2, 14, "#d8c23f");
        }
        else 
        {
            game.debug.text("Done!", 2, 14, "#6f6f6f");
        }
    },
    //Show Time Left
     formatTime: function(s) 
    {
        // Convert seconds (s) to a nicely formatted and padded time string
        var minutes = "0" + Math.floor(s / 60);
        var seconds = "0" + (s - minutes * 60);
        return ":" + seconds.substr(-2);   
    }
    
};
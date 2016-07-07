
var Main = function(game)
{
	//This function allows "Main" to be accessed by the game instance
};
//variables to keep track of time. 
var timer;
var timerEvent;
//if out of time turn false
var outOfTime; 

//Var for how much time you have to clear the level. 
var timeAllowed = 30; 


Main.prototype = {
	
	create: function()
	{
		//Index for the queue/array
		this.arrayIndex = 0;

		//Time interval value to determine when to pull from queue/array
		this.arrayMoment = 0;

		//Current speed for the sprite
		this.nextSpeed = 0;

		//String value to allow sprite action based on button pressing IF it is "GO"
		this.confirmGoSprite = "STOP";

		//Puts the index of the queue/array on display (TESTING)
		//OR: a possible expansion to displaying the score on the screen!
		this.labelIndex = game.add.text(20, 20, "0",{ font: "30px Arial", fill: "#000000" });

		//Initialize the buttons needed (BROKEN)
        this.buttonGo = game.add.button(game.world.centerX - 95, 400, "button_goSprite", this.setButtonLogic, this);

        //Place button on the screen at X and Y coordinates
        this.buttonGo.anchor.setTo(0.5,0.5);
        
        //start timer
        timer = game.time.create(); 
        //delayed event
        timerEvent = timer. add(Phaser.Timer.SECOND * timeAllowed, this.endTimer, this);
        //start timer
        timer.start(); 
        outOfTime = false;

        //Enable the physics to start
        this.createPhysics();

        //Create the background for the game
        this.createBackground();

	    //Create the player
	    this.createPlayer();
		
		// Add goal to the game
		goal 	= this.game.add.sprite(0,400,"goal");
		
		//this allows for real time in game control with keyboard, thanks to the update function 
		cursors = this.game.input.keyboard.createCursorKeys();
	},

	update: function()
	{
		if(this.confirmGoSprite === "GO")
		{
			//Updates sprite speed
			this.movePlayer(this.getSpeed());
		}
		else if(this.confirmGoSprite === "STOP")
		{
			//Gives the sprite an initial velocity of 0 pixels/s
			this.movePlayer();
		}
		else
		{
			//Gives the sprite an initial velocity of 20 pixels/s
			this.movePlayer();
		}
	},

	createPhysics: function()
	{
        // Start the P2 Physics Engine
        this.game.physics.startSystem(Phaser.Physics.P2JS);

        // Set the gravity
        this.game.physics.p2.gravity.y = 1400;
	},

	createBackground: function()
	{
		// initialised tilemap with matching tileset
		var mymap = this.game.add.tilemap('testmap');
		mymap.addTilesetImage('tset_world1');

		//Temporary colour for the background, similar to cloud_1
		this.game.stage.backgroundColor = "#5cc5f2";

		//creates layers matching the .json testlevel
		layerbackground = mymap.createLayer('background');
		layerblocks 	= mymap.createLayer('block1');
		layerdetails 	= mymap.createLayer('detail1');

		//we resize the world to the background as it will be covering the entire level
		layerbackground.resizeWorld();

		//turns polylines solid
		//var layerpolyline_tiles = this.game.physics.p2.convertCollisionObjects(mymap, "objects1");
		this.game.physics.p2.convertCollisionObjects(mymap, "objects1");
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
		this.player = this.game.add.sprite(200, 210, "avatar");
		this.game.physics.p2.enable(this.player);
		//quality of life settings 
		this.player.anchor.setTo(0.5,0.5);
		this.game.camera.follow(this.player);
		//gives player a circle hitbox (radius,offestx,offsety)
		this.player.body.setCircle(44,0,0);
		//wouldn't want the character tumbling over
		this.player.body.fixedRotation=true;
	},

	movePlayer: function()
	{
		//Makes sprite jump (temporary measure)
		var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		spaceKey.onDown.add(this.jump, this);

        //check win condition; 
        this.gameWin(this.player,goal);

		switch(this.confirmGoSprite)
		{
			case "STOP":
				//Give the sprite zero velocity
				this.player.body.velocity.x = 0;
				break;
			case "GO":
				//Give the sprite zero velocity
				this.player.body.velocity.x = 0;
				break;
			default:
				//Set the next velocity/speed from the DS
				this.player.body.velocity.x = this.nextSpeed;
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

	//currently not called
	restartGame: function(){
		// restart the game after death
		this.game.state.start('main');
	},
    //Checks game state to see if player won. 
    gameWin: function(PLAYER, GOAL) 
    {
    var error = 3; 
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
    if((playerX <= goalX+error && playerX >= goalX-error ) && (playerY <= goalY+error && playerY >= goalY-error) ){
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
    },

    setButtonLogic: function()
    {
		//Allow the sprite to go through its movement
		this.confirmGoSprite = "GO";

		//Greys out the start button
		this.buttonGo =! this.buttonGo.visible;
    },
};
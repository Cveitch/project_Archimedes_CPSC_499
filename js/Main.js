
var Main = function(game){
	//This function allows "Main" to be accessed by the game instance
};

Main.prototype = {

	create: function() {
		
		// Start the P2 Physics Engine
		this.game.physics.startSystem(Phaser.Physics.P2JS);
		// Set the gravity
		this.game.physics.p2.gravity.y = 900;
		
		// initialised tilemap with matching tileset
		var mymap = this.game.add.tilemap('testmap');
		mymap.addTilesetImage('tset_world1');

		//temporary colour for the background
		//this.game.stage.backgroundColor = "71c5cf";
		
		//creates layers matching the .json testlevel 
	    layerbackground = mymap.createLayer('background');
		layerblocks 	= mymap.createLayer('block1');
		layerdetails 	= mymap.createLayer('detail1');
	
		//we resize the world to the background as it will be covering the entire level
	    layerbackground.resizeWorld();

		//this sets both the block and detail layer's collision to true
			//mymap.setCollisionByExclusion([0],true,'layerblocks');
			//mymap.setCollisionBetween(1,20,true,'layerdetails');

		//uses p2 to make multiple bodies in tile maps into solid single body
		layerblocks_tiles 	= this.game.physics.p2.convertTilemap(mymap,layerblocks);
		 layerdetails 	= this.game.physics.p2.convertTilemap(mymap, layerdetails);
		//turns polylines solid
		layerpolyline_tiles = this.game.physics.p2.convertCollisionObjects(mymap, "objects2");

	    // Create the player
	    //this.createPlayer();

		// Add the player to the game
		this.player = this.game.add.sprite(0, 0, "avatar");
		this.game.physics.p2.enable(this.player);
		//quality of life settings 
		this.player.anchor.setTo(0.5,0.5);
		this.game.camera.follow(this.player);
		//gives player a circle hitbox (radius,offestx,offsety)
		this.player.body.setCircle(22,0,0);
		//wouldn't want the character tumbling over
		this.player.body.fixedRotation=true;
		
		
		// Add goal to the game
		goal = this.game.add.sprite(520,400,"goal");
		
		//this allows for real time in game control with keyboard, thanks to the update function 
		cursors = this.game.input.keyboard.createCursorKeys();
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

	   
		
		
	    // Enable physics, use "true" to enable debug drawing
	    //this.game.physics.p2.enable([this.player], false);

	    // Get rid of current bounding box
	    //this.player.body.clearShapes();

	    // Add our PhysicsEditor bounding shape (causes betty to have NOT fly out of the page)
	    //this.player.body.loadPolygon("sprite_physics", "betty");

		//var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		//spaceKey.onDown.add(this.jump, this);
		
		
	},

	update: function() {
		//updates the game if betty dies or exceeds boundaries
		
		//cursors is used for in game control as an example of physics capabilities
		
		this.player.body.velocity.x = 0;
		
		if 		(cursors.left.isDown)
		{//move left, flip character left
			this.player.scale.x = -1;
			this.player.body.velocity.x = -300;
		}
		else if (cursors.right.isDown)
		{//move right, flip right
			this.player.scale.x = 1;
			this.player.body.velocity.x = 300;
		}
		if(cursors.up.isDown)
		{//jumps
			this.player.body.velocity.y = -800;
		}
		
	},
	
	//can set controls in update so (Riley) moved them their, this function not called
	jump: function() {
		//preform jump
		this.player.body.velocity.y = -350;
	},

	restartGame: function(){
		// restart the game after death
		this.game.state.start('main');
	},

};
# project_Archimedes_CPSC_499
Project repository for group A, CPSC 499

What currently works:
+Switching between pages without causing the physics engine to load info to other pages that should only be specific to
ONE page
+Solved a work around when switching between pages by having each page jump to another (SPRITE<->CANVAS). Error 404
occurs whenever Buttons.js is involved somehow.

What currently doesn't work:
-Physics engine keeps reloading its settings whenever Sprite page is activated; should just keep the previous settings
form the first time it is loaded

//--How things work--//:

I'll try to make as simple as possible, but the best way to explain how the physics engine works will seem like a bore.
So bear with me.

1) What you'll need to do is create an object of Phaser in order to use all of it's methods and engines (in our case it'll
be P2):
    game = new Phaser.Game(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, Phaser.AUTO);
    <!--The parameters are self-explanatory except for Phaser.AUTO. This allows Phaser to use WebGL to run things on the webapge-->

2) Allow the following .js files to have their objects be used by the game instance:
    game.state.add("Boot", Boot);
    game.state.add("Preload", Preload);
    game.state.add("Main", Main);

3) Start the state of the game. This causes the game instance to set it's current state to begin in the Boot.js
    game.state.start("Boot");

4) Jumping into Boot.js, "Boot" (which is represented as the Boot variable called earlier in state.add) runs through
and into create():
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.state.start("Preload");
    <!--ScaleManager.SHOW_ALL allows the current game instance to show the entire game display while still maintaining
    the aspect ratio-->
    <!--game instance then jumps into the Preload.js-->

5) Jumping into Preload.js, "Preload" (which is represented as the Preload variable called earlier in state.add) loads
up:
    this.game.load.image("betty", "assets/betty.png");
    this.game.load.physics("sprite_physics", "assets/sprite_physics.json");
    <!--This is where the sprites are loaded to be used by the game instance-->
    <!--The second line is creating the physics and collision parameters to the sprite in the .json file-->

    this.game.state.start("Main");
    <!--As you can guess, we are jumping into Main.js-->

6) Jumping into Main.js, "Main" (which is represented as the Main variable called earlier in state.add) loads
up and steps through all the functions in sequential order:
    this.game.stage.backgroundColor = '#ccddff';
    <!--This creates a blue-ish background-->

    this.game.physics.startSystem(Phaser.Physics.P2JS);.
    <!--This line allows for the P2 engine to be engaged-->

    this.game.physics.p2.gravity.y = 1000;
    <!--Once the P2 engine has been activated, you can set the gravity of the game instance envrionment-->

    this.createBlock();
    this.createPlayer();
    <!--Both of these lines are called to create a block that acts as a ceiling tile and a sprite, respectively-->

7) createBlock() creates a sprite created through bitmapping and not through any imports of sprite files.
    var blockShape = this.game.add.bitmapData(this.game.world.width, 200);
    <!--Creates a blockShape variable that is the width of the game's display in terms of pixels and 200 pixels in length-->

    blockShape.ctx.rect(0, 0, this.game.world.width, 200);
    <!--Sets blockShape to have a rectangle perimeter-->

    blockShape.ctx.fillStyle = '000';
    <!--The fill pattern for blockShape will now be black-->

    blockShape.ctx.fill();
    <!--blockShape will allow the area denoted by the perimeter set previously to be entirely black-->

    this.block = this.game.add.sprite(0, 0, blockShape);
    <!--Adding blockShape to block instance in order to be used a sprite-->

    this.game.physics.p2.enable(this.block);
    <!--This enables the block instance to be affect by the P2 engine's calculations-->

    this.block.body.static = true;
    <!--Fixes the block instance in the space, preventing to be influenced by gravity-->

    this.block.anchor.setTo(0, 0);
    <!--This places the block instance in a specific location in the game's display, in this case the origin of the
    rectangle is set to the top left corner of the game's display. This will cause it to appear like a tiled roof-->

8) createPlayer() creates a sprite using the sprite files preloaded from the Preload.js:
    this.player = this.game.add.sprite(200, 400, 'betty');
    <!--Adding the sprite "betty" to the player instance in order to be used a sprite-->

    this.game.physics.p2.enable([this.player], false);
    <!--same as above in createBlock(), but the boolean expression can be toggled to debug the physics of "betty" if
    true-->

    this.player.body.clearShapes();
    <!--This ensures that there aren't any mass properties and bounding radius from the person instance, only using
    "betty"'s properties denoted in the preloaded .json file-->

    this.player.body.loadPolygon("sprite_physics", "betty");
    <!--This loads up the physics properties given in the .json file for "betty"-->
    
9) getSpeed() pulls the latest speed present from a queue/array and then to be updated as the next speed for the sprite to have. The latest speed is saved as the nextSpeed object:
	if(this.arrayMoment % 50 === 0)
	{
		//if(speedValues[this.arrayIndex] !== null)
		if(this.arrayIndex < speedValues.length)
		{
			this.nextSpeed = speedValues[this.arrayIndex];
		}
		else
		{
			//sets the speed to the degault setting
			this.nextSpeed = 0;
		}
		this.arrayIndex += 1;
	}
	<!--Block of code that needs some explaining-->

    if(this.arrayMoment % 50 === 0){...}
    <!--This condition passes whenever update() iterates
    every 50 cycles and then allows the next speed should be removed from the data structure-->

    if(this.arrayIndex < speedValues.length){...}
    <!--This condition activates only when the arrayIndex is lower the length than the length of the data structure-->
    
    this.nextSpeed = speedValues[this.arrayIndex];
    <!--When the arrayIndex is still smaller than the data structure's length, the nextSpeed is pulled from the d.s.-->

    this.nextSpeed = 0;
    <!--When the arrayIndex is larger or equal to the d.s.'s length, the nextSpeed is set to the default speed of 150-->

10) movePlayer() is pretty self-explanatory: this is the function that will set the velocity taken by getSpeed() to the sprite:
    //If the queue is empty OR if the velocity is 0
	if(this.nextSpeed === 0)
	{
		//Sprite speed
		this.player.body.velocity.x = 150;
	}
	else
	{
		this.player.body.velocity.x = this.nextSpeed;
	}
	<!--Core of how movePlayer() works-->
	
	if(this.nextSpeed === 0){...}
	<!--This condition allows for the default velocity setting-->
	
	this.player.body.velocity.x = this.nextSpeed;
	<!--If the default condition is not set as 0, then the player velocity is set as the value removed from the d.s.-->

Credit where it's due:

I followed the tutorial given here: https://www.codeandweb.com/physicseditor/tutorials/phaser-p2-physics-example-tutorial

It helped me understand how the basics work. My next goal is to delve deep into creating an environment for a landscape
to allow our sprite to pass through.

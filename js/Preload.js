var Preload = function(game){
	//This function allows "Preload" to be accessed by the game instance
};

Preload.prototype = {

	preload: function()
	{
	    this.game.load.image("betty", "assets/images/betty.png");
		this.game.load.image("background", "assets/images/cloud_1.jpg");
	    this.game.load.physics("sprite_physics", "assets/sprite_physics/sprite_physics.json");
	},

	create: function()
	{
		this.game.state.start("Main");
	}
}

/*
* 	Should create some sort of superclass for environments for which this class
* can generate different types of environments, switching between them as a new
* level is made using a case statement.
* */

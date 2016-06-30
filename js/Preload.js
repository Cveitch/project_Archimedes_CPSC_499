var Preload = function(game){
	//This function allows "Preload" to be accessed by the game instance
};

Preload.prototype = {

	preload: function(){ 
	    this.game.load.image	("avatar", "assets/images/spr_character.png");
		this.game.load.image	("goal", "assets/images/spr_goal.png");
	    this.game.load.tilemap	("testmap", "assets/sprite_physics/testlevel.json",null, Phaser.Tilemap.TILED_JSON);
		this.game.load.image	("tset_world1", "assets/images/tset_world1.png")
	},

	create: function(){
		this.game.state.start("Main");
	}
}

/*
* 	Should create some sort of superclass for environments for which this class
* can generate different types of environments, switching between them as a new
* level is made using a case statement.
* */

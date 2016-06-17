var Boot = function(game){
	//This function allows "Boot" to be accessed by the game instance
};
  
Boot.prototype = {

  	create: function(){
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.game.state.start("Preload");
	}
}
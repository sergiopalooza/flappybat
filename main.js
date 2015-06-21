//initalize phaser and game type
var game = new Phaser.Game(400,490, Phaser.AUTO, 'gameDiv');

var mainState = {
	preload: function(){
		game.stage.backgroundColor = '#71c5cf';
		game.load.image('bird', 'assets/bird.png');
	},

	create: function(){
		// //set physics
		// game.physics.startSystem(Phaser.Physics.ARCADE);

		// //display bird
		// this.bird = this.game.add.sprite.(100, 245, 'bird');

		// //adding gravity
		// game.physics.arcade.enable(this.bird);
		// this.bird.body.gravity.y = 1000;

		// //calling jump when space is pressed
		// var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		// spaceKey.onDown.add(this.jump, this);

}
	// ,

	// update: function(){
	// 	//reset game if bird leaves world
	// 	if (this.bird.inWorld == false)
	// 		this.restartGame();

	// },

	// //make the bird jump
	// jump: function(){
	// 	//adding hops to the bird
	// 	this.bird.body.velocity.y = -350;

	// },

	// //restart the game
	// restart: function(){
	// 	game.state.start('main');
	// }

};

game.state.add('main', mainState);
game.state.start('main');
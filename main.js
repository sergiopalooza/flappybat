//initalize phaser and game type
var game = new Phaser.Game(400,490, Phaser.CANVAS, 'gameDiv');

var mainState = {
	preload: function(){
		game.stage.backgroundColor = '#71c5cf';
        game.load.image('bird', 'assets/bird.png');  
        game.load.image('pipe', 'assets/pipe.png');
	},

	create: function(){
		// //set physics
		game.physics.startSystem(Phaser.Physics.ARCADE);

		//display bird
		this.bird = this.game.add.sprite(100, 245, 'bird');

		//adding gravity
		game.physics.arcade.enable(this.bird);
		this.bird.body.gravity.y = 1000;

		//calling jump when space is pressed
		var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		spaceKey.onDown.add(this.jump, this);

		
		this.pipes = game.add.group(); //create group
		this.pipes.enableBody = true; //adds physics
		this.pipes.createMultiple(20, 'pipe'); //create 20 pipes

		this.timer = game.time.events.loop(1500, this.addRowOfPipes, this);

		this.score = 0;

		this.labelScore = game.add.text(20, 20, "0", {font: "30px Arial", fill: "#ffffff"});
		this.labelInstructions = game.add.text(100, 20, "Tap to jump!", {font: "30px Arial", fill: "#ffffff"});

},
	addOnePipe: function(x,y){
		var pipe = this.pipes.getFirstDead();//grab first unused pipe

		pipe.reset(x,y); //set position of pipe

		pipe.body.velocity.x = -200; //adding movement to the left

		pipe.checkWorldBounds = true;
		pipe.outOfBoundsKill = true;

	},

	addRowOfPipes: function(){
		var hole = Math.floor(Math.random() * 5) +1; //where the hole will be

		for (var i = 0; i <8; i++){
			if (i != hole && i != hole +1){
				this.addOnePipe(400, i * 60 + 10);
			}
		}
		this.score += 1;
		this.labelScore.text = this.score; //updating score on pipe creation
	},

	update: function(){
		//reset game if bird leaves world
		if (this.bird.inWorld == false)
			this.restartGame();

		game.physics.arcade.overlap(this.bird, this.pipes, this.restartGame, null, this);

		if (game.input.activePointer.isDown && !this.touched) {
		this.touched = true;
		this.jump();
}

		if (game.input.activePointer.isUp) {
		this.touched = false;
		}

	},

	//make the bird jump
	jump: function(){
		//adding hops to the bird
		this.bird.body.velocity.y = -350;

	},

	//restart the game
	restartGame: function(){
		game.state.start('main');
	}

};

game.state.add('main', mainState);
game.state.start('main');
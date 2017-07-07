var Hacked = Hacked || {};

Hacked.Binary = function(game) {
	this.background = null;
}

Hacked.Binary.prototype = {
	preload: function() {
		this.game.load.image('alucard', 'assets/alucard-sprite.png');
		this.game.load.image('binary-0', 'assets/binary-0.png');
		this.game.load.image('binary-1', 'assets/binary-1.png');
		this.game.load.image('opposite', 'assets/opposite.jpeg');
		this.game.load.image('placer', 'assets/purps-placer.png');
		this.game.load.image('unpressButton', 'assets/button-unpressed.png');
		this.game.load.image('pressButton', 'assets/button-pressed.png');
	},

	create: function() {
		this.timesPlayed = Hacked.CONST.PUZZ_TRACK['Binary'];
		
		// create constants
		this.MOVE_SPEED = 3;
		const PUZZLE_BOUND = 1920;
		this.STILL_PLAYING = true;
		this.COMPLETED_BIN_PUZZ = false;
		this.PLAYER_NUM = '';

		this.textStyle = { font: "20px Arial", fill: "#fff", align: "left", boundsAlignH: "top", boundsAlignV:"top"  };

		this.game.world.setBounds(0, 0, PUZZLE_BOUND, PUZZLE_BOUND);

		this.group = this.game.add.group();
		this.placers = this.game.add.group();
		this.binaries = this.game.add.group();
		this.buttons = this.game.add.group();

		this.submitButton =  this.buttons.create(500, 300, 'unpressButton');

		this.binaries.enableBody = true;
		this.binaries.allSet = false;

		// generate number to match against
		this.matchNumber = Hacked.generateRandomNumber(10);

		// display it on screen
		this.winText = this.game.add.text(50, 300, "", this.textStyle);

		// change match number to binary and shuffle them
		this.targetNum = this.matchNumber.toString(2);

		let binNumArr = this.targetNum.split("");
		binNumArr = Hacked.shuffle(binNumArr);
		this.targetNum = binNumArr.join("");

		// add binary blocks and placers
		Hacked.Binary.addBinaries(this.binaries,this.targetNum);

		Hacked.Binary.addPlacers(this.placers, 200, 200, this.targetNum);

		// configure binary blocks
		this.binaries.children.map((binary) => {
			Hacked.addArcadePhysicsToSprite(binary);
		})	

		this.placers.children.map((placer) => {
			Hacked.addArcadePhysicsToSprite(placer);
			placer.hasBinary = false;
			placer.binaryVal = '';
		})	

		// create holding places

		this.player = this.group.create(300, 28, 'alucard');
		this.opposite = this.group.create(0, 0, 'opposite');

		Hacked.addArcadePhysicsToSprite([this.player]);

		this.player.body.collideWorldBounds = true;

		this.game.camera.follow(this.player);

		this.cursors = this.game.input.keyboard.createCursorKeys();
	},

	
	update: function() {

		// win condition
		if (this.COMPLETED_BIN_PUZZ === true && this.STILL_PLAYING === true) {
			this.winText.text = "YOU WIN"
			this.timesPlayed += 1;
			this.STILL_PLAYING = false;
		}

		if (this.numText) {
			this.numText.destroy();
			this.playerNumText.destroy();
		}

		// handle player movement
		this.player.body.velocity.x = 0;
		this.player.body.velocity.y = 0;

		if (this.cursors.left.isDown) {
			this.player.body.x -= this.MOVE_SPEED;
		} else if (this.cursors.right.isDown) {
			this.player.body.x += this.MOVE_SPEED;
		} else if (this.cursors.up.isDown) {
			this.player.body.y -= this.MOVE_SPEED;
		} else if (this.cursors.down.isDown) {
			this.player.body.y += this.MOVE_SPEED;
		}

		
		this.group.sort('y', Phaser.Group.SORT_ASCENDING);

		if (Hacked.checkOverlap(this.player, this.submitButton)) { 
			this.physics.arcade.overlap(this.binaries, this.placers, this.placerHasBinary, null, this);
			const overlappedPlacers = this.placers.children.filter((placer) => {
				return placer.hasBinary === true;
			});
			 
			const binaryVal = overlappedPlacers.reduce((sum, sprite) => {
				return sum + sprite.binaryVal;
			}, '');

			this.PLAYER_NUM = parseInt(binaryVal, 2)
			if(this.matchNumber === this.PLAYER_NUM) {
				this.COMPLETED_BIN_PUZZ = true;
			};
		}


		this.binaries.children.map((binary, idx, arr) => {
			binary.body.velocity.x = 0;
			binary.body.velocity.y = 0;
			this.game.physics.arcade.collide(this.player, binary, this.collide, null, this);
			this.game.physics.arcade.collide(this.binaries, binary, this.collide, null, this);
		});


		// create moving text for the player and target values

		const { x, y } = this.game.camera.view;
		this.numText = this.game.add.text(x + 500, y + 520, `Target Number: ${this.matchNumber}`, this.textStyle);
		this.playerNumText = this.game.add.text(x + 500, y + 570, `Player Number: ${this.PLAYER_NUM}`, this.textStyle);
	},

	collide (playerObj, collisionObj) {
		// console.log(playerObj.key);
	},

	placerHasBinary (binary, placer) {
		placer.binaryVal = binary.binaryVal;
		return placer.hasBinary = true;
	},

	render () {
		this.game.debug.body(this.player);
		this.game.debug.text(this.game.time.fps || '--', 2, 14, "pink");
	}
};

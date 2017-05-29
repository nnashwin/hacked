var Hacked = Hacked || {};

Hacked.Binary = function(game) {
	this.background = null;
}

Hacked.Binary.prototype = {
	preload: function() {
		this.game.load.image('alucard', 'alucard-sprite.png');
		this.game.load.image('binary-0', 'binary-0.png');
		this.game.load.image('binary-1', 'binary-1.png');
		this.game.load.image('landing', 'landing-sprite.jpeg');
		this.game.load.image('opposite', 'opposite.jpeg');
	},
	create: function() {

		this.group = this.game.add.group();
		this.binaries = this.game.add.group();
		this.binaries.enableBody = true;

		this.matchNumber = Hacked.generateRandomNumber(100);
		var style = { font: "20px Arial", fill: "#fff", align: "left", boundsAlignH: "top", boundsAlignV:"top"  };
		this.numberText = this.game.add.text(600, 70, this.matchNumber, style);

		this.binaryMatchNum = this.matchNumber.toString(2);
		for (let binDig of this.binaryMatchNum) {
			Hacked.Binary.addBinaryToGroup(this.binaries, Math.floor(Math.random() * 400), (400 + (Math.random() * 100)), parseInt(binDig));
		}
		
		this.player = this.group.create(300, 28, 'alucard');
		this.landing = this.group.create(300, 400, 'landing');
		this.opposite = this.group.create(0, 0, 'opposite');

		Hacked.addArcadePhysicsToSprite([this.player, this.landing]);

		this.cursors = this.game.input.keyboard.createCursorKeys();

		this.game.camera.follow(this.player);
		this.player.anchor.setTo(0.5, 0.5);
	},
	update: function() {
		this.player.body.velocity.x = 0;
		this.player.body.velocity.y = 0;

		if (this.cursors.left.isDown) {
			this.player.body.x -= 5;
		} else if (this.cursors.right.isDown) {
			this.player.body.x += 5;
		} else if (this.cursors.up.isDown) {
			this.player.body.y -= 5;
		} else if (this.cursors.down.isDown) {
			this.player.body.y += 5;
		}

		this.binaries.children.map((binary, idx, arr) => {
			binary.body.velocity.x = 0;
			binary.body.velocity.y = 0;
			Hacked.addArcadePhysicsToSprite(binary);
			this.game.physics.arcade.collide(this.player, binary, this.collide, null, this);
			this.game.physics.arcade.collide(this.binaries, binary, this.collide, null, this);
		});

		this.group.sort('y', Phaser.Group.SORT_ASCENDING);

		if (Hacked.checkOverlap(this.player, this.landing) && !this.player.overlapping) {
			this.player.overlapping = true;

			// use the groups children array to iterate over
			const overlapBinArray = Hacked.Binary.checkOverlappingBinaryBlocks(this.binaries.children, this.landing);
			const binIntValue = Hacked.Binary.calculateInt(overlapBinArray);
			if (binIntValue === this.matchNumber) {
				console.log('you win!');
			}
		} else if (Hacked.checkOverlap(this.player, this.landing) === false){
			this.player.overlapping = false;
		}

		if (Hacked.checkOverlap(this.opposite, this.player) && !this.player.overlapOpposite) {
			this.player.overlapOpposite = true;
			const overlapBinArray = Hacked.Binary.checkOverlappingBinaryBlocks(this.binaries.children, this.landing);
			overlapBinArray.map((binSprite) => {
				binSprite.binaryVal === '0' ? binSprite.binaryVal = '1' : binSprite.binaryVal = '0';
				binSprite.loadTexture(`binary-${binSprite.binaryVal}`, 0);
			});
		} else if (!Hacked.checkOverlap(this.opposite, this.player)) {
			this.player.overlapOpposite = false;
		}
	},

	collide (playerObj, collisionObj) {
		console.log(playerObj.key);
	},

	render () {
		this.game.debug.body(this.player);
		this.game.debug.text(this.game.time.fps || '--', 2, 14, "pink");
	}
};

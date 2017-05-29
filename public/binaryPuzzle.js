var Hacked = Hacked || {};

Hacked.Binary = function(game) {
	this.background = null;
}

Hacked.Binary.prototype = {
	preload: function() {
		this.game.load.image('gem', 'gem.png');
		this.game.load.image('alucard', 'alucard-sprite.png');
		this.game.load.image('binary-0', 'binary-0.png');
		this.game.load.image('binary-1', 'binary-1.png');
		this.game.load.image('landing', 'landing-sprite.jpeg');
	},
	create: function() {

		this.group = this.game.add.group();
		this.gems = this.game.add.group();
		this.binaries = this.game.add.group();

		Hacked.Binary.addBinaryToGroup(this.binaries, 200, 10, 0);
		Hacked.Binary.addBinaryToGroup(this.binaries, 400, 10, 1);
		Hacked.Binary.addBinaryToGroup(this.binaries, 400, 300, 1);
		Hacked.Binary.addBinaryToGroup(this.binaries, 200, 300, 0);

		this.binaries.children.map((binary) => {
			console.log(binary);
			Hacked.addArcadePhysicsToSprite(binary);
		});

		this.player = this.group.create(300, 28, 'alucard');
		this.gem2 = this.gems.create(100, this.game.world.centerY, 'gem');
		this.landing = this.group.create(300, 400, 'landing');

		Hacked.addArcadePhysicsToSprite([this.player, this.gem2, this.landing]);

		this.cursors = this.game.input.keyboard.createCursorKeys();
	},
	update: function() {
		this.player.body.velocity.x = 0;
		this.player.body.velocity.y = 0;

		this.gem2.body.velocity.x = 0;
		this.gem2.body.velocity.y = 0;

		if (this.cursors.left.isDown) {
			this.player.body.velocity.x = -150;
		} else if (this.cursors.right.isDown) {
			this.player.body.velocity.x = 150;
		} else if (this.cursors.up.isDown) {
			this.player.body.velocity.y = -150;
		} else if (this.cursors.down.isDown) {
			this.player.body.velocity.y = 150;
		}

		this.binaries.children.map((binary, idx, arr) => {
			binary.body.velocity.x = 0;
			binary.body.velocity.y = 0;
			this.game.physics.arcade.collide(this.player, binary, this.collide, null, this);
		});


		for (let i = 1; i < this.binaries.children.length; i++) {
			let binary = this.binaries.children[i];
			for (let j = i - 1; j > -1; j--) {
				let otherBinary = this.binaries.children[j];
				this.game.physics.arcade.collide(binary, otherBinary, this.binaryCollide, null, this);
			}
		}

		this.game.physics.arcade.collide(this.player, this.gem2, this.collide, null, this);

		this.group.sort('y', Phaser.Group.SORT_ASCENDING);

		if (Hacked.checkOverlap(this.player, this.landing) && !this.player.overlapping) {
			this.player.overlapping = true;

			// use the groups children array to iterate over
			const overlapBinArray = Hacked.Binary.checkOverlappingBinaryBlocks(this.binaries.children, this.landing);
			console.log(overlapBinArray);
		} else if (Hacked.checkOverlap(this.player, this.landing) === false){
			this.player.overlapping = false;
		}

		// if (this.checkOverlap(this.gem2, this.landing) && !this.gem2.overlapping) {
		// 	this.gem2.destroy();
		// 	this.gem2 = this.gems.create(350, 450, 'alucard');

		// 	Hacked.addArcadePhysicsToSprite([this.gem2]);
		// 	this.game.physics.arcade.collide(this.player, this.gem2, this.collide, null, this);
		// 	this.gem2.overlapping = !this.gem2.overlapping;
		// } else if (this.checkOverlap(this.gem2, this.landing) === false) {
		// 	this.gem2.overlapping = false;
		// }
	},

	collide (playerObj, collisionObj) {
		console.log(playerObj.key);
	},

	render () {
		this.game.debug.body(this.player);
		this.game.debug.body(this.gem2);
	}
};

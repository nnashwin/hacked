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

		Hacked.Binary.addBinaryToGroup(this.binaries, 200, 10, 0);
		Hacked.Binary.addBinaryToGroup(this.binaries, 400, 10, 1);
		Hacked.Binary.addBinaryToGroup(this.binaries, 400, 300, 1);
		Hacked.Binary.addBinaryToGroup(this.binaries, 200, 300, 0);
		Hacked.Binary.addBinaryToGroup(this.binaries, 200, 500, 1);
		Hacked.Binary.addBinaryToGroup(this.binaries, 200, 800, 0);

		this.binaries.children.map((binary) => {
			Hacked.addArcadePhysicsToSprite(binary);
		});

		this.player = this.group.create(300, 28, 'alucard');
		this.landing = this.group.create(300, 400, 'landing');
		this.opposite = this.group.create(0, 0, 'opposite');

		Hacked.addArcadePhysicsToSprite([this.player, this.landing]);

		this.cursors = this.game.input.keyboard.createCursorKeys();
	},
	update: function() {
		this.player.body.velocity.x = 0;
		this.player.body.velocity.y = 0;

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

		this.group.sort('y', Phaser.Group.SORT_ASCENDING);

		if (Hacked.checkOverlap(this.player, this.landing) && !this.player.overlapping) {
			this.player.overlapping = true;

			// use the groups children array to iterate over
			const overlapBinArray = Hacked.Binary.checkOverlappingBinaryBlocks(this.binaries.children, this.landing);
			const binIntValue = Hacked.Binary.calculateInt(overlapBinArray);
			console.log(binIntValue);
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
	}
};

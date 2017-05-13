var Hacked = Hacked || {};

Hacked.Binary = function(game) {
	this.background = null;
}

Hacked.Binary.prototype = {
	preload: function() {
		this.game.load.image('gem', 'gem.png');
		this.game.load.image('alucard', 'alucard-sprite.png');
	},
	create: function() {
		this.player = Hacked.addSprite(this.game, 'alucard', this.game.world.centerX, this.game.world.centerY);
		this.gem = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'gem');
		this.game.physics.startSystem(Phaser.Physics.ARCADE);


		Hacked.addArcadePhysicsToSprite(this.gem);
		Hacked.addArcadePhysicsToSprite(this.player);
		this.cursors = this.game.input.keyboard.createCursorKeys();
	},
	update: function() {
		if (this.cursors.left.isDown) {
			this.player.body.moveLeft(150);
		} else if (this.cursors.right.isDown) {
			this.player.body.moveRight(150);
		} else if (this.cursors.up.isDown) {
			this.player.body.moveUp(150);
		} else if (this.cursors.down.isDown) {
			this.player.body.moveDown(150);
		}
	},
};

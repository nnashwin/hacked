var Hacked = Hacked || {};

Hacked.Binary = function(game) {
	this.background = null;
}

Hacked.Binary.prototype = {
	preload: function() {
		this.game.load.image('gem', 'gem.png');
		this.game.load.image('alucard', 'alucard-sprite.png');
		this.game.load.image('landing', 'landing-sprite.jpeg');
	},
	create: function() {

		this.group = this.game.add.group();

		this.player = this.group.create(300, 28, 'alucard');
		this.gem = this.group.create(200, this.game.world.centerY, 'gem');
		this.gem2 = this.game.add.sprite(100, this.game.world.centerY, 'gem');
		this.landing = this.group.create(300, 400, 'landing');



		Hacked.addArcadePhysicsToSprite([this.gem, this.player, this.gem2]);
		this.gem2.body.immovable = true;

		this.cursors = this.game.input.keyboard.createCursorKeys();
	},
	update: function() {
		this.player.body.velocity.x = 0;
		this.player.body.velocity.y = 0;

		this.gem.body.velocity.x = 0;
		this.gem.body.velocity.y = 0;

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

		this.game.physics.arcade.collide(this.player, this.gem, this.collide, null, this);
		this.game.physics.arcade.collide(this.player, this.gem2, this.collide, null, this);

		this.group.sort('y', Phaser.Group.SORT_ASCENDING);
	},

	collide (playerObj, collisionObj) {
		this.game.stage.backgroundColor = '#992d2d';
	},

	render () {
		this.game.debug.body(this.player);
		this.game.debug.body(this.gem);
	}
};

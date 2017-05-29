var Hacked = Hacked || {}

Hacked.addArcadePhysicsToSprite = function (sprites) {
	this.game.physics.arcade.enable(sprites);

	if (Object.prototype.toString.call(sprites) === "[object Object]") {
		sprites = [sprites]
	}

	sprites.map((sprite) => {
		sprite.body.allowRotation = false;
	});
}

Hacked.addSprite = function (game, texture, locationX, locationY) {
	return game.add.sprite(locationX, locationY, texture);
}

Hacked.checkOverlap = function (spriteA, spriteB) {
		let boundsA = spriteA.getBounds();
		let boundsB = spriteB.getBounds();

		return Phaser.Rectangle.intersects(boundsA, boundsB);
}

Hacked.generateRandomNumber = function (max) {
	const MAX_NUMBER = typeof max === 'undefined' ? 10 : max;
	// Change this in the future if you need a more random number
	return Math.round(Math.random() * MAX_NUMBER);
}

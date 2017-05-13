var Hacked = Hacked || {}

Hacked.addArcadePhysicsToSprite = function (sprite) {
	this.game.physics.arcade.enable(sprite);
	sprite.body.allowRotation = false;
}

Hacked.addSprite = function (game, texture, locationX, locationY) {
	return game.add.sprite(locationX, locationY, texture);
}

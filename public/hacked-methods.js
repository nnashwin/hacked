var Hacked = Hacked || {}

Hacked.addPhysicsToSprite = function (sprite) {
	this.game.physics.p2.enable(sprite);
	sprite.body.setZeroDamping();
	sprite.body.fixedRotation = true;
}

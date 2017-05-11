var Hacked = {};

Hacked.Boot = function (game) {}

Hacked.Boot.prototype = {
	init: function() {},
	preload: function() {},
	create: function() {
		this.game.state.start('Binary');
	}
}

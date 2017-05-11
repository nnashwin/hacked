var Hacked = {};

Hacked.Boot = function (game) {}

Hacked.Boot.prototype = {
	init: function() {},
	preload: function() {
		// can put the loading bar in here
	},
	create: function() {
		this.game.state.start('Binary');
	}
}

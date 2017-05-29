var Hacked = {};

Hacked.Boot = function (game) {}

Hacked.Boot.prototype = {
	init: function() {},
	preload: function() {
		// can put the loading bar in here
		this.game.time.advancedTiming = true;
	},
	create: function() {
		this.game.state.start('Binary');
	}
}

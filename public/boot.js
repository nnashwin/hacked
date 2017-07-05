var Hacked = {};

Hacked.Boot = function (game) {}

Hacked.Boot.prototype = {
	init: function() {},
	preload: function() {
		// can put the loading bar in here
		this.game.time.advancedTiming = true;
		this.game.sceneOrder = ['intro', 'leaveForWork'];
		this.game.currSceneCounter = 0;
	},
	create: function() {
		this.game.state.start('Text-Interlude');
	}
}

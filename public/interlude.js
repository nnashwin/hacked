var Hacked = Hacked || {};

Hacked.TextInterlude = function(game) {
}

Hacked.TextInterlude.prototype = {
	preload: function () {
		this.game.load.json('windowDiag', 'data/dialogue.json')
	},

	create: function () {
		const currSceneIdx = this.game.sceneOrder[this.game.currSceneCounter];
		const dialogueJson = this.game.cache.getJSON('windowDiag')[currSceneIdx];
		console.log(dialogueJson);
	},

	update: function () {
	
	},

	render: function () {

	},

}

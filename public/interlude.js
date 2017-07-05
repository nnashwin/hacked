var Hacked = Hacked || {};

Hacked.TextInterlude = function(game) {
}

Hacked.TextInterlude.prototype = {
	preload: function () {
		this.game.load.json('windowDiag', 'data/dialogue.json')
	},

	create: function () {
		const currSceneIdx = this.game.sceneOrder[this.game.currSceneCounter];
		this.dialogueContent = this.game.cache.getJSON('windowDiag')[currSceneIdx];

		this.wordIndex = 0;
		this.lineIndex = 0;

		var style = { font: "15px Arial", fill: "#19de65" };
		this.winText = this.game.add.text(32, 32, '', { font: "15px Arial", fill: "#19de65", align: "left", boundsAlignH: "top", boundsAlignV:"top" });
		this.nextLine();

	},

	nextLine: function () {
		const wordDelay = 120;
		const lineDelay = 400;
		let line = [];
		
		
		if (this.lineIndex === this.dialogueContent.length) {
			console.log('finished');
			return;
		}

		line = this.dialogueContent[this.lineIndex].split(" ");

		this.wordIndex = 0;

		this.game.time.events.repeat(wordDelay, line.length, this.nextWord, this, [line, lineDelay]);

		this.lineIndex++;

	},

	nextWord: function (textArgs) {
		let [line, lineDelay] = textArgs;
		this.winText.text = this.winText.text.concat(line[this.wordIndex] + " ");

		this.wordIndex++;

		if (this.wordIndex === line.length) {
			this.winText.text = this.winText.text.concat("\n");

			this.game.time.events.add(lineDelay, this.nextLine, this);
		}
		
	}
}

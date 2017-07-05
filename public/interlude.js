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

		this.isTextComplete = false;

		var style = { font: "15px Arial", fill: "#19de65" };
		this.winText = this.game.add.text(32, 32, '', { font: "15px Arial", fill: "#19de65", align: "left", boundsAlignH: "top", boundsAlignV:"top" });
		this.nextLine();

		// instantiate blink text
		this.blinkTimer = 0;
		this.blinkText = this.game.add.text(10, 10, 'Hit Enter for Next Screen', { font: "25px Arial", fill: "red", align: "left", boundsAlignH: "top", boundsAlignV:"top" })
		this.blinkText.visible = false;
	},

	update: function () {
		if (this.isTextComplete === true) {
			this.blinkText.alignTo(this.winText, Phaser.BOTTOM_LEFT);
			this.blinkTimer += this.game.time.elapsed;
			if (this.blinkTimer >= 1000) {
				this.blinkTimer = 0;
				this.blinkText.visible = !this.blinkText.visible;
			}
		}
	},

	nextLine: function () {
		const wordDelay = 50;
		const lineDelay = 400;
		let line = [];
		
		
		if (this.lineIndex === this.dialogueContent.length) {
			this.isTextComplete = true;
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

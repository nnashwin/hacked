var Hacked = Hacked || {};

Hacked.TextInterlude = function(game) {
}

Hacked.TextInterlude.prototype = {
	preload: function () {
		this.game.load.json('windowDiag', 'data/dialogue.json')
	},

	create: function () {
		const currSceneIdx = this.game.sceneOrder[this.game.currSceneCounter];
		this.dialogueContent = this.game.cache.getJSON('windowDiag')[currSceneIdx].text;
		this.nextState = this.game.cache.getJSON('windowDiag')[currSceneIdx].nextState;
		this.fullText = this.createFullText(this.dialogueContent);

		this.wordIndex = 0;
		this.lineIndex = 0;

		this.isTextComplete = false;

		var style = { font: "15px Arial", fill: "#19de65" };
		this.winText = this.game.add.text(32, 32, '', { font: "15px Arial", fill: "#19de65", align: "left", boundsAlignH: "top", boundsAlignV:"top" });
		this.nextLine(50, 400);

		// instantiate blink text
		this.blinkTimer = 0;
		this.blinkText = this.game.add.text(10, 10, 'Hit Enter for Next Screen', { font: "25px Arial", fill: "red", align: "left", boundsAlignH: "top", boundsAlignV:"top" })
		this.blinkText.visible = false;


		// instantiate enter key
		this.enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
		this.enterTimer = 0;
	},

	update: function () {
		if (this.isTextComplete === true) {
			this.blinkText.alignTo(this.winText, Phaser.BOTTOM_LEFT);
			this.blinkTimer += this.game.time.elapsed;
			if (this.blinkTimer >= 1000) {
				this.blinkTimer = 0;
				this.blinkText.visible = !this.blinkText.visible;
			}

			if (this.enterKey.isDown && this.enterTimer >= 50) {
				this.game.state.start(this.nextState);
			}
		} else if (this.isTextComplete === false){
			if (this.enterKey.isDown) {
				this.game.time.events.destroy();
				this.winText.destroy()
				this.winText = this.game.add.text(32, 32, this.fullText, { font: "15px Arial", fill: "#19de65", align: "left", boundsAlignH: "top", boundsAlignV:"top" })

				this.isTextComplete = !this.isTextComplete;
				this.enterTimer = 0;
			}
		}
		this.enterTimer++;
	},

	nextLine: function (wordD, lineD) {
		const wordDelay = wordD;
		const lineDelay = lineD;
		let line = [];
		
		
		if (this.lineIndex === this.dialogueContent.length) {
			this.isTextComplete = true;
			return;
		}

		line = this.dialogueContent[this.lineIndex].split(" ");

		this.wordIndex = 0;

		this.game.time.events.repeat(wordDelay, line.length, this.nextWord, this, [line, lineDelay, wordDelay]);

		this.lineIndex++;

	},

	nextWord: function (textArgs) {
		let [line, lineDelay, wordDelay] = textArgs;
		this.winText.text = this.winText.text.concat(line[this.wordIndex] + " ");

		this.wordIndex++;

		if (this.wordIndex === line.length) {
			this.winText.text = this.winText.text.concat("\n");

			this.game.time.events.add(lineDelay, this.nextLine, this, wordDelay, lineDelay);
		}
	},

	createFullText: function (strArr) {
		return strArr.reduce((fullText, strIdx) => fullText + '\n' + strIdx);
	}
}

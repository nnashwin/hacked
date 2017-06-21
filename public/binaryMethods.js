Hacked.Binary.calculateInt = function (spriteArray) {
	const binValArr = [];

	spriteArray.map((binSprite) => {
		binValArr.push({ pos: binSprite.worldPosition.x, val: binSprite.binaryVal });
	});

	binValArr.sort((a, b) => {
		return a.pos > b.pos;
	});

	var binSum = '';

	binValArr.map((binObj) => {
		binSum = binSum + binObj.val;
	});
	
	return parseInt(binSum, 2);
}

Hacked.Binary.checkOverlappingBinaryBlocks = function (binaryGroup, landingSprite) {
	const overlappingBlocks = [];
	binaryGroup.map((binaryBlock) => {
		if (Hacked.checkOverlap(binaryBlock, landingSprite)) {
			overlappingBlocks.push(binaryBlock);
		}
	});

	return overlappingBlocks;
}

Hacked.Binary.addBinaryToGroup = function (group, locX, locY, binaryVal) {
	const binary = group.create(locX, locY, `binary-${binaryVal.toString()}`);
	binary.binaryVal = binaryVal.toString();
	return binary;
}

Hacked.Binary.addPlacers = function (group, startLocX, startLocY, digits) {
	let locX = startLocX;
	const locY = startLocY;
	for (let digit of digits) {
		group.create(locX, locY, 'placer');
		locX += 55;
	}

	return;
}

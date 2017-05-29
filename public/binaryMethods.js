Hacked.Binary.calculateInt = function (bin1, bin2) {
	const binValArr = [];
	bin1.attachedToGroup = true;
	bin2.attachedToGroup = true;

	binValArr.push({ pos: bin1.worldPosition.x, val: bin1.binaryVal });
	binValArr.push({ pos: bin2.worldPosition.x, val: bin2.binaryVal });

	binValArr.sort((a, b) => {
		return a.pos > b.pos;
	});

	var binSum = '';

	binValArr.map((binObj) => {
		binSum = binSum + binObj.val;
	});
	
	const intVal = parseInt(binSum, 2);
	console.log(intVal);
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

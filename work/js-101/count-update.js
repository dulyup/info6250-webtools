// const baseWord = 'PARTS';
// const guesses = ['TREES', 'TEASE', 'START', 'STRAP', 'LEVEL', 'PARTS'];
const baseWord = 'AABB';
const guesses = ['ABBB', 'AAAB'];

function count(guesses, baseWord) {
	for (let i = 0; i < guesses.length; i++) {
		let baseWordMap = generateLetterMap();
		let common = countCommon(guesses[i], baseWordMap);
		let exact = countExact(guesses[i], baseWord);
		console.log(baseWord + ' ' + guesses[i] + ' ' + exact + ' ' + common);
	}
}

function generateLetterMap() {
	const baseWordMap = {};
	for (let letter of baseWord) {
		if (!baseWordMap[letter]) {
			baseWordMap[letter] = 0;
		}
		baseWordMap[letter] += 1;
	}
	return baseWordMap;
}

function countCommon(guess, baseWordMap) {
	let common = 0;
	for (let i = 0; i < guess.length; i++) {
		if (baseWordMap[guess[i]] && baseWordMap[guess[i]] != 0) {
			baseWordMap[guess[i]]--;
			common++;
		}
	}
	return common;
}

function countExact(guess, baseWord) {
	let exact = 0;
	for (let i = 0; i < guess.length; i++) {
		if (guess[i] === baseWord[i]) {
			exact++;
		}
	}
	return exact;
}

count(guesses, baseWord);
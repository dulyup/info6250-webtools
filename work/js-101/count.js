const baseWord = 'PARTS';
const guesses = ['TREES', 'TEASE', 'START', 'STRAP', 'LEVEL', 'PARTS'];
const baseWordLetter = {};
function count(guesses, baseWord) {
	for (let i = 0; i < guesses.length; i++) {
		let samePos = 0;
		let common = 0;
		let word = guesses[i];
		for (let letter of baseWord) {
			if (!baseWordLetter[letter]) {
				baseWordLetter[letter] = 0;
			}
			baseWordLetter[letter] += 1;
		}
		for (let j = 0; j < word.length; j++) { //traverse each char in each word
			if (word[j] === baseWord[j]) {
				samePos += 1;
			}
			if (baseWordLetter[word[j]] && baseWordLetter[word[j]] != 0) {
				baseWordLetter[word[j]] -= 1;
				common += 1;
			}
		}
		console.log(baseWord + ' ' + word + ' ' + samePos + ' ' + common);
	}
}
count(guesses, baseWord);

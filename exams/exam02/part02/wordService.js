const wordList = require('./wordlist');
const wordIdMap = {};
const idGuessListMap = {};

//word - id generating service
function generateSecretMap() {
    const id = generateId();
    const word = generateWord();
    wordIdMap[id] = word;
    return {id: id, word: word};
}

//generate a id randomly
const generateId = () => {
    const id = Math.floor(Math.random() * wordList.length * 10000);
    idGuessListMap[id] = [...wordList];
    return id;
};

//generate a secret word randomly
const generateWord = () => {
    return wordList[Math.floor(Math.random() * wordList.length)];
};

function generateGuess(id, preGuess, preCommon) {
    const list = idGuessListMap[id];
    for (let index in list) {
        if (countCommonByWord(preGuess, list[index]) !== preCommon) {
            list.splice(index, 1);
        }
    }
    return list[Math.floor(Math.random() * list.length)];
}

function deleteHistory(id) {
    delete wordIdMap[id];
    delete idGuessListMap[id];
    return true;
}

//if the length is not valid, return false
function checkWordLength(guess) {
    if (guess) {
        return guess.length === 5;
    }
}

//checks the id is a valid, return false if not
function checkId(id) {
    return !id || id !== null || id >= 0 && id < wordList.length * 10000;
}

function countCommonByWord (guess, secretWord) {
    let common = 0;
    const secretWordLetterMap = generateLetterMap(secretWord);
    for (let letter of guess) {
        if (secretWordLetterMap[letter] && secretWordLetterMap[letter] !== 0) {
            secretWordLetterMap[letter]--;
            common++;
        }
    }
    return common;
}

function countCommon (guess, secretWordId) {
    if (checkId(secretWordId) && checkWordLength(guess)) {
        const secretWord = wordIdMap[secretWordId];
        if (guess && secretWord) {
            return countCommonByWord(guess, secretWord);
        }
    }
}

function won (guess, secretWordId) {
    if (checkId(secretWordId) && checkWordLength(guess)) {
        const secretWord = wordIdMap[secretWordId];
        if (secretWord) {
            return countExact(guess, secretWord) === secretWord.length;
        }
    }
}

const countExact = (guess, secretWord) => {
    let exact = 0;
    if (guess) {
        for (let i = 0; i < guess.length; i++) {
            if (guess[i] === secretWord[i]) {
                exact++;
            }
        }
    }
    return exact;
};

function generateLetterMap(secretWord) {
    const map = {};
    if (secretWord) {
        for (let letter of secretWord) {
            if (!map[letter]) {
                map[letter] = 0;
            }
            map[letter] += 1;
        }
    }
    return map;
}

module.exports = {
    allWords: wordList,
    generateSecretMap: generateSecretMap,
    generateWord: generateGuess,
    wordIdMap: wordIdMap,
    deleteHistory: deleteHistory,
    countCommon: countCommon,
    won: won,
    checkId: checkId
};

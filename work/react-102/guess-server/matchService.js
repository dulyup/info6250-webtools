const wordList = require('./wordList');
const wordService = require('./wordService');

//if the length is not valid, return false
function checkWordLength(guess) {
    if (guess) {
        return guess.length === 5;
    }
    return false;
}

//checks the id is a valid, return false if not
function checkId(id) {
    return !id || id !== null || id >= 0 && id < wordList.length * 10000;
}

function getSecretWordById(secretWordId) {
    let secretWord;
    let wordIdMap = wordService.wordIdMap;
    if (checkId(secretWordId)) {
        for (let index = 0; index < wordIdMap.length; index++) {
            if (wordIdMap[index].id === secretWordId) {
                secretWord = wordIdMap[index].word;
                return secretWord;
            }
        }
    }
    //if can't find the secret word, return null
    return null;
}

function countCommon (guess, secretWordId) {
    let secretWord;
    let secretWordLetterMap = [];
    let common = 0;
    if (checkId(secretWordId) && checkWordLength(guess)) {
        secretWord = getSecretWordById(secretWordId);
        //find secret word by id
        if (secretWord !== null) {
            //count common letters
            secretWordLetterMap = generateLetterMap(secretWord);
            guess = guess.toUpperCase();
            for (let i = 0; i < guess.length; i++) {
                if (secretWordLetterMap[guess[i]] && secretWordLetterMap[guess[i]] !== 0) {
                    secretWordLetterMap[guess[i]]--;
                    common++;
                }
            }
            return common;
        }
    }
    //id or length is not valid
    return null;
}

function won (guess, secretWordId) {
    let secretWord;
    if (checkId(secretWordId) && checkWordLength(guess)) {
        secretWord = getSecretWordById(secretWordId);
        if (secretWord !== null) {
            return countExact(guess, secretWord) === secretWord.length;
        }
    }
    //id or length is not valid
    return null;
}

const countExact = (guess, secretWord) => {
    let exact = 0;
    if (guess) {
        guess = guess.toUpperCase();
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
    for (let letter of secretWord) {
        if (!map[letter]) {
            map[letter] = 0;
        }
        map[letter] += 1;
    }
    return map;
}

module.exports = {
    countCommon: countCommon,
    won: won
};

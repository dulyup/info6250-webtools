const wordList = require('./wordlist');
const wordIdMap = [];

//word - id generating service
function generateSecretMap() {
    let wordIdPair = {
        id: generateId(),
        word: generateWord()
    };
    wordIdMap.push(wordIdPair);
    return wordIdPair;
}

//generate a id randomly
const generateId = () => {
    return Math.floor(Math.random() * wordList.length * 10000);
};

//generate a secret word randomly
const generateWord = () => {
    return wordList[Math.floor(Math.random() * wordList.length)];
};

let count = 0;
const generateGuess = () => {
    return wordList[(count++) % wordList.length];
};

function deleteHistory(id) {
    for (let index = 0; index < wordIdMap.length; index++) {
        if (wordIdMap[index].id === parseInt(id)) {
            wordIdMap.splice(index, 1);
        }
    }
    return true;
}

module.exports = {
    allWords: wordList,
    generateSecretMap: generateSecretMap,
    generateWord: generateGuess,
    wordIdMap: wordIdMap,
    deleteHistory: deleteHistory
};

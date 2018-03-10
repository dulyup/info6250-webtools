const wordList = require('./wordList');
const wordIdMap = [];

//word - id generating service
function generateWordMap() {
    let id = generateId(wordList);
    let word = generateSecretWord(wordList);
    let wordIdPair = {
        id: id,
        word: word
    };
    wordIdMap.push(wordIdPair);
    console.log(wordIdMap);
    return id;
}

//generate a id randomly
    const generateId = (list) => {
        return Math.floor(Math.random() * list.length * 10000) + "";
    };

//generate a secret word randomly
const generateSecretWord = (list) => {
    return list[Math.floor(Math.random() * list.length)];
};


module.exports = {
    allWords: wordList,
    secretWordId: function(){
        return generateWordMap();
    },
    wordIdMap: wordIdMap
};



function Constructor(word) {
    this.word = word;
    this.getWord = function () {
        return this.word;
    };
}

module.exports = Constructor;
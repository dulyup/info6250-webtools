import {getAllWords} from './word';

export function checkWordList(guess) {
    return getAllWords()
        .then(words => {
            return words.includes(guess.toUpperCase())
        })
        .catch(e => this.handleError(e));
}

// export default checkWordList;

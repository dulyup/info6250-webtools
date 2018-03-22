import {getAllWords} from './service';

export function checkWordList(guess) {
    return getAllWords()
        .then(words => {
            return words.includes(guess.toUpperCase())
        })
        .catch(e => this.handleError(e));
}


import React from 'react';

const GameBody = ({results}) => {
    const resultList = results.map( ({word, commonLetters}, index) => {
        return (<li key={index}>You guessed {word}, which has {commonLetters} common letters with the secret word.</li>)
    });
    return (
        <div className="game-body">
            <ul>
                {resultList}
            </ul>
        </div>
    );
};
export default GameBody;
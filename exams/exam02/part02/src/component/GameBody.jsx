import React from 'react';

const GameBody = ({resultList, userName}) => {

    const result = resultList.map( ({guess, commonLetters}, index) => {
        return (<li key={index}>{userName} guessed {guess}, hit {commonLetters} right letters.</li>)
    });

    return (
        <div>
            <ul>
                {result}
            </ul>
        </div>
    );
};
export default GameBody;
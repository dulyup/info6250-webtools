import React from 'react';
import GameButton from './GameButton';

const GameControl = ({mode, word, onCount, onUpdateWord, turn, result, isValid}) => {

    const checkForSubmit = (event) => {
        if (event.key === "Enter" && isValid){
            onCount();
        }
    };

    const updateWord = (event) => {
        onUpdateWord(event.target.value);
    };

    return (
        <div className="game-control">
            <span className='input-guide'>Input Your Guess: </span>
            <input className='input-area' maxLength={5} placeholder={'5 characters'} value={word} onKeyPress={checkForSubmit}
                   onChange={updateWord}/>
            <GameButton text={mode} onClick={onCount} isValid = {isValid}/>
            <div className="result">
                <span className='result-turn'>Turns: {turn}</span>
                <span className='result-win'> {result} </span>
            </div>
        </div>
    );
};

export default GameControl;
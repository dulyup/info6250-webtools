import React from 'react';
import GameButton from './GameButton';

const GameControl = ({mode, bSecretForA, aSecretForB, onCount, turn, result, isValid}) => {

    return (
        <div className="game-control">
            <div className="result">
                <span className='result-turn'>Turns: {turn}</span>
                <span className='result-win'> {result} </span>
            </div>
            <div>
                <GameButton text={mode} onClick={onCount} isValid = {isValid}/>
            </div>
                <span className='a-input'>Alfred's Secret Word: {aSecretForB}</span>
                <span className='b-input'>Barbara's Secret Word: {bSecretForA}</span>
        </div>
    );
};

export default GameControl;

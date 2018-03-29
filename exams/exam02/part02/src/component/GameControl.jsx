import React from 'react';
import GameButton from './GameButton';

const GameControl = ({mode, bSecretForA, aSecretForB, onCount, turn, result, isValid}) => {

    return (
        <div className="game-control">
            <div className="result">
                <span className='result-turn'>Turns: {turn}</span>
                <p className='result-win'> {result} </p>
            </div>
            <div>
                <GameButton text={mode} onClick={onCount} isValid = {isValid}/>
            </div>
                <span className='a-input'>{aSecretForB}</span>
                <span className='b-input'>{bSecretForA}</span>
        </div>
    );
};

export default GameControl;

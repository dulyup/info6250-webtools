import React from 'react';

const GameButton = ({onClick, text, isValid}) => {
    return (
        <button className='game-button'
                onClick={onClick}
                disabled={isValid ? false: "disabled"}> {text} </button>
    );
};
export default GameButton;
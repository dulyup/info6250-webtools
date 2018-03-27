import React from 'react';
import GameBody from "./GameBody";

const GameBodyA = ({aResultList}) => {
    return (
        <div className={'a-list'}>
            <GameBody resultList={aResultList} userName={'Alfred'}/>
        </div>

    );
};
export default GameBodyA;
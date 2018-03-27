import React from 'react';
import GameBody from "./GameBody";

const GameBodyB = ({bResultList}) => {
    return (
        <div className={'b-list'}>
            <GameBody resultList={bResultList} userName={'Barbara'}/>
        </div>
    );

};


export default GameBodyB;

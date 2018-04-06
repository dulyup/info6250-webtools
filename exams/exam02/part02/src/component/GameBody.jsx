import React from 'react';

const GameBody = ({resultList, userName}) => {

    const resultL = resultList.map( ({guess}, index) => {
        return (<li key={index}>{userName}: {guess}</li>)
    });

    const resultR = resultList.map( ({commonLetters}, index) => {
        return (<li key={index}> Hit {commonLetters} letters</li>)
    });

    return (
        <div>
            <div className={'l-body'}>
                <ul >
                    {resultL}
                </ul>
            </div>
            <div className={'r-body'}>
                <ul>
                    {resultR}
                </ul>
            </div>
        </div>
    );
};
export default GameBody;
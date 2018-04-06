import React, {Component} from 'react';
import {pickErrorMessage } from './web-service/message';
import config from './config.json';
import './App.css';

//Components
import GameHeader from './component/GameHeader';
import GameControl from './component/GameControl';
import GameBodyA from "./component/GameBodyA";
import GameBodyB from "./component/GameBodyB";

//logic function
import {getSecret, getGuess, checkResult, clearGame} from './web-service/service';


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mode: 'START',
            turn: 0,
            error: null,
            isValid: true,
            aId: '',
            aSecretForB: '',
            aResultList: [],
            aGuess: '',
            aCommon: 0,
            aWon: false,
            bId: '',
            bSecretForA: '',
            bResultList: [],
            bGuess: '',
            bCommon: 0,
            bWon: false,
            result: ''
        };
        this.handleStartClick = this.handleStartClick.bind(this);
        this.checkButton = this.checkButton.bind(this);
    };

    async handleStartClick() {
        try{
            this.setState({isValid: false});
            let secretA = await this.handleSecretWord(config['alfred']);
            this.setState({aId: secretA["id"], aSecretForB: secretA["word"]});
            let secretB = await this.handleSecretWord(config['barbara']);
            this.setState({
                bId: secretB["id"],
                bSecretForA: secretB["word"]
            });
            while (!this.state.aWon && !this.state.bWon) {
                await this.handleGuess(config['alfred'], config['barbara'], this.state.aId, this.state.bId, this.state.aCommon, this.state.aGuess);
                await this.handleGuess(config['barbara'], config['alfred'], this.state.bId, this.state.aId, this.state.bCommon, this.state.bGuess);
                this.handleResult();
                this.countTurn();
            }
        } catch(e) {
            this.handleError(e);
        }
    }

    async handleSecretWord(server) {
        return await getSecret(server);
    }

    async handleGuess(fromServer, toServer, fromId, toId, common, preGuess) {
        try {
            let guess = await getGuess(fromServer, fromId, common, preGuess);
            this.setState(fromServer === config['alfred'] ? {aGuess: guess.guessWord} : {bGuess: guess.guessWord});
            let result = await checkResult(toServer, guess.guessWord, toId);
            this.setState(fromServer === config['alfred'] ? {
                aCommon: result.common,
                aWon: result.won
            } : {
                bCommon: result.common,
                bWon: result.won
            });
        } catch(e) {
            this.handleError(e);
        }

    }

    countTurn() {
        this.setState({
            turn: this.state.turn + 1
        });
    }

    handleResult() {
        this.handleAWon();
        this.handleBWon();
        this.setState( {
            aResultList: [...this.state.aResultList, {
                guess: this.state.aGuess,
                commonLetters: this.state.aCommon,
            }],
            bResultList: [...this.state.bResultList, {
                guess: this.state.bGuess,
                commonLetters: this.state.bCommon,
            }]
        });
    }

    handleAWon() {
        if (this.state.aWon) {
            this.setState({
                mode: '',
                result: 'Alfred Win!',
                isValid: true
            });
            this.handleButton('NEW GAME');
            this.clearGameHistory();
        }

    }

    handleBWon() {
        if (this.state.bWon) {
            this.setState({
                mode: '',
                result: 'Barbara Win!',
                isValid: true
            });
            this.handleButton('NEW GAME');
            this.clearGameHistory();
        }

    }

    handleButton(text) {
        this.setState({
            mode: text,
            isValid: true
        })
    }

    checkButton() {
        if (this.state.mode === 'START') {
            this.handleStartClick();
        } else {
            this.resetGame();
        }
    }

    clearGameHistory() {
        clearGame(config['alfred'], this.state.aId);
        clearGame(config['barbara'], this.state.bId);
    }

    resetGame() {
        this.setState( {
            mode: 'START',
            turn: 0,
            error: null,
            isValid: true,
            aId: '',
            aSecretForB: '',
            aResultList: [],
            aGuess: '',
            aCommon: 0,
            aWon: '',
            bId: '',
            bSecretForA: '',
            bResultList: [],
            bGuess: '',
            bCommon: 0,
            bWon: '',
            result: ''
        });
    }

    handleError(e) {
        this.setState({error: e});
    }

    clearError() {
        this.setState({
            error: null,
            isValid: true
        });
    }

    render() {
        let message = pickErrorMessage(this.state.error);
        if( message ) {
            message = (
                <div>
                    <p>{message}</p>
                    <button onClick={ () => this.clearError() }>Got it</button>
                </div>
            );
        }

        return (
            <div className="app">
                <GameHeader title="Welcome to Guess Word Game"/>
                <GameControl
                    mode={this.state.mode}
                    onCount={this.checkButton}
                    turn={this.state.turn}
                    result={this.state.result}
                    isValid={this.state.isValid}
                    aSecretForB={this.state.aSecretForB}
                    bSecretForA={this.state.bSecretForA}
                />
                <GameBodyA aResultList={this.state.aResultList}/>
                <GameBodyB bResultList={this.state.bResultList}/>
                { message }
            </div>
        );
    }

}

export default App;

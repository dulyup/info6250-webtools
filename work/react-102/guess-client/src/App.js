import React, {Component} from 'react';
import {pickErrorMessage } from './services/message';
import './App.css';

//Components
import GameHeader from './components/GameHeader';
import GameBody from './components/GameBody';
import GameControl from './components/GameControl';

//logic function
import {getSecretWordId, checkResult} from './services/service';
import {checkWordList} from './services/checkWordList';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modes: ['guess','reset'],
            mode: 'guess',
            results: [],
            secretWordId: 0,
            commonLetters: 0,
            word: '',
            won: false,
            result: '',
            turn: 0,
            error: null,
            isValid: false
        };
        this.checkButton = this.checkButton.bind(this);
        this.updateWord = this.updateWord.bind(this);
    };

    updateWord(word) {
        this.setState({word}, ()=>{this.validateInput()});
    }

    countTurn() {
        this.setState({
            turn: this.state.turn + 1
        });

    }

    componentWillMount() {
        this.fetchSecretWordId();
    }

    fetchSecretWordId() {
        getSecretWordId()
        .then(id => this.setState({secretWordId:id}))
        .catch( e => this.handleError(e))
    }

    checkButton() {
        if (this.state.mode === 'guess') {
            this.setState({isValid: false});
            this.checkSubmit();
        } else {
            this.resetGame();
        }
    }

    checkSubmit() {
        if( !this.state.word ) { // Don't do anything if there are no letters
            return;
        }
        this.countTurn();
        this.handleGuess(this.state.word, this.state.secretWordId);
    }

    handleGuess(guess, id) {
        checkResult(guess, id)
            .then( result => this.setState({
                commonLetters: result.common,
                won: result.won }, ()=>{ this.handleResult()})) //then里面处理返回来的json
            .catch( e => this.handleError(e) )
    }

    handleResult() {
        if (this.state.won) {
            this.setState({
                mode: this.state.modes[1],
                result: 'You Win!',
                isValid: true
            });
        }

        this.setState( {
            results: [...this.state.results, {
                word: this.state.word,
                commonLetters: this.state.commonLetters,
                turn: this.state.turn
            }],
            word: '' // blank out the word after use
        });
    }

    resetGame() {
        this.fetchSecretWordId();
        this.setState( {
            modes: ['guess','reset'],
            mode: 'guess',
            results: [],
            commonLetters: 0,
            word: '',
            turn: 0,
            won: '',
            result: '',
            isValid: false
        });
        // console.log(this.state.secretWordId);
    }

    validateInput() {
        if (this.state.word.length < 5) {
            this.setState({isValid: false});
        } else {
            checkWordList(this.state.word)
                .then(checkResult => this.setState({isValid: checkResult}))
        }
    }

    handleError(e) {
        this.setState({error: e});
    }

    clearError() {
        this.setState({
            error: null
        });
        this.fetchSecretWordId();
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
                    word={this.state.word}
                    onCount={this.checkButton}
                    onUpdateWord={this.updateWord}
                    turn={this.state.turn}
                    result={this.state.result}
                    isValid={this.state.isValid}
                />
                <GameBody results={this.state.results} />
                { message }
            </div>
        );
    }

}

export default App;
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 8080;

const wordService = require('./wordService');
const matchService = require('./matchService');

app.use( express.static('public') );
app.use( bodyParser.json({ extended: true, type: '*/*' }) );

//middleware
app.use((req,res, next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'OPTIONS,POST,GET,PUT,DELETE');
    next();
});

app.get('/words', (req, res) => {
    res.send(JSON.stringify(wordService.allWords));
});

app.post('/game', (req, res) => {
      const secret = wordService.generateSecretMap();
      if (!secret) {
        res.status(400).send('fail to get secret word');
      } else {
        res.send(JSON.stringify(secret));
      }
});

app.put('/game/:secretId/guessed', (req, res) => {
    const secretId = req.body.id;
    const previousResult = req.body.common;
    const guessWord = wordService.generateWord();
    if (!guessWord){
        res.status(400).send('fail to get a guess word');
    } else {
        const guess = {
            secretId: secretId,
            guessWord: guessWord
        };
        res.send( JSON.stringify( guess ));
    }
});

app.get('/game/:secretId/guess/:guess', (req, res) => {
    const secretId = req.params.secretId;
    const guess = req.params.guess;
    const result = {
        common: matchService.countCommon(guess, secretId),
        won: matchService.won(guess, secretId)
    };
    if (result.common === null || result.won === null) {
        res.status(400).send('id or guess word is not valid');
    } else {
        res.send(JSON.stringify( result ))
    }
});

app.delete('/game/:secretId', (req, res) => {
    const secretId = req.params.secretId;
    if (!matchService.checkId(secretId)){
        res.status(400).send('id is not valid');
    } else {
        wordService.deleteHistory(secretId);
        res.send( JSON.stringify('game history cleared') );
    }
});

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
    console.log('use Ctrl-C to stop this server');
});

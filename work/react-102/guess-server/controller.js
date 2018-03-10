const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 3001;

const wordService = require('./wordService');
const matchService = require('./matchService');

app.use( express.static('public') ); // serve any assets by their path under 'public' directory
app.use( bodyParser.json({ extended: true, type: '*/*' }) );

app.get('/words', (req, res) => {
    res.send(JSON.stringify(wordService.allWords));
});

app.get('/secretWordId', (req, res) => {
    res.send(JSON.stringify(wordService.secretWordId()));
});

app.get('/secretWordMap', (req, res) => {
    res.send(JSON.stringify(wordService.wordIdMap));
});

/**
 * 400 is the appropriate HTTP status code, but you should also send a more-specific
 * error code in the body of the response so the client can say more that "That was wrong"
 */
app.post('/guess', (req, res) => {
    const guess = req.body.guess;
    const id = req.body.id;
    const result = {
        common: matchService.countCommon(guess, id),
        won: matchService.won(guess, id)
    };
    if (result.common === null || result.won === null) {
        res.status(400).send('id or guess word is not valid');
    } else {
        res.send(JSON.stringify(result));
    }
});

app.listen(PORT, () => {  // this will start the server waiting for incoming requests
    console.log(`Server listening at http://localhost:${PORT}`);
    console.log('use Ctrl-C to stop this server');
});



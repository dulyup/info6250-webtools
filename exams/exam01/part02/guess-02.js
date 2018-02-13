const guessesComp = [];
const guessesPlayer = [];
const wordInfo = {
    allWords: allWords()
};
let secretWordForPlayer = '';
let secretWordForComp = '';
let turns = 0;
let won = {};
won.player = false;
won.comp = false;

function render() {
    document.querySelector('.output .output-player').innerHTML = generateList(guessesPlayer, secretWordForPlayer);
    document.querySelector('.output .output-comp').innerHTML = generateList(guessesComp, secretWordForComp);
    document.querySelector('#turns').innerHTML = generateTurns();
}

//pick a secret word and log in console
function generateSecretWordForPlayer() {
    secretWordForPlayer = pickWord(wordInfo.allWords);
    console.log(`secret word for player: ${secretWordForPlayer}`);
}

function generateSecretWordForComp() {
    secretWordForComp = getNewGuessPlayer();
    console.log(`secret word for Computer: ${secretWordForComp}`);
    clearInputPlayer();
}

//calculate number of Turns taken
function generateTurns() {
    return guessesPlayer.length;
}

//generate result list from guesses array
function generateList(array, secretWord) {
    return array.map( (guess) => `You guessed ${guess}, it has ${countCommonLetters(guess, secretWord)} common letters with the secret word.` ).join('\n');
}

//add value of "input area"(guess) to "result list"(array)
function addToList(array, guess) {
    array.push(guess);
    render();
}

//get value of "input area" for player
function getNewGuessPlayer() {
    return document.querySelector('.player-guess').value.toUpperCase();
}

//computer generate a random word as guess word
//display the guess word of computer in the input area
function displayGuessComp() {
    let guessComp = pickWord(wordInfo.allWords);
    document.querySelector('.comp-guess').value = guessComp;
    return guessComp;
}

//add guess to result list for player
function addGuessPlayer() {
    let guess = getNewGuessPlayer();
    addToList(guessesPlayer, guess);
    if (checkResult(guess, secretWordForPlayer)) {
        won.player = true;
        afterWon('Human');
    }
    //after adding guess to result, we need to lock the button until valid input entered
    enableButton(false);
    clearInputPlayer();
}

//add guess to result list for computer
function addGuessComp() {
    let guess = displayGuessComp();
    addToList(guessesComp, guess);
    if (checkResult(guess, secretWordForComp)) {
        won.comp = true;
        afterWon('Computer');
    }
}

//generate a new secret word, change to guess button
function addBeginListener() {
    //if input nothing, disable the button
    if (document.querySelector('player-guess') == null) {
        enableButton(false);
    }
    //when click
    document.querySelector('#add').addEventListener('click', generateSecretWordForPlayer);
    document.querySelector('#add').addEventListener('click', generateSecretWordForComp);
    document.querySelector('#add').addEventListener('click', guessButton);
    //when hit Enter
    enableEnterKeyAsBeginBt();
    //need to monitor the input area with begin button rules
    addInputListenerWhenBegin();
}

function removeBeginListener() {
    document.querySelector('#add').removeEventListener('click', generateSecretWordForPlayer);
    document.querySelector('#add').removeEventListener('click', generateSecretWordForComp);
    document.querySelector('#add').removeEventListener('click', guessButton);
    //remove the input monitor with begin button rules
    removeInputListenerWhenBegin();
}

//add event listener when click "begin"/"guess" button
//add guess to result list
function addAddListener() {
    //if input nothing, disable the button
    enableButton(false);
    addInputListenerWhenGuess();
    //when click
    document.querySelector('#add').addEventListener('click', addGuessPlayer);
    document.querySelector('#add').addEventListener('click', addGuessComp);
    //when hit Enter
    enableEnterKeyAsGuessBt();
}

function removeAddListener() {
    document.querySelector('#add').removeEventListener('click', addGuessPlayer);
    document.querySelector('#add').removeEventListener('click', addGuessComp);
}

//add event listener for "input area"
//validate input
function addInputListenerWhenGuess() {
    document.querySelector('.player-guess').addEventListener('input', validateInputWhenGuess);
}

function addInputListenerWhenBegin() {
    document.querySelector('.player-guess').addEventListener('input', validateInputWhenBegin);
}

function removeInputListenerWhenGuess() {
    document.querySelector('.player-guess').removeEventListener('input', validateInputWhenGuess);
}

function removeInputListenerWhenBegin() {
    document.querySelector('.player-guess').removeEventListener('input', validateInputWhenBegin);
}

//add event listener when click "Reset" button
//reset guess
function addResetListener() {
    //since we don't need to monitor input area now.
    //change to reset from guess, so removeInputListenerWhenGuess();
    removeInputListenerWhenGuess();
    //when click
    document.querySelector('#add').addEventListener('click', resetGuess);
    //when hit Enter
    enableEnterKeyAsResetBt();
}

function removeResetListener() {
    document.querySelector('#add').removeEventListener('click', resetGuess);
    //since we removed inputListener, we need to add back.
    //beinButton will use this function, so addInputListenerWhenBegin()
    addInputListenerWhenBegin();
}

//change button from "Guess" to "Reset"
function resetButton() {
    document.querySelector('#add').innerHTML = 'Reset';
    removeAddListener();
    addResetListener();
}

//change button from "Reset" to "Begin" or at the very first begining, starting from "Begin"
function beginButton() {
    document.querySelector('#add').innerHTML = 'Begin';
    removeResetListener();
    addBeginListener();
}

//change button from "Begin" to "Guess"
function guessButton() {
    document.querySelector('#add').innerHTML = 'Guess';
    removeBeginListener();
    //since the input listener is different when the button is "begin" and "guess", we need to remove one add new one
    // removeInputListenerWhenBegin(); have done above
    addInputListenerWhenGuess();
    addAddListener();
}

/*pick a new secret word
* clear "previous area"
* reset turns to 0
* clear result display
* button change from "Reset" to "Begin"
* pick a new secret word*/
//remember to reset variables
function resetGuess() {
    addInputListenerWhenBegin();
    clearInputPlayer();
    clearInputComp();
    clearList();
    clearTurns();
    clearResult();
    beginButton();
    won.player = false;
    won.comp = false;
}

//enable "Guess button" and "Enter" Key when parameter is true
function enableButton(enable) {
    if (enable) {
        document.querySelector('#add').disabled = false;
    } else {
        document.querySelector('#add').disabled = true;
    }
}

//enable "Enter" key as guess button
function enableEnterKeyAsGuessBt() {
    document.onkeydown = function keyListener(e) {
        let guess = getNewGuessPlayer();
        if (guess.length === 5 && checkWordList(guess)) {
            if (e.keyCode === 13) {
                addGuessPlayer();
                addGuessComp();
            }
        }
    }
}

//enable "Enter" key as begin button
function enableEnterKeyAsBeginBt() {
    document.onkeydown = function keyListener(e) {
        let guess = getNewGuessPlayer();
        if (guess.length === 5 && checkWordList(guess)) {
            if (e.keyCode === 13) {
                generateSecretWordForComp();
                generateSecretWordForPlayer();
                guessButton();
            }
        }
    }
}

//enable "Enter" key as reset button
function enableEnterKeyAsResetBt() {
    document.onkeydown = function keyListener(e) {
        if (e.keyCode === 13) {
            resetGuess();
        }
    }
}

/*check if input is valid, if true, add to list, clear input area
* if not, disabled the button and "Enter" key*/
function validateInputGeneral(beginNotGuess) {
    let guess = getNewGuessPlayer();
    let input = document.querySelector('.player-guess');
    //when length is not 5
    if (input == null || guess.length < 5 || guess.length > 5) {
        if (beginNotGuess) {
            document.querySelector('.status').innerHTML = 'Enter a common 5 letter word for them to guess';
        } else {
            document.querySelector('.status').innerHTML = 'Enter a common 5 letter word to guess';
        }
        changeInputColor('black');
        enableButton(false);
        return false;
    }
    //when length is 5 but not in the word list
    if (guess.length === 5 && !checkWordList(guess)) {
        if (beginNotGuess) {
            document.querySelector('.status').innerHTML = 'Unknown word. Choose a different common 5 letter word for them to guess';
        } else {
            document.querySelector('.status').innerHTML = 'Unknown word. Choose a different common 5 letter word to guess';
        }
        changeInputColor('red'); //change color to red
        enableButton(false);
        return false;
    }
    //meet requirement: when length is 5 and found in the word list
    if (guess.length === 5 && checkWordList(guess)) {
        enableButton(true);
        changeInputColor('green'); //change color to green
        return true;
    }
    //other situation
    changeInputColor('black');
    return false;
}

function validateInputWhenBegin() {
    validateInputGeneral(true);
}

function validateInputWhenGuess() {
    validateInputGeneral(false);
}

//change font color in input area
function changeInputColor(color) {
    let input = document.querySelector('.player-guess');
    if (color === 'black') {
        input.style.color = '#000000';
    } else if (color === 'red') {
        input.style.color = '#CC3333';
    } else if (color === 'green') {
        input.style.color = '#4CAF50';
    }
}

//clear the "input area"
function clearInputPlayer() {
    document.querySelector('.player-guess').value = '';
}

function clearInputComp() {
    document.querySelector('.comp-guess').value = '';
}

//clear the "previous area"
function clearList() {
    guessesPlayer.splice(0, guessesPlayer.length);
    guessesComp.splice(0, guessesComp.length)
    document.querySelector('.output-player').innerHTML ='';
    document.querySelector('.output-comp').innerHTML ='';
}

//clear the turns
function clearTurns() {
    document.querySelector('#turns').innerHTML = 0;
    turns = 1;
}

//clear the "result area"
function clearResult() {
    document.querySelector('.status').innerHTML = 'Enter a common 5 letter word for them to guess';
}

//check if guess work is in word list
function checkWordList(guess) {
    return wordInfo.allWords.includes(guess);
}

/*if won, reset button, display won after turns */
function afterWon(player) {
    resetButton();
    displayResult(player);
}

//notify the user he has won
function displayResult(player) {
    document.querySelector('.status').innerHTML = `${player} wins in ${generateTurns()} turns`;
}

//check if guess right
function checkResult(guess, secretWord) {
    if (countExactLetters(guess, secretWord) === 5) {
        return true;
    }
}

//initialize letters and numbers of secret word
function getLetters(secretWord) {
    let map = {};
    for (let letter of secretWord) {
        if (!map[letter]) {
            map[letter] = 0;
        }
        map[letter] += 1;
    }
    return map;
}

//calculate common letters
function countCommonLetters(guess, secretWord) {
    let common = 0;
    const lettersOfSecretWord = getLetters(secretWord);
    for (let i = 0; i < guess.length; i++) {
        if (lettersOfSecretWord[guess[i]] && lettersOfSecretWord[guess[i]] !== 0) {
            lettersOfSecretWord[guess[i]] -= 1;
            common++;
        }
    }
    return common;
}

//calculate exact letters
function countExactLetters(guess, secretWord) {
    let exact = 0;
    for (let i = 0; i < guess.length; i++) {
        if (guess[i] === secretWord[i]) {
            exact++;
        }
    }
    return exact;
}

//generate secret word
function random(list) {
    return list[ Math.floor( Math.random() * list.length ) ];
}

function pickWord( wordList ) {
    return random( wordInfo.allWords );
}

function start() {
    addBeginListener();
    render();
}

//call funtions
start();

//words list
function allWords() {
    return `
about other which their there first would these click price
state email world music after video where books links years
order items group under games could great hotel store terms
right local those using phone forum based black check index
being women today south pages found house photo power while
three total place think north posts media water since guide
board white small times sites level hours image title shall
class still money every visit tools reply value press learn
print stock point sales large table start model human movie
march yahoo going study staff again april never users topic
below party login legal above quote story rates young field
paper girls night texas poker issue range court audio light
write offer given files event china needs might month major
areas space cards child enter share added radio until color
track least trade david green close drive short means daily
beach costs style front parts early miles sound works rules
final adult thing cheap third gifts cover often watch deals
words linux james heart error clear makes india taken known
cases quick whole later basic shows along among death speed
brand stuff japan doing loans shoes entry notes force river
album views plans build types lines apply asked cross weeks
lower union names leave teens woman cable score shown flash
ideas allow homes super asian cause focus rooms voice comes
brown forms glass happy smith thank prior sport ready round
built blood earth nokia italy basis award peter extra rated
quite horse stars lists owner takes bring input agent valid
grand trial units wrote ships metal funds guest seems trust
multi grade panel floor match plant sense stage goods maybe
spain youth break dance apple enjoy block civil steel songs
fixed wrong hands paris fully worth peace coast grant agree
blogs scale stand frame chief gives heard begin royal clean
bible suite vegas chris piece sheet seven older cells looks
calls whose naked lives stone tests buyer steve label scott
canon waste chair phase motor shirt crime count claim patch
santa alone jones saint drugs joint fresh dates upper prime
limit began louis steps shops creek urban tours labor admin
heavy solid theme touch goals serve magic mount smart latin
avoid birth virus abuse facts faith chain moved reach sorry
gamma truth films owned draft chart jesus clubs equal codes
kinds teams funny tried named laser harry taxes mouse brain
dream false falls stats carry hello clips brief ended eight
wants alert queen sweet diego truck votes ocean signs depth
train feeds route frank anime speak query rural judge bytes
fight filed korea banks kelly leads brian miami wales minor
noted spent davis helps cycle sleep scene drink intel rings
henry guess ahead devel delta cisco alpha bonus adobe trees
dress refer babes layer spend clock ratio proof empty maine
ideal specs parks cream boxes hills aware shape irish firms
usage mixed exist wheel angel width noise array greek sharp
occur knows coach kevin plate logic sizes plain costa trail
buddy setup blues scope crazy bears mouth meter fruit mysql
lewis sugar stick allen genre slide exact bound storm micro
dolls paint delay pilot czech novel ultra idaho plays truly
lodge broad swiss sarah clark foods guard newly raise drama
bands lunch audit polls tower yours jason shell solar catch
doubt tasks const doors forth bruce split twice egypt shift
simon marks loved birds saved shots moore treat piano risks
ports teach rapid hairy dutch boots holds pulse metro strip
pearl heads logos honda bills opera asset blank humor lived
tight meant plane meets tampa grace susan adams villa inner
roman taste trips sides turns cache lease proud giant seats
alarm usual angle vinyl worst honor eagle pants nurse quiet
comic crown maker crack picks smoke craft apart blind coins
gross epson actor finds fifth prize dirty wayne alive prove
wings ridge modem larry skill moves throw trend rhode worse
boats tells fiber graph talks bonds fraud roger crash inter
grove spray roads faces mayor yield hence radar lakes diary
kings flags baker shock walls ebony drawn beast dodge pizza
yards woods jokes twiki globe dicke kerry ghost pride keith
linda chile maria brass plaza quest trans booty acres venue
vital excel modes enemy wells opens lucky thick iraqi vista
chips terry flood arena grown jerry smile lands armed laura
tokyo nikon candy pills tiger folks boost icons moral keeps
pound roses bread tough gonna chest billy craig solve nancy
tones sight towns worry reads roles glory saudi fault karen
jimmy rugby fluid barry devil grass marie kenya sized manga
theft swing dated shoot elite poems robot winds gnome roots
noble shore loves loose slots rocks genes hosts atlas feels
ralph corps liver decor texts evans fails aging alice intro
clerk mills jeans fonts favor sigma xhtml aside essay camps
aaron trace packs spoke arrow rough weird holes blade meals
robin strap crowd cloud valve knife shelf liked adopt fotos
outer tales islam nodes seeds cited skype tired steam acute
stood carol stack curve amber trunk waves camel lamps juice
chase sauce beads flows fewer proxy lanka voted bikes gates
slave lycos zdnet combo haven charm basin ranch drunk toner
latex delhi alien broke nepal nylon discs rocky fleet bunch
cents omega civic saver grill grain wanna seeks gains spots
salon turbo thats aimed reset brush spare kodak skirt honey
gauge faced sixth farms cheat sandy macro laugh pitch autos
perry dozen teeth cloth stamp lotus cargo salem likes tapes
zones races maple depot blend julie janet phpbb probe helen
lopez debug chuck ebook bingo minds xanax sunny leeds cedar
blair hopes mason burns pumps mario utils pairs chose blast
tommy brake congo olive cyber clone dicks relay tears oasis
angry lover rolls malta daddy ferry omaha loads motel rally
dying stuck stops vocal organ lemon toxic bench rider butts
bobby sheep wines salad paste katie relax sword sells coral
pixel float colin paths acids dairy admit fancy samoa squad
wages males chaos wheat bases unity bride begun socks essex
fever drums rover flame tanks spell emily annex sudan hints
wired elvis argue arise jamie chess oscar menus canal amino
herbs lying drill bryan hobby tries trick myers drops wider
screw blame fifty uncle jacob randy brick naval donna cabin
eddie fired perth syria klein tires retro anger suits glenn
handy crops guild tribe batch alter ghana edges twins amend
chick thong medal walks booth indie bones breed polar msgid
carey danny patio lloyd beans ellis snake julia berry ought
fixes sends mazda timer tyler verse highs ellen racks nasty
tumor watts forty tubes floyd queue skins exams welsh belly
haiti elder sonic thumb twist ranks debut volvo penny ivory
remix alias newer spice ascii donor trash manor diane disco
endif minus milan shade digit lions pools lyric grave howto
devon saves lobby punch gotta karma betty lucas mardi shake
holly silly mercy fence diana shame fatal flesh jesse qatar
sheer witch cohen puppy kathy smell satin promo tunes lucia
nerve renew locks euros rebel hired hindu kills slope nails
whats rides rehab merit disks condo fairy shaft casio kitty
drain monte fires panic leone onion beats merry scuba verde
dried derby annie derek steal fears tuner alike sagem scout
dealt bucks badge wrist heath lexus realm jenny yemen buses
rouge yeast kenny yukon singh brook wives xerox sorts vsnet
papua armor viral pipes laden aruba merge edgar dubai allan
sperm filme craps frost sally yacht tracy whale shark grows
cliff tract shine wendy diffs ozone pasta serum swift inbox
focal samba wound belle cindy lined boxed cubic spies elect
bunny chevy tions flyer baths emacs climb sparc dover token
kinda dylan belts burke clara flush hayes moses johns jewel
teddy dryer ruled funky joins scary mpegs cakes mixer sbjct
tooth stays drove upset mines logan lance colon lanes purse
align bless crest alloy plots tulsa casey draws bloom loops
surge tahoe souls spank vault wires mails blake orbit niger
bacon paxil spine trout apnic fatty joyce marco isaac oxide
badly scoop sanyo blink carlo tiles tamil fuzzy grams forge
dense brave awful meyer wagon knock peers quilt notre mambo
flour choir blond burst wiley fibre daisy crude bored allah
fares hoped safer marsh ricky theta stake arbor
`.split(/ |\n/g).map( word => word.toUpperCase() ).filter( word => word );
}












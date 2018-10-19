

//Variables

var wordArray = [
"christina aguilera", "usher", "beyonce", "eminem", "britney spears" 
]
var wins = 0;
var randomWord;             //Word 
var splitWordArray = [];    //Letters in Word
var wordIP = [];            //word we are building
var guess;                  // Users Guess
var allGuessesArray = [];   //stores letters guessed
var remainingGuesses = 10;
var gameFinished = false;

//Get Elements
// var userChoice = document.getElementById("userChoice");

//Functions //

function start() {

    // if (randomWord === "") {
        randomWord = wordArray[Math.floor(Math.random() * wordArray.length)];
        console.log("random word: " + randomWord);

        //Build WordIP
        splitWordArray = randomWord.split("");
        console.log(splitWordArray);
    

    for (var i = 0; i < splitWordArray.length; i++) {
        wordIP.push("_ ");
    }

    //Call UpdateDisplay function
    updateDisplay();

    
};

function reset() {

    allGuessesArray = [];
    wordIP = [];


    start();

    //Call UpdateDisplay function
    updateDisplay();

    }; 


function updateDisplay() {

    var wordIPText = "";
    for (var i = 0; i < wordIP.length; i++) {
        wordIPText += wordIP[i];
    }

    document.getElementById("userWins").innerText = wins;
    document.getElementById("wordIP").innerText = wordIPText;
    document.getElementById("remainingGuesses").innerText = remainingGuesses;
    document.getElementById("lettersGuessed").innerText = allGuessesArray;
};


function checkLetter(guess) {

    var positions = [];

    for (var i = 0; i < splitWordArray.length; i++) {
        if (splitWordArray[i] === guess) {
            positions.push(i);
        }
    };

    if (positions.length <= 0) {
        remainingGuesses = remainingGuesses - 1;
    }
    else {
        for (var i = 0; i < positions.length; i++) {
            wordIP[positions[i]] = guess;
        }
    }
};

function checkGuess(guess) {

    if (remainingGuesses > 0) {
        if (allGuessesArray.indexOf(guess) === -1) {
            allGuessesArray.push(guess);
            checkLetter(guess);
        }
    }
};

function checkResult() {
    if (wordIP.indexOf("_ ") === -1) {
        console.log("you win!");
        wins = wins + 1;
        // gameFinished = true;
        reset();
    }
    if (remainingGuesses <= 0) {
        console.log("you lose")
        gameFinished = true;
    }
};


$(document).ready(function() {
    start();
});

//Clicking any button starts the game
document.onkeyup = function(event) {
    
    guess = event.key;

    
    if (gameFinished === true) {
        reset();
        gameFinished = false;
    }

    checkGuess(guess.toLowerCase());
    updateDisplay();
    checkResult();

};


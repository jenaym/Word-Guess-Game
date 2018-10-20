

//Variables

var wordArray = [
"christina aguilera", "usher", "beyonce", "eminem", "britney spears", "chris brown"
]
var wins = 0;
var randomWord;             //Word 
var splitWordArray = [];    //Letters in Word
var wordIP = [];            //word we are building
var guess;                  // Users Guess
var allGuessesArray = [];   //stores letters guessed
var remainingGuesses = 10;
var gameFinished = false;

var audioBeyonce = document.createElement("audio");
audioBeyonce.setAttribute("src", "assets/beyonce-Listen.mp3");

var audioChristina = document.createElement("audio");
audioChristina.setAttribute("src", "assets/christina-Beautiful.mp3");

var audioBritney = document.createElement("audio");
audioBritney.setAttribute("src", "assets/britney-stronger.mp3");

var audioEminem = document.createElement("audio");
audioEminem.setAttribute("src", "assets/eminem.mp3");

var audioUsher = document.createElement("audio");
audioUsher.setAttribute("src", "assets/usher.mp3");

var audioChrisBrown = document.createElement("audio");
audioChrisBrown.setAttribute("src", "assets/chrisBrown-kissKiss.mp3");



//Functions //

function pauseAudio() {
        audioBeyonce.pause();
        audioBritney.pause();
        audioChristina.pause();
        audioUsher.pause();
        audioEminem.pause();
        audioChrisBrown.pause();
};

function playAudio() {
    if (randomWord === "beyonce") {
        audioBeyonce.play();
    }
    else if (randomWord === "christina aguilera") {
        audioChristina.play();
    }
    else if (randomWord === "britney spears") {
        audioBritney.play();
    }
    else if (randomWord === "usher") {
        audioUsher.play();
    }
    else if (randomWord === "eminem") {
        audioEminem.play();
    }
    else if (randomWord === "chris brown") {
        audioChrisBrown.play();
    }        
};

function start() {

    //Get random word from array
        randomWord = wordArray[Math.floor(Math.random() * wordArray.length)];
        console.log("random word: " + randomWord);

    //Build WordIP
        splitWordArray = randomWord.split("");
        console.log(splitWordArray);
    
    
    for (var i = 0; i < splitWordArray.length; i++) {
        if (splitWordArray[i] === " ") {
            wordIP.push(" ");
        }
        else {
        wordIP.push("_ ");
        }
    }

    //Call UpdateDisplay function
    updateDisplay();
    
};

function reset() {

    allGuessesArray = [];
    wordIP = [];
    remainingGuesses = 10;

    start();

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
        remainingGuesses--;
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
        pauseAudio();
        playAudio();
        reset();
    }

    if (remainingGuesses <= 0) {
        console.log("you lose")
        gameFinished = true;
    }
};


$(document).ready(function() {
    start();

    $(".pause-button").click(function() {
        pauseAudio();
    });
    
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




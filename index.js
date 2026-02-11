// MAIN VARIABLES //

// pool of words to choose from
const words = [ "javascript" ]

let guessedLetters = []

let currentWord = null
let guessesRemaining = 6

// shows guessed letters and remaining spaces
const wordArea = document.querySelector("#word-area") 

const lettersKeyboard = document.querySelector("#letters-keyboard")

// FUNCTIONS

// wipes old game data and initializes data for new game
function initializeNewGame() {
    clearWordArea()
    setRandomWord()
    buildWordArea()
    guessesRemaining = 6
    guessedLetters = []
}

// clear spans from #word-area
function clearWordArea() {
    const wordAreaSpans = document.querySelectorAll("#word-area span")
    wordAreaSpans.forEach( span => span.remove() )
}

// sets current word to random word from words
function setRandomWord() {
    const index = Math.floor( Math.random() * words.length )
    currentWord = words[index].toUpperCase()
}

// add underscore spans for each letter of currentWord
function buildWordArea() {
    currentWord
    .split("")
    .forEach( letter => {
        const span = document.createElement("span")
        span.textContent = "_"
        wordArea.append(span)
    })
}

// DEFAULT EVENT LISTENERS

lettersKeyboard.addEventListener("click", handleClickLetterKey)

function handleClickLetterKey( event ) {
    // event.target is the thing that you clicked on
    // short circuit the rest of the function if the target is the containing div
    if (event.target.tagName === "DIV") {
        return
    }

    // add letter to guessed letters
    const chosenLetter = event.target.textContent
    guessedLetters.push(chosenLetter)

    if ( currentWord.includes(chosenLetter) ) {
        handleCorrectGuess(chosenLetter)
    } else {
        handleIncorrectGuess(chosenLetter)
    }
}

// display letter in the correct spot in the #word-area
// TODO: if the word area is filled in we move to victory screen
function handleCorrectGuess(chosenLetter) {
    // loop through the currentWord
    for (let i = 0; i < currentWord.length; i++) {
        // if letter maches currentWord letter
        if (currentWord[i] === chosenLetter) {
            // find matching span and fill it in
            const span = wordArea.children[i]
            span.textContent = chosenLetter
        }
    }
}

// ????????????????????????????????????
function handleIncorrectGuess(chosenLetter) {

}


// TESTING AREA
initializeNewGame()
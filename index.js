// MAIN VARIABLES //

// pool of words to choose from
const words = [ "javascript" ]

let guessedLetters = []

let currentWord = null
let guessesRemaining = 6

let currentScore = 0

// shows guessed letters and remaining spaces
const wordArea = document.querySelector("#word-area") 
// filled with buttons for keyboard
const lettersKeyboard = document.querySelector("#letters-keyboard")
// progressive hangman img
const hangmanImg = document.querySelector("#hangman-img")
// displays guessedLetters
const guessedLettersArea = document.querySelector("#guessed-letters-area")
// displays current score
const scoreArea = document.querySelector("#score-area")
// popup for victory
const victoryModal = document.querySelector("#victory-modal")

// urls for different stages of hangman imgs
const hangmanImg01 = "https://www.oligalma.com/downloads/images/hangman/hangman/4.jpg"
const hangmanImg02 = "https://www.oligalma.com/downloads/images/hangman/hangman/5.jpg"
const hangmanImg03 = "https://www.oligalma.com/downloads/images/hangman/hangman/6.jpg"
const hangmanImg04 = "https://www.oligalma.com/downloads/images/hangman/hangman/7.jpg"
const hangmanImg05 = "https://www.oligalma.com/downloads/images/hangman/hangman/8.jpg"
const hangmanImg06 = "https://www.oligalma.com/downloads/images/hangman/hangman/9.jpg"
const hangmanImg07 = "https://www.oligalma.com/downloads/images/hangman/hangman/10.jpg"

const hangmanImageSteps = {
    6: hangmanImg01,
    5: hangmanImg02,
    4: hangmanImg03,
    3: hangmanImg04,
    2: hangmanImg05,
    1: hangmanImg06,
    0: hangmanImg07,
}


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

    // add letter to guessed letters if not currently guessed
    const chosenLetter = event.target.textContent
    if ( guessedLetters.includes(chosenLetter) ) {
        return
    }
    guessedLetters.push(chosenLetter)
    updateGuessedLettersArea(chosenLetter)

    // handle correct or incorrect guess
    if ( currentWord.includes(chosenLetter) ) {
        handleCorrectGuess(chosenLetter)
    } else {
        handleIncorrectGuess(chosenLetter)
    }
}

// display letter in the correct spot in the #word-area
// TODO: if the word area is filled in we move to victory screen
function handleCorrectGuess(chosenLetter) {
    // add to score
    changeScore(10)
    // loop through the currentWord
    for (let i = 0; i < currentWord.length; i++) {
        // if letter maches currentWord letter
        if (currentWord[i] === chosenLetter) {
            // find matching span and fill it in
            const span = wordArea.children[i]
            span.textContent = chosenLetter
        }
    }
    // check if the player has won
    checkWinCondition()
}

// decrement guessesLeft
// changes hangman image to the next image
// TODO: alert about incorrect guess
// TODO: if no guesses left show the losing screen
function handleIncorrectGuess(chosenLetter) {
    // subtract from score
    changeScore(-5)
    // change guesses remaining and image
    if (guessesRemaining > 0) {
        guessesRemaining--
        const nextImageURL = hangmanImageSteps[guessesRemaining]
        hangmanImg.src = nextImageURL
        hangmanImg.alt = `${guessesRemaining} guesses remaining`
    }
}


function updateGuessedLettersArea(chosenLetter) {
    const span = document.createElement("span")
    span.textContent = chosenLetter
    guessedLettersArea.append(span)
}

function changeScore(change) {
    currentScore += change
    scoreArea.textContent = currentScore
}

function checkWinCondition() {
    for (let i = 0; i < currentWord.length; i++) {
        const currentWordLetter = currentWord[i]
        const isLetterIncluded = guessedLetters.includes( currentWordLetter )

        // if letter NOT included then short circuit the function
        if ( !isLetterIncluded ) {
            return
        }
    }

    victoryModal.style.display = "block"
}

// TESTING AREA
initializeNewGame()
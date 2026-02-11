// MAIN VARIABLES //

// pool of words to choose from
const words = [ "abc", "abcd", "abcde" ]

let guessedLetters = []

let currentWord = null
let guessesRemaining = 6

let currentScore = 0

// starting screen div
const startingScreen = document.querySelector("#starting-screen")
// main game screen div
const gameArea = document.querySelector("#game-area")
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
// popup for defeat
const defeatModal = document.querySelector("#defeat-modal")
// reset game button on victory
const victoryResetButton = document.querySelector("#victory-modal button")
// reset game button on defeat
const defeatResetButton = document.querySelector("#defeat-modal button")
// reset button
const resetButton = document.querySelector("#reset-button")
// starting screen button
const startingGameButton = document.querySelector("#starting-screen button")


// HANGMAN IMAGE //

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

// FATALITY IMAGES //

const fatality01 = "assets/fatality01.gif"
const fatality02 = "assets/fatality02.gif"
const fatality03 = "assets/fatality03.gif"
const fatality04 = "assets/fatality04.gif"
const fatality05 = "assets/fatality05.gif"

const fatalities = [
    fatality01,
    fatality02,
    fatality03,
    fatality04,
    fatality05
]


// FUNCTIONS

// wipes old game data and initializes data for new game
function initializeNewGame() {
    startingScreen.style.display = "none"
    gameArea.style.display = "block"
    clearGuessedLettersArea()
    clearWordArea()
    setRandomWord()
    buildWordArea()
    resetHangmanImg()
    guessesRemaining = 6
    resetScore()
    guessedLetters = []
    victoryModal.style.display = ""
    defeatModal.style.display = ""
}

// clear spans from #word-area
function clearWordArea() {
    const wordAreaSpans = document.querySelectorAll("#word-area span")
    wordAreaSpans.forEach( span => span.remove() )
}

// clears #guessed-letters-area
function clearGuessedLettersArea() {
    const guessedLetterSpans = document.querySelectorAll("#guessed-letters-area span")
    guessedLetterSpans.forEach( span => span.remove() )
}

function resetHangmanImg() {
    hangmanImg.src = hangmanImg01
    hangmanImg.alt = "6 guesses remaining"
}

function resetScore() {
    currentScore = 0
    scoreArea.textContent = 0
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
    //check if a loss occured
    checkLossCondition()
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


function checkLossCondition() {
    if (guessesRemaining === 0) {
        defeatModal.style.display = "block"
        const index = Math.floor( Math.random() * fatalities.length )
        const currentFatalityImg = fatalities[index]
        const fatalityImg = document.querySelector("#defeat-modal img")
        fatalityImg.src = currentFatalityImg
    }
}


// starting screen button
startingGameButton.addEventListener("click", initializeNewGame)
// reset game on clicking reset button in victory modal
victoryResetButton.addEventListener("click", initializeNewGame)
// reset game on clicking reset button in defeat modal
defeatResetButton.addEventListener("click", initializeNewGame)
// reset game on clicking reset button at top of page
resetButton.addEventListener("click", initializeNewGame)
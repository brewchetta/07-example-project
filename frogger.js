const froggerImagePath = "assets/frogger.png"

// x/y coordinates for frogger
let froggerX = 10
let froggerY = 10

// create & style the frogger element
const froggerImg = document.createElement("img")
froggerImg.src = froggerImagePath
froggerImg.alt = "frogger"
document.body.append(froggerImg)
froggerImg.style.width = "100px"
froggerImg.style.position = "fixed"
froggerImg.style.top = `${froggerY}px`
froggerImg.style.left = `${froggerX}px`

// capture keyboard events
document.addEventListener("keyup", repositionFrogger)

// move frogger if the arrow keys have been pressed
function repositionFrogger( event ) {
    if ( event.code === "ArrowLeft" ) {
        froggerX -= 10
        froggerImg.style.left = `${froggerX}px`
    }
    if ( event.code === "ArrowRight" ) {
        froggerX += 10
        froggerImg.style.left = `${froggerX}px`
    }
    if ( event.code === "ArrowUp" ) {
        froggerY -= 10
        froggerImg.style.top = `${froggerY}px`
    }
    if ( event.code === "ArrowDown" ) {
        froggerY += 10
        froggerImg.style.top = `${froggerY}px`
    }
}
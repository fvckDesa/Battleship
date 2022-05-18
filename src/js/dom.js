import { coordsFromIndex, indexFromCoords } from './utility';

const dialog = document.querySelector("dialog");
const winnerText = dialog.querySelector("#winner");
const closeBtn = dialog.querySelector("#close");

dialog.addEventListener("close", resetBoards);

closeBtn.addEventListener("click", () => {
    dialog.close()
});

function printAttack(square, thereIsShip) {
    if(thereIsShip) {
        square.classList.add("there-is-ship");
    } else {
        square.classList.add("there-is-not-ship");
    }
}

function showWinnerDialog(winner) {
    winnerText.innerText = winner;
    dialog.showModal();
}

function resetBoards() {
    for(const square of [...document.querySelectorAll(".square")]) {
        square.classList.remove("there-is-ship", "there-is-not-ship", "ship");
    }
}

function renderShips(board) {
    const squares = [...document.querySelectorAll("#player-board > .square")];
    for(let i = 0; i < squares.length; i++) {
        const { x, y } = coordsFromIndex(i);
        if(board[y][x]) {
            squares[i].classList.add("ship");
        }
    }
}

function shipSunk(coords) {
    const squares = [...document.querySelectorAll("#computer-board > .square")];
    for(const coord of coords) {
        squares[indexFromCoords(coord)].classList.add("ship");
    }
}

export {
    showWinnerDialog,
    printAttack,
    renderShips,
    shipSunk
}
function getAll(selector) {
    return [...document.querySelectorAll(selector)];
}

export default {
    board1: document.querySelector("#board1"),
    board2: document.querySelector("#board2"),
    get cellGameBoard1() {
        return getAll("#board1 .board-cell");
    },
    get cellGameBoard2() {
        return getAll("#board2 .board-cell");
    },
    winnerBanner: document.querySelector(".winner-banner"),
    restartBtn: document.querySelector("#restart"),
    boardContainer1: {
        board: document.querySelector("#board1"),
        get boardCells(){
            return getAll("#board1 .board-cell");
        },
        setShips: document.querySelector("#set-ships1"),
        randomBtn: document.querySelector("#set-ships1 #random-board"),
        resetBtn: document.querySelector("#set-ships1 #reset-board"),
        shipsContainer: document.querySelector("#set-ships1 .ships-container")
    },
    boardContainer2: {
        board: document.querySelector("#board2"),
        get boardCells(){
            return getAll("#board2 .board-cell");
        },
        setShips: document.querySelector("#set-ships2"),
        randomBtn: document.querySelector("#set-ships2 #random-board"),
        resetBtn: document.querySelector("#set-ships2 #reset-board"),
        shipsContainer: document.querySelector("#set-ships2 .ships-container")
    }
}
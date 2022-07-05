function getAll(selector) {
    return [...document.querySelectorAll(selector)];
}

export default {
    get cellGameBoard1() {
        return getAll("#board1 .board-cell");
    },
    get cellGameBoard2() {
        return getAll("#board2 .board-cell");
    },
    winnerBanner: document.querySelector(".winner-banner"),
    restartBtn: document.querySelector("#restart")
}
import Game from "../game";
import elements from "./elements";

const { winnerBanner, restartBtn} = elements;

restartBtn.addEventListener("click", () => {
    winnerBanner.classList.add("hidden");
    Game.start();
});

function renderWinnerBanner(winner) {
    winnerBanner.querySelector("#winner-name").innerText = winner;

    winnerBanner.classList.remove("hidden");
}

export {
    renderWinnerBanner
};
import { isValidCoord } from "../utility";
import { renderShip, renderAllShip, renderBoard } from "./DOM-board";
import Game from "../game";

let draggableShips = [];
let container;

function renderSetShip() {
  container.setShips.classList.remove("hidden");
}

function createDraggableShip(length) {
  let offset = 0;
  // create draggable ship
  const dragShip = document.createElement("div");
  dragShip.classList.add("drag-ship");
  dragShip.setAttribute("draggable", "true");
  // add cells to draggable ship
  for (let i = 0; i < length; i++) {
    const dragShipCell = document.createElement("div");
    dragShipCell.classList.add("drag-ship-cell");
    // set offset (cell where drag the ship)
    dragShipCell.addEventListener("mouseenter", () => {
      offset = i;
    });

    dragShip.appendChild(dragShipCell);
  }
  // change axis
  dragShip.addEventListener("click", () => {
    dragShip.classList.toggle("rotate");
  });
  // set data transfer
  dragShip.addEventListener("dragstart", (e) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("length", length);
    e.dataTransfer.setData("offset", offset);
    e.dataTransfer.setData(
      "axis",
      dragShip.classList.contains("rotate") ? "y" : "x"
    );
  });

  return dragShip;
}

function renderDraggableShip(dragShip = "") {
  container.shipsContainer.replaceChildren(dragShip);
}

function activeRandomBtn(player) {
  container.randomBtn.addEventListener("click", () => {
    reset(player);
    setDraggableShips([]);
    renderDraggableShip();
    player.setRandomShips();
    renderAllShip(container.boardCells, player.gameBoard.board);
  });
}

function activeResetBtn(player) {
  container.resetBtn.addEventListener("click", () => {
    reset(player);
    setDraggableShips(player.shipLengthArr);
    renderDraggableShip(draggableShips.shift());
  });
}

function reset(player) {
  player.resetGameBoard();
  renderBoard(container.board);
  activeDrop(player);
}

function setDraggableShips(lengthArr) {
  draggableShips = lengthArr.map((length) => createDraggableShip(length));
}

function activeDrop(player) {
  let numShip = 0;

  container.boardCells.forEach((cell, i) => {
    const coord = { x: i % 10, y: Math.floor(i / 10) };

    cell.addEventListener("dragover", (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
    });

    cell.addEventListener("drop", (e) => {
      e.preventDefault();
      // get data from drag event
      const length = e.dataTransfer.getData("length");
      const offset = e.dataTransfer.getData("offset");
      coord.axis = e.dataTransfer.getData("axis");
      // remove offset from coord
      coord.axis === "x" ? (coord.x -= offset) : (coord.y -= offset);
      // add ship to board
      if (isValidCoord(coord, length, player.gameBoard.board)) {
        player.gameBoard.addShip(coord, length);
        renderShip(container.boardCells, player.gameBoard.board, numShip);
        renderDraggableShip(draggableShips.shift());
        numShip++;
      }
    });
  });
}

function createStart() {
  const startContainer = document.createElement("div");
  startContainer.classList.add("start-container");

  const startBtn = document.createElement("button");
  startBtn.classList.add("start-btn");
  startBtn.innerText = "Start";

  startBtn.addEventListener("click", () => {
    if(container.shipsContainer.children.length > 0) return;
    
    startContainer.remove();
    container.setShips.classList.add("hidden");
    Game.loop();
  });

  startContainer.appendChild(startBtn);

  return startContainer;
}

function renderStartBtn(otherBoard) {
  otherBoard.appendChild(createStart());
}

function activeDragAndDrop(boardContainer, player, otherBoard) {
  container = boardContainer;

  renderSetShip();

  setDraggableShips(player.shipLengthArr);

  renderDraggableShip(draggableShips.shift());

  activeRandomBtn(player);

  activeResetBtn(player);

  activeDrop(player);

  renderStartBtn(otherBoard);
}

export { activeDragAndDrop };

import { isValidCoord } from "../utility";
import { renderShip } from "./DOM-board";

let draggableShips = [];

function renderSetShip(setShip) {
  setShip.classList.remove("hidden");
}

function createDraggableShip(length) {
  let offset = 0;

  const dragShip = document.createElement("div");
  dragShip.classList.add("drag-ship");
  dragShip.setAttribute("draggable", "true");

  for (let i = 0; i < length; i++) {
    const dragShipCell = document.createElement("div");
    dragShipCell.classList.add("drag-ship-cell");

    dragShipCell.addEventListener("mouseenter", () => {
      offset = i;
    });

    dragShip.appendChild(dragShipCell);
  }

  dragShip.addEventListener("click", () => {
    dragShip.classList.toggle("rotate");
  });

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

function renderDraggableShip(shipsContainer, dragShip = "") {
  shipsContainer.replaceChildren(dragShip);
}

function activeDragAndDrop(boardContainer, player) {
  const { setShips, shipsContainer, boardCells } = boardContainer;
  let numShip = 0;

  renderSetShip(setShips);

  draggableShips = player.shipLengthArr.map((length) =>
    createDraggableShip(length)
  );

  renderDraggableShip(shipsContainer, draggableShips.shift());

  boardCells.forEach((cell, i) => {
    const coord = { x: i % 10, y: Math.floor(i / 10) };

    cell.addEventListener("dragover", (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
    });

    cell.addEventListener("drop", (e) => {
      e.preventDefault();

      const length = e.dataTransfer.getData("length");
      const offset = e.dataTransfer.getData("offset");
      coord.axis = e.dataTransfer.getData("axis");

      coord.axis === "x" ? coord.x -= offset : coord.y -= offset;

      if(isValidCoord(coord, length, player.gameBoard.board)) {
        player.gameBoard.addShip(coord, length);
        renderShip(boardCells, player.gameBoard.board, numShip);
        renderDraggableShip(shipsContainer, draggableShips.shift());
        numShip++;
      }
    });
  });
}

export { activeDragAndDrop };
